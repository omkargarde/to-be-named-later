// Source - https://stackoverflow.com/a/79135663
// Posted by Dan Philip Bejoy
// Retrieved 2026-02-21, License - CC BY-SA 4.0

export type StrictOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
