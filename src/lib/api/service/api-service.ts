import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";

import { env } from "@/env";

export type ApiRequestArgs<T = unknown> = {
  endpoint: string;
  params?: AxiosRequestConfig["params"];
  payload?: T;
};

function getBaseUrl(): string {
  return env.SPACEX_API_URL;
}

export function resolveApiUrl(endpoint: string): string {
  const base = getBaseUrl().replace(/\/+$/, "");
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  return `${base}${path}`;
}

function requestConfig(args: ApiRequestArgs): AxiosRequestConfig {
  return {
    url: resolveApiUrl(args.endpoint),
    params: args.params,
  };
}

export async function get<T = unknown>(
  args: ApiRequestArgs,
): Promise<AxiosResponse<T>> {
  return axios.request<T>({ ...requestConfig(args), method: "GET" });
}

export async function post<T = unknown, P = unknown>(
  args: ApiRequestArgs<P>,
): Promise<AxiosResponse<T>> {
  return axios.request<T>({
    ...requestConfig(args),
    method: "POST",
    data: args.payload,
  });
}

export async function put<T = unknown, P = unknown>(
  args: ApiRequestArgs<P>,
): Promise<AxiosResponse<T>> {
  return axios.request<T>({
    ...requestConfig(args),
    method: "PUT",
    data: args.payload,
  });
}

export async function patch<T = unknown, P = unknown>(
  args: ApiRequestArgs<P>,
): Promise<AxiosResponse<T>> {
  return axios.request<T>({
    ...requestConfig(args),
    method: "PATCH",
    data: args.payload,
  });
}

export async function del<T = unknown, P = unknown>(
  args: ApiRequestArgs<P>,
): Promise<AxiosResponse<T>> {
  return axios.request<T>({
    ...requestConfig(args),
    method: "DELETE",
    data: args.payload,
  });
}

export const apiService = {
  get,
  post,
  put,
  patch,
  delete: del,
} as const;
