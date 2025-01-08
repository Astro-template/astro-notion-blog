interface Config {
  notion: {
    apiSecret: string;
    databaseId: string;
  };
}

const config: Config = {
  notion: {
    apiSecret: process.env.NOTION_API_SECRET || '',
    databaseId: process.env.DATABASE_ID || '',
  },
}

export default config; 