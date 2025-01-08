import { Client } from "@notionhq/client";

export default {
  async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext) {
    try {
      const notion = new Client({ auth: env.NOTION_API_SECRET });
      
      // 获取所有已发布的页面
      const response = await notion.databases.query({
        database_id: env.DATABASE_ID,
        filter: {
          and: [
            {
              property: 'Published',
              checkbox: {
                equals: true
              }
            },
            {
              property: 'Date',
              date: {
                on_or_before: new Date().toISOString()
              }
            }
          ]
        }
      });

      if (!response.results || !Array.isArray(response.results)) {
        throw new Error('Invalid response from Notion API');
      }

      // 获取每个页面的区块内容
      for (const page of response.results) {
        const blocks = await notion.blocks.children.list({
          block_id: page.id
        });

        if (!blocks.results) {
          console.error(`Failed to fetch blocks for page ${page.id}`);
          continue;
        }
      }

      // 触发页面重新构建
      await fetch('https://api.cloudflare.com/client/v4/pages/webhooks/deploy_hooks/YOUR_DEPLOY_HOOK', {
        method: 'POST'
      });

    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    return new Response('Worker is running', { status: 200 });
  }
}; 