import React from "react"
import dynamic from "next/dynamic";

const MyGLSL = dynamic(
  () => import("../../../components/common/MyGLSL"),
  { ssr: false }
)

const frag = require("./shader/frag.glsl");

const _001: React.FC = () => {
  return (
    <div className="container">
      <MyGLSL frag={frag.default} vert="" />
    </div>
  );
};

export default _001;
