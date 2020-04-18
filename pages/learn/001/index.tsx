import React from "react";
import MyGLSL from "../../../components/common/MyGLSL"

const frag = require("./shader/frag.glsl");

const _001: React.FC = () => {
  return <MyGLSL id="001" frag={frag.default} vert="" />;
};

export default _001;
