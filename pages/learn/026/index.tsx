import React, { useEffect, useState, useCallback, useRef } from "react";
import MyGLSL from "../../../components/common/MyGLSL";

const frag = require("./shader/index.frag");
const vert = require("./shader/index.vert");

const uTexture = require("../../../assets/image/drink.jpg")

const _026: React.FC = () => {
  // const [uTime, setUTime] = useState(0.0);
  // const requestRef = useRef(0.0);
  // const animate = useCallback(() => {
  //   setUTime(performance.now() * 0.001);
  //   requestRef.current = requestAnimationFrame(animate);
  // }, []);
  // useEffect(() => {
  //   requestRef.current = requestAnimationFrame(animate);
  //   return () => cancelAnimationFrame(requestRef.current);
  // }, [animate]);
  // const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  // const handleMouseMove = (e: MouseEvent) => {
  //   setMousePosition({ x: e.clientX - 400, y: e.clientY + 200 });
  // };
  // useEffect(() => {
  //   window.addEventListener("mousemove", handleMouseMove);
  //   return () => window.removeEventListener("mousemove", handleMouseMove);
  // });
  return (
    <MyGLSL
      frag={frag.default}
      vert={vert.default}
      uniforms={{
        u_resolution: [800, 800],
        // u_mouse: [mousePosition.x, mousePosition.y],
        u_texture: uTexture
      }}
    />
  );
};

export default _026;
