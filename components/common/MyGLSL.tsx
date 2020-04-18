import React, { useRef } from "react";
import { useRouter } from "next/router";
import { Shaders, Node, GLSL } from "gl-react";
import { Surface } from "gl-react-dom";
import contents from "../../assets/data/contents.json";
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

const MyGLSL: React.FC<{ frag: string; vert: string; uniforms?: object }> = ({
  frag,
  vert,
  uniforms,
}) => {
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
      info.img = content.img;
      info.desc = content.desc;
    }
  });
  const shaders = Shaders.create({
    GLSL: {
      frag: GLSL`${frag}`,
      vert: GLSL`${vert}`,
    },
  });
  return (
    <div className="container">
      <div className="MyGLSLWrap">
        <Surface width={400} height={400}>
          <Node shader={shaders.GLSL} uniforms={uniforms} />
        </Surface>
      </div>
      <div className="MyGLSLInfo">
        <div className="MyGLSLText">{info.id}</div>
        <div className="MyGLSLText">{info.desc}</div>
      </div>
    </div>
  );
};

export default MyGLSL;
