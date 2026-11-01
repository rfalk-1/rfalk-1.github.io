(() => {
  'use strict';
  const video = document.querySelector('#wallpaper-video');
  const motion = document.querySelector('#motion-toggle');
  const motionLabel = document.querySelector('#motion-label');
  const motionIcon = document.querySelector('#motion-icon');
  const scene = document.querySelector('#scene-toggle');
  const sceneLabel = document.querySelector('#scene-label');
  const ui = document.querySelector('#site-ui');
  const status = document.querySelector('#playback-status');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let wantsMotion = !reducedMotion.matches && !navigator.connection?.saveData;
  let sceneMode = false;
  let preference = null;
  try { preference = localStorage.getItem('rfalk-motion'); } catch {}
  if (preference === 'paused') wantsMotion = false;
  document.querySelector('#year').textContent = new Date().getFullYear();
  document.querySelector('.scene-controls').hidden = false;
  function syncMotion() {
    const playing = !video.paused && !video.ended;
    motion.setAttribute('aria-pressed', String(playing));
    motion.setAttribute('aria-label', playing ? '暂停动态背景' : '播放动态背景');
    motionLabel.textContent = playing ? '暂停背景' : '播放背景';
    motionIcon.textContent = playing ? 'Ⅱ' : '▷';
  }
  async function play() {
    if (!video.getAttribute('src')) video.src = video.dataset.src;
    try { await video.play(); } catch { syncMotion(); }
  }
  video.addEventListener('play', syncMotion);
  video.addEventListener('pause', syncMotion);
  video.addEventListener('error', () => {
    wantsMotion = false;
    video.pause();
    video.style.opacity = '0';
    motion.disabled = true;
    motionLabel.textContent = '静态背景';
    motion.setAttribute('aria-label', '视频暂时无法播放，已显示静态背景');
    status.textContent = '动态背景暂时无法加载，已保留静态壁纸。';
  });
  motion.addEventListener('click', () => {
    wantsMotion = video.paused;
    if (wantsMotion) play(); else video.pause();
    try { localStorage.setItem('rfalk-motion', wantsMotion ? 'playing' : 'paused'); } catch {}
  });
  function setScene(enabled) {
    sceneMode = enabled;
    document.body.classList.toggle('scene-mode', enabled);
    ui.inert = enabled;
    ui.setAttribute('aria-hidden', String(enabled));
    scene.setAttribute('aria-pressed', String(enabled));
    scene.setAttribute('aria-label', enabled ? '返回主页内容' : '隐藏页面内容，欣赏壁纸');
    sceneLabel.textContent = enabled ? '返回主页' : '欣赏壁纸';
  }
  scene.addEventListener('click', () => setScene(!sceneMode));
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && sceneMode) { setScene(false); scene.focus(); } });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) video.pause(); else if (wantsMotion) play();
  });
  reducedMotion.addEventListener('change', event => {
    if (event.matches) { wantsMotion = false; video.pause(); }
  });
  if (wantsMotion) play();
})();
