#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

#define N 8. * 2.

// refer : https://qiita.com/edo_m18/items/37d8773a5295bc6aba3d

float hexDist(vec2 p) {
  p = abs(p);
  float d = dot(p, normalize(vec2(1., 1.73)));
  return max(d, p.x);
}

// 各六角形の中で座標をつける
vec4 hexCoords(vec2 p) {
  vec2 r = normalize(vec2(1., 1.73));
  vec2 h = r * .5;
  vec2 a = mod(p, r) - h;
  vec2 b = mod(p - h, r) - h;

  vec2 g = length(a) < length(b) ? a : b;
  vec2 id = p - g;
  float x = atan(g.x, g.y);
  float y = .5 - hexDist(g);

  return vec4(x, y, id);
}

void main() {
  vec2 p = (gl_FragCoord.xy * 2. - u_resolution) / min(u_resolution.x, u_resolution.y);
  vec3 color = vec3(0.);
  p = abs(p);
  float d;

  if (mod(u_time, N) < 2.) {
    // uv座標の確認
    color = vec3(p.x);
  } else if (mod(u_time, N) < 4. && mod(u_time, N) > 2.) {
    // 普通step(しきい値, 値)だが、この場合逆
    // 0.2をしきい値にしてるときと原理は一緒
    color = vec3(step(p.x, .2));
  } else if (mod(u_time, N) < 6. && mod(u_time, N) > 4.) {
    // 内積部分の確認、1辺1のひし形が表示される
    d = dot(p, normalize(vec2(1., 1.)));
    color = vec3(step(d, .2));
  } else if (mod(u_time, N) < 8. && mod(u_time, N) > 6.) {
    // 1.73 ≒ √3、1辺が2のひし形が表示される
    d = dot(p, normalize(vec2(1., 1.73)));
    color = vec3(step(d, .2));
  } else if (mod(u_time, N) < 10. && mod(u_time, N) > 8.) {
    // 1辺2のひし形を、縦0.2でクリップで六角形の完成
    d = dot(p, normalize(vec2(1., 1.73)));
    d = max(d, p.x);
    color = vec3(step(d, .2));
  } else if (mod(u_time, N) < 12. && mod(u_time, N) > 10.) {
    // 六角形のタイリング
    // ボロノイ図(https://ja.wikipedia.org/wiki/%E3%83%9C%E3%83%AD%E3%83%8E%E3%82%A4%E5%9B%B3)の計算
    p *= 4.;
    vec2 r = normalize(vec2(1., 1.73));
    vec2 h = r * .5;
    vec2 a = mod(p, r) - h;
    vec2 b = mod(p - h, r) - h;
    color.rg = length(a) < length(b) ? a : b;
  } else if (mod(u_time, N) < 14. && mod(u_time, N) > 12.) {
    p *= 4.;
    vec2 r = normalize(vec2(1., 1.73));
    vec2 h = r * .5;
    vec2 a = mod(p, r) - h;
    vec2 b = mod(p - h, r) - h;
    // タイリングした六角形にIDをふる
    vec2 g = length(a) < length(b) ? a : b;
    vec2 id = p - g;
    color.rg = id * .2;
  } else {
    // 中心から模様を描く
    p *= 4.;
    vec4 hc = hexCoords(p);
    float wavy = pow(sin(length(hc.zw) * cos(length(hc.zw)) * .5), 4.) + .1;
    // float wavy = pow(sin(length(hc.zw) - u_time * .5), 4.) + .1;
    // 六角形のフレームを描画
    float c = smoothstep(0., .2, hc.y);
    color = vec3(c * wavy);
  }
  gl_FragColor = vec4(color, 1.);
}