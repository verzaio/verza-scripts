export const formatUrl = (path: string) => `${getBaseUrl()}/${path}`;

export const getBaseUrl = () => {
  if (import.meta.env.VITE_BASE_URL) {
    return import.meta.env.VITE_BASE_URL;
  }

  if (typeof location !== 'undefined') {
    return location.origin;
  }

  return 'http://localhost:8085';
};
