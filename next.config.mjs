/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    externalDir: true,
  },

  swcMinify: true,
  reactStrictMode: true,

  headers() {
    return [
      {
        source: '/:path*',
        headers: [{key: 'Access-Control-Allow-Origin', value: '*'}],
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
