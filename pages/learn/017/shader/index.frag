#ifdef GL_ES
precision highp float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform float u_time;

float random (vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution.xy;

  st.x *= random(st) * 1.5;
  st.y *= 10.0; // Scale the coordinate system by 10

  st.x += u_time;

  vec2 ipos = floor(st);  // get the integer coords
  vec2 fpos = fract(st);  // get the fractional coords

  // Assign a random value based on the integer coord
  vec3 color = vec3(random( ipos ) * 1.2);

  // Uncomment to see the subdivided grid
  // color = vec3(fpos,0.0);

  gl_FragColor = vec4(color,1.0);
}