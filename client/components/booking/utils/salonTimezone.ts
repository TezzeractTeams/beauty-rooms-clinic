/** Salon schedule & Boulevard `tz` — Sarasota, FL (US Eastern: EDT / EST). */
export const SALON_TIMEZONE = "America/New_York";

/**
 * True if the string already specifies an instant (UTC `Z` or numeric offset).
 * Those must be parsed with `new Date` as-is — they match Boulevard's clock.
 */
function hasExplicitZone(iso: string): boolean {
  const s = iso.trim();
  return /[zZ]|[+-]\d{2}:?\d{2}$|[+-]\d{4}$/.test(s);
}

/** Wall-clock parts of an instant in the salon timezone. */
function getSalonWallParts(utcMs: number): {
  y: number;
  mo: number;
  d: number;
  H: number;
  M: number;
  S: number;
} {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: SALON_TIMEZONE,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(new Date(utcMs));
  const get = (t: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === t)?.value ?? "0";
  return {
    y: +get("year"),
    mo: +get("month"),
    d: +get("day"),
    H: +get("hour"),
    M: +get("minute"),
    S: +get("second"),
  };
}

function salonWallMatches(
  utcMs: number,
  y: number,
  mo: number,
  d: number,
  H: number,
  M: number,
  S: number,
): boolean {
  const p = getSalonWallParts(utcMs);
  return p.y === y && p.mo === mo && p.d === d && p.H === H && p.M === M && p.S === S;
}

/**
 * Boulevard often returns `YYYY-MM-DDTHH:mm:ss` with **no** `Z` meaning **salon local** wall time.
 * `new Date()` would interpret that as the **visitor's** local zone → wrong time vs dashboard.
 * This finds the UTC instant with that wall time in the salon zone (`SALON_TIMEZONE`).
 */
function utcInstantForSalonWall(
  y: number,
  mo: number,
  d: number,
  H: number,
  M: number,
  S: number,
): Date | null {
  const lo = Date.UTC(y, mo - 1, d - 1, 0, 0, 0);
  const hi = Date.UTC(y, mo - 1, d + 2, 0, 0, 0);
  for (let t = lo; t <= hi; t += 1000) {
    if (salonWallMatches(t, y, mo, d, H, M, S)) {
      return new Date(t);
    }
  }
  return null;
}

/**
 * Parse `startTime` from the API for display and comparison.
 * - Values with `Z` / offset: real instant (same as Boulevard when they send UTC).
 * - Naive `YYYY-MM-DDTHH:mm:ss`: treat as **salon** (Eastern) wall time (matches Boulevard UI).
 */
export function parseBoulevardInstant(iso: string): Date {
  const s = iso.trim();
  if (!s) return new Date(NaN);
  if (hasExplicitZone(s)) {
    return new Date(s);
  }

  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d+))?)?/.exec(s);
  if (m) {
    const y = +m[1];
    const mo = +m[2];
    const day = +m[3];
    const H = +m[4];
    const Mi = +m[5];
    const Sec = m[6] ? +m[6] : 0;
    const resolved = utcInstantForSalonWall(y, mo, day, H, Mi, Sec);
    if (resolved) return resolved;
  }

  return new Date(s);
}

/** Today's calendar date (YYYY-MM-DD) in the salon timezone — availability "past" checks. */
export function salonTodayYmd(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: SALON_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

/** Short label e.g. "PDT", "PST", "EDT". */
export function getTzShortLabel(forDate: Date, timeZone: string): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "short",
  }).formatToParts(forDate);
  return parts.find((p) => p.type === "timeZoneName")?.value ?? "";
}

/** Short label for the salon zone e.g. "EDT", "EST". */
export function getSalonTzShortLabel(forDate: Date = new Date()): string {
  return getTzShortLabel(forDate, SALON_TIMEZONE) || "ET";
}

/** Format that instant in a specific IANA zone (e.g. visitor’s local time). */
export function formatAppointmentInZone(iso: string, timeZone: string): {
  date: string;
  time: string;
  tzShort: string;
} {
  const d = parseBoulevardInstant(iso);
  if (Number.isNaN(d.getTime())) {
    return { date: "", time: "", tzShort: "" };
  }
  const tzShort = getTzShortLabel(d, timeZone) || "local";
  const date = d.toLocaleDateString("en-US", {
    timeZone,
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const time = d
    .toLocaleTimeString("en-US", {
      timeZone,
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .toLowerCase();
  return { date, time, tzShort };
}

/** Confirmation — salon wall time (same as Boulevard dashboard). */
export function formatAppointmentInSalon(iso: string): {
  date: string;
  time: string;
  tzShort: string;
} {
  return formatAppointmentInZone(iso, SALON_TIMEZONE);
}

export function getUserTimeZone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return SALON_TIMEZONE;
  }
}

export function userDiffersFromSalonTimezone(): boolean {
  return getUserTimeZone() !== SALON_TIMEZONE;
}

export function formatSlotTime(iso: string, useLocalTimezone: boolean): string {
  const d = parseBoulevardInstant(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d
    .toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      ...(useLocalTimezone ? {} : { timeZone: SALON_TIMEZONE }),
    })
    .toLowerCase();
}
