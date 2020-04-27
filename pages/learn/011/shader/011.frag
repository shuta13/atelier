#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform float u_time;

float draw(vec2 _st, int N, float a, float r) {
  float d = cos(floor(0.5 + a / r) * r - a) * length(_st);
  return 1.0 - smoothstep(0.4, 0.41, d);
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  st.x *= u_resolution.x / u_resolution.y;
  vec3 color = vec3(0.0);

  st = st * 2.0 - 1.0;

  int N = 3;
  float a = atan(st.x, st.y) + PI;
  float r = TWO_PI / float(N);

  color = vec3(draw(st, N, a, r));

  gl_FragColor = vec4(color, 1.0);
}