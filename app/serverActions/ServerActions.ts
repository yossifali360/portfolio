"use server";

import axiosInstance from "@/app/config/axios";
import { normalizeApiPath } from "@/lib/api";
import { isAxiosError, type AxiosRequestConfig } from "axios";

export type ServerActionError = {
  message: string;
  status?: number;
  data?: unknown;
};

export type ServerActionResult<T> =
  | { data: T; error: null }
  | { data: null; error: ServerActionError };

function toActionError(error: unknown): ServerActionError {
  if (isAxiosError(error)) {
    return {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    };
  }
  return {
    message: error instanceof Error ? error.message : String(error),
  };
}

export async function serverPostAction<T = unknown>(
  route: string,
  data: FormData | Record<string, unknown>,
  axiosConfig?: AxiosRequestConfig
): Promise<ServerActionResult<T>> {
  const path = normalizeApiPath(route);
  if (!path) {
    return { data: null, error: { message: "Missing route" } };
  }
  try {
    const response = await axiosInstance.post<T>(path, data, axiosConfig);
    return { data: response.data, error: null };
  } catch (error) {
    console.error(
      `[serverPostAction] POST ${path}:`,
      isAxiosError(error) ? error.response?.data : error
    );
    return { data: null, error: toActionError(error) };
  }
}

export async function serverPutAction<T = unknown>(
  route: string,
  data: FormData | Record<string, unknown>
): Promise<ServerActionResult<T>> {
  const path = normalizeApiPath(route);
  if (!path) {
    return { data: null, error: { message: "Missing route" } };
  }
  try {
    const response = await axiosInstance.put<T>(
      path,
      data,
      data instanceof FormData
        ? {}
        : { headers: { "Content-Type": "application/json" } }
    );
    return { data: response.data, error: null };
  } catch (error) {
    console.error(
      `[serverPutAction] PUT ${path}:`,
      isAxiosError(error) ? error.response?.data : error
    );
    return { data: null, error: toActionError(error) };
  }
}

export async function serverDeleteAction<T = unknown>(
  route: string
): Promise<ServerActionResult<T>> {
  const path = normalizeApiPath(route);
  if (!path) {
    return { data: null, error: { message: "Missing route" } };
  }
  try {
    const response = await axiosInstance.delete<T>(path);
    return { data: response.data, error: null };
  } catch (error) {
    console.error(
      `[serverDeleteAction] DELETE ${path}:`,
      isAxiosError(error) ? error.response?.data : error
    );
    return { data: null, error: toActionError(error) };
  }
}
