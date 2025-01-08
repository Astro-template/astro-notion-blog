/// <reference types="@cloudflare/workers-types" />

interface NotionEnv {
  NOTION_API_SECRET: string;
  DATABASE_ID: string;
}

interface Env extends NotionEnv {
  // Cloudflare Workers env
} 