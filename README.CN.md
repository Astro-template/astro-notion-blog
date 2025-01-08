# astro-notion-blog

[English](README.md) | 简体中文

[![GitHub stars](https://img.shields.io/github/stars/otoyo/astro-notion-blog)](https://github.com/otoyo/astro-notion-blog/stargazers)
[![GitHub license](https://img.shields.io/github/license/otoyo/astro-notion-blog)](https://github.com/otoyo/astro-notion-blog/blob/main/LICENSE)

<img src="https://user-images.githubusercontent.com/1063435/213838069-c9654c32-ec9b-4e82-a3b5-2acbd665b16a.png" width="480">

astro-notion-blog 让你能够使用 [Notion](https://www.notion.so/) 创建博客，并生成静态网站，实现超快的页面访问速度。

## 特点

- :rocket: **超快的**页面加载速度
- :pencil: 使用 **Notion** 编写博客内容
- :hammer_and_wrench: 可以**自定义**网站外观
- :white_check_mark: 使用**官方 Notion API**

## 部署步骤

### 前提条件

- [Notion](https://www.notion.so/) 账号
- GitHub 账号
- Node.js v20.18.1 或更高版本

### 详细步骤

1. 如果你喜欢这个项目，别忘了给它一个 star！:wink:

2. 复制[博客模板](https://otoyo.notion.site/e2c5fa2e8660452988d6137ba57fd974?v=abe305cd8b3d467285e91a2a85f4d8de)到你的 Notion 工作区。

3. 复制页面(数据库)后，你可以通过修改图标、标题和描述来自定义它。

4. 获取 `DATABASE_ID`：
   - 打开你复制的数据库页面
   - 网址格式为 https://notion.so/your-account/<这里是DATABASE_ID>?v=xxxx
   - 复制并保存这个 ID

5. 创建 Notion 集成：
   - 访问 [创建集成页面](https://developers.notion.com/docs/create-a-notion-integration#step-1-create-an-integration)
   - 创建一个集成并保存 "Internal Integration Token" 作为 `NOTION_API_SECRET`

6. 将数据库与集成连接：
   - 在 Notion 中打开你的数据库
   - 点击右上角的 "Share" 按钮
   - 点击 "Add connections"
   - 选择你刚才创建的集成

7. Fork 这个仓库：
   - 点击页面右上角的 "Fork" 按钮
   - 选择你的账号

8. 配置 GitHub Pages：
   - 进入你 fork 的仓库的 Settings
   - 在 "Secrets and variables" -> "Actions" 下添加以下 secrets：
     - `NOTION_API_SECRET`: 你的 Notion API 密钥
     - `DATABASE_ID`: 你的 Notion 数据库 ID
   
9. 启用 GitHub Pages：
   - 在仓库 Settings 中找到 "Pages" 选项
   - "Source" 选择 "Deploy from a branch"
   - "Branch" 选择 "gh-pages"（如果没有这个分支，第一次部署后会自动创建）
   - 点击 "Save"

10. 等待部署：
    - 第一次部署会在你推送到 main 分支后自动进行
    - 部署完成后，你可以通过 `https://<你的用户名>.github.io/<仓库名>/` 访问你的博客

### 自动部署说明

本项目配置了 GitHub Actions 自动部署：
- 每天北京时间早上 8:00 自动部署
- 每天北京时间晚上 20:00 自动部署
- 当你推送到 main 分支时自动部署
- 可以在 GitHub Actions 页面手动触发部署

### 自定义域名（可选）

如果你想使用自定义域名：
1. 在你的域名服务商处添加一个 CNAME 记录，指向 `<你的用户名>.github.io`
2. 在仓库的 Settings -> Pages 中的 "Custom domain" 填入你的域名
3. 或者在 `.github/workflows/deploy.yml` 中取消注释并修改 `cname` 配置：
   ```yaml
   - name: Deploy to GitHub Pages
     uses: peaceiris/actions-gh-pages@v3
     with:
       github_token: ${{ secrets.GITHUB_TOKEN }}
       publish_dir: ./dist
       cname: your-custom-domain.com  # 替换为你的域名
   ```

### 本地开发

1. 克隆你 fork 的仓库：
```bash
git clone https://github.com/<你的用户名>/astro-notion-blog.git
cd astro-notion-blog
```

2. 设置环境变量：
```bash
export NOTION_API_SECRET=<你的_NOTION_API_SECRET>
export DATABASE_ID=<你的_DATABASE_ID>
```

3. 安装依赖并启动开发服务器：
```bash
npm install
npm run dev
```

4. 在浏览器中打开 [http://localhost:4321](http://localhost:4321)




