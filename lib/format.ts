const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
const usdCents = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function formatMoney(n: number) {
  return Number.isInteger(n) ? usd.format(n) : usdCents.format(n);
}

export function formatNumber(n: number) {
  return new Intl.NumberFormat('en-US').format(n);
}

/** ISO date (YYYY-MM-DD) → "21 Nov 2026". Parsed as UTC so it never shifts by time zone. */
export function formatDate(iso: string, opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' }) {
  const [y, m, d] = iso.split('-').map(Number);
  const date = new Date(Date.UTC(y ?? 1970, (m ?? 1) - 1, d ?? 1));
  return new Intl.DateTimeFormat('en-GB', { ...opts, timeZone: 'UTC' }).format(date);
}

/** "2026-03" → "Mar 2026". */
export function formatMonth(ym: string) {
  return formatDate(`${ym}-01`, { month: 'short', year: 'numeric' });
}

/** Demo reference such as "DEMO-7K3Q9P"; random, not derived from any input. */
export function demoReference(random: () => number = Math.random) {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let s = '';
  for (let i = 0; i < 6; i++) s += alphabet[Math.floor(random() * alphabet.length)];
  return `DEMO-${s}`;
}
