import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { BookingOrderSummary } from "../BookingOrderSummary";
import { isComplimentaryCartTotal } from "../bookingPricing";
import { BookableDate, BookableTime } from "../utils/boulevardApi";
import {
  formatSlotTime,
  getSalonTzShortLabel,
  getUserTimeZone,
  SALON_TIMEZONE,
  salonTodayYmd,
  userDiffersFromSalonTimezone,
} from "../utils/salonTimezone";

interface Props {
  availableDates: BookableDate[];
  availableTimes: BookableTime[];
  selectedDate: string | null;
  selectedTime: BookableTime | null;
  loading: boolean;
  error: string | null;
  serviceName: string;
  serviceTotalUsd: number | null;
  onSelectDate: (date: string) => void;
  onSelectTime: (time: BookableTime) => void;
  onConfirm: () => void;
}

/** Calendly-style accent: strong primary for available/selected (site uses warm primary). */
const accent = {
  available: "bg-primary/12 font-medium text-primary hover:bg-primary/20",
  selected: "bg-primary font-medium text-primary-foreground shadow-sm ring-2 ring-primary ring-offset-2 ring-offset-[#FAFAF5]",
  muted: "text-charcoal/30",
} as const;

const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function formatSelectedDateHeading(ymd: string): string {
  const [y, m, d] = ymd.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
}

export function DateTimeStep({
  availableDates,
  availableTimes,
  selectedDate,
  selectedTime,
  loading,
  error,
  serviceName,
  serviceTotalUsd,
  onSelectDate,
  onSelectTime,
  onConfirm,
}: Props) {
  const availableSet = useMemo(
    () => new Set(availableDates.map((d) => d.date)),
    [availableDates],
  );

  const today = new Date();
  /** Salon calendar date (not UTC) — avoids wrong "past" / disabled days near midnight. */
  const todayStr = salonTodayYmd(today);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  /** false = show slots in salon Pacific time; true = convert display to visitor's local timezone */
  const [useLocalTime, setUseLocalTime] = useState(false);

  useEffect(() => {
    if (!selectedDate) return;
    const [y, m] = selectedDate.split("-").map(Number);
    if (!y || !m) return;
    setViewYear(y);
    setViewMonth(m - 1);
  }, [selectedDate]);

  const complimentary = isComplimentaryCartTotal(serviceTotalUsd);
  const showTimezoneHeadsUp = userDiffersFromSalonTimezone();
  const salonTzLabel = useMemo(() => {
    const ref =
      selectedTime != null
        ? new Date(selectedTime.startTime)
        : selectedDate != null
          ? new Date(`${selectedDate}T12:00:00`)
          : new Date();
    return getSalonTzShortLabel(ref);
  }, [selectedDate, selectedTime]);

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1); }
    else setViewMonth((m) => m - 1);
  }

  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1); }
    else setViewMonth((m) => m + 1);
  }

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  function padDate(n: number) {
    return String(n).padStart(2, "0");
  }

  function dateStr(day: number) {
    return `${viewYear}-${padDate(viewMonth + 1)}-${padDate(day)}`;
  }

  return (
    <div className="flex w-full flex-col gap-8">
      <BookingOrderSummary
        className="mb-1"
        serviceName={serviceName}
        serviceTotalUsd={serviceTotalUsd}
        providerLabel="First available"
      />

      <h3 className="font-barlow text-lg font-light tracking-[-0.02em] text-charcoal md:text-xl">
        Select a Date &amp; Time
      </h3>

      {showTimezoneHeadsUp && (
        <div
          role="status"
          className="border border-amber-200/80 bg-amber-50/90 px-4 py-3 text-left font-barlow text-sm font-light leading-relaxed text-charcoal"
        >
          <p className="font-medium uppercase tracking-[0.06em] text-amber-900/90">Heads up!</p>
          <p className="mt-1.5 text-charcoal/85">
            It looks like you&apos;re in a different timezone ({getUserTimeZone()}). Times below are shown in{" "}
            <span className="font-medium">{salonTzLabel}</span> ({SALON_TIMEZONE.replace(/_/g, " ")}).{" "}
            <button
              type="button"
              onClick={() => setUseLocalTime((v) => !v)}
              className="font-medium text-warm-brown underline decoration-warm-brown/35 underline-offset-2 hover:text-warm-brown/90"
            >
              {useLocalTime ? `Switch to ${salonTzLabel}` : "Switch to local time"}
            </button>
            .
          </p>
        </div>
      )}

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
        {/* Left: calendar (Calendly-style) */}
        <div className="w-full shrink-0 lg:max-w-[min(100%,380px)]">
          <div className="rounded-sm border border-[rgba(103,92,83,0.12)] bg-[#FAFAF5] p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={prevMonth}
                className="flex h-9 w-9 items-center justify-center rounded-full text-primary transition-colors hover:bg-primary/10"
                aria-label="Previous month"
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
              </button>
              <span className="font-barlow text-sm font-normal tracking-wide text-charcoal">
                {MONTHS[viewMonth]} {viewYear}
              </span>
              <button
                type="button"
                onClick={nextMonth}
                className="flex h-9 w-9 items-center justify-center rounded-full text-primary transition-colors hover:bg-primary/10"
                aria-label="Next month"
              >
                <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>

            <div className="mt-4 grid grid-cols-7 gap-y-1">
              {DAYS.map((d) => (
                <div
                  key={d}
                  className="pb-2 text-center font-barlow text-[10px] font-medium uppercase tracking-[0.06em] text-charcoal/40"
                >
                  {d}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-x-0 gap-y-1.5">
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const ds = dateStr(day);
                const isAvailable = availableSet.has(ds);
                const isSelected = selectedDate === ds;
                const isPast = ds < todayStr;

                return (
                  <div key={ds} className="flex h-10 items-center justify-center">
                    <button
                      type="button"
                      disabled={!isAvailable || isPast}
                      onClick={() => onSelectDate(ds)}
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-full font-barlow text-sm transition-colors",
                        isSelected && accent.selected,
                        !isSelected && isAvailable && !isPast && accent.available,
                        !isSelected && (!isAvailable || isPast) && accent.muted,
                        isAvailable && !isPast && !isSelected && "cursor-pointer",
                        !isAvailable || isPast ? "cursor-not-allowed" : "",
                      )}
                    >
                      {day}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: time slots — vertical list */}
        <div className="min-h-[240px] flex-1 lg:max-h-[min(60vh,420px)] lg:overflow-y-auto lg:pr-1">
          {!selectedDate ? (
            <p className="font-barlow text-sm font-light text-charcoal/50">
              Select a date to see available times.
            </p>
          ) : (
            <>
              <p className="mb-4 font-barlow text-base font-light text-charcoal">
                {formatSelectedDateHeading(selectedDate)}
              </p>
              {loading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary/60" strokeWidth={1.5} />
                </div>
              ) : availableTimes.length === 0 ? (
                <p className="font-barlow text-sm font-light text-charcoal/55">
                  No times available for this date. Please choose another day.
                </p>
              ) : (
                <div className="flex flex-col gap-2">
                  {availableTimes.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => onSelectTime(t)}
                      className={cn(
                        "w-full border px-4 py-3 text-left font-barlow text-sm font-medium transition-colors",
                        selectedTime?.id === t.id
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-primary/25 bg-white text-primary hover:border-primary/50 hover:bg-primary/5",
                      )}
                    >
                      {formatSlotTime(t.startTime, useLocalTime)}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {error && (
        <p className="rounded-none border border-red-200 bg-red-50 px-4 py-3 font-barlow text-sm font-light text-red-600">
          {error}
        </p>
      )}

      <button
        type="button"
        disabled={!selectedDate || !selectedTime || loading}
        onClick={onConfirm}
        className="w-full max-w-md border border-transparent bg-primary px-6 py-4 font-barlow text-[11px] font-light uppercase tracking-[0.1em] text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.5} />
            Please wait…
          </span>
        ) : complimentary ? (
          "Confirm booking"
        ) : (
          "Proceed to payment"
        )}
      </button>
    </div>
  );
}
