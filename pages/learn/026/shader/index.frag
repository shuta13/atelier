#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform sampler2D u_texture;

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  vec4 color = vec4(1.);
  color = texture2D(u_texture, st); // vec4(0.0)っぽい
  gl_FragColor = color;
}