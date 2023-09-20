/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    externalDir: true,
  },

  swcMinify: true,
  reactStrictMode: true,

  headers() {
    return [
      /*{
        source: '/:path*',
        headers: [
          {
            key: 'cross-origin-embedder-policy',
            value: 'require-corp;report-to="coep"',
          },
          {
            key: 'cross-origin-resource-policy',
            value: 'cross-origin',
          },
        ],
      }, */
      {
        source: '/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'Content-Type, Authorization, RSC, Next-Router-State-Tree, Next-Url, Next-Router-Prefetch',
          },
        ],
      },
    ];
  },

  typescript: {
    ...(process.env.NODE_ENV === 'production' && {
      tsconfigPath: './tsconfig.prod.json',
    }),
  },

  webpack(config) {
    config.experiments.topLevelAwait = true;

    config.module.rules.push({
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

export default nextConfig;
