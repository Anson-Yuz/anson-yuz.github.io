/* ============================================================
   演示视频：懒播放 + 控制
   - preload="metadata"：封面立即可见、尺寸正确，视频数据到「播放」才下载
   - 进入视口才播放，离开/页面隐藏暂停；同一时间只播一个
   - 触屏与 prefers-reduced-motion：不自动播放，由用户点按钮播放
   - 播放失败保留封面；每个视频有播放/暂停按钮
   暴露：window.PortfolioVideo = { markup, init }
   ============================================================ */
(function () {
  "use strict";
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarse = matchMedia('(pointer: coarse)').matches;
  const autoOK = !RM && !coarse;            // 仅桌面精确指针且未要求减弱动效时自动播放
  let active = null;                          // 当前播放的容器，保证同时只播一个

  function vtag(o, cls) {
    const poster = o.image ? ` poster="${o.image}"` : '';
    const c = cls ? ` class="${cls}"` : '';
    // 不设 src，仅 data-src + preload=none：封面立即显示并按封面尺寸布局，视频数据到「播放」才下载
    return `<video${c} data-src="${o.video}" muted loop playsinline preload="none"${poster} aria-label="${o.title} 实机演示"></video>`;
  }
  function loadSrc(v) { if (v && !v.getAttribute('src') && v.dataset.src) v.src = v.dataset.src; }
  function btn(o) {
    return `<button class="vbtn" type="button" aria-label="播放或暂停 ${o.title} 演示" aria-pressed="false"></button>`;
  }
  // 生成媒体容器：portrait → 手机样机框；否则 → 横向截图框。cls 可附加 para 等类。
  function markup(o) {
    const cls = o.cls ? ' ' + o.cls : '';
    if (o.portrait) return `<div class="phone vbox paused${cls}" data-vid>${vtag(o, '')}${btn(o)}</div>`;
    return `<div class="shotbox vbox paused${cls}" data-vid>${vtag(o, 'shot')}${btn(o)}</div>`;
  }

  function setPressed(box, on) { const b = box.querySelector('.vbtn'); if (b) b.setAttribute('aria-pressed', on ? 'true' : 'false'); }
  function pause(box) {
    const v = box.querySelector('video');
    try { v.pause(); } catch (e) { /* noop */ }
    box.classList.add('paused'); setPressed(box, false);
    if (active === box) active = null;
  }
  function play(box) {
    if (active && active !== box) pause(active);
    active = box;
    box.classList.remove('paused'); setPressed(box, true);
    const v = box.querySelector('video');
    loadSrc(v);
    const p = v.play();
    if (p && p.catch) p.catch(function () {           // 自动播放被拦截：保留封面、复位状态
      box.classList.add('paused'); setPressed(box, false);
      if (active === box) active = null;
    });
  }

  function setup(box) {
    const b = box.querySelector('.vbtn');
    if (b) b.addEventListener('click', function () { box.classList.contains('paused') ? play(box) : pause(box); });
    new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { if (autoOK && !document.hidden) play(box); }
        else pause(box);
      });
    }, { threshold: 0.4 }).observe(box);
  }

  function init(root) {
    root = root || document;
    const boxes = [].slice.call(root.querySelectorAll('[data-vid]'));
    if (!boxes.length) return;
    boxes.forEach(setup);
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) { boxes.forEach(pause); return; }
      if (!autoOK) return;
      boxes.forEach(function (box) {
        const r = box.getBoundingClientRect();
        if (r.top < innerHeight * 0.6 && r.bottom > innerHeight * 0.4) play(box);
      });
    });
  }

  window.PortfolioVideo = { markup: markup, init: init };
})();
