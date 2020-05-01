import React, { useEffect, useState, useCallback, useRef } from "react";
import MyGLSL from "../../../components/common/MyGLSL";

const frag = require("./shader/020.frag");

const _020: React.FC = () => {
  const [uTime, setUTime] = useState(0.0);
  const requestRef = useRef(0.0);
  const animate = useCallback(() => {
    setUTime(performance.now() * 0.001)
    requestRef.current = requestAnimationFrame(animate)
  }, [])
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(requestRef.current)
  }, [animate])
  return <MyGLSL frag={frag.default} vert="" uniforms={{ 
    u_resolution: [400, 400],
    // u_mouse: [x, y],
    u_time: uTime
  }} />;
};

export default _020;
