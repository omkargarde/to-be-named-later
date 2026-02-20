import { HTTP_STATUS_CODE_VALUES } from "./http-status-codes.utils";

export interface ApiError {
  code: HTTP_STATUS_CODE_VALUES;
  message: string;
  details: string[];
}
// pagination.ts
export interface Pagination {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export type TApiResponse<T> = { ok: true; data: T } | { ok: false; error: ApiError };

export type TApiResponseWithPagination<T> =
  | { ok: true; data: T; pagination: Pagination }
  | { ok: false; error: ApiError };
