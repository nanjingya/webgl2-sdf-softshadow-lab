export const RAYMARCH_FRAG = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 outColor;
uniform vec2 uRes;
uniform float uK;
uniform vec3 uLightDir;
// stub fragment — model should flesh out SDF soft shadow
void main(){
  outColor = vec4(vUv, uK / 64.0, 1.0);
}`;
