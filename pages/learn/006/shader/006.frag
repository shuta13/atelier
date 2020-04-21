#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

float drawRect(vec2 st, float size) {
  vec2 bl = step(vec2(0.8 - size), st);
  float pct = bl.x + bl.y;
  vec2 tr = step(vec2(0.8 - size), 1.0 - st);
  return pct *= tr.x + tr.y;
}

// float drawStroke() {
// }

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  vec3 color = vec3(0.0);

  // float left = step(0.1, st.x);
  // float bottom = step(0.1, st.y);
  // color = vec3(left * bottom);

  // // 上の省略形
  // vec2 bl = smoothstep(vec2(0.1), vec2(0.5), st);
  // float pct = bl.x * bl.y;

  // // st座標を反転して同じ処理
  // vec2 tr = smoothstep(vec2(0.1), vec2(0.5), 1.0 - st);
  // pct *= tr.x * tr.y;

  color = vec3(drawRect(st, 0.1));

  gl_FragColor = vec4(color, 1.0);
}