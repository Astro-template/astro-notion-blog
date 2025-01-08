import { Client } from '@notionhq/client'
import config from '../src/config'

const notion = new Client({
  auth: config.notion.apiSecret
})

async function testConnection() {
  try {
    const response = await notion.databases.retrieve({
      database_id: config.notion.databaseId
    })
    console.log('Connection successful!')
    console.log('Database title:', response.title)
  } catch (error) {
    console.error('Connection failed:', error)
  }
}

testConnection() 