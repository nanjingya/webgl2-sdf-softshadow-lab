import { createRenderer } from './renderer.js';
import { bindControls } from './ui/controls.js';
const canvas = document.querySelector('#c');
const els = {
  canvas,
  status: document.querySelector('#status'),
  k: document.querySelector('#k'),
  yaw: document.querySelector('#yaw'),
  capture: document.querySelector('#capture'),
  stats: document.querySelector('#stats'),
};
try {
  const renderer = createRenderer(canvas);
  bindControls({ renderer, els });
  els.status.textContent = 'ready';
} catch (e) {
  els.status.textContent = String(e.message || e);
}
