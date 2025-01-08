# Astro Notion Blog

基于 Astro 和 Notion API 构建的博客系统。支持自动部署到 Cloudflare Pages。

## 特性

- 🚀 基于 Astro 构建，性能优异
- 📝 使用 Notion 作为 CMS
- 🔄 自动同步 Notion 内容
- ⚡ 部署在 Cloudflare Pages
- 🕒 支持定时更新（每天早 8 点和晚 8 点）

## 部署步骤

### 1. Fork 项目

点击右上角的 Fork 按钮，将项目复制到你的 GitHub 账号下。

### 2. 配置 Notion

1. 创建一个 [Notion 集成](https://developers.notion.com/docs/create-a-notion-integration)
2. 复制 "Internal Integration Token" 作为 `NOTION_API_SECRET`
3. 在 Notion 中创建一个数据库，并[与集成共享](https://developers.notion.com/docs/create-a-notion-integration#step-2-share-a-database-with-your-integration)
4. 复制数据库 ID 作为 `DATABASE_ID`

### 3. 配置 Cloudflare

1. 注册 [Cloudflare 账号](https://dash.cloudflare.com/sign-up)
2. 创建 API Token：
   - 进入 [API Tokens 页面](https://dash.cloudflare.com/profile/api-tokens)
   - 创建一个新的 Token，确保有 Pages 的编辑权限
   - 复制生成的 Token 作为 `CLOUDFLARE_API_TOKEN`

### 4. 配置 GitHub Secrets

在你 fork 的仓库中添加以下 Secrets：

1. 进入 Settings -> Secrets and variables -> Actions
2. 添加以下 secrets：
   - `NOTION_API_SECRET`: Notion API 密钥
   - `DATABASE_ID`: Notion 数据库 ID
   - `CLOUDFLARE_API_TOKEN`: Cloudflare API Token

### 5. 启用 GitHub Actions

工作流会自动：
- 在代码推送时触发部署
- 每天早 8 点和晚 8 点自动更新内容
- 支持手动触发部署

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建
npm run build

# 预览构建结果
npm run preview
```

## 环境变量

创建 `.env` 文件：

```env
NOTION_API_SECRET=your_notion_api_secret
DATABASE_ID=your_database_id
```

## 自定义域名

1. 在 Cloudflare Pages 中配置自定义域名
2. 更新 `SITE_URL` 环境变量（可选）

## 许可证

MIT

## 致谢

- [Astro](https://astro.build)
- [Notion API](https://developers.notion.com)
- [Cloudflare Pages](https://pages.cloudflare.com)
