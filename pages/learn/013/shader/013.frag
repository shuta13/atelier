#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform float u_time;

float circle (in vec2 _st, in float _radius) {
  vec2 dist = _st - vec2(0.5);
  return 1.0 - smoothstep(_radius - (_radius * 0.01), _radius + (_radius * 0.01), dot(dist, dist) * 4.0);
}

float box(in vec2 _st, in vec2 _size){
    _size = vec2(0.5) - _size * 0.5;
    vec2 uv = smoothstep(_size, _size + vec2(0.001), _st);
    uv *= smoothstep(_size, _size + vec2(0.001), vec2(1.0) - _st);
    return uv.x * uv.y;
}
float cross(in vec2 _st, float _size){
  return box(_st, vec2(_size, _size/4.)) + box(_st, vec2(_size/4., _size));
}

mat2 rotate2d(float _angle){
  return mat2(cos(_angle),-sin(_angle),sin(_angle),cos(_angle));
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  vec3 color = vec3(0.0);
  st *= 3.0;
  st = fract(st);
  // color = vec3(st, 0.0);

  // circle
  // color = vec3(circle(st, 0.5));
  // color -= vec3(circle(st, 0.3));

  // cross
  st -= vec2(0.5);
  st = rotate2d(0.75 * PI) * st;
  st += vec2(0.5);
  color += vec3(cross(st, 0.5));

  gl_FragColor = vec4(color, 1.0);
}