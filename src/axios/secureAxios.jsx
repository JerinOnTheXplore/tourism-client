
import axios from "axios";

const secureAxios = axios.create({
  baseURL: "https://tourism-server-delta.vercel.app",
});

secureAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("access-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default secureAxios;
