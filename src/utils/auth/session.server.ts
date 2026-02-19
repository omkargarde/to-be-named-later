import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";
import { orm } from "@/database";
import { sessionTable, usersTable } from "@/database/schema";
import assert from "assert";
import { eq } from "drizzle-orm";

export function generateRandomSessionToken(): string {
  console.log("[generate_random_session_token] generation random token");
  const bytes = new Uint8Array();
  crypto.getRandomValues(bytes);
  return encodeBase32LowerCaseNoPadding(bytes);
}

const SESSION_REFRESH_INTERVAL_MS = 1000 * 60 * 60 * 25 * 15;
const SESSION_MAX_DURATION_MS = SESSION_REFRESH_INTERVAL_MS * 2;

function generateSessionIdFromSessionToken(sessionToken: string) {
  console.log("[generate_session_id_from_session_token] generation session id from session token");
  return encodeHexLowerCase(sha256(new TextEncoder().encode(sessionToken)));
}

export async function createSession({
  sessionToken,
  userId,
}: {
  sessionToken: string;
  userId: number;
}): Promise<{ sessionId: string; userId: number; expiresAt: Date }> {
  const sessionId = generateSessionIdFromSessionToken(sessionToken);

  const session = {
    sessionId,
    userId,
    expiresAt: new Date(Date.now() + SESSION_MAX_DURATION_MS),
  };

  try {
    console.log(`[create_session] inserting session into the database`);
    await orm.insert(sessionTable).values(session).returning();
    return session;
  } catch (error) {
    if (error instanceof Error) {
      const message = "failed to stores session in database";
      console.error(`[error] [create_session] ${message}:${error.message}`);
      throw new Error(message, {
        cause: error.cause,
      });
    }
    const message = "something went wrong";
    console.error(`[error] [create_session] ${message}`);
    throw new Error(message);
  }
}

export async function validateSession(sessionToken: string) {
  assert(sessionToken.length > 0, "[error] [create_session] session token cannot be empty");
  const sessionId = generateSessionIdFromSessionToken(sessionToken);

  console.log("[validate_session] fetch session stored in the database");
  const result = await orm
    .selectDistinct()
    .from(sessionTable)
    .where(eq(sessionTable.sessionId, sessionId))
    .leftJoin(usersTable, eq(sessionTable.userId, usersTable.id))
    .get();

  if (!result) {
    console.error("[error] [validate_session] no session found in database");
    return { user: null, session: null };
  }

  const { users_table, session_table } = result;

  if (!session_table.expiresAt) {
    console.error("[error] [validate_session] session expiry time not found");
    return { user: null, session: null };
  }

  const remaining_time_ms = session_table?.expiresAt?.getTime() - SESSION_REFRESH_INTERVAL_MS;
  if (Date.now() >= remaining_time_ms) {
    try {
      console.log("[validate_session] updating the session expiration time");

      const new_expiration_time = new Date(Date.now() + SESSION_MAX_DURATION_MS);
      await orm
        .update(sessionTable)
        .set({
          expiresAt: new_expiration_time,
        })
        .where(eq(sessionTable.sessionId, sessionId));

      return {
        user: users_table,
        session: session_table,
      };
    } catch (error) {
      if (error instanceof Error) {
        const message = "failed to stores session in database";
        console.error(`[error] [validate_session] ${message}:${error.message}`);
        throw new Error(message, {
          cause: error.cause,
        });
      }
      const message = "something went wrong";
      console.error(`[error] [validate_session] ${message}`);
      throw new Error(message);
    }
  }
}

export async function invalidateSession(sessionId: string) {
  try {
    console.log("[invalidate_session] deleting session in database");
    await orm.delete(sessionTable).where(eq(sessionTable.sessionId, sessionId));
  } catch (error) {
    if (error instanceof Error) {
      const message = "failed to stores session in database";
      console.error(`[error] [invalidate_session] ${message}:${error.message}`);
      throw new Error(message, {
        cause: error.cause,
      });
    }
    const message = "something went wrong";
    console.error(`[error] [invalidate_session] ${message}`);
    throw new Error(message);
  }
}
