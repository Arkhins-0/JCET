import axios, { AxiosError } from "axios";
import type { ApiResponse } from "@/types/api";

// The API now lives in this same app (Next.js route handlers under /api), so
// requests are same-origin and use a relative base URL. An optional absolute
// override (NEXT_PUBLIC_API_URL) is still honoured if ever needed.
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
  timeout: 15000,
});

// Response interceptor: surface a clean message; handle 401 on the client.
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiResponse<unknown>>) => {
    if (typeof window !== "undefined" && error.response?.status === 401) {
      // Optional: redirect to login for protected (portal) calls.
      // window.location.href = "/login";
    }
    const message =
      error.response?.data?.message ??
      error.message ??
      "Something went wrong. Please try again.";
    return Promise.reject(new Error(message));
  }
);

/** Unwrap the { success, data } envelope and return `data`. */
export async function fetchData<T>(url: string, params?: object): Promise<T> {
  const res = await api.get<ApiResponse<T>>(url, { params });
  return res.data.data;
}

/** Unwrap and return the full envelope (when you need `meta`). */
export async function fetchEnvelope<T>(
  url: string,
  params?: object
): Promise<ApiResponse<T>> {
  const res = await api.get<ApiResponse<T>>(url, { params });
  return res.data;
}

export async function postData<T, B = unknown>(
  url: string,
  body: B
): Promise<ApiResponse<T>> {
  const res = await api.post<ApiResponse<T>>(url, body);
  return res.data;
}
