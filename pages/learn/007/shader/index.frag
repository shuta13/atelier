#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float drawSmoothCircle(vec2 st, float t1, float t2, bool isInvert) {
  return isInvert
    ? 1.0 - smoothstep(t1, t2, distance(st, vec2(0.5)))
    : smoothstep(t1, t2, distance(st, vec2(0.5)));

}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution;
  float pct = 0.0;

  // (st.x, st.y)までの距離を(0.5, 0.5)から等しくする
  // pct = distance(st, vec2(0.5));

  // lengthで↑を書き換え
  // vec2 toCenter = vec2(0.5) - st;
  // pct = length(toCenter);

  // sqrtで更に↑を書き換え
  // vec2 tC = vec2(0.5) - st;
  // pct = sqrt(tC.x * tC.x + tC.y * tC.y);

  // 円を四角の中におさめた
  // pct = distance(st * 2.0, vec2(1.0));

  // stepで白黒で塗り分け
  // pct = step(0.5, distance(st, vec2(0.5)));

  // ↑を反転
  // pct = 1.0 - step(0.5, distance(st, vec2(0.5)));

  // smoothstep by func
  // pct = drawSmoothCircle(st, 0.0, 0.5, false);

  // pulse animation
  // pct = step(0.0 + abs(sin(u_time * 1.0)), distance(st, vec2(0.5)));

  // 円を2つ表示
  // 黒
  // pct = smoothstep(0.0, 0.4, distance((st * 2.0), vec2(0.5)));
  // pct *= smoothstep(0.0, 0.4, distance(st * 2.0, vec2(1.5)));
  // 白
  pct = 1.0 - smoothstep(0.0, 0.4, distance(st * 2.0, vec2(0.5)));
  pct += 1.0 - smoothstep(0.0, 0.4, distance(st * 2.0, vec2(1.5)));

  // 複数のディスタンスフィールドの組み合わせを試す
  // 円が2つ
  // pct = distance(st,vec2(0.4)) + distance(st,vec2(0.6));
  // 角の取れた四角?
  // pct = distance(st,vec2(0.4)) * distance(st,vec2(0.6));
  // 円が2つぶつかりあった感じ
  // pct = min(distance(st,vec2(0.4)),distance(st,vec2(0.6)));
  // ↑がもう少し接近した感じ
  // pct = max(distance(st,vec2(0.4)),distance(st,vec2(0.6)));
  // 白と黒、中心から離れるにつれて減衰
  // pct = pow(distance(st,vec2(0.4)),distance(st,vec2(0.6)));

  vec3 color = vec3(pct);
  gl_FragColor = vec4(color, 1.0);
}