/* ============================================================
   案例详情页装配：读取 window.CONTENT，按 #project[data-id] 找到项目并渲染。
   与首页共用同一份数据（content.js），不重复维护项目信息。
   detail.* 字段留空 "" 或以 "TODO" 开头的，对应区块自动隐藏。
   ============================================================ */
(function () {
  "use strict";
  const C = window.CONTENT;
  const root = document.getElementById('project');
  if (!C || !root) return;

  const logo = document.getElementById('logo');
  if (logo) logo.innerHTML = C.site.nameEn.replace(/ /g, '&nbsp;') + '&nbsp;<b>●</b>';

  const list = C.cases || [];
  const id = root.getAttribute('data-id');
  const idx = list.findIndex(p => p.id === id);
  const p = list[idx];

  if (!p) {
    root.innerHTML = '<div class="wrap" style="padding:160px 0 120px"><h1 style="font-family:var(--serif)">未找到该项目</h1><p style="margin-top:16px"><a class="back" href="../index.html">← 返回首页</a></p></div>';
    return;
  }

  // 字段是否“可展示”：非空字符串且不以 TODO 开头；数组非空
  const has = v => typeof v === 'string' ? (v.trim() !== '' && v.trim().slice(0, 4).toUpperCase() !== 'TODO') : (Array.isArray(v) ? v.length > 0 : !!v);
  const d = p.detail || {};

  document.title = p.title + (p.titleEn ? ' ' + p.titleEn : '') + ' — ' + C.site.nameZh;
  const md = document.querySelector('meta[name="description"]');
  if (md) md.content = (has(p.positioning) ? p.positioning + ' ' : '') + p.title + ' 项目案例 — ' + C.site.nameZh;

  function media() {
    if (p.video && window.PortfolioVideo) return PortfolioVideo.markup({ video: p.video, image: p.image, portrait: p.portrait, title: p.title });
    if (p.image) return `<img class="shot" src="${p.image}" alt="${p.title} 界面截图">`;
    return '';
  }

  const metaItems = [];
  if (has(p.tag)) metaItems.push(['类别', p.tag]);
  if (has(d.role)) metaItems.push(['我的角色', d.role]);
  if (has(d.team)) metaItems.push(['团队', d.team]);
  if (has(d.duration)) metaItems.push(['周期', d.duration]);
  const metaHtml = metaItems.length ? `<div class="p-meta">${metaItems.map(m => `<span><b>${m[0]}</b>${m[1]}</span>`).join('')}</div>` : '';

  const links = [];
  if (has(p.link)) links.push(`<a class="p-link" href="${p.link}" target="_blank" rel="noopener noreferrer" aria-label="${p.title} GitHub 仓库（新窗口打开）">GitHub 仓库 ↗</a>`);
  if (has(p.demo)) links.push(`<a class="p-link" href="${p.demo}" target="_blank" rel="noopener noreferrer" aria-label="${p.title} 在线体验（新窗口打开）">在线体验 ↗</a>`);
  if (has(p.download)) links.push(`<a class="p-link" href="${p.download}" target="_blank" rel="noopener noreferrer" aria-label="${p.title} 安装包 / Release（新窗口打开）">下载 / Release ↗</a>`);
  const linksHtml = links.length ? `<div class="p-links">${links.join('')}</div>` : '';

  function block(title, body) { return has(body) ? `<section class="p-block"><h2>${title}</h2><p>${body}</p></section>` : ''; }

  const archHtml = (has(d.architecture) || has(d.architectureImage))
    ? `<section class="p-block"><h2>系统架构</h2>${has(d.architecture) ? `<p>${d.architecture}</p>` : ''}${has(d.architectureImage) ? `<img class="p-arch" src="${d.architectureImage}" alt="${p.title} 系统架构图">` : ''}</section>`
    : '';

  const flowHtml = has(d.flow)
    ? `<section class="p-block"><h2>核心功能流程</h2><ol class="p-flow">${d.flow.map(s => `<li>${s}</li>`).join('')}</ol></section>`
    : '';

  const stackHtml = (p.stack && p.stack.length)
    ? `<section class="p-block"><h2>技术栈</h2><div class="p-pills">${p.stack.map(s => `<span>${s}</span>`).join('')}</div></section>`
    : '';

  let navHtml = '';
  if (list.length > 1) {
    const prev = list[(idx - 1 + list.length) % list.length];
    const next = list[(idx + 1) % list.length];
    const href = pj => (pj.caseStudy || '').split('/').pop();
    navHtml = `<nav class="p-nav" aria-label="项目导航">
      <a href="${href(prev)}"><span>← 上一个</span><b>${prev.title}</b></a>
      <a class="next" href="${href(next)}"><span>下一个 →</span><b>${next.title}</b></a>
    </nav>`;
  }

  root.innerHTML = `
<header class="p-hero">
  <canvas id="au1" aria-hidden="true"></canvas>
  <div class="wrap p-hero-inner">
    <a class="back" href="../index.html#works">← 返回作品集</a>
    ${has(p.titleEn) ? `<div class="p-kicker">${p.titleEn}</div>` : ''}
    <h1>${p.title}</h1>
    ${has(p.positioning) ? `<p class="p-lead">${p.positioning}</p>` : ''}
    ${metaHtml}
    ${linksHtml}
  </div>
</header>
<div class="wrap p-body">
  ${media() ? `<div class="p-media">${media()}</div>` : ''}
  ${block('项目背景', d.background)}
  ${block('要解决的问题', p.challenge)}
  ${block('核心方案', p.solution)}
  ${archHtml}
  ${flowHtml}
  ${block('最难的技术问题', d.challenges)}
  ${block('解决方案与技术取舍', d.tradeoffs)}
  ${block('项目成果', p.outcome)}
  ${block('项目不足', d.shortcomings)}
  ${block('后续优化方向', d.future)}
  ${stackHtml}
  ${navHtml}
</div>`;

  if (window.PortfolioFX) {
    PortfolioFX.mountGrain();
    PortfolioFX.aurora('au1', [
      { x: .2, y: .3, r: .3, c: '#3730a3', vx: .0001, vy: .00007, ax: .1, ay: .08, p: 0, a: .42, pr: .05 },
      { x: .82, y: .5, r: .26, c: '#0f766e', vx: -.00008, vy: .0001, ax: .09, ay: .07, p: 2, a: .3, pr: .07 }
    ]);
  }

  if (window.PortfolioVideo) PortfolioVideo.init();

  const nav = document.getElementById('nav');
  if (nav) addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 50), { passive: true });
})();
