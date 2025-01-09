# 代码同步配置指南

本项目支持自动同步代码到多个代码托管平台（如 Gitee、GitCode、Coding 等）。

## 1. 配置步骤

### 1.1 配置 GitHub Secrets

1. 在 GitHub 仓库中进入 Settings -> Secrets and variables -> Actions
2. 点击 "New repository secret"
3. 名称填写: `SYNC_CONFIG`
4. 值填写以下配置内容:

```yaml
# 代码同步配置
repositories:
  gitee:  # 平台标识符
    enabled: true  # 是否启用同步
    username: your-gitee-username  # 平台用户名
    repo: your-repo-name  # 仓库名称
    token: your-gitee-token  # 访问令牌
    domain: gitee.com  # 平台域名
    
  gitcode:
    enabled: true
    username: your-gitcode-username
    repo: your-repo-name
    token: your-gitcode-token
    domain: gitcode.com
    
  coding:
    enabled: false  # 设置 false 可暂时禁用某个平台的同步
    username: your-coding-username
    repo: your-coding-repo-path
    token: your-coding-token
    domain: e.coding.net
```

## 2. 获取访问令牌

### 2.1 国内平台

#### Gitee
1. 访问 https://gitee.com/profile/personal_access_tokens
2. 点击 "生成新令牌"
3. 勾选 "repo" 权限
4. 生成并复制令牌

#### GitCode (CSDN)
1. 访问 https://gitcode.net/-/profile/personal_access_tokens
2. 设置令牌名称和过期时间
3. 勾选 "api"、"read_repository"、"write_repository" 权限
4. 点击创建并保存令牌

#### Coding (腾讯)
1. 访问 https://coding.net/user/account/setting/tokens
2. 点击 "新建访问令牌"
3. 选择 "project:depot" 权限
4. 创建并复制令牌

#### JiHuLab (极狐)
1. 访问 https://jihulab.com/-/profile/personal_access_tokens
2. 设置令牌名称和过期时间
3. 勾选 "api"、"read_repository"、"write_repository" 权限
4. 创建令牌

#### 阿里云代码托管
1. 访问 https://codeup.aliyun.com/profile/personal-access-tokens
2. 点击 "创建个人访问令牌"
3. 选择仓库读写权限
4. 创建并保存令牌

### 2.2 国外平台

#### GitLab
1. 访问 https://gitlab.com/-/profile/personal_access_tokens
2. 设置令牌名称和过期时间
3. 勾选 "api"、"read_repository"、"write_repository" 权限
4. 创建令牌

#### Bitbucket
1. 访问 https://bitbucket.org/account/settings/app-passwords/
2. 点击 "Create app password"
3. 选择 "Repository Read" 和 "Repository Write" 权限
4. 创建并保存密码

#### Azure DevOps
1. 访问 https://dev.azure.com/YOUR-ORG/_usersSettings/tokens
2. 点击 "New Token"
3. 选择 "Code (Read & Write)" 权限
4. 创建并保存令牌

#### AWS CodeCommit
1. 访问 https://console.aws.amazon.com/iam/home#/security_credentials
2. 在 "HTTPS Git credentials for AWS CodeCommit" 部分
3. 点击 "Generate credentials"
4. 下载并保存凭证

#### Google Cloud Source
1. 访问 https://source.cloud.google.com/user/settings/tokens
2. 点击 "Create token"
3. 设置权限范围
4. 创建并保存令牌

注意事项：
1. 令牌创建后请立即保存，大多数平台只显示一次
2. 建议设置合适的过期时间
3. 仅选择必要的最小权限范围
4. 定期检查和更新令牌

## 3. 同步触发方式

代码同步会在以下情况下自动触发：

1. 推送到 main 分支时
2. 手动触发工作流时

### 3.1 手动触发方式
1. 访问仓库的 Actions 页面
2. 选择 "Sync to Multiple Repositories" 工作流
3. 点击 "Run workflow"
4. 选择 main 分支并确认

## 4. 注意事项

1. **安全性**
   - 不要直接提交包含敏感信息的 sync-config.yml 文件
   - 确保将其添加到 .gitignore 中
   - 只通过 GitHub Secrets 配置

2. **令牌权限**
   - 确保令牌具有足够的权限（至少需要仓库的读写权限）
   - 建议定期轮换令牌
   - 令牌泄露时及时吊销

3. **仓库设置**
   - 目标仓库必须存在
   - 确保用户名和仓库名称正确
   - 验证域名配置是否正确

4. **同步行为**
   - 同步会强制覆盖目标仓库的内容
   - 包括所有分支和标签
   - 建议目标仓库只用于同步，不要直接在其中开发

## 5. 故障排除

### 5.1 常见问题

1. 同步失败
   - 检查令牌是否有效
   - 验证仓库路径是否正确
   - 确认用户名是否正确

2. 配置无效
   - 验证 YAML 格式是否正确
   - 检查缩进是否准确
   - 确保所有必填字段都已配置

3. 权限问题
   - 检查令牌权限范围
   - 验证用户对仓库的访问权限
   - 确认令牌未过期

### 5.2 查看日志

1. 访问 GitHub Actions 页面
2. 点击失败的工作流运行
3. 展开失败的步骤查看详细日志

## 6. 配置示例

### 6.1 最小配置（单平台）
```yaml
repositories:
  gitee:
    enabled: true
    username: your-username
    repo: your-repo
    token: your-token
    domain: gitee.com
```

### 6.2 完整配置（多平台）
```yaml
repositories:
  gitee:
    enabled: true
    username: gitee-username
    repo: blog-mirror
    token: gitee-token
    domain: gitee.com
    
  gitcode:
    enabled: true
    username: gitcode-username
    repo: blog-mirror
    token: gitcode-token
    domain: gitcode.com
    
  coding:
    enabled: true
    username: coding-username
    repo: blog-mirror
    token: coding-token
    domain: e.coding.net
```

## 7. 支持的代码平台域名

以下是常见代码托管平台的域名配置：

### 7.1 国内平台
```yaml
# Gitee
domain: gitee.com

# GitCode (CSDN)
domain: gitcode.com

# Coding (腾讯)
domain: e.coding.net

# JiHuLab (极狐)
domain: jihulab.com

# 阿里云代码托管
domain: codeup.aliyun.com

# GitLink
domain: gitlink.org.cn

# GitChina
domain: gitchina.org
```

### 7.2 国外平台
```yaml
# GitHub
domain: github.com

# GitLab
domain: gitlab.com

# Bitbucket
domain: bitbucket.org

# Azure DevOps
domain: dev.azure.com

# AWS CodeCommit
domain: git-codecommit.{region}.amazonaws.com

# Google Cloud Source
domain: source.developers.google.com
```

注意事项：
1. 不同平台的仓库路径格式可能不同
2. 某些平台可能需要特殊的认证方式
3. 建议先测试仓库访问权限再配置同步
4. 部分平台可能有 API 调用限制

建议：
- 优先选择访问稳定的平台
- 确认平台支持 Git 协议
- 验证域名是否可以正常访问
- 检查平台是否支持令牌认证


