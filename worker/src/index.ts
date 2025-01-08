import { Env } from '@cloudflare/workers-types';
import { Client } from "@notionhq/client";

interface NotionEnv extends Env {
  NOTION_API_SECRET: string;
  DATABASE_ID: string;
}

export default {
  async scheduled(event: ScheduledEvent, env: NotionEnv, ctx: ExecutionContext) {
    try {
      const notion = new Client({ auth: env.NOTION_API_SECRET });
      
      const response = await notion.databases.query({
        database_id: env.DATABASE_ID,
        filter: {
          property: 'Published',
          checkbox: {
            equals: true
          }
        }
      });

      if (!response.results || !Array.isArray(response.results)) {
        throw new Error('Invalid response from Notion API');
      }

      // 触发页面重新构建
      await fetch('https://api.cloudflare.com/client/v4/pages/webhooks/deploy_hooks/YOUR_DEPLOY_HOOK', {
        method: 'POST'
      });

    } catch (error) {
      console.error('Error:', error);
    }
  },

  async fetch(request: Request, env: NotionEnv, ctx: ExecutionContext) {
    return fetch(request);
  }
}; 