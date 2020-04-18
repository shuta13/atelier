import React, { useRef } from "react";
import { Shaders, Node, GLSL } from "gl-react";
import { Surface } from "gl-react-dom";
import contents from "../../assets/data/contents.json";
// import html2canvas from "html2canvas";

const MyGLSL: React.FC<{ id: string; frag: string; vert: string }> = ({
  id,
  frag,
  vert,
}) => {
  const info = {
    id: "",
    img: "",
    desc: "",
  };
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
  // const handleOnClick = () => {
  //   html2canvas(document.body)
  //     .then((canvas) => {
  //       const data = canvas.toDataURL();
  //       const a = document.createElement("a")
  //       a.href = data
  //       a.download = `${id}.png`
  //       a.click()
  //     })
  // }
  return (
    <div className="container">
      <div className="MyGLSLWrap">
        <Surface width={640} height={360}>
          <Node shader={shaders.GLSL} />
        </Surface>
      </div>
      <div className="MyGLSLInfo">
        <p className="MyGLSLText">{info.id}</p>
        <p className="MyGLSLText">{info.desc}</p>
      </div>
    </div>
  );
};

export default MyGLSL;
