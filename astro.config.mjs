import { defineConfig } from 'astro/config';
import { CUSTOM_DOMAIN, BASE_PATH } from './src/server-constants';
import CoverImageDownloader from './src/integrations/cover-image-downloader';
import CustomIconDownloader from './src/integrations/custom-icon-downloader';
import FeaturedImageDownloader from './src/integrations/featured-image-downloader';
import PublicNotionCopier from './src/integrations/public-notion-copier';

const getSite = function () {
  if (CUSTOM_DOMAIN) {
    return new URL(BASE_PATH, `https://${CUSTOM_DOMAIN}`).toString();
  }

  if (process.env.CF_PAGES) {
    return new URL(BASE_PATH, 'https://astro-notion-blog.pages.dev').toString();
  }

  return new URL(BASE_PATH, 'http://localhost:4321').toString();
};

// https://astro.build/config
export default defineConfig({
  site: getSite(),
  base: '/',
  integrations: [
    CoverImageDownloader(),
    CustomIconDownloader(),
    FeaturedImageDownloader(),
    PublicNotionCopier(),
  ],
  output: 'static'
});
