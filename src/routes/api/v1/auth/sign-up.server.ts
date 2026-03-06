import { requestLogger } from "@/middleware/request-logger";
import { createNewUser, getUserUsingEmail } from "@/service/user-service.server";
import { ZSignUpSchema } from "@/types/zod/sign-up-schema";
import { setSessionCookie } from "@/utils/auth/cookie.server";
import { hashPassword } from "@/utils/auth/password.server";
import { createSession, generateRandomSessionToken } from "@/utils/auth/session.server";
import { errorResponse, successResponse } from "@/utils/error/response-object";
import { HTTP_STATUS_CODE, HTTP_STATUS_PHRASE } from "@/utils/http-status-codes";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/v1/auth/sign-up/server")({
  server: {
    middleware: [requestLogger],
    handlers: {
      POST: async function ({ request }) {
        console.log("[sign_up] validating request");
        const parsed = ZSignUpSchema.safeParse(await request.formData());

        if (!parsed.success) {
          console.error("[sign_up] bad request");
          return errorResponse({
            code: HTTP_STATUS_CODE.BAD_REQUEST,
            message: HTTP_STATUS_PHRASE.BAD_REQUEST,
            details: parsed.error.issues.map((issue) => issue.message),
          });
        }

        console.log("[sign_up] fetching user details");
        const user_already_exists = await getUserUsingEmail(parsed.data.email);

        if (!user_already_exists.ok) {
          console.log(`[Error] [sign_up] ${user_already_exists.error.message}`);
          return errorResponse({
            code: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
            message: HTTP_STATUS_PHRASE.INTERNAL_SERVER_ERROR,
            details: [HTTP_STATUS_PHRASE.INTERNAL_SERVER_ERROR],
          });
        }

        if (user_already_exists.value) {
          console.log(`[Error] [sign_up] user already exists`);
          return errorResponse({
            code: HTTP_STATUS_CODE.CONFLICT,
            message: HTTP_STATUS_PHRASE.CONFLICT,
            details: ["user is already exists, please sign in to continue"],
          });
        }

        const passwordHash = await hashPassword(parsed.data.password);
        const new_user_created = await createNewUser({
          ...parsed.data,
          passwordHash,
        });

        if (!new_user_created.ok) {
          console.log(`[Error] [sign_up] failed to create new user`);
          return errorResponse({
            code: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
            message: HTTP_STATUS_PHRASE.INTERNAL_SERVER_ERROR,
            details: [HTTP_STATUS_PHRASE.INTERNAL_SERVER_ERROR],
          });
        }

        const sessionToken = generateRandomSessionToken();
        const session = await createSession({ sessionToken, userId: new_user_created.value.id });
        setSessionCookie({ sessionToken, expiresAt: session.expiresAt });

        return successResponse<typeof session>({
          code: HTTP_STATUS_CODE.OK,
          values: session,
        });
      },
    },
  },
});
