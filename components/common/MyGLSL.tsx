import React from "react";
import { useRouter } from "next/router";
import contents from "../../assets/data/contents.json";
import {
  Scene,
  OrthographicCamera,
  WebGLRenderer,
  PlaneBufferGeometry,
  RawShaderMaterial,
  Mesh,
  Vector2,
  TextureLoader,
  Clock
} from "three";
// import html2canvas from "html2canvas";

// const handleOnClick = (id: string) => {
//   html2canvas(document.body)
//     .then((canvas) => {
//       const data = canvas.toDataURL();
//       const a = document.createElement("a")
//       a.href = data
//       a.download = `${id}.png`
//       a.click()
//     })
// }

type AnimateParams = {
  scene: Scene;
  camera: OrthographicCamera;
  renderer: WebGLRenderer;
  _uniforms: any;
  clock: Clock
}

const MyGLSL: React.FC<{
  frag: string;
  vert: string;
  uniforms?: {
    u_time?: number;
    u_resolution: Array<number>;
    u_mouse?: Array<number>;
    u_texture?: string;
  };
}> = ({ frag, vert, uniforms }) => {
  const info = {
    id: "",
    img: "",
    desc: "",
  };
  const router = useRouter();
  const id = router.pathname.split("/")[2];
  contents.map((content) => {
    if (content.id === id) {
      info.id = content.id;
      info.desc = content.desc;
    }
  });
  const animate = ({ scene, camera, renderer, _uniforms, clock }: AnimateParams) => {
    requestAnimationFrame(() => animate({ scene, camera, renderer, _uniforms, clock }))
    _uniforms.u_time.value = performance.now() * .001
    renderer.render(scene, camera)
  }
  const onCanvasLoaded = (canvas: HTMLCanvasElement) => {
    if (!canvas) return;
    const scene = new Scene();
    const camera = new OrthographicCamera(-1, 1, 1, -1, 0, -1);
    scene.add(camera);
    const geometry = new PlaneBufferGeometry(2, 2);
    const _uniforms = {
      u_time: {
        type: "f",
        value: 0.0
      },
      u_resolution: {
        type: "v2",
        value:
          uniforms !== undefined
            ? new Vector2(uniforms.u_resolution[0], uniforms.u_resolution[1])
            : new Vector2(),
      },
      u_mouse: {
        type: "v2",
        value:
          uniforms !== undefined && uniforms.u_mouse !== undefined
            ? new Vector2(uniforms.u_mouse[0], uniforms.u_mouse[1])
            : new Vector2(),
      },
      u_texture: {
        type: "t",
        value: new TextureLoader().load(uniforms?.u_texture !== undefined ? uniforms.u_texture : "")
      }
    };
    const material = new RawShaderMaterial({
      uniforms: _uniforms,
      vertexShader: vert,
      fragmentShader: frag,
    });
    const mesh = new Mesh(geometry, material);
    scene.add(mesh);
    const renderer = new WebGLRenderer({ canvas: canvas, antialias: false });
    renderer.setClearColor("#1d1d1d");
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(400, 400);
    renderer.render(scene, camera);
    const clock = new Clock()
    clock.start()
    animate({ scene, camera, renderer, _uniforms, clock });
  };
  return (
    <div className="container">
      <div className="MyGLSLWrap">
        <canvas ref={onCanvasLoaded} />
      </div>
      <div className="MyGLSLInfo">
        <div className="MyGLSLText">{info.id}</div>
        <div className="MyGLSLText">{info.desc}</div>
      </div>
    </div>
  );
};

export default MyGLSL;
