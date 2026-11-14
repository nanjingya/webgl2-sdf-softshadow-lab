import { FULLSCREEN_VERT } from './shaders/fullscreen.vert.js';
import { RAYMARCH_FRAG } from './shaders/raymarch.frag.js';

function compile(gl, type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
  return s;
}

export function createRenderer(canvas) {
  const gl = canvas.getContext('webgl2');
  if (!gl) throw new Error('WebGL2 required');
  const vs = compile(gl, gl.VERTEX_SHADER, FULLSCREEN_VERT);
  const fs = compile(gl, gl.FRAGMENT_SHADER, RAYMARCH_FRAG);
  const prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog));
  const uRes = gl.getUniformLocation(prog, 'uRes');
  const uK = gl.getUniformLocation(prog, 'uK');
  const uLightDir = gl.getUniformLocation(prog, 'uLightDir');
  return {
    gl,
    state: { k: 16, yaw: 0.8, steps: 64 },
    render() {
      const { k, yaw } = this.state;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.useProgram(prog);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uK, k);
      gl.uniform3f(uLightDir, Math.cos(yaw), 0.8, Math.sin(yaw));
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },
  };
}
