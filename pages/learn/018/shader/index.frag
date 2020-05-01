#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform float u_time;

float rand(float _i) {
  return fract(sin(dot(_i, 78.233)) * 43758.5453123);
}

float noise(float x) {
  float i = floor(x);
  float f = fract(x);
  return mix(rand(i), rand(i + 1.), smoothstep(0., 1., f));
}

float plot(in vec2 _st, float pct) {
  return smoothstep(pct - 0.02, pct, _st.y) - smoothstep(pct, pct + 0.02, _st.y);
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  st.y *= 2.;
  st.x *= .5;
  vec2 _st = fract(st);
  vec3 color = vec3(0.0);
  float d = noise(_st.x + u_time);
  float pct = plot(_st, d);
  color = (1.0 - pct) * color + pct * vec3(0.4078, 0.7922, 0.8196);
  gl_FragColor = vec4(vec3(color), 1.0);
}