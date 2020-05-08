#ifdef GL_ES
precision highp float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform float u_time;

float circle(in vec2 _st, in float _radius) {
  vec2 dist = _st - vec2(0.5);
	return 1. - smoothstep(_radius-(_radius*0.01), _radius+(_radius*0.01), dot(dist,dist)*4.0);
}

float box(in vec2 _st, in vec2 _size){
  _size = vec2(0.5) - _size * 0.5;
  vec2 uv = smoothstep(_size, _size + vec2(0.001), _st);
  uv *= smoothstep(_size, _size + vec2(0.001), vec2(1.0) - _st);
  return uv.x * uv.y;
}

// 2D Random
float random (in vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

// 2D Noise based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);

  // Four corners in 2D of a tile
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));

  // Smooth Interpolation
  // Cubic Hermine Curve.  Same as SmoothStep()
  vec2 u = f*f*(3.0-2.0*f);
  // u = smoothstep(0.,1.,f);

  // Mix 4 coorners percentages
  return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution.xy;

  // Scale the coordinate system to see
  // some noise in action
  vec2 pos = vec2(st * 5.);

  // Use the noise function
  float n = noise(pos);
  n = box(st, vec2(noise(pos + u_time) * 2.));
  n += circle(st, noise(pos + u_time * 2.) * .4);
  // n = step(noise(pos + u_time), length(st - .5));
  gl_FragColor = vec4(vec3(n * .6, .2, .3), 1.0);
}