terraform {
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.0"
    }
  }
}

provider "cloudflare" {
  api_token = var.CLOUDFLARE_API_TOKEN
}

variable "CLOUDFLARE_ACCOUNT_ID" {
  type = string
}

# 创建 Cloudflare Pages 项目
resource "cloudflare_pages_project" "astro_notion_blog" {
  account_id        = var.CLOUDFLARE_ACCOUNT_ID
  name              = "astro-notion-blog"
  production_branch = "main"

  build_config {
    build_command   = "npm run build:cached"
    destination_dir = "dist"
  }

  deployment_configs {
    production {
      environment_variables = {
        NODE_VERSION      = "20.18.1"
        NOTION_API_SECRET = var.NOTION_API_SECRET
        DATABASE_ID       = var.DATABASE_ID
      }
    }
  }
} 