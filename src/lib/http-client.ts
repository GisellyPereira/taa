import { env } from "@/config/env";

export class HttpError extends Error {
  status: number;
  data: unknown;

  constructor(message: string, status: number, data: unknown) {
    super(message);
    this.name = "HttpError";
    this.status = status;
    this.data = data;
  }
}

type RequestOptions = Omit<RequestInit, "body"> & { body?: unknown };

async function request(method: string, path: string, options: RequestOptions = {}) {
  const { body, headers, ...rest } = options;
  const url = path.startsWith("http") ? path : `${env.apiBaseUrl}${path}`;

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    ...rest,
  });

  const isJson = response.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const message =
      (isJson && data && typeof data === "object" && "message" in data
        ? String((data as { message?: unknown }).message)
        : "") || `Erro HTTP ${response.status}`;
    throw new HttpError(message, response.status, data);
  }

  return data;
}

export const httpClient = {
  get: (path: string, options?: RequestOptions) => request("GET", path, options),
  post: (path: string, body?: unknown, options?: RequestOptions) =>
    request("POST", path, { ...options, body }),
  put: (path: string, body?: unknown, options?: RequestOptions) =>
    request("PUT", path, { ...options, body }),
  patch: (path: string, body?: unknown, options?: RequestOptions) =>
    request("PATCH", path, { ...options, body }),
  delete: (path: string, options?: RequestOptions) => request("DELETE", path, options),
};
