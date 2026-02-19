import { compare, genSalt, hash } from "bcryptjs";

export async function hashPassword(password: string): Promise<string> {
  return await hash(password, await genSalt());
}

export async function verifyPasswordHash({
  password,
  hash,
}: {
  password: string;
  hash: string;
}): Promise<boolean> {
  return await compare(hash, password);
}
