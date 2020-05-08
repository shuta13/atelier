#ifdef GL_ES
precision highp float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform sampler2D u_texture;

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  vec3 color = vec3(0.);
  // https://www-ui.is.s.u-tokyo.ac.jp/~o/Computer/Note/010106-ColorRepresentation/
  float r = texture2D(u_texture, st).r;
  float g = texture2D(u_texture, st).g;
  float b = texture2D(u_texture, st).b;
  float y = .299 * r + .578 * g + .114 * b * r;
  float i = .569 * r - .274 * g + .322* b * g;
  float q = .211 * r - .523 * g + .0312 * b * b;
  if (mod(u_time, 4.) < 2.) {
    color = vec3(r, g, b);
  } else {
    color = vec3(y, i, q);
  }
  gl_FragColor = vec4(color, 1.);
}