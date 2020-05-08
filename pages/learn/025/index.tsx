import React, { useEffect, useState, useCallback, useRef } from "react";
import MyGLSL from "../../../components/common/MyGLSL";

const frag = require("./shader/index.frag");
const vert = require("./shader/index.vert");

const _025: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: MouseEvent) => {
    setMousePosition({ x: e.clientX - 400, y: e.clientY + 200 });
  };
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  });
  return (
    <MyGLSL
      frag={frag.default}
      vert={vert.default}
      uniforms={{
        u_mouse: [mousePosition.x, mousePosition.y],
      }}
    />
  );
};

export default _025;
