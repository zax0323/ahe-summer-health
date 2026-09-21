# Vue Basic Starter

一个结构分层清晰的 Vue 3 + Vite 基础前端项目，适合作为中小型业务项目起点。

## 技术栈

- Vue 3
- Vite
- Vue Router
- Pinia
- ESLint
- Prettier

## 目录结构

```text
src/
├─ app/              # 应用级初始化、插件注册
├─ assets/           # 图片、字体等静态资源
├─ components/       # 可复用组件
│  └─ common/        # 通用基础组件
├─ layouts/          # 页面布局骨架
├─ pages/            # 路由页面
├─ router/           # 路由配置与导航守卫
├─ services/         # HTTP 请求与 API 封装
├─ stores/           # Pinia 状态管理
├─ styles/           # 全局样式、变量、重置
└─ utils/            # 通用工具函数
```

## 快速开始

```bash
npm install
npm run dev
```

## 发布成网页

项目已经配置了 GitHub Pages 自动部署。上传到 GitHub 后，在仓库的 `Settings -> Pages` 中把 `Source` 设置为 `GitHub Actions`，然后推送到 `main` 分支即可自动发布。

发布完成后，网页地址通常是：

```text
https://你的用户名.github.io/仓库名/
```

## 打包成桌面应用

项目使用 Electron 打包，Windows 和 macOS 都可以运行。

### Windows

在 Windows 电脑的项目目录执行：

```bash
npm install
npm run desktop:win
```

生成文件在 `release/`：

- `*.exe` 安装包
- `*-portable.exe` 免安装版

### macOS

在 Mac 电脑的项目目录执行：

```bash
npm install
npm run desktop:mac
```

生成文件在 `release/`：

- `*.dmg` 安装镜像
- `*.zip` 压缩版应用

macOS 安装包需要在 macOS 上构建。未签名的测试包第一次打开时，可能需要在“系统设置 -> 隐私与安全性”中允许打开；正式发布需要使用 Apple Developer 证书签名和公证。

### 没有 Mac 时

把项目上传到 GitHub，在 Actions 中手动运行 `Build Desktop Apps`，下载 `windows-app` 和 `macos-app` 两个构建产物。工作流文件位于 `.github/workflows/desktop-build.yml`。

## 常用命令

```bash
npm run dev       # 本地开发
npm run build     # 生产构建
npm run preview   # 预览构建产物
npm run lint      # 代码检查
npm run format    # 格式化代码
```

## 开发建议

- 页面组件放在 `src/pages`，可复用 UI 放在 `src/components`。
- 接口请求统一通过 `src/services/http.js` 封装。
- 跨页面共享状态放在 `src/stores`。
- 业务无关的纯函数放在 `src/utils`。
