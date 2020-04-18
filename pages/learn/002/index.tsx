import React from "react";
import MyGLSL from "../../../components/common/MyGLSL"

const frag = require("./shader/frag.glsl");

const _002: React.FC = () => {
  return <MyGLSL frag={frag.default} vert="" />;
};

export default _002;
