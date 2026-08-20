/* ============================================================
   页面装配：读取 window.CONTENT，渲染各区块，挂载交互
   依赖：content.js（数据）、aurora.js（背景视觉，window.PortfolioFX）
   普通脚本（非 ES module），保证 file:// 双击预览可用。
   ============================================================ */
(function () {
  "use strict";
  const C = window.CONTENT;
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.title = C.site.title;
  document.querySelector('meta[name="description"]').content = C.site.description;
  document.getElementById('logo').innerHTML = C.site.nameEn.replace(/ /g, '&nbsp;') + '&nbsp;<b>●</b>';

  /* 顶部导航链接（来自 content.nav；# 开头为页内锚点，其余按需外链/下载） */
  const navLinks = document.getElementById('navLinks');
  if (navLinks && Array.isArray(C.nav)) {
    navLinks.innerHTML = C.nav.map(n => {
      const ext = n.external ? ' target="_blank" rel="noopener noreferrer"' : '';
      const dl = n.download ? ' download' : '';
      return `<a href="${n.href}"${ext}${dl}>${n.label}</a>`;
    }).join('');
  }

  const pad2 = n => (n < 10 ? '0' + n : '' + n);
  const visibleCerts = (C.certificates || []).filter(c => !c.hidden && c.name);

  /* 占位卡配色 */
  const TONES = {
    green: { panel: '#0d1f1a', border: '#1d3b33', accent: '#2dd4a7', block: '#15302a' },
    blue: { panel: '#0e1320', border: '#22304d', accent: '#6c9ef8', block: '#141d33' },
    amber: { panel: '#1f150d', border: '#3b2d1d', accent: '#f0b35e', block: '#302415' },
    purple: { panel: '#150f20', border: '#2d2345', accent: '#a78bfa', block: '#211733' }
  };

  /* 案例视觉：竖屏视频用手机样机框，横屏视频/截图直接铺，否则画抽象占位卡 */
  function caseVisual(cs) {
    if (cs.video) return PortfolioVideo.markup({ video: cs.video, image: cs.image, portrait: cs.portrait, title: cs.title, cls: 'para' });
    if (cs.image) return `<img class="shot para" src="${cs.image}" alt="${cs.title} 界面截图">`;
    const t = TONES[cs.tone] || TONES.green;
    return `<div class="ph para" style="background:${t.panel};border-color:${t.border}">
      <div class="tb"><i style="background:${t.accent}"></i><i style="background:${t.border}"></i><i style="background:${t.border}"></i></div>
      <div class="bar" style="width:46%;background:${t.border}"></div>
      <div class="bar" style="width:68%;background:${t.block}"></div>
      <svg viewBox="0 0 300 78" preserveAspectRatio="none" aria-hidden="true">
        <polyline points="0,64 40,46 80,54 120,28 160,38 200,16 240,26 300,8" fill="none" stroke="${t.accent}" stroke-width="2.5"/>
        <polyline points="0,70 50,62 100,66 150,52 200,58 250,44 300,40" fill="none" stroke="${t.border}" stroke-width="2"/>
      </svg>
      <div class="cards"><i style="background:${t.block}"></i><i style="background:${t.block}"></i></div>
      <div class="bar" style="width:54%;background:${t.block}"></div>
      <div class="bar" style="width:38%;background:${t.block}"></div>
      <div class="ft" style="color:${t.accent}">${cs.titleEn || cs.title} — preview</div>
    </div>`;
  }

  document.getElementById('app').innerHTML = `
<section class="hero" id="top" aria-label="首屏">
  <canvas id="au1" aria-hidden="true"></canvas>
  <div class="wrap inner">
    <div class="kicker rv" style="--d:.05s">${C.hero.kicker}</div>
    <h1 class="rv" style="--d:.15s">${C.site.nameZh}</h1>
    <div class="role rv" style="--d:.24s">${C.hero.role}</div>
    <p class="intro rv" style="--d:.32s">${C.hero.intro}</p>
    <div class="tag rv" style="--d:.4s">${C.hero.tagline}</div>
    <div class="ctas rv" style="--d:.48s">
      ${C.hero.ctas.map(c => {
        const ext = c.external ? ' target="_blank" rel="noopener noreferrer"' : '';
        const dl = c.download ? ' download' : '';
        return `<a class="btn btn-${c.type}" href="${c.href}"${ext}${dl}>${c.label}${c.external ? ' ↗' : ''}</a>`;
      }).join('')}
    </div>
    <div class="foot rv" style="--d:.56s">
      <div class="sub">${C.hero.status}</div>
      <div class="hint">${C.hero.scrollHint} <i>↓</i></div>
    </div>
  </div>
</section>

<section class="stats" aria-label="数据概览"><div class="wrap grid">
  ${C.stats.map((s, i) => `<div class="stat rv" style="--d:${i * .08}s"><div class="num"><span class="cnt" data-v="${s.value}">0</span><em>·</em></div><div class="lbl">${s.label}</div></div>`).join('')}
</div></section>

<section class="skills" id="skills" aria-label="核心能力"><div class="wrap">
  <div class="sec-head rv"><span class="idx">01 — 核心能力</span><h2>能做什么，凭什么</h2></div>
  <div class="skill-grid">
    ${C.skills.map((s, i) => `
    <div class="skill rv" style="--d:${i * .08}s">
      <h3>${s.group}</h3>
      <div class="tags">${s.items.map(it => `<span>${it}</span>`).join('')}</div>
      ${s.proof ? `<p class="proof">${s.proof}</p>` : ''}
    </div>`).join('')}
  </div>
</div></section>

<section id="works" aria-label="精选案例"><div class="wrap">
  <div class="sec-head rv"><span class="idx">02 — 精选案例</span><h2>作品，和它们的故事</h2></div>
  ${C.cases.map((cs, i) => `
  <div class="case${i % 2 ? ' flip' : ''}">
    <div class="txt">
      <div class="tag rv">${cs.tag}</div>
      <h3 class="rv" style="--d:.08s">${cs.title}</h3>
      <div class="en rv" style="--d:.1s">${cs.titleEn || ''}</div>
      <p class="pos rv" style="--d:.14s">${cs.positioning}</p>
      <div class="row rv" style="--d:.2s"><span class="k">挑战</span><span class="v">${cs.challenge}</span></div>
      <div class="row rv" style="--d:.26s"><span class="k">方案</span><span class="v">${cs.solution}</span></div>
      <div class="row rv" style="--d:.32s"><span class="k">成果</span><span class="v">${cs.outcome}</span></div>
      <div class="pills rv" style="--d:.38s">${cs.stack.map(s => `<span>${s}</span>`).join('')}</div>
      <div class="lnks rv" style="--d:.42s">
        ${cs.caseStudy ? `<a class="btn-demo" href="${cs.caseStudy}" aria-label="${cs.title} 案例详情">查看案例 →</a>` : ''}
        ${cs.demo ? `<a class="lnk" href="${cs.demo}" target="_blank" rel="noopener noreferrer" aria-label="${cs.title} ${cs.demoLabel || '在线试用'}（新窗口打开）">${cs.demoLabel || '在线试用'} ↗</a>` : ''}
        ${cs.link ? `<a class="lnk" href="${cs.link}" target="_blank" rel="noopener noreferrer" aria-label="${cs.title} ${cs.linkLabel || '查看项目'}（新窗口打开）">${cs.linkLabel || '查看项目'} →</a>` : ''}
      </div>
    </div>
    <div class="vis rv" style="--d:.2s">${caseVisual(cs)}</div>
  </div>`).join('')}
</div></section>

<section class="works" aria-label="更多作品"><div class="wrap">
  <div class="sec-head rv"><span class="idx">03 — 更多作品</span><h2>同样从零到一</h2></div>
  <div class="grid">
    ${C.works.map((w, i) => `
    <div class="work rv" style="--d:${i * .1}s">
      <div class="top"><span class="no">${pad2(C.cases.length + i + 1)}</span><span class="pf">${w.platform}</span></div>
      <h4>${w.title}</h4>
      <p>${w.desc}</p>
      <div class="bot"><span class="stk">${w.stack}</span>
        ${w.link ? `<a class="go" href="${w.link}" target="_blank" rel="noopener noreferrer" aria-label="${w.title} GitHub 仓库（新窗口打开）">仓库 →</a>` : `<span class="priv">代码暂未公开</span>`}
      </div>
    </div>`).join('')}
  </div>
</div></section>

<section class="about" id="about" aria-label="关于我">
  <div class="wrap grid">
    <div>
      <div class="sec-head" style="padding:0 0 10px"><span class="idx">04 — 关于</span></div>
      <h2 class="rv">${C.about.heading}</h2>
      <p class="txt rv" style="--d:.12s">${C.about.text}</p>
      ${C.about.meta && C.about.meta.length ? `<div class="meta rv" style="--d:.16s">${C.about.meta.map(m => `<span class="meta-item"><b>${m.k}</b>${m.v}</span>`).join('')}</div>` : ''}
    </div>
    <div class="pl rv" style="--d:.2s;align-self:end">
      ${C.about.platforms.map(p => `<div class="row"><span class="n">${p.name}</span><span class="d">${p.detail}</span></div>`).join('')}
    </div>
  </div>
  ${visibleCerts.length ? `<div class="wrap certs-wrap rv"><h3 class="certs-title">证书</h3><div class="certs">${visibleCerts.map(c => `<div class="cert"><div class="cert-name">${c.name}</div><div class="cert-meta">${[c.issuer, c.focus].filter(Boolean).join(' · ')}</div></div>`).join('')}</div></div>` : ''}
</section>

<section class="contact" id="contact" aria-label="联系">
  <canvas id="au2" aria-hidden="true"></canvas>
  <div class="inner">
    <div class="k rv">05 — CONTACT</div>
    <h2 class="rv" style="--d:.1s">${C.contact.headline}</h2>
    <p class="sub rv" style="--d:.18s">${C.contact.sub}</p>
    <div class="rv" style="--d:.26s"><a class="mail" href="mailto:${C.contact.email}" aria-label="发邮件给 ${C.contact.email}">${C.contact.email}</a></div>
    <div class="rv" style="--d:.34s"><a class="gh" href="${C.contact.github}" target="_blank" rel="noopener noreferrer" aria-label="张裕霖的 GitHub（新窗口打开）">GitHub ↗</a></div>
  </div>
  <div class="inner-foot">
    <div class="marq"><div class="track">${(`<span>${C.contact.marquee.replace(/—/g, '<b>—</b>')}</span>`).repeat(8)}</div></div>
    <footer>© 2026 ${C.site.nameZh} — 手写，无框架。</footer>
  </div>
</section>`;

  /* 背景视觉：在内容渲染、canvas 占位生成之后再启动 */
  if (window.PortfolioFX) {
    PortfolioFX.mountGrain();
    PortfolioFX.aurora('au1', [
      { x: .16, y: .30, r: .34, c: '#3730a3', vx: .00011, vy: .00007, ax: .11, ay: .09, p: 0, a: .5, pr: .05 },
      { x: .62, y: .18, r: .28, c: '#0f766e', vx: -.00009, vy: .00012, ax: .10, ay: .09, p: 2, a: .4, pr: .08 },
      { x: .88, y: .62, r: .24, c: '#b45309', vx: .00007, vy: -.00009, ax: .08, ay: .07, p: 4, a: .28, pr: .06 },
      { x: .38, y: .88, r: .30, c: '#1e3a8a', vx: -.00006, vy: .00008, ax: .09, ay: .06, p: 5, a: .36, pr: .04 }
    ]);
    PortfolioFX.aurora('au2', [
      { x: .22, y: .28, r: .32, c: '#3730a3', vx: .00009, vy: .00006, ax: .09, ay: .08, p: 1, a: .4, pr: .06 },
      { x: .78, y: .68, r: .28, c: '#0f766e', vx: -.00007, vy: .0001, ax: .09, ay: .07, p: 3, a: .32, pr: .08 },
      { x: .55, y: .06, r: .22, c: '#b45309', vx: .00006, vy: -.00008, ax: .07, ay: .05, p: 5, a: .22, pr: .05 }
    ]);
  }

  /* 演示视频懒播放 + 控制 */
  if (window.PortfolioVideo) PortfolioVideo.init();

  /* 滚动入场 */
  const obs = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('on'); obs.unobserve(e.target); }
  }), { threshold: .12, rootMargin: '0px 0px -6% 0px' });
  document.querySelectorAll('.rv').forEach(el => obs.observe(el));

  /* 数字滚动计数 */
  const cObs = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, end = +el.dataset.v, t0 = performance.now(), dur = 1300;
    if (RM) { el.textContent = end; cObs.unobserve(el); return; }
    (function tick(now) {
      const p = Math.min((now - t0) / dur, 1), v = Math.round(end * (1 - Math.pow(1 - p, 3)));
      el.textContent = v;
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
    cObs.unobserve(el);
  }), { threshold: .6 });
  document.querySelectorAll('.cnt').forEach(el => cObs.observe(el));

  /* 导航毛玻璃 */
  const nav = document.getElementById('nav');
  addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 50), { passive: true });

  /* 移动端折叠菜单 */
  const navToggle = document.getElementById('navToggle');
  if (navToggle && navLinks) {
    const closeMenu = () => {
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', '打开菜单');
      document.body.classList.remove('menu-open');
    };
    navToggle.addEventListener('click', () => {
      const open = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!open));
      navToggle.setAttribute('aria-label', open ? '打开菜单' : '关闭菜单');
      document.body.classList.toggle('menu-open', !open);
    });
    navLinks.addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
    addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  }

  /* 当前区块高亮（导航 aria-current）：取顶部已滚过参考线的最后一个区块 */
  const spyLinks = navLinks ? [...navLinks.querySelectorAll('a[href^="#"]')] : [];
  if (spyLinks.length) {
    const spyIds = ['top', 'skills', 'works', 'about', 'contact'];
    let spyTick = false;
    const updateSpy = () => {
      const y = scrollY + 120;
      let cur = 'top';
      spyIds.forEach(id => { const el = document.getElementById(id); if (el && el.offsetTop <= y) cur = id; });
      spyLinks.forEach(a => { a.getAttribute('href') === '#' + cur ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current'); });
    };
    addEventListener('scroll', () => { if (spyTick) return; spyTick = true; requestAnimationFrame(() => { updateSpy(); spyTick = false; }); }, { passive: true });
    updateSpy();
  }

  /* 视差 */
  let pr = []; function collectPara() { pr = [...document.querySelectorAll('.para')]; }
  collectPara();
  if (!RM) {
    let ticking = false;
    addEventListener('scroll', () => {
      if (ticking) return; ticking = true;
      requestAnimationFrame(() => {
        const vh = innerHeight;
        for (const el of pr) {
          const r = el.getBoundingClientRect();
          if (r.bottom < 0 || r.top > vh) continue;
          const off = ((r.top + r.height / 2) - vh / 2) * -.06;
          el.style.transform = `translateY(${off.toFixed(1)}px)`;
        }
        ticking = false;
      });
    }, { passive: true });
  }

  /* 自定义光标（渐进增强：JS 成功初始化后才隐藏系统光标，出错则保留系统光标） */
  if (matchMedia('(pointer:fine)').matches && !RM) {
    const cur = document.getElementById('cur');
    if (cur) {
      document.documentElement.classList.add('custom-cursor');
      let cx = innerWidth / 2, cy = innerHeight / 2, px = cx, py = cy;
      addEventListener('pointermove', e => { cx = e.clientX; cy = e.clientY; });
      (function follow() {
        px += (cx - px) * .18; py += (cy - py) * .18;
        cur.style.transform = `translate(${px}px,${py}px) translate(-50%,-50%)`;
        requestAnimationFrame(follow);
      })();
      document.addEventListener('mouseover', e => {
        cur.classList.toggle('big', !!e.target.closest('a,button,.work'));
      });
      // 鼠标移出窗口 / 窗口失焦时隐藏自定义光标，回来再显示
      document.addEventListener('mouseleave', () => { cur.style.opacity = '0'; });
      document.addEventListener('mouseenter', () => { cur.style.opacity = '1'; });
      addEventListener('blur', () => { cur.style.opacity = '0'; });
      addEventListener('focus', () => { cur.style.opacity = '1'; });
    }
  }
})();
