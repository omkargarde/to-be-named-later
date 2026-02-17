import { hash, verify } from "@node-rs/argon2";

export async function hashPassword(password: string): Promise<string> {
  return await hash(password, {});
}

export async function verifyPasswordHash({
  password,
  hash,
}: {
  password: string;
  hash: string;
}): Promise<boolean> {
  return await verify(hash, password);
}
