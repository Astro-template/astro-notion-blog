const { Client } = require('@notionhq/client')
require('dotenv').config()

// 验证环境变量
if (!process.env.NOTION_API_SECRET) {
  console.error('错误: 未设置 NOTION_API_SECRET 环境变量')
  process.exit(1)
}

if (!process.env.DATABASE_ID) {
  console.error('错误: 未设置 DATABASE_ID 环境变量')
  process.exit(1)
}

const notion = new Client({
  auth: process.env.NOTION_API_SECRET
})

async function testConnection() {
  console.log('正在测试 Notion 连接...')
  console.log('Database ID:', process.env.DATABASE_ID)
  console.log('API Secret length:', process.env.NOTION_API_SECRET.length)

  try {
    const response = await notion.databases.retrieve({
      database_id: process.env.DATABASE_ID
    })
    console.log('\n连接成功!')
    console.log('数据库信息:', {
      id: response.id,
      title: response.title,
      created_time: response.created_time,
      last_edited_time: response.last_edited_time
    })
  } catch (error) {
    console.error('\n连接失败:', error.message)
    if (error.code === 'unauthorized') {
      console.error('原因: Notion API Token 无效或过期')
      console.error('解决方案: 请检查 .env 文件中的 NOTION_API_SECRET 是否正确')
    }
    if (error.code === 'object_not_found') {
      console.error('原因: 找不到数据库或无权访问')
      console.error('解决方案:')
      console.error('1. 检查 DATABASE_ID 是否正确')
      console.error('2. 确保已将数据库共享给集成')
      console.error('3. 在 Notion 中打开数据库 -> Share -> Add connections -> 选择你的集成')
    }
    process.exit(1)
  }
}

testConnection() 