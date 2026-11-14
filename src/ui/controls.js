export function bindControls({ renderer, els }) {
  const sync = () => {
    renderer.state.k = Number(els.k.value);
    renderer.state.yaw = Number(els.yaw.value) / 100;
    renderer.render();
    els.stats.textContent = `steps=${renderer.state.steps} k=${renderer.state.k}`;
  };
  els.k.addEventListener('input', sync);
  els.yaw.addEventListener('input', sync);
  els.capture.addEventListener('click', () => {
    renderer.render();
    const a = document.createElement('a');
    a.download = 'sdf-softshadow.png';
    a.href = els.canvas.toDataURL('image/png');
    a.click();
  });
  sync();
}
