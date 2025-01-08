interface Env {
  NOTION_API_SECRET: string;
  DATABASE_ID: string;
}

export default {
  async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext) {
    // 定时任务：同步 Notion 内容
    try {
      const response = await fetch('https://api.notion.com/v1/databases/' + env.DATABASE_ID + '/query', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.NOTION_API_SECRET}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          filter: {
            property: 'Published',
            checkbox: {
              equals: true
            }
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch Notion content');
      }

      // 触发页面重新构建
      await fetch('https://api.cloudflare.com/client/v4/pages/webhooks/deploy_hooks/YOUR_DEPLOY_HOOK', {
        method: 'POST'
      });

    } catch (error) {
      console.error('Error:', error);
    }
  },

  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    // 处理正常的页面请求
    return fetch(request);
  }
}; 