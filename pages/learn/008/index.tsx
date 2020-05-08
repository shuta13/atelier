import React, { useEffect, useState, useCallback, useRef } from "react";
import MyGLSL from "../../../components/common/MyGLSL";

const frag = require("./shader/index.frag");
const vert = require("./shader/index.vert");

const _008: React.FC = () => {
  return <MyGLSL frag={frag.default} vert={vert.default} uniforms={{}} />;
};

export default _008;
