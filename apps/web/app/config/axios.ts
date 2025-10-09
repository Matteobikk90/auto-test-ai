import { proxyTarget } from "@/constants/urls";
import axios from "axios";

export const api = axios.create({
  baseURL: proxyTarget,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (res) => res.data,
  (err) => Promise.reject(err.response?.data || err.message)
);
