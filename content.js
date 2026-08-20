/* ============================================================
   网站内容配置 — 改这个文件就能更新网站全部文字内容
   改完保存提交，1 分钟后网站自动更新（详见 README.md）
   规则：留空 "" 的链接/字段会自动隐藏，不会渲染成死按钮。
   ============================================================ */

window.CONTENT = {

  /* ---------- 全站信息 ---------- */
  site: {
    nameZh: "张裕霖",
    nameEn: "Yulin Zhang",
    title: "张裕霖 — AI 应用开发工程师 / 全栈开发者",
    description: "张裕霖的个人作品集：AI 应用开发与全栈工程师，用 Python、Vue、HarmonyOS 和大模型把想法落地为可用产品。深圳 · 2025 届。",
    url: "https://anson-yuz.github.io/",
    // 简历文件：把你的简历命名为 resume.pdf 放到仓库根目录即可替换占位文件
    resumeUrl: "resume.pdf"
  },

  /* ---------- 顶部导航（按顺序渲染；href 以 # 开头为页内锚点） ---------- */
  nav: [
    { label: "首页", href: "#top" },
    { label: "项目", href: "#works" },
    { label: "能力", href: "#skills" },
    { label: "关于", href: "#about" },
    { label: "简历", href: "resume.pdf", download: true },
    { label: "联系", href: "#contact" }
  ],

  /* ---------- 开场首屏 ---------- */
  hero: {
    kicker: "PORTFOLIO — 2026",
    role: "AI 应用开发工程师 / 全栈开发者",
    intro: "使用 Python、Vue、HarmonyOS 和大模型，把 AI 能力落地为可以实际使用的完整产品。",
    tagline: "把想法造成产品。",
    status: "深圳 ｜ 2025 届 ｜ 寻求 AI 应用开发 / 全栈开发岗位",
    scrollHint: "滚动探索",
    // 首屏按钮：type 决定样式（primary 实心 / ghost 描边 / link 文字链）
    ctas: [
      { label: "查看代表项目", href: "#works", type: "primary" },
      { label: "下载简历", href: "resume.pdf", type: "ghost", download: true },
      { label: "GitHub", href: "https://github.com/Anson-Yuz", type: "ghost", external: true }
    ]
  },

  /* ---------- 数据带（数字会滚动入场） ---------- */
  stats: [
    { value: 5, label: "个独立产品" },
    { value: 4, label: "个目标平台" },
    { value: 3, label: "个 AI 驱动应用" },
    { value: 2, label: "款游戏作品" }
  ],

  /* ---------- 核心能力（不用进度条，用「能力 + 项目佐证」表达） ----------
     items：该方向掌握的具体技术；proof：可填一句项目佐证（留空则不显示）
  ------------------------------------------------------------ */
  skills: [
    {
      group: "AI 应用开发",
      items: ["大模型 API 集成", "Prompt 与 Agent 工作流", "OCR", "RAG / 向量数据库", "AI 功能产品化"],
      proof: "拾忆的 NPC 对话、基金项目的每日 AI 报告与持仓 OCR"
    },
    {
      group: "Web 全栈",
      items: ["Vue 3", "TypeScript", "FastAPI", "REST API", "SQLite", "前后端联调"],
      proof: "拾忆、基金智能分析两个 Vue 3 + FastAPI 全栈项目"
    },
    {
      group: "移动端开发",
      items: ["HarmonyOS", "ArkTS", "ArkUI", "Android", "Java"],
      proof: "BattleCity 坦克大战、三问学习机、小乖记账"
    },
    {
      group: "工程与交付",
      items: ["Git / GitHub", "PyInstaller 打包", "云部署", "日志与异常处理", "数据持久化", "项目文档"],
      proof: "基金项目打包为免环境 Windows 桌面应用；拾忆部署于腾讯云"
    }
  ],

  /* ---------- 精选案例（整屏大案例，左右交错排布） ----------
     video 字段：填演示视频路径（如 "images/shiyi.mp4"）自动循环播放，优先于截图
     image 字段：填截图路径（如 "images/shiyi.png"）则显示截图；有 video 时作为封面
     两者都留空 "" 则显示同风格的抽象界面占位图
     demo  字段：填在线试用地址，会显示「在线试用 ↗」按钮；留空不显示
     portrait 字段：竖屏视频（手机录屏）设为 true，会以手机样机框居中展示
     tone  字段：占位图配色，可选 "green" / "blue" / "amber" / "purple"
     caseStudy 字段：填详情页路径（如 "projects/memory-healer.html"）会显示「查看案例」按钮
  ------------------------------------------------------------ */
  cases: [
    {
      tag: "WEB · AI 叙事游戏 — 腾讯云黑客松作品",
      id: "memory-healer",
      title: "拾忆",
      titleEn: "Memory Healer",
      positioning: "进入一位阿尔茨海默症老人的记忆，把他遗失的人生一片片拼回来。",
      challenge: "传统叙事游戏的对话是写死的，玩家无法真正参与故事——而失忆题材恰恰最需要自由对话带来的真实感。",
      solution: "每个 NPC 都由大模型驱动，任意输入都能动态回应；记忆碎片收集 + 剧情分支 + 三种结局；Vue 3 + FastAPI 全栈，部署于腾讯云。",
      outcome: "AI 对话与叙事游戏的完整闭环：自由对话、记忆碎片系统、剧情分支、三种结局、SVG 动画场景与五位玩家存档。",
      stack: ["Vue 3", "TypeScript", "FastAPI", "DeepSeek", "腾讯云"],
      link: "https://github.com/Anson-Yuz/memory-healer",
      linkLabel: "查看仓库",
      caseStudy: "projects/memory-healer.html",
      video: "images/shiyi-demo.mp4",
      image: "images/shiyi-poster.jpg",
      demo: "",
      tone: "green",
      download: "",
      // 案例详情页字段：留空 "" 的不会显示在页面上，填好即出现（详见 README）
      detail: {
        background: "腾讯云黑客松参赛作品。比起写死的剧情，我更想验证「大模型驱动的自由对话」能不能撑起一个有温度、可玩的叙事游戏。",
        role: "负责玩法设计、前后端实现、Prompt 设计到上线部署的全流程。",
        team: "",              // TODO：拾忆是个人还是组队？组队请填人数与分工
        duration: "",          // TODO：真实开发周期（如「2026.05，约 2 周」）
        architecture: "Vue 3 + TypeScript 前端负责场景与对话交互；FastAPI 后端作为游戏引擎维护世界状态与数据模型；对话经 Prompt 模板注入人设与上下文后调用 DeepSeek；SQLite 持久化存档；部署在腾讯云轻量应用服务器，前后端通过 REST API 通信。",
        architectureImage: "",
        flow: [
          "进入老人的记忆场景",
          "与 NPC 自由文字对话，模型依人设与上下文动态回应",
          "在对话中收集记忆碎片、触发剧情分支",
          "自动 / 手动存档（5 个存档位）",
          "依玩家选择走向 3 种结局之一"
        ],
        challenges: "自由对话最大的风险是「失控」——模型可能跑题、说出不符合人设或剧情的内容，破坏沉浸感；同时要让 NPC 记住此前的对话与已收集的碎片。",
        tradeoffs: "用 Prompt 模板把人设、世界状态与已解锁碎片注入上下文来约束输出，而非让模型自由发挥；游戏状态由后端统一维护、前端只负责呈现，保证存档与剧情判定的一致性。",
        shortcomings: "长对话下仍偶有跑题，缺少系统化的对话质量评测；碎片与分支判定较依赖关键词，鲁棒性有限。",
        future: "引入更结构化的对话状态机与检索式记忆（RAG）减少跑题，并为分支判定加入更稳健的意图识别。"
      }
    },
    {
      tag: "WINDOWS 桌面 · 全栈 + AI",
      id: "fund-intelligence",
      title: "基金智能分析",
      titleEn: "Fund Intelligence",
      positioning: "让 DeepSeek 盯盘，你只看结论。",
      challenge: "持仓、行情、资金流向、新闻散落在各个 App 里，人工盯盘费时，还容易被情绪带着走。",
      solution: "FastAPI + Vue 3 全栈；持仓截图 OCR 一键导入；行情与北向资金自动采集；每天定点生成 AI 投资建议；一键打包成免环境安装的 Windows 桌面应用。",
      outcome: "从截图导入到 AI 报告的一站式闭环，所有数据本地存储，双击即用。",
      stack: ["FastAPI", "Vue 3", "SQLite", "DeepSeek", "OCR", "PyInstaller"],
      link: "https://github.com/Anson-Yuz/fund-intelligence",
      linkLabel: "查看仓库",
      caseStudy: "projects/fund-intelligence.html",
      video: "images/fund-demo.mp4",
      image: "images/fund-poster.jpg",
      demo: "",
      tone: "blue",
      download: "",
      // 案例详情页字段：留空 "" 的不会显示在页面上，填好即出现
      detail: {
        background: "持仓、行情、资金流向、新闻散落在各个 App，人工盯盘费时又容易被情绪带着走。我想做一个本地、私密、每天自动给出结论的桌面工具。",
        role: "个人项目，独立完成需求、前后端、AI 接入与打包发布。",
        team: "个人项目",
        duration: "",          // TODO：真实开发周期
        architecture: "FastAPI 后端负责数据采集、OCR、定时任务与 AI 报告生成，数据存于本地 SQLite 并归档日志；Vue 3 前端负责持仓、行情与报告展示；通过 DeepSeek 生成加减仓建议；最终用 PyInstaller 打包为免 Python / Node 环境的独立 Windows 应用。",
        architectureImage: "",
        flow: [
          "支付宝 / 同花顺截图 OCR 一键导入持仓",
          "定时采集 A 股与全球指数、北向 / 主力资金、新闻资讯",
          "每日定点由 AI 生成加减仓建议报告",
          "查看交易记录与历史报告",
          "数据全部本地存储，双击即用"
        ],
        challenges: "把分散的数据源整合成每天自动产出的结论，并让非技术用户「双击即用」——要处理截图 OCR 的格式差异、行情采集的稳定性，以及把 Python 后端 + Node 前端打包成单一可执行文件。",
        tradeoffs: "选择本地存储而非云端，换取隐私与零部署成本；用 PyInstaller 打包牺牲体积换取用户免装环境；AI 输出仅作辅助参考并附免责声明，不替代决策。",
        shortcomings: "OCR 对非主流截图格式适配有限；行情采集依赖第三方数据源，稳定性受其影响。",
        future: "扩展更多券商 / 平台的截图模板，加入策略回测与价格提醒。"
      }
    },
    {
      tag: "HARMONYOS · ARKTS 游戏开发",
      id: "battle-city",
      title: "BattleCity 坦克大战",
      titleEn: "Armored Frontline",
      positioning: "经典坦克大战，被重制成一场有指挥系统的二战战役。",
      challenge: "复刻坦克大战不难，难的是让它在今天还值得一玩——纯复古复刻缺乏深度，也撑不起重复游玩的动力。",
      solution: "ArkTS 从零实现游戏循环与碰撞检测；在经典玩法之上加入战役编年体（莫斯科到库尔斯克四大战役）、攻防双阵营、载具采购（T-34/76 到 SU-152）和消耗指挥点的八种战术指令——集火、空袭、烟幕、维修各有用途。",
      outcome: "战役、车库、成就、玩家档案与数据持久化均已落地，军事风 UI 逐帧手绘——一份课程作业长成了完整游戏。",
      stack: ["ArkTS", "ArkUI", "HarmonyOS", "Canvas", "游戏设计"],
      link: "",
      linkLabel: "",
      caseStudy: "projects/battle-city.html",
      video: "images/tank-demo.mp4",
      image: "images/tank-poster.jpg",
      portrait: true,
      demo: "",
      tone: "amber",
      download: "",
      // 案例详情页字段：留空 "" 的不会显示在页面上，填好即出现
      detail: {
        background: "HarmonyOS 课程项目。复刻坦克大战不难，难的是让它今天还值得一玩——我想在经典玩法上加一层「指挥」的策略深度。",
        role: "个人独立完成：从游戏引擎到玩法系统、UI 与数据持久化。",
        team: "个人项目（课程作业）",
        duration: "",          // TODO：真实开发周期
        architecture: "ArkTS + ArkUI 搭建界面，Canvas 负责战场实时渲染；自实现游戏循环与碰撞检测；按「实体 / 场景 / 游戏状态」分层解耦；数据持久化保存车库、成就与玩家档案。",
        architectureImage: "",
        flow: [
          "选择历史战役（莫斯科到库尔斯克四大战役）与攻防阵营",
          "在车库用军费采购载具（T-34/76 到 SU-152）",
          "进入战斗，用指挥点释放集火 / 空袭 / 烟幕 / 维修等 8 种战术指令",
          "结算战果，更新成就与玩家档案",
          "进度持久化保存"
        ],
        challenges: "在 ArkTS / Canvas 上从零实现稳定的游戏循环与碰撞检测；同时要处理多音效并发、资源加载时机，以及玩法变多后状态相互耦合、牵一发而动全身的问题。",
        tradeoffs: "把实体、场景与游戏状态拆开、用统一状态驱动渲染，换取可维护性；战术指令以「指挥点」消耗来约束，避免能力泛滥破坏平衡。",
        shortcomings: "关卡与数值多为手工配置，缺少关卡编辑器；美术资源为逐帧手绘，扩展成本较高。",
        future: "抽象关卡配置 / 编辑器，补充更多战役与单位，并进一步优化音效与渲染性能。"
      }
    }
  ],

  /* ---------- 更多作品（紧凑卡片网格） ----------
     link 留空 "" 表示私有项目，卡片会显示「代码暂未公开」而非死路
     caseStudy 可选：填详情页路径会显示「查看案例」入口
  ------------------------------------------------------------ */
  works: [
    {
      title: "三问高效学习机",
      desc: "面向 AI 时代大学生的认知闭环工具——提出一个问题，自动生成课程空间，按「心智模型 → 学术争议 → 深度测评」三问法完成学习闭环。",
      stack: "ArkTS · FastAPI · ChromaDB",
      platform: "HarmonyOS",
      link: "",
      caseStudy: ""
    },
    {
      title: "小乖记账",
      desc: "原生 Android 记账应用——收支记录、分类统计、数据本地化，从需求到交付的一次完整移动端实践。",
      stack: "Java · Android",
      platform: "Android",
      link: "https://github.com/Anson-Yuz/xiaoguai-accounting",
      caseStudy: ""
    }
  ],

  /* ---------- 关于 ---------- */
  about: {
    heading: "一个人，从想法到上线",
    text: "我是张裕霖，一名跨平台独立开发者，目前在深圳，2025 届，正在寻求 AI 应用开发 / 全栈开发岗位。从 Android 到 HarmonyOS，从 Web 到 Windows 桌面，从课程作业到黑客松——我习惯一个人把产品从想法推到可用：需求、架构、前后端、AI 集成、打包发布，全栈到端。",
    meta: [
      { k: "所在城市", v: "深圳" },
      { k: "求职方向", v: "AI 应用开发 / 全栈开发" },
      { k: "状态", v: "2025 届" }
    ],
    platforms: [
      { name: "Android", detail: "Java" },
      { name: "HarmonyOS", detail: "ArkTS · ArkUI" },
      { name: "Web", detail: "Vue 3 · FastAPI" },
      { name: "AI 应用", detail: "DeepSeek · Agents · OCR" }
    ]
  },

  /* ---------- 证书（显示在「关于」区） ----------
     新增：照格式加一项；想暂时隐藏某项加 hidden: true 即可。请勿填写不确定的名称。
  ------------------------------------------------------------ */
  certificates: [
    { name: "华为 HCIA-AI 认证", issuer: "华为 Huawei", focus: "AI 基础认证" },
    { name: "AI Agent 技术与应用微认证", issuer: "华为云", focus: "AI Agent 开发" },
    { name: "基于 DeepSeek 和 RAG 构建智能小助手微认证", issuer: "华为云", focus: "RAG 与大模型应用" },
    { name: "华为人工智能技术链与实践微认证", issuer: "华为", focus: "AI 技术链与实践" }
  ],

  /* ---------- 联系 ---------- */
  contact: {
    headline: "找我聊聊",
    sub: "项目合作 · 技术交流 · 或者只是打个招呼",
    email: "anson021220@gmail.com",
    github: "https://github.com/Anson-Yuz",
    marquee: "OPEN FOR COLLABORATION — 把想法造成产品 — "
  },

  /* ---------- SEO / 社交分享（阶段 7 使用） ---------- */
  seo: {
    ogImage: "images/og-cover.jpg",
    themeColor: "#070709",
    author: "张裕霖 Yulin Zhang",
    twitterCard: "summary_large_image"
  }
};
