import React from "react";
import dynamic from "next/dynamic";

const MyGLSL = dynamic(() => import("../../../components/common/MyGLSL"), {
  ssr: false,
});

const frag = require("./shader/frag.glsl");

const _001: React.FC = () => {
  return <MyGLSL id="001" frag={frag.default} vert="" />;
};

export default _001;
