// Importing the entire next package and destructuring the desired parts
import next from 'next';
const { NextConfig } = next;

// Continue with your previous configurations
import withSerwistInit from '@serwist/next';
import withPWA from '@ducanh2912/next-pwa';

const isProd = process.env.NODE_ENV === 'production';

const withSerwist = withSerwistInit({
  swSrc: 'src/app/sw.ts',
  swDest: 'public/sw.js',
});

const pwaConfig = isProd ? withPWA({
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  dest: 'public',
  fallbacks: {
    document: '/offline',
  },
  workboxOptions: {
    disableDevLogs: true,
  },
}) : (config) => config;

const nextConfig = {
  // Additional Next.js configuration options here
};

export default withSerwist(pwaConfig(nextConfig));
