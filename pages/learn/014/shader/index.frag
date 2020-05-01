#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform float u_time;

mat2 scale(vec2 _scale){
  return mat2(_scale.x,0.0,0.0,_scale.y);
}

vec2 rotate2D(vec2 _st, float _angle){
  _st -= 0.5;
  _st =  mat2(cos(_angle),-sin(_angle),sin(_angle),cos(_angle)) * _st;
  _st += 0.5;
  return _st;
}

vec2 tile(vec2 _st, float _zoom){
  _st *= _zoom;
  return fract(_st);
}

float box(vec2 _st, vec2 _size){
  _size = vec2(0.5)- _size * 0.5;
  vec2 uv = step(_size, _st);
  uv *= step(_size, vec2(1.0)-_st);
  return uv.x*uv.y;
}

float cross(in vec2 _st, float _size) {
  return box(_st, vec2(_size, _size/16.)) + box(_st, vec2(_size/16., _size));
}

void main(void){
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  vec4 color = vec4(vec3(0.0), 1.);

  // Divide the space in 4
  st = tile(st, 3.);

  // Use a matrix to rotate the space 45 degrees
  // st = rotate2D(st, sin(u_time) * PI * 0.25) * scale(vec2(sin(u_time * 0.25) + 1.0));

  // Draw a square
  color = vec4(vec3(box(st,vec2(1.0)) * 0.75, .75, .0), 1.);
  color -= vec4(vec3(box(st,vec2(.9)) * 0.35, .8, .5), .5);
  color -= vec4(vec3(box(st,vec2(.8)) * 0.35, 1., .5), .5);
  color -= vec4(vec3(box(st,vec2(.7)) * 0.35, .0, .5), .35);
  color += vec4(cross(st, 1.0) * 0.75, .0, .0, .5);
  // color = vec3(st,0.0);
  
  gl_FragColor = vec4(color);
}