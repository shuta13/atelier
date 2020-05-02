#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform float u_time;

vec2 random2(vec2 st){
  st = vec2( dot(st,vec2(127.1,311.7)),
            dot(st,vec2(269.5,183.3)) );
  return -1.0 + 2.0*fract(sin(st)*43758.5453123);
}

// Gradient Noise by Inigo Quilez - iq/2013
// https://www.shadertoy.com/view/XdXGW8
float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  vec2 u = f*f*(3.0-2.0*f);
  return mix( mix( dot( random2(i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ),
                   dot( random2(i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
              mix( dot( random2(i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ),
                   dot( random2(i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
}

mat2 scale(vec2 _scale){
  return mat2(_scale.x,0.0,0.0,_scale.y);
}

mat2 rotate2d(float _angle){
  return mat2(cos(_angle),-sin(_angle),sin(_angle),cos(_angle));
}

float box(in vec2 _st, in vec2 _size){
    _size = vec2(0.5) - _size * 0.5;
    vec2 uv = smoothstep(_size, _size + vec2(0.001), _st);
    uv *= smoothstep(_size, _size + vec2(0.001), vec2(1.0) - _st);
    return uv.x * uv.y;
}

float cross(in vec2 _st, float _size){
  return box(_st, vec2(_size, _size/4.)) + box(_st, vec2(_size/4., _size));
}

void main(){
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  vec3 color = vec3(0.0);

  if (mod(u_time, 8.) > 4.) {
    st -= vec2(0.5);
    st = rotate2d(sin(u_time * noise(st)) * PI) * scale(vec2(sin(u_time) + 1.0)) * st;
    st += vec2(0.5);
  } else {
    st -= vec2(0.5);
    st = rotate2d(sin(u_time) * PI) * scale(vec2(sin(u_time) + 1.0  * noise(st))) * st;
    st += vec2(0.5);
  }

  // To move the cross we move the space
  // vec2 translate = vec2(cos(u_time), sin(u_time));
  vec2 translate = vec2(max(cos(u_time), sin(u_time)), min(cos(u_time), sin(u_time)));
  st += translate * 0.15;

  // Show the coordinates of the space on the background
  // color = vec3(st.x, st.y, 0.0);

  // Add the shape on the foreground
  color += vec3(cross(st, 0.25));
  gl_FragColor = vec4(color, 1.0);
}

// 図形の変形
// mat2 rotate2d(float _angle){
//     return mat2(cos(_angle),-sin(_angle),
//                 sin(_angle),cos(_angle));
// }

// float shape(vec2 st, float radius) {
// 	st = vec2(0.5)-st;
//   float r = length(st)*2.0;
//   float a = atan(st.y,st.x);
//   float m = abs(mod(a+u_time*2.,3.14*2.)-3.14)/3.6;
//   float f = radius;
//   m += noise(st+u_time*0.1)*.5;
//   // a *= 1.+abs(atan(u_time*0.2))*.1;
//   // a *= 1.+noise(st+u_time*0.1)*0.1;
//   f += sin(a*50.)*noise(st+u_time*.2)*.1;
//   f += (sin(a*20.)*.1*pow(m,2.));
//   return 1.-smoothstep(f,f+0.007,r);
// }

// float shapeBorder(vec2 st, float radius, float width) {
//   return shape(st,radius)-shape(st,radius-width);
// }

// void main() {
// 	vec2 st = gl_FragCoord.xy/u_resolution.xy;
// 	vec3 color = vec3(1.0) * shapeBorder(st,0.8,0.02);

// 	gl_FragColor = vec4( 1.-color, 1.0 );
// }

// 木目模様
// mat2 rotate2d(float angle){
//   return mat2(cos(angle),-sin(angle),
//               sin(angle),cos(angle));
// }

// float lines(in vec2 pos, float b){
//   float scale = 10.0;
//   pos *= scale;
//   return 
//     smoothstep(
//       0.0, .5 + b * .5, 
//       abs((sin(pos.x * PI)+b*2.0))*.5
//     );
// }

// void main() {
//   vec2 st = gl_FragCoord.xy/u_resolution.xy;
//   st.y *= u_resolution.y/u_resolution.x;
//   vec2 pos = st.yx * vec2(10.,3.);
//   float pattern = pos.x;

//   // Add noise
//   pos = rotate2d( noise(pos + u_time) ) * pos;

//   // Draw lines
//   pattern = lines(pos,.5);
//   gl_FragColor = vec4(vec3(pattern) ,1.0);
// }

// 大理石模様
// void main() {
//   vec2 st = gl_FragCoord.xy/u_resolution.xy;
//   st.x *= u_resolution.x/u_resolution.y;
//   vec3 color = vec3(0.0);
//   float t = 1.;
//   st += noise(st * 2.) * t;
//   // color = vec3( noise(pos)*.5+.5 );
//   color = vec3(1.) * smoothstep(.18, .2, noise(st));
//   color += smoothstep(.15, .2, noise(st * 10.));
//   color -= smoothstep(.35, .4, noise(st * 10.));
//   gl_FragColor = vec4(1. - color,1.0);
// }