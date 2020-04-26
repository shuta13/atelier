#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float circle (in vec2 _st, in float _radius) {
  vec2 dist = _st - vec2(0.5);
  return 1.0 - smoothstep(_radius - (_radius * 0.01), _radius + (_radius * 0.01), dot(dist, dist) * 4.0);
}

float plot(vec2 st, float pct) {
  return smoothstep(pct - 0.01, pct, st.y) - smoothstep(pct, pct + 0.01, st.y);
  // return smoothstep(-0.5, 1.0, cos(a * 10.0 + u_time)) * 0.2 + 0.5
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  vec3 color = vec3(0.0);

  vec2 pos = vec2(0.5) - st;
  float r = length(pos) * 2.0;
  float a = atan(pos.y, pos.x);

  float f = cos(a * 3.0);
  // 回転させる
  // f = cos(a * 3.0 + u_time);
  // f = abs(cos(a * 3.0));
  // f = abs(cos(a * 2.5)) * 0.5 + 0.3;
  // f = abs(cos(a * 12.0) * sin(a * 3.0)) * 0.8 + 0.1;
  f = smoothstep(-0.5, 1.0, cos(a * 10.0 + u_time)) * 0.2 + 0.4;

  color = vec3(1.0 - smoothstep(f, f + 0.02, r));
  color -= vec3(circle(st, 0.1));

  gl_FragColor = vec4(color, 1.0);
}