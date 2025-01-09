# Astro Notion Blog

基于 Astro 和 Notion API 构建的博客系统。支持自动部署到 Cloudflare Pages。

🌏 [在线演示](https://prompt.ouraihub.com/)

## 特性

- 🚀 基于 Astro 构建，性能优异
- 📝 使用 Notion 作为 CMS
- 🔄 自动同步 Notion 内容
- ⚡ 部署在 Cloudflare Pages
- 🕒 支持定时更新（每天早 8 点和晚 8 点）

## 文档

详细的配置和使用说明请查看以下文档：

- [环境配置指南](docs/SETUP.md) - 包含开发环境要求、Notion配置、Cloudflare配置等
- [代码同步配置](docs/SYNC.md) - 如何配置代码同步到其他平台（如Gitee、GitCode等）
- [实现细节说明](docs/IMPLEMENTATION.md) - 项目的技术实现细节

## 部署步骤

### 1. Fork 项目

点击右上角的 Fork 按钮，将项目复制到你的 GitHub 账号下。

### 2. 配置 Notion

1. 创建 Notion 集成：
   - 访问 [Notion Developers](https://www.notion.so/my-integrations)
   - 点击 "New integration"
   - 填写名称（如 "My Blog"）
   - 选择关联的工作区
   - 点击 "Submit" 创建集成
   - 复制显示的 "Internal Integration Token"

2. 获取数据库 ID：
   - 在 Notion 中打开你的数据库页面
   - 从地址栏复制数据库 ID（32位字符）
   - 格式：`https://www.notion.so/{workspace}/{database_id}?v={view_id}`

3. 授权集成访问：
   - 在数据库页面点击右上角的 "•••"
   - 选择 "Add connections"
   - 找到并选择你刚创建的集成

### 3. 配置 GitHub Secrets

在你 fork 的仓库中添加以下 Secrets：

1. `CLOUDFLARE_API_TOKEN`：
   - 访问 [Cloudflare Dashboard](https://dash.cloudflare.com/profile/api-tokens)
   - 创建新的 API Token
   - 选择 "Edit Cloudflare Workers" 模板
   - 添加 "Pages" 权限
   - 需要以下权限：
     * Account.Workers Scripts:Edit
     * Account.Workers Routes:Edit
     * Account.Pages:Edit
     * Account.Account Settings:Read

2. `NOTION_API_SECRET`：
   - 使用之前创建的 Notion Integration Token

3. `DATABASE_ID`：
   - 使用之前复制的 Notion 数据库 ID

### 4. 配置环境变量（可选）

在 GitHub 仓库的 Settings -> Environments -> Production 中添加以下环境变量：

1. `SITE_URL`：你的自定义域名（如果有）
2. `CUSTOM_DOMAIN`：你的自定义域名（如果有）
3. `BASE_PATH`：如果部署在子目录，添加路径（如 `/blog`）
4. `CACHE_CONCURRENCY`：Notion 内容同步的并发数（默认为 5）

### 5. 启用 GitHub Actions

1. 访问你 fork 的仓库的 Actions 页面
2. 点击 "I understand my workflows, go ahead and enable them"
3. GitHub Actions 将自动运行部署流程
4. 工作流程会：
   - 每次推送到 main 分支时自动部署
   - 每天早 8 点和晚 8 点自动同步 Notion 内容
   - 支持手动触发部署（在 Actions 页面点击 "Run workflow"）

部署完成后，你可以在 Cloudflare Pages 中找到你的站点地址。

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

在 Cloudflare Pages 中配置自定义域名。

## 许可证

MIT

## 致谢

- [Astro](https://astro.build)
- [Notion API](https://developers.notion.com)
- [Cloudflare Pages](https://pages.cloudflare.com)
