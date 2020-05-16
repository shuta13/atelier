import React, { useEffect, useState, useCallback, useRef } from "react";
import MyGLSL from "../../../components/common/MyGLSL";

const frag = require("./shader/index.frag");
const vert = require("./shader/index.vert");

const uTexture = require("../../../assets/image/icon-mono.png");

const _027: React.FC = () => {
  return (
    <MyGLSL
      frag={frag.default}
      vert={vert.default}
      uniforms={{
        u_texture: uTexture,
      }}
    />
  );
};

export default _027;
