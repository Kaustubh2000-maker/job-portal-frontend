import axios from "axios";

// ✅ Base URL (change once, app-wide)
const API_BASE_URL = "http://localhost:3000/api/v1/"; // example

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // important if backend uses cookies
});

// ✅ Attach token automatically for every request
api.interceptors.request.use(
  (config) => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="))
      ?.split("=")[1];

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
