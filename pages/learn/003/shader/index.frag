#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plot(vec2 st, float pct) {
  // y軸方向の差分で線を表示している
  return smoothstep(pct - 0.02, pct, st.y) - smoothstep(pct, pct + 0.02, st.y);
}

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution;
  // 線形補間(任意の1次関数)
  float y = 1.0 - pow(max(0.0, abs(st.x) * 2.0 - 1.0), 1.5);

  // step関数
  // float y = step(0.5, st.x);

  // smoothstep
  // 普通
  // float y = smoothstep(0.1, 0.9, st.x);
  // x軸方向の差分を表示
  // float y = smoothstep(0.2, 0.5, st.x) - smoothstep(0.5, 0.8, st.x);

  vec3 color = vec3(y);

  float pct = plot(st, y);
  color = (1.0 - pct) * color + pct * vec3(0.0, 1.0, 0.0);
  gl_FragColor = vec4(color, 1.0);
}