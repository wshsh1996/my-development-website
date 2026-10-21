// 工具库数据（纯前端模拟数据，浏览量 / 下载量为静态值，后续可替换为接口）
export const categories = [
  { key: 'all', label: '全部' },
  { key: 'frontend', label: '前端环境' },
  { key: 'backend', label: '后端环境' },
  { key: 'devtool', label: '开发工具' },
  { key: 'database', label: '数据库' },
  { key: 'vcs', label: '版本控制' },
  { key: 'ops', label: '部署运维' },
]

export const categoryLabel = (key) => categories.find((c) => c.key === key)?.label ?? '工具'

export const envPlans = [
  {
    id: 'frontend',
    title: '前端开发环境',
    subtitle: 'Vue3 工程化开箱即用',
    desc: '从运行时、包管理器到编辑器插件，一次配置完成前端项目的初始化与调试链路。',
    toolIds: ['nodejs', 'pnpm', 'vscode', 'git'],
    highlights: ['Node LTS', 'pnpm 包管理', 'Vue - Official', 'ESLint + Prettier'],
    category: 'frontend',
  },
  {
    id: 'backend',
    title: '后端开发环境',
    subtitle: 'Spring Boot 开发底座',
    desc: 'JDK、构建工具与数据库一次配齐，环境变量与镜像源同步配置，直接进入业务开发。',
    toolIds: ['jdk', 'maven', 'idea', 'mysql', 'redis'],
    highlights: ['JDK 17 LTS', 'Maven 3.9', 'IntelliJ IDEA', 'MySQL 8.0'],
    category: 'backend',
  },
]

export const tools = [
  {
    id: 'nodejs',
    name: 'Node.js',
    mark: 'JS',
    accent: ['#4ade80', '#15803d'],
    category: 'frontend',
    tagline: '现代前端运行时',
    desc: 'JavaScript 运行时环境，自带 npm 包管理器，是 Vite、Vue3 等前端工程化的基础依赖。',
    tags: ['前端环境', '运行时'],
    views: 18420,
    downloads: 6240,
    updated: '2026-10-12',
    official: 'https://nodejs.org/zh-cn/download',
    versions: [
      { key: 'lts', label: 'LTS 22.x', note: '长期支持版，生产环境推荐' },
      { key: 'current', label: 'Current 24.x', note: '包含最新特性，尝鲜可用' },
    ],
    files: [
      {
        version: 'lts',
        os: 'Windows',
        name: 'node-v22.20.0-x64.msi',
        size: '30.4 MB',
        url: 'https://nodejs.org/zh-cn/download',
      },
      {
        version: 'lts',
        os: 'macOS',
        name: 'node-v22.20.0-darwin-arm64.tar.gz',
        size: '45.2 MB',
        url: 'https://nodejs.org/zh-cn/download',
      },
      {
        version: 'current',
        os: 'Windows',
        name: 'node-v24.8.0-x64.zip',
        size: '32.1 MB',
        url: 'https://nodejs.org/zh-cn/download',
      },
    ],
    setup: [
      {
        title: '安装 Node.js',
        desc: '下载 LTS 安装包，保持默认选项完成安装，确认勾选 “Add to PATH”。',
        code: 'node -v\nnpm -v',
      },
      {
        title: '切换包管理镜像',
        desc: '安装完成后配置国内镜像源，显著提升依赖安装速度。',
        code: 'npm config set registry https://registry.npmmirror.com\nnpm config get registry',
      },
      {
        title: '验证工程初始化',
        desc: '使用 Vite 创建项目，确认运行时与包管理器联通正常。',
        code: 'npm create vite@latest demo -- --template vue\ncd demo && npm install && npm run dev',
      },
    ],
    docs: [
      { label: '官方文档', url: 'https://nodejs.org/zh-cn/docs' },
      { label: '下载页', url: 'https://nodejs.org/zh-cn/download' },
    ],
  },
  {
    id: 'pnpm',
    name: 'pnpm',
    mark: 'PN',
    accent: ['#fbbf24', '#f97316'],
    category: 'frontend',
    tagline: '高性能包管理器',
    desc: '通过硬链接共享依赖的包管理器，安装速度快、磁盘占用低，适合多包 monorepo 场景。',
    tags: ['前端环境', '包管理'],
    views: 9460,
    downloads: 3180,
    updated: '2026-10-08',
    official: 'https://pnpm.io/zh/installation',
    versions: [{ key: 'latest', label: 'Latest 10.x', note: '稳定版本，Node ≥ 18' }],
    files: [
      {
        version: 'latest',
        os: 'Windows',
        name: 'install.ps1（PowerShell 一键脚本）',
        size: '在线安装',
        url: 'https://pnpm.io/zh/installation',
      },
      {
        version: 'latest',
        os: '跨平台',
        name: 'pnpm@10（npm 全局安装）',
        size: '在线安装',
        url: 'https://pnpm.io/zh/installation',
      },
    ],
    setup: [
      {
        title: '启用 Corepack',
        desc: 'Node 16.13+ 内置 Corepack，可直接启用 pnpm，无需额外安装。',
        code: 'corepack enable\ncorepack prepare pnpm@latest --activate',
      },
      {
        title: '校验安装',
        desc: '确认 pnpm 已加入环境变量并输出版本号。',
        code: 'pnpm -v',
      },
      {
        title: '配置镜像与安装依赖',
        desc: '设置镜像源后，使用 pnpm install 安装项目依赖。',
        code: 'pnpm config set registry https://registry.npmmirror.com\npnpm install',
      },
    ],
    docs: [{ label: '官方安装指南', url: 'https://pnpm.io/zh/installation' }],
  },
  {
    id: 'vscode',
    name: 'VS Code',
    mark: 'VS',
    accent: ['#38bdf8', '#2563eb'],
    category: 'devtool',
    tagline: '轻量级代码编辑器',
    desc: '插件生态完善、启动迅速的编辑器，配合 Vue / TypeScript 插件可获得接近 IDE 的开发体验。',
    tags: ['开发工具', '编辑器'],
    views: 21560,
    downloads: 8420,
    updated: '2026-10-10',
    official: 'https://code.visualstudio.com/download',
    versions: [{ key: 'latest', label: 'Latest 1.10x', note: '稳定版，支持自动更新' }],
    files: [
      {
        version: 'latest',
        os: 'Windows',
        name: 'VSCodeUserSetup-x64.exe',
        size: '98.6 MB',
        url: 'https://code.visualstudio.com/download',
      },
      {
        version: 'latest',
        os: 'macOS',
        name: 'VSCode-darwin-universal.zip',
        size: '126 MB',
        url: 'https://code.visualstudio.com/download',
      },
      {
        version: 'latest',
        os: 'Linux',
        name: 'code_x64.deb',
        size: '102 MB',
        url: 'https://code.visualstudio.com/download',
      },
    ],
    setup: [
      {
        title: '安装编辑器',
        desc: '下载对应平台安装包，Windows 建议使用 User Installer 版本。',
        code: 'code --version',
      },
      {
        title: '安装常用插件',
        desc: '命令行批量安装前端与后端开发所需插件。',
        code: 'code --install-extension Vue.volar\ncode --install-extension dbaeumer.vscode-eslint\ncode --install-extension esbenp.prettier-vscode',
      },
      {
        title: '注入推荐配置',
        desc: '在 settings.json 中开启保存格式化与 Vue 文件默认格式化器。',
        code: '{\n  "editor.formatOnSave": true,\n  "[vue]": { "editor.defaultFormatter": "esbenp.prettier-vscode" }\n}',
      },
    ],
    docs: [{ label: '官方文档', url: 'https://code.visualstudio.com/docs' }],
  },
  {
    id: 'jdk',
    name: 'JDK 17',
    mark: 'JD',
    accent: ['#fb923c', '#dc2626'],
    category: 'backend',
    tagline: 'Java 长期支持版本',
    desc: 'Eclipse Temurin 发行的 OpenJDK 17，LTS 支持周期长，是 Spring Boot 3 的推荐运行版本。',
    tags: ['后端环境', 'JVM'],
    views: 16230,
    downloads: 5870,
    updated: '2026-10-09',
    official: 'https://adoptium.net/zh-CN/temurin/releases/',
    versions: [
      { key: '17', label: 'JDK 17 LTS', note: 'Spring Boot 3 推荐版本' },
      { key: '21', label: 'JDK 21 LTS', note: '更新的 LTS，虚拟线程可用' },
    ],
    files: [
      {
        version: '17',
        os: 'Windows',
        name: 'OpenJDK17U-jdk_x64_windows_hotspot.msi',
        size: '186 MB',
        url: 'https://adoptium.net/zh-CN/temurin/releases/',
      },
      {
        version: '17',
        os: 'Linux',
        name: 'OpenJDK17U-jdk_x64_linux_hotspot.tar.gz',
        size: '192 MB',
        url: 'https://adoptium.net/zh-CN/temurin/releases/',
      },
      {
        version: '21',
        os: 'Windows',
        name: 'OpenJDK21U-jdk_x64_windows_hotspot.msi',
        size: '190 MB',
        url: 'https://adoptium.net/zh-CN/temurin/releases/',
      },
    ],
    setup: [
      {
        title: '安装 JDK',
        desc: '安装时勾选 “Set JAVA_HOME variable”，由安装器自动写入环境变量。',
        code: 'java -version\njavac -version',
      },
      {
        title: '手动配置环境变量',
        desc: '若为绿色版，需手动配置 JAVA_HOME 与 PATH（以 Windows 为例）。',
        code: 'JAVA_HOME = D:\\dev\\jdk-17\nPATH += %JAVA_HOME%\\bin',
      },
      {
        title: '验证 Spring Boot 运行',
        desc: '确认 Java 版本满足 Spring Boot 3.x 的最低要求（JDK 17+）。',
        code: 'java -XshowSettings:properties -version 2>&1 | findstr java.version',
      },
    ],
    docs: [{ label: 'Temurin 下载页', url: 'https://adoptium.net/zh-CN/temurin/releases/' }],
  },
  {
    id: 'maven',
    name: 'Maven',
    mark: 'MV',
    accent: ['#f87171', '#b91c1c'],
    category: 'backend',
    tagline: 'Java 项目构建工具',
    desc: '基于 POM 的项目管理与构建工具，统一依赖版本、生命周期与打包流程。',
    tags: ['后端环境', '构建工具'],
    views: 12880,
    downloads: 4320,
    updated: '2026-09-30',
    official: 'https://maven.apache.org/download.cgi',
    versions: [{ key: 'stable', label: '3.9.x', note: '当前稳定版本' }],
    files: [
      {
        version: 'stable',
        os: '跨平台',
        name: 'apache-maven-3.9.11-bin.zip',
        size: '9.8 MB',
        url: 'https://maven.apache.org/download.cgi',
      },
      {
        version: 'stable',
        os: 'Linux',
        name: 'apache-maven-3.9.11-bin.tar.gz',
        size: '9.6 MB',
        url: 'https://maven.apache.org/download.cgi',
      },
    ],
    setup: [
      {
        title: '解压并配置环境变量',
        desc: '解压到无中文路径目录，配置 MAVEN_HOME，并将 bin 目录加入 PATH。',
        code: 'MAVEN_HOME = D:\\dev\\apache-maven-3.9.11\nPATH += %MAVEN_HOME%\\bin',
      },
      {
        title: '验证安装',
        desc: '执行 mvn -v，确认 Maven 与 JDK 版本识别正确。',
        code: 'mvn -v',
      },
      {
        title: '配置阿里云镜像',
        desc: '在 conf/settings.xml 的 mirrors 节点中加入镜像，加速依赖下载。',
        code: '<mirror>\n  <id>aliyunmaven</id>\n  <mirrorOf>*</mirrorOf>\n  <url>https://maven.aliyun.com/repository/public</url>\n</mirror>',
      },
    ],
    docs: [{ label: '官方文档', url: 'https://maven.apache.org/guides/' }],
  },
  {
    id: 'idea',
    name: 'IntelliJ IDEA',
    mark: 'IJ',
    accent: ['#a78bfa', '#7c3aed'],
    category: 'devtool',
    tagline: 'Java 开发集成环境',
    desc: '对 Spring / Maven 支持完善的 Java IDE，具备强大的代码补全、重构与调试能力。',
    tags: ['开发工具', 'IDE'],
    views: 19640,
    downloads: 7210,
    updated: '2026-10-11',
    official: 'https://www.jetbrains.com/idea/download/',
    versions: [
      { key: 'community', label: 'Community', note: '免费版，满足日常 Java 开发' },
      { key: 'ultimate', label: 'Ultimate', note: '支持 Spring 全家桶（付费）' },
    ],
    files: [
      {
        version: 'community',
        os: 'Windows',
        name: 'ideaIC-2026.2.exe',
        size: '798 MB',
        url: 'https://www.jetbrains.com/idea/download/',
      },
      {
        version: 'ultimate',
        os: 'Windows',
        name: 'ideaIU-2026.2.exe',
        size: '1.2 GB',
        url: 'https://www.jetbrains.com/idea/download/',
      },
      {
        version: 'ultimate',
        os: 'macOS',
        name: 'ideaIU-2026.2-aarch64.dmg',
        size: '1.1 GB',
        url: 'https://www.jetbrains.com/idea/download/',
      },
    ],
    setup: [
      {
        title: '安装与激活',
        desc: '安装后选择合适的主题，使用 JetBrains Toolbox 管理版本更新。',
        code: 'Help → About 查看构建版本',
      },
      {
        title: '绑定本地 JDK',
        desc: '进入 Project Structure，选择已安装的 JDK 17 作为项目 SDK。',
        code: 'File → Project Structure → SDKs → Add JDK',
      },
      {
        title: '导入 Maven 项目',
        desc: '打开含 pom.xml 的目录，等待依赖索引完成后即可运行 Spring Boot。',
        code: 'mvn clean install -DskipTests',
      },
    ],
    docs: [{ label: '官方下载', url: 'https://www.jetbrains.com/idea/download/' }],
  },
  {
    id: 'mysql',
    name: 'MySQL',
    mark: 'MY',
    accent: ['#22d3ee', '#0369a1'],
    category: 'database',
    tagline: '开源关系型数据库',
    desc: '使用最广泛的开源关系型数据库，具备高性能、高可靠性与成熟的运维生态。',
    tags: ['数据库', 'SQL'],
    views: 24310,
    downloads: 9860,
    updated: '2026-10-15',
    official: 'https://dev.mysql.com/downloads/mysql/',
    versions: [
      { key: '8.0', label: 'MySQL 8.0', note: '当前主流版本，推荐使用' },
      { key: '5.7', label: 'MySQL 5.7', note: '兼容老项目' },
    ],
    files: [
      {
        version: '8.0',
        os: 'Windows',
        name: 'mysql-installer-community-8.0.43.0.msi',
        size: '38.7 MB',
        url: 'https://dev.mysql.com/downloads/mysql/',
      },
      {
        version: '8.0',
        os: 'macOS',
        name: 'mysql-8.0.43-macos15-arm64.dmg',
        size: '218 MB',
        url: 'https://dev.mysql.com/downloads/mysql/',
      },
      {
        version: '5.7',
        os: 'Windows',
        name: 'mysql-5.7.44-winx64.zip',
        size: '208 MB',
        url: 'https://dev.mysql.com/downloads/mysql/',
      },
    ],
    setup: [
      {
        title: '安装数据库',
        desc: '选择 Server only 模式安装，记录 root 初始密码并完成服务注册。',
        code: 'mysql --version',
      },
      {
        title: '登录并创建数据库',
        desc: '使用 root 账号登录，创建业务库与专用账号。',
        code: 'mysql -u root -p\nCREATE DATABASE demo DEFAULT CHARACTER SET utf8mb4;',
      },
      {
        title: '配置连接时区与字符集',
        desc: 'Spring Boot 连接串中显式指定时区与字符集，避免乱码与时间偏移。',
        code: 'jdbc:mysql://localhost:3306/demo?useUnicode=true&characterEncoding=utf8&serverTimezone=Asia/Shanghai',
      },
    ],
    docs: [{ label: '官方文档', url: 'https://dev.mysql.com/doc/' }],
  },
  {
    id: 'redis',
    name: 'Redis',
    mark: 'RD',
    accent: ['#fb7185', '#be123c'],
    category: 'database',
    tagline: '内存级缓存数据库',
    desc: '基于内存的高性能键值数据库，常用于缓存、分布式锁、消息队列与会话存储。',
    tags: ['数据库', '缓存'],
    views: 15720,
    downloads: 5140,
    updated: '2026-10-05',
    official: 'https://redis.io/downloads/',
    versions: [
      { key: '7', label: 'Redis 7.2', note: '官方 Linux / Docker 版本' },
      { key: 'win', label: 'Windows 7.2', note: '社区维护的 Windows 移植版' },
    ],
    files: [
      {
        version: 'win',
        os: 'Windows',
        name: 'Redis-x64-7.2.5.zip',
        size: '14.8 MB',
        url: 'https://github.com/tporadowski/redis/releases',
      },
      {
        version: '7',
        os: 'Linux',
        name: 'redis-7.2.5.tar.gz',
        size: '3.2 MB',
        url: 'https://redis.io/downloads/',
      },
      {
        version: '7',
        os: 'Docker',
        name: 'redis:7.2-alpine',
        size: '镜像拉取',
        url: 'https://hub.docker.com/_/redis',
      },
    ],
    setup: [
      {
        title: '启动服务',
        desc: 'Windows 版解压后直接运行 redis-server.exe，Linux 建议使用 systemd 托管。',
        code: 'redis-server.exe redis.windows.conf',
      },
      {
        title: '验证连接',
        desc: '使用 redis-cli 连接并执行 PING，返回 PONG 表示服务正常。',
        code: 'redis-cli -h 127.0.0.1 -p 6379\nPING',
      },
      {
        title: 'Spring Boot 接入',
        desc: '在 application.yml 中配置连接信息，即可使用 RedisTemplate。',
        code: 'spring:\n  data:\n    redis:\n      host: 127.0.0.1\n      port: 6379',
      },
    ],
    docs: [{ label: '官方文档', url: 'https://redis.io/docs/latest/' }],
  },
  {
    id: 'git',
    name: 'Git',
    mark: 'GT',
    accent: ['#f97316', '#c2410c'],
    category: 'vcs',
    tagline: '分布式版本控制系统',
    desc: '开发必备的版本控制工具，支持分支协作、历史追溯与远程仓库同步。',
    tags: ['版本控制', '协作'],
    views: 26780,
    downloads: 11240,
    updated: '2026-10-14',
    official: 'https://git-scm.com/download/win',
    versions: [{ key: 'latest', label: '2.4x', note: '最新稳定版本' }],
    files: [
      {
        version: 'latest',
        os: 'Windows',
        name: 'Git-2.47.0-64-bit.exe',
        size: '62.4 MB',
        url: 'https://git-scm.com/download/win',
      },
      {
        version: 'latest',
        os: 'macOS',
        name: 'git-2.47.0-intel-universal-mavericks.dmg',
        size: '56.1 MB',
        url: 'https://git-scm.com/download/mac',
      },
      {
        version: 'latest',
        os: 'Linux',
        name: 'git-2.47.0.tar.gz（源码包）',
        size: '11.2 MB',
        url: 'https://git-scm.com/download/linux',
      },
    ],
    setup: [
      {
        title: '安装并校验',
        desc: '安装时保持默认配置，安装完成后在终端确认版本号。',
        code: 'git --version',
      },
      {
        title: '配置身份信息',
        desc: '设置全局用户名与邮箱，提交记录将使用该身份信息。',
        code: 'git config --global user.name "your-name"\ngit config --global user.email "you@example.com"',
      },
      {
        title: '生成 SSH 密钥',
        desc: '生成密钥并添加到 GitHub / Gitee，后续推送无需重复输入密码。',
        code: 'ssh-keygen -t ed25519 -C "you@example.com"\ncat ~/.ssh/id_ed25519.pub',
      },
    ],
    docs: [{ label: '官方文档', url: 'https://git-scm.com/doc' }],
  },
  {
    id: 'navicat',
    name: 'Navicat Premium',
    mark: 'NC',
    accent: ['#facc15', '#ca8a04'],
    category: 'database',
    tagline: '多数据库可视化工具',
    desc: '支持 MySQL、PostgreSQL、Redis 等多种数据库的可视化管理工具，数据迁移与同步能力出色。',
    tags: ['数据库', '可视化'],
    views: 13980,
    downloads: 4720,
    updated: '2026-09-26',
    official: 'https://www.navicat.com.cn/download/navicat-premium',
    versions: [
      { key: '17', label: 'Navicat 17', note: '最新版本，界面全面升级' },
      { key: '16', label: 'Navicat 16', note: '稳定老版本' },
    ],
    files: [
      {
        version: '17',
        os: 'Windows',
        name: 'navicat17_premium_cs_x64.exe',
        size: '132 MB',
        url: 'https://www.navicat.com.cn/download/navicat-premium',
      },
      {
        version: '17',
        os: 'macOS',
        name: 'navicat17_premium_cs.dmg',
        size: '164 MB',
        url: 'https://www.navicat.com.cn/download/navicat-premium',
      },
    ],
    setup: [
      {
        title: '安装客户端',
        desc: '下载对应平台安装包并完成安装，首次启动可选择界面语言。',
        code: 'Navicat → 偏好设置 → 语言',
      },
      {
        title: '创建数据库连接',
        desc: '新建 MySQL 连接，填写主机、端口与账号，测试连接成功后保存。',
        code: '主机: 127.0.0.1\n端口: 3306',
      },
      {
        title: '导入 SQL 脚本',
        desc: '右键数据库选择 “运行 SQL 文件”，完成初始化脚本导入。',
        code: '右键库 → 运行 SQL 文件 → 选择 .sql',
      },
    ],
    docs: [{ label: '官方下载', url: 'https://www.navicat.com.cn/download/navicat-premium' }],
  },
  {
    id: 'docker',
    name: 'Docker Desktop',
    mark: 'DK',
    accent: ['#60a5fa', '#1d4ed8'],
    category: 'ops',
    tagline: '容器化运行环境',
    desc: '在本地构建、运行与分发容器，配合 Compose 可一键拉起完整的开发依赖栈。',
    tags: ['部署运维', '容器'],
    views: 17340,
    downloads: 6530,
    updated: '2026-10-07',
    official: 'https://www.docker.com/products/docker-desktop/',
    versions: [{ key: 'latest', label: '4.x', note: 'Windows 需开启 WSL2' }],
    files: [
      {
        version: 'latest',
        os: 'Windows',
        name: 'Docker Desktop Installer.exe',
        size: '578 MB',
        url: 'https://www.docker.com/products/docker-desktop/',
      },
      {
        version: 'latest',
        os: 'macOS',
        name: 'Docker.dmg（Apple Silicon）',
        size: '612 MB',
        url: 'https://www.docker.com/products/docker-desktop/',
      },
    ],
    setup: [
      {
        title: '安装并启用 WSL2',
        desc: 'Windows 环境先启用 WSL2 与虚拟化支持，再安装 Docker Desktop。',
        code: 'wsl --install\nwsl --set-default-version 2',
      },
      {
        title: '校验运行状态',
        desc: '执行 docker version 与 hello-world，确认守护进程可用。',
        code: 'docker version\ndocker run --rm hello-world',
      },
      {
        title: '配置镜像加速',
        desc: '在 Docker Desktop 设置中添加镜像加速地址，重启后生效。',
        code: 'Settings → Docker Engine → registry-mirrors',
      },
    ],
    docs: [{ label: '官方文档', url: 'https://docs.docker.com/desktop/' }],
  },
  {
    id: 'nginx',
    name: 'Nginx',
    mark: 'NX',
    accent: ['#34d399', '#047857'],
    category: 'ops',
    tagline: '高性能 Web 服务器',
    desc: '轻量高效的反向代理与静态资源服务器，常用于前端部署、负载均衡与 HTTPS 接入。',
    tags: ['部署运维', '反向代理'],
    views: 14220,
    downloads: 4860,
    updated: '2026-09-22',
    official: 'https://nginx.org/en/download.html',
    versions: [
      { key: 'stable', label: '1.28 Stable', note: '稳定版，生产环境推荐' },
      { key: 'mainline', label: '1.29 Mainline', note: '主线版本，包含新特性' },
    ],
    files: [
      {
        version: 'stable',
        os: 'Windows',
        name: 'nginx-1.28.0.zip',
        size: '1.8 MB',
        url: 'https://nginx.org/en/download.html',
      },
      {
        version: 'stable',
        os: 'Linux',
        name: 'nginx-1.28.0.tar.gz',
        size: '1.3 MB',
        url: 'https://nginx.org/en/download.html',
      },
      {
        version: 'mainline',
        os: 'Linux',
        name: 'nginx-1.29.0.tar.gz',
        size: '1.4 MB',
        url: 'https://nginx.org/en/download.html',
      },
    ],
    setup: [
      {
        title: '启动服务',
        desc: 'Windows 版解压后执行 start nginx，Linux 建议使用包管理器安装。',
        code: 'start nginx\nnginx -v',
      },
      {
        title: '配置静态站点',
        desc: '将构建产物放入 html 目录，或修改 root 指向 dist 目录。',
        code: 'server {\n  listen 80;\n  root /var/www/site;\n  index index.html;\n}',
      },
      {
        title: '重载配置',
        desc: '修改配置后先校验语法，再平滑重载，避免中断服务。',
        code: 'nginx -t\nnginx -s reload',
      },
    ],
    docs: [{ label: '官方文档', url: 'https://nginx.org/en/docs/' }],
  },
  {
    id: 'postman',
    name: 'Postman',
    mark: 'PM',
    accent: ['#fb923c', '#ea580c'],
    category: 'devtool',
    tagline: 'API 调试协作平台',
    desc: '接口调试与文档协作工具，支持环境变量、自动化测试与团队共享集合。',
    tags: ['开发工具', 'API'],
    views: 11860,
    downloads: 3920,
    updated: '2026-09-18',
    official: 'https://www.postman.com/downloads/',
    versions: [{ key: 'latest', label: 'Latest', note: '桌面端自动更新' }],
    files: [
      {
        version: 'latest',
        os: 'Windows',
        name: 'Postman-win64-Setup.exe',
        size: '186 MB',
        url: 'https://www.postman.com/downloads/',
      },
      {
        version: 'latest',
        os: 'macOS',
        name: 'Postman-darwin-arm64.zip',
        size: '214 MB',
        url: 'https://www.postman.com/downloads/',
      },
    ],
    setup: [
      {
        title: '安装客户端',
        desc: '下载安装并登录账号，便于同步集合与团队协作。',
        code: 'Postman → Sign in',
      },
      {
        title: '创建环境变量',
        desc: '为 local / test / prod 分别建立环境，接口地址使用 {{baseUrl}} 引用。',
        code: 'baseUrl = http://localhost:8080',
      },
      {
        title: '编写测试脚本',
        desc: '在 Tests 面板断言状态码与响应字段，配合集合 Runner 批量回归。',
        code: 'pm.test("status 200", () => {\n  pm.response.to.have.status(200);\n});',
      },
    ],
    docs: [{ label: '官方文档', url: 'https://learning.postman.com/docs/' }],
  },
  {
    id: 'apifox',
    name: 'Apifox',
    mark: 'AF',
    accent: ['#a78bfa', '#4f46e5'],
    category: 'devtool',
    tagline: '接口设计一体化工具',
    desc: '集 API 文档、调试、Mock 与自动化测试于一体，支持前后端协作与数据模型复用。',
    tags: ['开发工具', 'API'],
    views: 8940,
    downloads: 2760,
    updated: '2026-09-12',
    official: 'https://apifox.com/download',
    versions: [{ key: 'latest', label: 'Latest', note: '桌面端自动更新' }],
    files: [
      {
        version: 'latest',
        os: 'Windows',
        name: 'Apifox-windows-latest.exe',
        size: '142 MB',
        url: 'https://apifox.com/download',
      },
      {
        version: 'latest',
        os: 'macOS',
        name: 'Apifox-mac-arm64.dmg',
        size: '156 MB',
        url: 'https://apifox.com/download',
      },
      {
        version: 'latest',
        os: 'Linux',
        name: 'Apifox-linux-x86_64.AppImage',
        size: '148 MB',
        url: 'https://apifox.com/download',
      },
    ],
    setup: [
      {
        title: '安装并登录',
        desc: '下载桌面端，使用账号登录后创建团队与项目。',
        code: 'Apifox → 新建项目',
      },
      {
        title: '导入接口定义',
        desc: '支持 OpenAPI / Swagger 导入，快速生成可调试的接口文档。',
        code: '项目设置 → 导入数据 → OpenAPI',
      },
      {
        title: '配置 Mock 与测试',
        desc: '为接口开启 Mock 规则，前端可在后端未完成前联调。',
        code: '接口详情 → Mock → 启用',
      },
    ],
    docs: [{ label: '官方文档', url: 'https://apifox.com/help/' }],
  },
]

export const featuredToolIds = ['nodejs', 'jdk', 'mysql', 'vscode', 'git', 'docker']

export const getToolById = (id) => tools.find((tool) => tool.id === id)

export const getToolsByIds = (ids) => ids.map(getToolById).filter(Boolean)

export const getRelatedTools = (tool, limit = 3) =>
  tools
    .filter((item) => item.id !== tool.id)
    .sort((a, b) => {
      const aSame = a.category === tool.category ? 0 : 1
      const bSame = b.category === tool.category ? 0 : 1
      return aSame - bSame || b.downloads - a.downloads
    })
    .slice(0, limit)

export const formatCount = (value) => {
  if (value >= 10000) return `${(value / 1000).toFixed(1)}k`
  if (value >= 1000) return `${(value / 1000).toFixed(1)}k`
  return String(value)
}

export const formatNumber = (value) => value.toLocaleString('en-US')
