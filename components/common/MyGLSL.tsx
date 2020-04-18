import React from "react"
import { Shaders, Node, ShaderIdentifier, ShaderDefinition, GLSL } from "gl-react";
import { Surface } from "gl-react-dom";

type MyGLSLParams = string

const MyGLSL: React.FC<{ frag: MyGLSLParams, vert: MyGLSLParams }> = ({ frag, vert }) => {
  const shaders = Shaders.create({
    GLSL: {
      frag: GLSL`${frag}`,
      vert: GLSL`${vert}`
    }
  })
  return (
    <Surface width={640} height={360}>
      <Node shader={shaders.GLSL} />
    </Surface>
  )
}

export default MyGLSL;