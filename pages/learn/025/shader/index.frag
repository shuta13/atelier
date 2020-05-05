#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

// refer : https://qiita.com/edo_m18/items/37d8773a5295bc6aba3d

void main() {
  vec2 p = (gl_FragCoord.xy * 2. - u_resolution) / min(u_resolution.x, u_resolution.y);
  vec3 color = vec3(0.);

  // 六角形のタイリング
  p *= 4.;
  vec2 r = normalize(vec2(1., 1.73));
  vec2 h = r * .5;
  vec2 a = mod(p, r) - h;
  vec2 b = mod(p - h, r) - h;
  // ボロノイ図(https://ja.wikipedia.org/wiki/%E3%83%9C%E3%83%AD%E3%83%8E%E3%82%A4%E5%9B%B3)の計算
  color.rg = length(a) < length(b) ? a : b;

  // 六角形の表示
  // p = abs(p);
  // float d = dot(p, normalize(vec2(1., 1.73)));
  // d = max(d, p.x);
  // color = vec3(step(d, .2));

  // // 六角形を作る手順
  // // uv座標の確認
  // // color = vec3(p.x);

  // // 普通step(しきい値, 値)だが、この場合逆
  // // 0.2をしきい値にしてるときと原理は一緒
  // // color = vec3(step(p.x, .2));

  // // https://qiita.com/edo_m18/items/37d8773a5295bc6aba3d#%E3%81%A8%E3%81%82%E3%82%8B%E3%83%99%E3%82%AF%E3%83%88%E3%83%AB%E3%81%A8%E3%81%AE%E5%86%85%E7%A9%8D%E3%82%92%E8%B7%9D%E9%9B%A2%E3%81%AB%E7%94%A8%E3%81%84%E3%82%8B
  // // 内積部分の確認、1辺1のひし形が表示される
  // d = dot(p, normalize(vec2(1., 1.)));
  // // 1.73 ≒ √3
  // d = dot(p, normalize(vec2(1., 1.73)));

  // // uv座標の確認の縦線でクリップ
  // d = max(d, p.x);

  // color = vec3(step(d, .2));

  gl_FragColor = vec4(color, 1.);
}