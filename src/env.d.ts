/// <reference types="astro/client" />
/// <reference types="@astrojs/image/client" />

interface ImportMetaEnv {
  readonly NOTION_API_SECRET: string;
  readonly DATABASE_ID: string;
  readonly SITE_URL: string;
  readonly CUSTOM_DOMAIN: string;
  readonly BASE_PATH: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
