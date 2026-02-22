// https://chatgpt.com/c/6999c84b-9d7c-8321-a6bc-db8dda9311f7

type Ok<T> = { ok: true; value: T };
type Err<E> = { ok: false; error: E };
export type Result<T, E = Error> = Ok<T> | Err<E>;
