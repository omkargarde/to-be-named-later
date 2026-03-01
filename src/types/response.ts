import { HTTP_STATUS_CODE_VALUES } from "@/utils/http-status-codes";

export interface IApiError {
  code: HTTP_STATUS_CODE_VALUES;
  message: string;
  details: string[];
}
export type TApiErrorResponse = { ok: false; error: IApiError };

// pagination.ts
export interface Pagination {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface IApiSuccess<T> {
  code: HTTP_STATUS_CODE_VALUES;
  values: T;
}

export type TApiSuccessResponse<T> = { ok: true; data: IApiSuccess<T> };

export type TFetchResponse<T> = TApiSuccessResponse<T> | TApiErrorResponse;

export type TApiResponseWithPagination<T> = { ok: true; data: T; pagination: Pagination };
