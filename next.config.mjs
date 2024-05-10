/** @type {import('next').NextConfig} */

import withSerwistInit from "@serwist/next";

const isProd = process.env.NODE_ENV === 'production'   //this disables pwa support while in dev mode = see reason below

const withSerwist = withSerwistInit({
  // Note: This is only an example. If you use Pages Router,
  // use something else that works, such as "service-worker/index.ts".
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
});

const withPWA = require("@ducanh2912/next-pwa").default({
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  dest: "public",
  fallbacks: {
    //image: "/static/images/fallback.png",
    document: "/offline", // if you want to fallback to a custom page rather than /_offline
    // font: '/static/font/fallback.woff2',
    // audio: ...,
    // video: ...,
  },
  workboxOptions: {
    disableDevLogs: true,
  },
  // ... other options you like
});
/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... other options you like
};

module.exports = withPWA(nextConfig);

export default withSerwist({
  // Your Next.js config
});

