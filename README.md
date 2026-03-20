# sub-web-modify

一个纯净版 `SubConverter` 前端。

这个项目只做前端页面，负责：

- 输入订阅链接
- 生成转换后的订阅地址
- 可选生成短链接
- 可选上传远程配置和脚本
- 解析已有订阅链接
- 支持亮色 / 暗色主题

已经移除项目中的广告弹窗、推广入口、导流下载页和无关静态资源。当前配置也做了重构：

- `.env` 只放简单、明确、适合环境变量的配置
- [subweb.config.js](D:/下载/sub-web-modify-master/src/config/subweb.config.js) 负责可读性更强的列表型配置和默认项

这样做的原因很直接：

- 后端默认值和后端下拉列表不再写两份
- 远程配置默认值和远程配置列表不再写两份
- 短链默认值和短链服务列表不再写两份
- `.env` 不再塞满超长 JSON，阅读和维护都更轻松

## 现在应该改哪两个文件

### 1. `.env`

适合放：

- 站点标题
- 站点描述
- 站点关键词
- 上传配置服务地址

当前模板见：

- [.env.example](D:/下载/sub-web-modify-master/.env.example)

### 2. `subweb.config.js`

适合放：

- 客户端类型下拉列表
- 后端选择列表
- 短链服务列表
- 远程配置列表
- 默认表单值
- 文档链接

主配置文件见：

- [subweb.config.js](D:/下载/sub-web-modify-master/src/config/subweb.config.js)

如果你要改“后端列表、默认后端、远程配置列表、默认远程配置、短链列表、默认短链”，优先改这个文件。

## 默认值怎么指定

列表项支持 `default: true`。

例如后端：

```js
backendOptions: [
  {
    label: "主后端",
    value: "https://sub.example.com",
    default: true,
  },
  {
    label: "备用后端",
    value: "https://sub-backup.example.com",
  },
];
```

例如远程配置：

```js
remoteConfigOptions: [
  {
    label: "基础规则",
    options: [
      {
        label: "默认规则",
        value: "https://example.com/default.ini",
        default: true,
      },
      {
        label: "精简规则",
        value: "https://example.com/mini.ini",
      },
    ],
  },
];
```

如果没写 `default: true`：

- 普通列表会自动取第一个
- 远程配置分组会自动取第一个分组里的第一个选项

## 先搞清楚这项目依赖什么

这个仓库是前端，不自带 `SubConverter` 后端。

你至少需要在 [subweb.config.js](D:/下载/sub-web-modify-master/src/config/subweb.config.js) 里配置 1 个可访问的后端地址。

如果你还想使用以下功能，还需要额外服务：

- 短链接：在 `shortUrlOptions` 中配置服务地址
- 配置上传 / 脚本上传：在 `.env` 中配置 `VUE_APP_CONFIG_UPLOAD_BACKEND`

如果这些可选服务没准备好，也没关系：

- 页面会自动隐藏对应按钮
- 基础订阅转换功能仍然可用

## 推荐环境

建议使用：

- Node.js 20 或 22
- npm 10+

说明：

- Node.js 24 下也能构建，但依赖会有 `engine` 警告
- 如果你想部署过程最稳，优先用 Node.js 20/22

## 目录说明

- [src/views/Subconverter.vue](D:/下载/sub-web-modify-master/src/views/Subconverter.vue)：主页面
- [src/config/app.js](D:/下载/sub-web-modify-master/src/config/app.js)：合并 `.env` 和 `subweb.config.js`
- [src/config/subweb.config.js](D:/下载/sub-web-modify-master/src/config/subweb.config.js)：主要可读配置文件
- [src/config/subconverter.js](D:/下载/sub-web-modify-master/src/config/subconverter.js)：默认表单归一化
- [src/utils/subconverter.js](D:/下载/sub-web-modify-master/src/utils/subconverter.js)：订阅链接生成、解析、上传 payload
- [src/utils/theme.js](D:/下载/sub-web-modify-master/src/utils/theme.js)：主题切换
- [.env.example](D:/下载/sub-web-modify-master/.env.example)：环境变量模板

## 从零开始部署

### 1. 下载项目

如果你会用 Git：

```bash
git clone <你的仓库地址>
cd sub-web-modify
```

如果你不会用 Git：

1. 在代码托管平台下载 ZIP
2. 解压到本地目录
3. 用终端进入项目目录

### 2. 准备配置

先复制环境变量模板。

Linux / macOS:

```bash
cp .env.example .env
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

### 3. 修改 `.env`

最少改这几个：

- `VUE_APP_SITE_TITLE`
- `VUE_APP_SITE_DESCRIPTION`

如果你要启用上传配置功能，再改：

- `VUE_APP_CONFIG_UPLOAD_BACKEND`

### 4. 修改 `subweb.config.js`

最少确认这几块：

- `backendOptions`
- `shortUrlOptions`
- `remoteConfigOptions`

如果你只需要最基础功能，至少保证：

- `backendOptions` 里有一个有效后端

### 5. 安装依赖

```bash
npm install
```

### 6. 本地启动

```bash
npm run serve
```

启动后访问终端里显示的地址，通常是：

```text
http://localhost:8080
```

### 7. 生产构建

```bash
npm run build
```

构建完成后，静态文件会输出到 `dist/`。

## 三种最常见部署方式

### 方式一：直接本地运行

适合：

- 自己用
- 局域网测试
- 先确认配置是否正常

命令：

```bash
npm install
npm run serve
```

### 方式二：构建后丢给 Nginx / Caddy / 宝塔

适合：

- 有服务器
- 已经会部署静态网站

步骤：

1. 执行 `npm run build`
2. 把 `dist/` 下的文件上传到站点目录
3. 配置 Web 服务器把所有前端路由回退到 `index.html`

Nginx 示例：

```nginx
server {
    listen 80;
    server_name _;
    root /var/www/sub-web-modify;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### 方式三：Docker 部署

适合：

- 不想折腾本地 Node 环境
- 希望部署步骤固定

先自行构建镜像：

```bash
docker build -t sub-web-modify:latest .
```

运行容器：

```bash
docker run -d \
  --name sub-web-modify \
  -p 8080:80 \
  sub-web-modify:latest
```

如果你希望在构建前先修改配置，顺序是：

1. 改 `.env`
2. 改 `subweb.config.js`
3. 再 `docker build`

## 最常改的地方

### 修改页面标题和描述

改 `.env`：

```env
VUE_APP_SITE_TITLE="我的订阅转换站"
VUE_APP_SITE_DESCRIPTION="公司内部使用的纯净版订阅转换前端"
```

### 修改后端列表

改 [subweb.config.js](D:/下载/sub-web-modify-master/src/config/subweb.config.js)：

```js
backendOptions: [
  {
    label: "主后端",
    value: "https://sub.example.com",
    default: true,
  },
  {
    label: "备用后端",
    value: "https://sub-backup.example.com",
  },
];
```

### 修改远程配置列表

改 [subweb.config.js](D:/下载/sub-web-modify-master/src/config/subweb.config.js)：

```js
remoteConfigOptions: [
  {
    label: "基础规则",
    options: [
      {
        label: "默认规则",
        value: "https://example.com/default.ini",
        default: true,
      },
      {
        label: "精简规则",
        value: "https://example.com/mini.ini",
      },
    ],
  },
];
```

### 不想显示短链接功能

把 [subweb.config.js](D:/下载/sub-web-modify-master/src/config/subweb.config.js) 中这项改为空数组：

```js
shortUrlOptions: [];
```

### 不想显示上传配置功能

把 `.env` 中这项置空：

```env
VUE_APP_CONFIG_UPLOAD_BACKEND=""
```

## 常见问题

### 1. 页面能打开，但“后端不可用”

排查顺序：

1. 先检查 [subweb.config.js](D:/下载/sub-web-modify-master/src/config/subweb.config.js) 里的默认后端是不是有效
2. 手动打开 `你的后端地址/version`
3. 检查后端是否允许当前前端域名跨域访问
4. 检查是不是 HTTPS 页面调用了 HTTP 后端

### 2. 短链接按钮不见了

原因通常是：

- `shortUrlOptions` 是空数组
- 或者列表里没有有效的 `value`

### 3. 上传配置按钮不见了

原因通常是：

- `.env` 中没有配置 `VUE_APP_CONFIG_UPLOAD_BACKEND`

### 4. 我改了配置但页面没变化

前端配置在启动 / 构建时读取。

也就是说你改完 `.env` 或 `subweb.config.js` 以后，需要重新执行：

```bash
npm run serve
```

或重新构建：

```bash
npm run build
```

## 当前配置结构为什么更合理

以前的问题：

- 默认值和列表值写了两份
- `.env` 里塞了很多长 JSON
- 新手很难一眼看懂该改哪

现在的结构：

- `.env` 负责简单配置
- `subweb.config.js` 负责列表和默认项
- 默认值通过 `default: true` 标记
- 配置来源清晰，不再重叠

## 当前做过的优化

- 删除首页 3D 背景脚本和旧全局 CSS
- 删除无用图标系统与历史静态资源
- Element UI 改为按需引入
- 配置结构重构，去掉 `.env` 中的重叠项
- README 改成可直接照做的部署文档

## 开发命令

```bash
npm install
npm run serve
npm run build
```
