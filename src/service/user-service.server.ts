import { orm } from "@/database";
import { IInsertUser, ISelectUser, usersTable } from "@/database/schema";
import { Result } from "@/types/Result";
import { eq } from "drizzle-orm";

/**
 * Fetches a user from the database by their email address.
 *
 * @param email - The email address to search for
 * @returns Result containing the user or null if not found on success,
 *          or an Error on failure
 */
export async function getUserUsingEmail(email: string): Promise<Result<ISelectUser | null>> {
  try {
    const [user] = await orm.select().from(usersTable).where(eq(usersTable.email, email)).limit(1);
    return { ok: true, value: user ?? null };
  } catch (error) {
    return {
      ok: false,
      error: new Error("failed to fetch user", { cause: error }),
    };
  }
}

/**
 * Creates a new user in the database.
 *
 * @param userData - The user data to insert
 * @returns Result containing the created user on success,
 *          or an Error on failure
 */
export async function createNewUser(userData: IInsertUser): Promise<Result<ISelectUser>> {
  try {
    const [user] = await orm.insert(usersTable).values(userData).returning();
    return { ok: true, value: user };
  } catch (error) {
    return {
      ok: false,
      error: new Error("failed to create user", { cause: error }),
    };
  }
}
