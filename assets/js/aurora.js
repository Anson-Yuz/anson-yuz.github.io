/* ============================================================
   背景视觉层：噪点颗粒 + Canvas 极光光场
   纯展示，无业务逻辑。由 app.js 在内容渲染完成后调用。
   暴露：window.PortfolioFX = { mountGrain, aurora }
   ============================================================ */
(function () {
  "use strict";
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* 生成一张噪点贴图，铺到 #grain 元素上 */
  function mountGrain() {
    const el = document.getElementById('grain');
    if (!el) return;
    const grainC = document.createElement('canvas'); grainC.width = grainC.height = 180;
    const gx = grainC.getContext('2d'); const gd = gx.createImageData(180, 180);
    for (let i = 0; i < gd.data.length; i += 4) { const v = (Math.random() * 255) | 0; gd.data[i] = gd.data[i + 1] = gd.data[i + 2] = v; gd.data[i + 3] = 255; }
    gx.putImageData(gd, 0, 0);
    el.style.backgroundImage = `url(${grainC.toDataURL()})`;
  }

  /* 在指定 canvas 上绘制柔和漂浮的极光光斑；离开视口自动暂停，尊重 reduced-motion */
  function aurora(id, blobs) {
    const cv = document.getElementById(id); if (!cv) return;
    const x = cv.getContext('2d');
    const scale = Math.min(devicePixelRatio || 1, 1.5);
    let w, h, run = false, raf = 0, mx = .5, my = .5, tx = .5, ty = .5, onscreen = false;
    const blur = innerWidth < 768 ? 42 : 68;
    function rs() { w = cv.width = cv.offsetWidth * scale; h = cv.height = cv.offsetHeight * scale; }
    rs();
    let rt; addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(rs, 150); }); // resize 防抖
    if (matchMedia('(pointer:fine)').matches) {
      cv.parentElement.addEventListener('pointermove', e => {
        const r = cv.getBoundingClientRect(); tx = (e.clientX - r.left) / r.width; ty = (e.clientY - r.top) / r.height;
      });
    }
    function paint(t) {
      mx += (tx - mx) * .04; my += (ty - my) * .04;
      x.filter = 'none'; x.globalAlpha = 1;
      x.fillStyle = '#070709'; x.fillRect(0, 0, w, h);
      x.filter = `blur(${blur}px)`;
      for (const b of blobs) {
        const bx = (b.x + Math.sin(t * b.vx + b.p) * b.ax + (mx - .5) * b.pr) * w;
        const by = (b.y + Math.cos(t * b.vy + b.p) * b.ay + (my - .5) * b.pr) * h;
        x.globalAlpha = b.a; x.fillStyle = b.c;
        x.beginPath(); x.arc(bx, by, b.r * Math.min(w, h), 0, 7); x.fill();
      }
      x.filter = 'none'; x.globalAlpha = 1;
    }
    function loop(t) { if (!run) return; paint(t); raf = requestAnimationFrame(loop); }
    if (RM) { paint(0); return; }
    function setRun() {
      const should = onscreen && !document.hidden;       // 离开视口或标签页隐藏都暂停
      if (should && !run) { run = true; raf = requestAnimationFrame(loop); }
      else if (!should && run) { run = false; cancelAnimationFrame(raf); }
    }
    new IntersectionObserver(es => es.forEach(e => { onscreen = e.isIntersecting; setRun(); })).observe(cv);
    document.addEventListener('visibilitychange', setRun);
  }

  window.PortfolioFX = { mountGrain, aurora };
})();
