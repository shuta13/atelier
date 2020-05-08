#ifdef GL_ES
precision highp float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform float u_time;

vec3 colorA = vec3(0.1412, 0.2196, 0.9137);
vec3 colorB = vec3(1.0, 0.7529, 0.2235);

float plot(vec2 st, float pct) {
  return smoothstep(pct - 0.01, pct, st.y) - smoothstep(pct, pct + 0.01, st.y);
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  // vec2 st = gl_FragCoord.xy / u_resolution.xy * sin(u_time);
  vec3 color = vec3(0.0);

  vec3 pct = vec3(st.x);
  pct.r = smoothstep(0.0, 0.3, st.x);
  pct.g = smoothstep(0.3, 0.6, st.x);
  pct.b = smoothstep(0.6, 1.0, st.x);

  // color = step(0.5, pct);
  color = mix(colorA, colorB, pct);

  // 各rgbのmixのグラフ
  color = mix(color, vec3(1.0, 0.0, 0.0), plot(st, pct.r));
  color = mix(color, vec3(0.0, 1.0, 0.0), plot(st, pct.g));
  color = mix(color, vec3(0.0, 0.0, 1.0), plot(st, pct.b));

  gl_FragColor = vec4(color, 1.0);
}