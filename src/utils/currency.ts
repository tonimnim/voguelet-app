/** Formats a DRF decimal string (e.g. "1200.00") as "KES 1,200" (or "KES 1,299.50" when there's a fraction). */
export function formatPrice(value: string | number, currency = 'KES'): string {
  const amount = typeof value === 'string' ? Number(value) : value;
  if (!Number.isFinite(amount)) return `${currency} —`;

  const hasFraction = Math.round(amount * 100) % 100 !== 0;
  const formatted = new Intl.NumberFormat('en-KE', {
    minimumFractionDigits: hasFraction ? 2 : 0,
    maximumFractionDigits: hasFraction ? 2 : 0,
  }).format(amount);

  return `${currency} ${formatted}`;
}
