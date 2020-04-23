#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float fn(vec2 st, float w) {
  return 1.0 - step(abs(sin(u_time * 2.0)), distance(sin((st *= sin(u_time) * 0.2) * 18.0), vec2(w + sin(u_time))));
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution;
  float pct = 0.0;
  // 12 x 4 ^ 2　個の円を表示、(1.0, 1.0)方向に移動するアニメーション
  // pct = 1.0 - smoothstep(0.0, 0.4, distance(sin((st + u_time * 0.15) * 72.0), vec2(0.5)));
  // pct += 1.0 - smoothstep(0.0, 0.4, distance(sin((st + u_time * 0.15) * 72.0), vec2(1.5)));

  // 12 x 4 ^ 2　個の円を表示、点滅するアニメーション
  // pct = 1.0 - smoothstep(0.0, 0.4 + abs(sin(u_time)), distance(sin(st * 72.0), vec2(0.5)));
  // pct += 1.0 - smoothstep(0.0, 0.4 + abs(sin(u_time)), distance(sin(st * 72.0), vec2(1.5)));

  // 12 x 4 ^ 2　個の円をマージするアニメーション
  // pct = 1.0 - smoothstep(0.0, 0.4, distance(sin(st * 72.0), vec2(0.5 + abs(sin(u_time)))));
  // pct += 1.0 - smoothstep(0.0, 0.4, distance(sin(st * 72.0), vec2(1.5 + abs(sin(u_time)))));

  // ↑全部合わせたもの、点の数は減らした
  pct = 1.0 - smoothstep(0.0, 0.4 + abs(sin(u_time * 3.0)), distance(sin((st + u_time * 0.15) * 48.0), vec2(0.5 + (sin(u_time)))));
  pct += 1.0 - smoothstep(0.0, 0.4 + abs(sin(u_time * 3.0)), distance(sin((st + u_time * 0.15) * 48.0), vec2(1.5 + (sin(u_time)))));
  vec3 color = vec3(pct);
  gl_FragColor = vec4(color, 1.0);

  // より動きを大きくしたもの
  // gl_FragColor = vec4(fn(st, 1.5) + fn(st, 0.5));

}