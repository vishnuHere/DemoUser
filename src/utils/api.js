import axios from "axios";

const host = "https://randomuser.me/api";

const api = axios.create({
  baseURL: host,
  timeout: 5000,
});

api.interceptors.request.use(
  async (config) => {
    config.headers = {
      "Content-Type": "application/json",

    };

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

export default api;
