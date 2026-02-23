import { ApiError } from "@/types/response";

export function errorResponse({ code, message, details }: ApiError) {
  return new Response(
    JSON.stringify({
      ok: false,
      error: {
        code,
        message,
        details,
      },
    }),
  );
}
