
# 环境配置文档


```markdown
# 环境配置文档

## 1. 开发环境要求

### 1.1 基础环境
- Node.js >= 20.18.1
- npm >= 9.0.0
- Git

### 1.2 账号准备
- GitHub 账号
- Notion 账号
- Cloudflare 账号

## 2. Notion 配置

### 2.1 创建数据库
1. 在 Notion 中创建一个新的数据库
2. 配置以下必需属性：
   - `Title`：标题（默认属性）
   - `Published`：是否发布（Checkbox 类型）
   - `Date`：发布日期（Date 类型）
   - `Slug`：文章别名（Text 类型）
   - `Tags`：标签（Multi-select 类型）

### 2.2 配置 Notion API
1. 访问 [Notion Developers](https://www.notion.so/my-integrations)
2. 创建新的集成（New Integration）
3. 设置基本信息：
   - Name：自定义名称（如：My Blog）
   - Associated workspace：选择数据库所在的工作区
4. 获取 Integration Token
5. 在数据库页面添加集成权限：
   - 点击右上角 "•••"
   - 选择 "Add connections"
   - 选择刚创建的集成

## 3. Cloudflare 配置

### 3.1 创建 API Token
1. 访问 [Cloudflare Dashboard](https://dash.cloudflare.com/profile/api-tokens)
2. 点击 "Create Token"
3. 选择 "Edit Cloudflare Workers" 模板
4. 配置权限：
   - Account.Workers Scripts: Edit
   - Account.Workers Routes: Edit
   - Account.Pages: Edit
   - Account.Account Settings: Read

### 3.2 Pages 配置
1. 在 Cloudflare Dashboard 中进入 Pages
2. 确保账户已启用 Pages 功能
3. （可选）配置自定义域名

## 4. 本地开发环境配置

### 4.1 安装依赖
```bash
# 克隆项目
git clone https://github.com/your-username/astro-notion-blog.git
cd astro-notion-blog

# 安装依赖
npm install

# 安装 worker 依赖
cd worker
npm install
cd ..
```

### 4.2 环境变量配置
在项目根目录创建 `.env` 文件：
```env
# 必需变量
NOTION_API_SECRET=your_notion_api_secret
DATABASE_ID=your_database_id

# 可选变量
SITE_URL=your_custom_domain
CUSTOM_DOMAIN=your_custom_domain
BASE_PATH=/blog  # 如果部署在子目录
CACHE_CONCURRENCY=5  # 同步并发数
```

### 4.3 Worker 配置
编辑 `worker/wrangler.toml`：
```toml
[vars]
NOTION_API_SECRET = "your_notion_api_secret"
DATABASE_ID = "your_database_id"
```

## 5. 开发工具配置

### 5.1 VS Code 推荐配置
安装以下扩展：
- ESLint
- Prettier
- Astro
- TypeScript

### 5.2 Git 配置
```bash
# 配置 Git 忽略文件
cat >> .gitignore << EOL
.env
.env.production
dist/
.output/
node_modules/
tmp/*
!tmp/.gitkeep
public/notion/*
!public/notion/.gitkeep
EOL
```

## 6. 验证配置

### 6.1 验证 Notion 连接
```bash
# 测试内容获取
npm run cache:fetch
```

### 6.2 验证开发环境
```bash
# 启动开发服务器
npm run dev
```

### 6.3 验证构建
```bash
# 测试构建
npm run build:cached
```

## 7. 常见问题

### 7.1 依赖安装失败
- 检查 Node.js 版本
- 清除 npm 缓存：`npm cache clean --force`
- 使用 `npm install --legacy-peer-deps`

### 7.2 Notion API 错误
- 验证 Integration Token 权限
- 确认数据库访问权限
- 检查数据库 ID 格式

### 7.3 Worker 部署失败
- 验证 Cloudflare API Token 权限
- 检查 wrangler.toml 配置
- 确认账户已启用 Workers

## 8. 其他说明

### 8.1 开发模式
- 使用 `npm run dev` 启动本地开发服务器
- 默认访问地址：`http://localhost:4321`

### 8.2 缓存管理
- `npm run cache:fetch`：获取最新内容
- `npm run cache:purge`：清除缓存
- 缓存位置：`tmp/` 和 `public/notion/`

### 8.3 类型检查
- 运行 `npm run lint` 检查代码
- 使用 `npm run format` 格式化代码
```


