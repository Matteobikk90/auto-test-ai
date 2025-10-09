import { api } from "@/config/axios";
import { type AxiosRequestConfig, isAxiosError } from "axios";

type Method = "GET" | "POST" | "PUT" | "DELETE";

export const axiosRequest = async <TResponse, TBody = unknown>(
  method: Method,
  url: string,
  data?: TBody,
  signal?: AbortSignal,
  externalConfig?: AxiosRequestConfig
): Promise<TResponse | undefined> => {
  const config: AxiosRequestConfig = {
    ...externalConfig,
    signal,
  };

  try {
    const response =
      method === "GET"
        ? await api.get<TResponse>(url, config)
        : method === "POST"
          ? await api.post<TResponse>(url, data, config)
          : method === "PUT"
            ? await api.put<TResponse>(url, data, config)
            : await api.delete<TResponse>(url, config);

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.code === "ERR_CANCELED") {
        console.warn("Request canceled");
        return undefined;
      }
      console.error(
        `Axios error: ${error.response?.status || "Unknown"} - ${error.message}`
      );
    } else if (error instanceof Error) {
      console.error("Unexpected error:", error.message);
    } else {
      console.error("Unknown error", error);
    }
    throw error;
  }
};

// Convenience helpers
export const axiosGet = async <T>(url: string, signal?: AbortSignal) =>
  axiosRequest<T>("GET", url, undefined, signal);

export const axiosPost = async <TResponse, TBody>(url: string, data: TBody) =>
  axiosRequest<TResponse, TBody>("POST", url, data);

export const axiosPut = async <TResponse, TBody>(url: string, data: TBody) =>
  axiosRequest<TResponse, TBody>("PUT", url, data);

export const axiosDelete = async (url: string, signal?: AbortSignal) =>
  axiosRequest<void>("DELETE", url, undefined, signal);
