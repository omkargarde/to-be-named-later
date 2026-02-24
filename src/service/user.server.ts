import { orm } from "@/database";
import { IInsertUser, ISelectUser, usersTable } from "@/database/schema";
import { Result } from "@/types/Result";
import { eq } from "drizzle-orm";

export async function getUserUsingEmail(email: string): Promise<Result<ISelectUser | null>> {
  try {
    const [user] = await orm.select().from(usersTable).where(eq(usersTable.email, email)).limit(1);
    return { ok: true, value: user ?? null };
  } catch (error) {
    return { ok: false, error: new Error("failed to fetch user", { cause: error }) };
  }
}

export async function createNewUser(userData: IInsertUser): Promise<Result<ISelectUser>> {
  try {
    const [user] = await orm.insert(usersTable).values(userData).returning();
    return { ok: true, value: user };
  } catch (error) {
    return { ok: false, error: new Error("failed to create user", { cause: error }) };
  }
}
