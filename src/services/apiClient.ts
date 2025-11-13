import axios from "axios";

interface RequestConfig {
  [key: string]: any;
}
const axiosInstance = axios.create();
declare module "axios" {
  export interface AxiosRequestConfig {
    skipInternal?: boolean;
  }
}

export const apiClient = {
  get: (url: string, config: RequestConfig = {}) =>
    axiosInstance.get(url, { ...config, skipInternal: true }),

  delete: (url: string, config: RequestConfig = {}) =>
    axiosInstance.delete(url, { ...config, skipInternal: true }),
};
