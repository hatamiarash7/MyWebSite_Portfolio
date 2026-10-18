const digits = new Intl.NumberFormat("fa-IR", { useGrouping: false });

export function toPersianDigits(value: number | string): string {
  return typeof value === "number" ? digits.format(value) : value.replace(/\d/g, (d) => digits.format(Number(d)));
}
