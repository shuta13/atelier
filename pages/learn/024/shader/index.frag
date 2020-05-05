#ifdef GL_ES
precision mediump float;
#endif


#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

// refer : https://wgld.org/d/glsl/g013.html
#define SPHERE_SIZE 1.
#define LIGHT_DIR vec3(-.577, .577, .577)
#define ANGLE 60.
#define FOV ANGLE * .5 * PI / 180.

vec3 trans(vec3 p) {
  float v = 4.;
  // return -v/2 ~ v/2 clamped value
  return mod(p, v) - v / 2.;
}

// オブジェクトの形状を決める
float distanceFunc(vec3 p) {
  // 六面体
  vec3 q = abs(trans(p));
  return length(max(q - vec3(0.5, 0.5, 0.5), .0)) - .1;
  // 球
  // return length(trans(p)) - SPHERE_SIZE;
}

vec3 getNormal(vec3 p) {
  float d = .0001;
  return normalize(vec3(
    distanceFunc(p + vec3(d, .0, .0)) - distanceFunc(p + vec3(-d, .0, .0)),
    distanceFunc(p + vec3(.0, d, .0)) - distanceFunc(p + vec3(.0, -d, .0)),
    distanceFunc(p + vec3(.0, .0, d)) - distanceFunc(p + vec3(.0, .0, -d))
  ));
}

void main() {
  // -1. ~ 1. fragment position
  vec2 p = (gl_FragCoord.xy * 2. - u_resolution) / min(u_resolution.x, u_resolution.y);

  // camera
  vec3 camPos = vec3(0., 0., 2. - u_time * 2.); // カメラの位置
  vec3 camDir = vec3(0., 0., -1.); // カメラの向き
  vec3 camUp = vec3(0., 1., 0.); // カメラの上方向
  vec3 camSide = cross(camDir, camUp); // 外積でカメラの横方向を算出
  float targetDepth = 1.; // フォーカスの深度

  // ray
  // vec3 ray = normalize(camSide * p.x + camUp * p.y + camDir * targetDepth);
  vec3 ray = normalize(vec3(sin(FOV) * p.x, sin(FOV) * p.y, -cos(FOV)));

  // marching loop
  float distance = 0.; // レイとオブジェクト間の最短距離
  float rayLen = 0.; // レイに継ぎ足す長さ
  vec3 rayPos = camPos; // レイの先端位置
  for (int i = 0; i < 64; i++) {
    distance = distanceFunc(rayPos);
    rayLen += distance;
    rayPos = camPos + ray * rayLen;
  }

  // hit check
  if (abs(distance) < .001) {
    vec3 normal = getNormal(rayPos);
    float diff = clamp(dot(LIGHT_DIR, normal), .1, 1.);
    gl_FragColor = vec4(vec3(.1, .3, diff), 1.);
  } else {
    gl_FragColor = vec4(vec3(0.), 1.);
  }
}