#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform float u_time;

vec2 rotate2D (vec2 _st, float _angle) {
  _st -= 0.5;
  _st =  mat2(cos(_angle),-sin(_angle),
              sin(_angle),cos(_angle)) * _st;
  _st += 0.5;
  return _st;
}

vec2 tile (vec2 _st, float _zoom) {
  _st *= _zoom;
  return fract(_st);
}

vec2 rotateTilePattern(vec2 _st){
  //  Scale the coordinate system by 2x2
  _st *= 2.0;

  //  Give each cell an index number
  //  according to its position
  float index = 0.0;
  index += step(1., mod(_st.x,2.0));
  index += step(1., mod(_st.y,2.0))*2.0;
  //      |
  //  2   |   3
  //      |
  //--------------
  //      |
  //  0   |   1
  //      |

  // Make each cell between 0.0 - 1.0
  _st = fract(_st);

  // Rotate each cell according to the index
  if(index == 1.0){
    //  Rotate cell 1 by 90 degrees
    // now 45 degrees
    _st = rotate2D(_st, PI * 0.5);
  } else if(index == 2.0){
    //  Rotate cell 2 by -90 degrees
    _st = rotate2D(_st, PI * -0.5);
  } else if(index == 3.0){
    //  Rotate cell 3 by 180 degrees
    _st = rotate2D(_st, PI);
  }
  return _st;
}

float box(in vec2 _st, vec2 size) {
  size = vec2(0.5) - size * .5;
  vec2 uv = step(size, _st); 
  uv *= step(size, 1. - _st);
  return uv.x * uv.y;
}

void main (void) {
  vec2 st = gl_FragCoord.xy/u_resolution.xy;

  float n = 4.;
  if (mod(u_time, 3.) > 2.) {
    n = 16.;
  } else if (mod(u_time, 3.) > 1. && mod(u_time, 3.) <= 2.) {
    n = 10.;
  }
  vec2 _st = tile(st, n);
  _st = rotateTilePattern(_st);
  st *= n;

  // Make more interesting combinations
  // st = tile(st,2.0);
  // st = rotate2D(st,-PI*u_time*0.25);
  // st = rotateTilePattern(st*2.);
  // st = rotate2D(st,PI*u_time*0.25);

  // step(st.x,st.y) just makes a b&w triangles
  // but you can use whatever design you want.
  vec3 color = vec3(0.0);
  // color
  color = vec3(_st.y * .5, _st.x * .5, _st.x/ _st.y);
  // box
  if (mod(st.y, 3.0) < 1.0 && mod(st.x, 3.0) < 1.0 || mod(st.y, 3.0) > 1.0 && mod(st.x, 3.0) > 1.0) {
    color -= vec3(box(_st, vec2(.5)));
  } else {
    color += vec3(box(_st, vec2(.5)));
  }
  color -= step(_st.x - .5, _st.y - .5);
  gl_FragColor = vec4(color,1.0);
}