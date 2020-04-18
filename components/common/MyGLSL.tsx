import React from "react";
import { Shaders, Node, GLSL } from "gl-react";
import { Surface } from "gl-react-dom";
import contents from "../../assets/data/contents.json";

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
  return (
    <div className="container">
      <Surface width={640} height={360}>
        <Node shader={shaders.GLSL} />
      </Surface>
      <div className="MyGLSLInfo">
        <p>{info.id}</p>
        <p>{info.desc}</p>
      </div>
    </div>
  );
};

export default MyGLSL;
