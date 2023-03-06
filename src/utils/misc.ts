export const formatUrl = (path: string) => `${getBaseUrl()}/${path}`;

export const getBaseUrl = () => {
  if (typeof location !== 'undefined') {
    return location.origin;
  }

  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL;
  }

  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }

  return 'http://localhost:3000';
};
