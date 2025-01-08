/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly NOTION_API_SECRET: string;
  readonly DATABASE_ID: string;
  readonly CLOUDFLARE_API_TOKEN?: string;
  readonly CUSTOM_DOMAIN?: string;
  readonly BASE_PATH?: string;
  readonly PUBLIC_GA_TRACKING_ID?: string;
  readonly REQUEST_TIMEOUT_MS?: string;
  readonly ENABLE_LIGHTBOX?: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
