import { Client } from "@notionhq/client";

export default {
  async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext) {
    try {
      // 1. 检查 Notion 内容更新
      const notion = new Client({ auth: env.NOTION_API_SECRET });
      const response = await notion.databases.query({
        database_id: env.DATABASE_ID,
        filter: {
          property: 'Published',
          checkbox: { equals: true }
        }
      });

      // 只在发现新内容时触发重新构建
      if (response.results.length > 0) {
        await fetch('YOUR_DEPLOY_HOOK_URL', { method: 'POST' });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  },

  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    return new Response('Worker is running', { status: 200 });
  }
}; 