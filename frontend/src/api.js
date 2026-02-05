import axios from "axios";
import { getToken } from "./auth";

const api = axios.create({
  baseURL: "strong-ceil-homeproject-d2a6849c.koyeb.app/",
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
