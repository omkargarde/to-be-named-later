import { HTTP_STATUS_CODE_VALUES } from "@/utils/http-status-codes";

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

export type TApiResponse<T> = { ok: true; data: T };

export type TApiErrorResponse = { ok: false; error: ApiError };

export type TFetchResponse<T> = TApiResponse<T> | TApiErrorResponse;

export type TApiResponseWithPagination<T> = { ok: true; data: T; pagination: Pagination };
