#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform float u_time;

float draw(vec2 _st, int N, float a, float r) {
  float d = cos(floor(0.5 + a / r) * r - a) * length(max(abs(_st), 0.35));
  return 1.0 - smoothstep(0.4, 0.41, d);
  // return d;
}

float circle(in vec2 _st, in float _radius){
  vec2 dist = _st;
	return smoothstep(_radius-(_radius*0.01), _radius+(_radius*0.01), dot(dist,dist)*4.0);
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  st.x *= u_resolution.x / u_resolution.y;
  vec3 color = vec3(0.0);

  st = st * 2.0 - 1.0;

  int N = 4;
  float a = atan(st.x, st.y) + TWO_PI;
  // float a = atan(st.x, st.y) + PI;
  // float a = atan(st.x, st.y + sin(u_time)) + PI;
  float r = TWO_PI / float(N);

  color = vec3(circle(st, 0.4));
  color -= vec3(circle(st, 1.0));
  color -= vec3(circle(st, 1.0));
  color += vec3(draw(st, N, a + u_time, r));

  gl_FragColor = vec4(color, 1.0);
}