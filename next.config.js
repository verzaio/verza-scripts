/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    externalDir: true,
  },

  typescript: {
    ...(process.env.NODE_ENV === 'production' && {
      tsconfigPath: './tsconfig.prod.json',
    }),
  },

  reactStrictMode: true,
};

module.exports = nextConfig;
