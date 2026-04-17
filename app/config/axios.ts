import axios, { type InternalAxiosRequestConfig } from "axios";
import { getLocale } from "next-intl/server";
import { apiBase } from "@/lib/api";

export const axiosInstance = axios.create({
  baseURL: apiBase(),
  headers: {
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      const locale = await getLocale();
      config.headers.set("Accept-Language", locale);
    } catch {
      config.headers.set("Accept-Language", "en");
    }
    return config;
  },
);

export default axiosInstance;
