const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getFileUrl = (path?: string) => {
  if (!path) return "";
  return `${BACKEND_URL}/${path.replace(/\\/g, "/")}`;
};
