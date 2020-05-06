#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

#define N 8. * 2.

// Some useful functions
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

//
// Description : GLSL 2D simplex noise function
//      Author : Ian McEwan, Ashima Arts
//  Maintainer : ijm
//     Lastmod : 20110822 (ijm)
//     License :
//  Copyright (C) 2011 Ashima Arts. All rights reserved.
//  Distributed under the MIT License. See LICENSE file.
//  https://github.com/ashima/webgl-noise
//
float snoise(vec2 v) {
  // Precompute values for skewed triangular grid
  const vec4 C = vec4(0.211324865405187,
                      // (3.0-sqrt(3.0))/6.0
                      0.366025403784439,
                      // 0.5*(sqrt(3.0)-1.0)
                      -0.577350269189626,
                      // -1.0 + 2.0 * C.x
                      0.024390243902439);
                      // 1.0 / 41.0

  // First corner (x0)
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);

  // Other two corners (x1, x2)
  vec2 i1 = vec2(0.0);
  i1 = (x0.x > x0.y)? vec2(1.0, 0.0):vec2(0.0, 1.0);
  vec2 x1 = x0.xy + C.xx - i1;
  vec2 x2 = x0.xy + C.zz;

  // Do some permutations to avoid
  // truncation effects in permutation
  i = mod289(i);
  vec3 p = permute(
          permute( i.y + vec3(0.0, i1.y, 1.0))
              + i.x + vec3(0.0, i1.x, 1.0 ));

  vec3 m = max(0.5 - vec3(
                      dot(x0,x0),
                      dot(x1,x1),
                      dot(x2,x2)
                      ), 0.0);

  m = m*m ;
  m = m*m ;

  // Gradients:
  //  41 pts uniformly over a line, mapped onto a diamond
  //  The ring size 17*17 = 289 is close to a multiple
  //      of 41 (41*7 = 287)

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;

  // Normalise gradients implicitly by scaling m
  // Approximation of: m *= inversesqrt(a0*a0 + h*h);
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0+h*h);

  // Compute final noise value at P
  vec3 g = vec3(0.0);
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * vec2(x1.x,x2.x) + h.yz * vec2(x1.y,x2.y);
  return 130.0 * dot(m, g);
}

// refer : https://qiita.com/edo_m18/items/37d8773a5295bc6aba3d

float hexDist(vec2 p) {
  p = abs(p);
  float d = dot(p, normalize(vec2(1., 1.73)));
  return max(d, p.x);
}

// 各六角形の中で座標をつける
vec4 hexCoords(vec2 p) {
  // vec2 r = vec2(length(1.));
  vec2 r = normalize(vec2(1.73, 1.));
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

  // if (mod(u_time, N) < 2.) {
  //   // uv座標の確認
  //   color = vec3(p.x);
  // } else if (mod(u_time, N) < 4. && mod(u_time, N) > 2.) {
  //   // 普通step(しきい値, 値)だが、この場合逆
  //   // 0.2をしきい値にしてるときと原理は一緒
  //   color = vec3(step(p.x, .2));
  // } else if (mod(u_time, N) < 6. && mod(u_time, N) > 4.) {
  //   // 内積部分の確認、1辺1のひし形が表示される
  //   d = dot(p, normalize(vec2(1., 1.)));
  //   color = vec3(step(d, .2));
  // } else if (mod(u_time, N) < 8. && mod(u_time, N) > 6.) {
  //   // 1.73 ≒ √3、1辺が2のひし形が表示される
  //   d = dot(p, normalize(vec2(1., 1.73)));
  //   color = vec3(step(d, .2));
  // } else if (mod(u_time, N) < 10. && mod(u_time, N) > 8.) {
  //   // 1辺2のひし形を、縦0.2でクリップで六角形の完成
  //   d = dot(p, normalize(vec2(1., 1.73)));
  //   d = max(d, p.x);
  //   color = vec3(step(d, .2));
  // } else if (mod(u_time, N) < 12. && mod(u_time, N) > 10.) {
  //   // 六角形のタイリング
  //   // ボロノイ図(https://ja.wikipedia.org/wiki/%E3%83%9C%E3%83%AD%E3%83%8E%E3%82%A4%E5%9B%B3)の計算
  //   p *= 4.;
  //   vec2 r = vec2(length(1.));
  //   // これで六角形を描く
  //   // vec2 r = normalize(vec2(1., 1.73));
  //   vec2 h = r * .5;
  //   vec2 a = mod(p, r) - h;
  //   vec2 b = mod(p - h, r) - h;
  //   color.rg = length(a) < length(b) ? a : b;
  // } else if (mod(u_time, N) < 14. && mod(u_time, N) > 12.) {
  //   p *= 4.;
  //   vec2 r = vec2(length(1.));
  //   // vec2 r = normalize(vec2(1., 1.73));
  //   vec2 h = r * .5;
  //   vec2 a = mod(p, r) - h;
  //   vec2 b = mod(p - h, r) - h;
  //   // タイリングした六角形にIDをふる
  //   vec2 g = length(a) < length(b) ? a : b;
  //   vec2 id = p - g;
  //   color.rg = id * .2;
  // } else {
    // 中心から模様を描く
    p *= 4.;
    vec4 hc = hexCoords(p);
    float wavy = snoise(sin(hc.zw - u_time));
    // float wavy = pow(sin(length(hc.zw) * cos(length(hc.zw)) * .5), 4.) + .1;
    // float wavy = pow(sin(length(hc.zw) - u_time * .5), 4.) + .1;
    // 六角形のフレームを描画
    float c = smoothstep(0., .2, hc.y);
    color = vec3(c * wavy);
  // }
  gl_FragColor = vec4(color, 1.);
}