import { defineConfig } from 'astro/config';
import { BASE_PATH } from './src/server-constants';
import CoverImageDownloader from './src/integrations/cover-image-downloader';
import CustomIconDownloader from './src/integrations/custom-icon-downloader';
import FeaturedImageDownloader from './src/integrations/featured-image-downloader';
import PublicNotionCopier from './src/integrations/public-notion-copier';

const getSite = () => {
  if (process.env.CF_PAGES) {
    return `https://${process.env.CF_PAGES_URL}`;
  }

  if (process.env.GITHUB_REPOSITORY) {
    return new URL(
      BASE_PATH,
      `https://${process.env.GITHUB_REPOSITORY_OWNER}.github.io/${process.env.GITHUB_REPOSITORY.split('/')[1]}`
    ).toString();
  }

  return new URL(BASE_PATH, 'http://localhost:4321').toString();
};

// https://astro.build/config
export default defineConfig({
  site: getSite(),
  base: BASE_PATH,
  output: 'static',
  integrations: [
    CoverImageDownloader(),
    CustomIconDownloader(),
    FeaturedImageDownloader(),
    PublicNotionCopier(),
  ],
});
