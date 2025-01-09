
# Astro Notion Blog 技术实现指南

## 数据同步机制

### 1. 同步触发方式

项目支持三种同步触发方式：

1. **代码推送触发**
   - 当代码推送到 main 分支时自动触发
   - 通过 GitHub Actions 执行同步流程

2. **定时触发**
   - 每天北京时间 8:00 和 20:00 自动同步
   - 使用 GitHub Actions 的 schedule 功能
   ```yaml
   schedule:
     - cron: '0 0,12 * * *'  # UTC 时间
   ```

3. **手动触发**
   - 在 GitHub Actions 页面点击 "Run workflow"
   - 用于需要立即同步的场景

### 2. 数据获取流程

#### 2.1 内容获取

主要通过 `scripts/blog-contents-cache.cjs` 实现：
```javascript
const getAllPages = async () => {
  const params = {
    database_id: process.env.DATABASE_ID,
    filter: {
      and: [
        // 只获取已发布的文章
        {
          property: 'Published',
          checkbox: { equals: true }
        },
        // 只获取发布日期在当前时间之前的文章
        {
          property: 'Date',
          date: {
            on_or_before: new Date().toISOString()
          }
        }
      ]
    }
  };
}
```

#### 2.2 Worker 定时检查

使用 Cloudflare Worker 定时检查更新：
```typescript
async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext) {
  try {
    // 检查是否有已发布的内容
    const notion = new Client({ auth: env.NOTION_API_SECRET });
    const response = await notion.databases.query({
      database_id: env.DATABASE_ID,
      filter: {
        property: 'Published',
        checkbox: { equals: true }
      }
    });

    // 有新内容时触发重建
    if (response.results.length > 0) {
      await fetch('YOUR_DEPLOY_HOOK_URL', { method: 'POST' });
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
```

### 3. 同步的数据内容

#### 3.1 基础数据
- 页面 ID
- 最后编辑时间
- 文章别名（slug）
- 标题
- 发布日期
- 标签
- 文章内容

#### 3.2 资源文件
通过 Astro 集成自动下载和同步：
```javascript
integrations: [
  CoverImageDownloader(),      // 封面图片
  CustomIconDownloader(),      // 自定义图标
  FeaturedImageDownloader(),   // 特色图片
  PublicNotionCopier(),       // Notion 公共资源
]
```

### 4. 缓存机制

#### 4.1 缓存命令
```bash
# 构建时获取缓存
npm run build:cached

# 获取内容缓存
npm run cache:fetch

# 清除缓存
npm run cache:purge
```

#### 4.2 缓存存储
- 文章内容缓存在 `tmp` 目录
- 图片资源缓存在 `public/notion` 目录

### 5. 环境变量配置

#### 5.1 必需变量
- `NOTION_API_SECRET`: Notion API 密钥
- `DATABASE_ID`: Notion 数据库 ID
- `CLOUDFLARE_API_TOKEN`: Cloudflare API Token

#### 5.2 可选变量
- `SITE_URL`: 自定义域名
- `CUSTOM_DOMAIN`: 自定义域名
- `BASE_PATH`: 子目录路径
- `CACHE_CONCURRENCY`: 同步并发数

### 6. 部署流程

1. **准备工作**
   - 创建必要的目录
   - 配置 npm registry
   - 安装依赖

2. **构建过程**
   - 测试 Notion 连接
   - 构建 worker
   - 获取 Notion 内容
   - 构建静态页面

3. **部署步骤**
   - 上传 worker
   - 部署页面到 Cloudflare Pages

### 7. 注意事项

1. **类型检查警告**
   - 类型定义文件缺失的警告不影响实际运行
   - 可以通过安装相应的 @types 包解决

2. **依赖包警告**
   - 部分依赖包的废弃警告不影响功能
   - 等待依赖包自行更新即可

3. **权限要求**
   - Cloudflare API Token 需要特定权限
   - Notion 集成需要数据库访问权限

## 参考文档

- [Astro 文档](https://astro.build)
- [Notion API 文档](https://developers.notion.com)
- [Cloudflare Pages 文档](https://pages.cloudflare.com)



