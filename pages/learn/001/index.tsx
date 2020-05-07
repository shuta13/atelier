import React from "react";
import MyGLSL from "../../../components/common/MyGLSL";

const frag = require("./shader/index.frag");
const vert = require("./shader/index.vert");

const _001: React.FC = () => {
  return (
    <MyGLSL
      frag={frag.default}
      vert={vert.default}
      uniforms={{
        u_resolution: [800, 800],
        // u_mouse: [x, y],
        // u_time: 1.0,
      }}
    />
  );
};

export default _001;
