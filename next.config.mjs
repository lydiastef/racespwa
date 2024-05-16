import withPWA from '@ducanh2912/next-pwa';

const isProd = process.env.NODE_ENV === 'production';

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
};

export default pwaConfig(nextConfig);
