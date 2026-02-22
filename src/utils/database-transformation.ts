export function toPaisa(rupees: number): number {
  return Math.round(rupees * 100);
}

export function toRupees(paisa: number): number {
  return Number((paisa / 100).toFixed(2));
}
