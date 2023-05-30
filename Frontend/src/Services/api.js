import axios from "axios";
import { getToken } from "./auth";
import store from "./store";

const isProd = process.env.NODE_ENV === "production";

const apiUrl = isProd
  ? "https://terapia.herokuapp.com/"
  : "http://127.0.0.1:3333";

const api = axios.create({
  baseURL: apiUrl
});

api.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    if (store.state.role && store.state.prefix) {
      if (config.method !== "get") {
        return false;
      }
      config.url = `${store.state.prefix}${config.url}`;
    }
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
