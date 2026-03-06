import { requestLogger } from "@/middleware/request-logger";
import { errorResponse } from "@/utils/error/response-object";
import { HTTP_STATUS_CODE, HTTP_STATUS_PHRASE } from "@/utils/http-status-codes";
import { createFileRoute } from "@tanstack/react-router";
import z from "zod";

export const Route = createFileRoute("/api/v1/auth/sign-in")({
  server: {
    middleware: [requestLogger],
    handlers: {
      POST: async function ({ request }) {
        console.log("[sign_in] validating request");

        const parsed = z
          .object({
            email: z.email(),
            password: z.string().min(6),
          })
          .safeParse(request);

        if (!parsed.success) {
          console.error("[sign_in] bad request returning error response");
          return errorResponse({
            code: HTTP_STATUS_CODE.BAD_REQUEST,
            message: HTTP_STATUS_PHRASE.BAD_REQUEST,
            details: parsed.error.issues.map((issue) => issue.message),
          });
        }
      },
    },
  },
});
