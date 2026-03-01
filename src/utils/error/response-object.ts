import { IApiError, IApiSuccess, TApiErrorResponse, TApiSuccessResponse } from "@/types/response";

export function errorResponse({ code, message, details }: IApiError) {
  return new Response(
    JSON.stringify({
      ok: false,
      error: {
        code,
        message,
        details,
      },
    } satisfies TApiErrorResponse),
  );
}

export function successResponse<T>({ code, values }: IApiSuccess<T>) {
  return new Response(
    JSON.stringify({
      ok: true,
      data: {
        code,
        values,
      },
    } satisfies TApiSuccessResponse<T>),
  );
}
