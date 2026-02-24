import { t3env } from "@/env";
import { setCookie, getCookie } from "@tanstack/react-start/server";

import { validateSession } from "./session.server";
export const SESSION_COOKIE_NAME = "session";

interface ICookie {
  name: string;
  value: string;
  attributes: {
    httpOnly: boolean;
    sameSite: "strict" | "lax" | "none";
    secure: boolean;
    path: string;
    expires?: Date;
    maxAge?: number;
  };
}

export function setSessionCookie({
  sessionToken,
  expiresAt,
}: {
  sessionToken: string;
  expiresAt: Date;
}): void {
  const cookie = {
    name: SESSION_COOKIE_NAME,
    value: sessionToken,
    attributes: {
      httpOnly: true,
      sameSite: "lax",
      secure: t3env.NODE_ENV === "production",
      path: "/",
      expires: expiresAt,
    },
  } satisfies ICookie;
  setCookie(cookie.name, cookie.value, cookie.attributes);
}

export function deleteSessionCookie(): void {
  const cookie = {
    name: SESSION_COOKIE_NAME,
    value: "",
    attributes: {
      httpOnly: true,
      sameSite: "lax",
      secure: t3env.NODE_ENV === "production",
      path: "/",
      maxAge: 0,
    },
  } satisfies ICookie;
  setCookie(cookie.name, cookie.value, cookie.attributes);
}

export function getAuthenticatedUser() {
  const sessionToken = getCookie(SESSION_COOKIE_NAME);
  if (!sessionToken) {
    return { session: null, user: null };
  }
  return validateSession(sessionToken);
}
