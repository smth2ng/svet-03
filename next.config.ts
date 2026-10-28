import type { NextConfig } from 'next';

const isPages = process.env.GITHUB_PAGES === 'true';
const config: NextConfig = {
  ...(isPages ? { output: 'export', trailingSlash: true } : {}),
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  images: { unoptimized: isPages },
};
export default config;
