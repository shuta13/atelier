#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform float u_time;

// ----------------

// vec2 skew (vec2 st) {
//   vec2 r = vec2(0.0);
//   r.x = 1.1547*st.x;
//   r.y = st.y+0.5*r.x;
//   return r;
// }

// vec3 simplexGrid (vec2 st) {
//   vec3 xyz = vec3(0.0);

//   vec2 p = fract(skew(st));
//   if (p.x > p.y) {
//       xyz.xy = 1.0-vec2(p.x,p.y-p.x);
//       xyz.z = p.y;
//   } else {
//       xyz.yz = 1.0-vec2(p.x-p.y,p.y);
//       xyz.x = p.x;
//   }

//   return fract(xyz);
// }

// void main() {
//   vec2 st = gl_FragCoord.xy/u_resolution.xy;
//   vec3 color = vec3(0.0);

//   // Scale the space to see the grid
//   st *= 10.;

//   // Show the 2D grid
//   color.rg = fract(st);

//   // Skew the 2D grid
//   color.rg = fract(skew(st));

//   // Subdivide the grid into to equilateral triangles
//   color = simplexGrid(st);

//   gl_FragColor = vec4(color,1.0);
// }

// ----------------

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

mat2 rotate2d(float angle){
    return mat2(cos(angle),-sin(angle),
                sin(angle),cos(angle));
}

float lines(in vec2 pos, float b){
    float scale = 10.0;
    pos *= scale;
    return smoothstep(0.0,
                    .5+b*.5,
                    abs((sin(pos.x*3.1415)+b*2.0))*.5);
}

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  st.x *= u_resolution.x/u_resolution.y;

  st *= .5;
  vec2 pos = st.yx * vec2(1., 2.);
  float pattern = pos.x;
  pos = rotate2d(snoise(pos) + u_time * .2) * pos;
  pattern = lines(pos, .5);

  // Scale the space in order to see the function

  // color = vec3(snoise(st)*.5+.5);
  vec3 color = vec3(0.0);
  // color += vec3((1. - pattern) * .8);
  color -= vec3(mod(pattern, .9), mod(pattern, .5), mod(pattern, .2));
  color += vec3(pattern * .5);

  gl_FragColor = vec4(color, 1.0);
}