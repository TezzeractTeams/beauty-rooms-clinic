import { Input } from "@/components/ui/input";
import { CreditCard, Loader2, Lock } from "lucide-react";
import { type FormEvent, useState } from "react";
import { BookingOrderSummary } from "../BookingOrderSummary";
import { CardData } from "../utils/tokenize";

interface Props {
  loading: boolean;
  error: string | null;
  serviceName: string;
  serviceTotalUsd: number | null;
  specialistName: string | null;
  onSubmit: (card: CardData) => void;
}

export function PaymentStep({
  loading,
  error,
  serviceName,
  serviceTotalUsd,
  specialistName,
  onSubmit,
}: Props) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  function formatCardNumber(val: string) {
    return val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  }

  function handleNumberChange(val: string) {
    setNumber(val.replace(/\D/g, "").slice(0, 16));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setValidationError(null);

    if (!name.trim()) { setValidationError("Please enter the cardholder name."); return; }
    if (number.length < 13) { setValidationError("Please enter a valid card number."); return; }
    if (!cvv || cvv.length < 3) { setValidationError("Please enter a valid CVV."); return; }
    if (!expMonth || Number(expMonth) < 1 || Number(expMonth) > 12) {
      setValidationError("Please enter a valid expiry month (01–12)."); return;
    }
    if (!expYear || expYear.length < 2) { setValidationError("Please enter a valid expiry year."); return; }
    if (!postalCode.trim()) { setValidationError("Please enter your postal code."); return; }

    onSubmit({
      name: name.trim(),
      number,
      cvv,
      exp_month: expMonth.padStart(2, "0"),
      exp_year: expYear,
      postal_code: postalCode.trim(),
    });
  }

  const inputClass =
    "h-11 rounded-none border-[rgba(103,92,83,0.2)] bg-[#fafaf5] font-barlow text-sm font-light focus-visible:ring-2 focus-visible:ring-warm-brown/30 focus-visible:ring-offset-0";

  const providerLabel = specialistName?.trim() || "First available";

  return (
    <div className="flex flex-col gap-6">
      <BookingOrderSummary
        serviceName={serviceName}
        serviceTotalUsd={serviceTotalUsd}
        providerLabel={providerLabel}
        emphasizeBookingCharge
      />

      <form className="professional-intake-form flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
      <div>
        <h3 className="font-barlow text-base font-light uppercase tracking-[0.12em] text-charcoal">
          Payment Details
        </h3>
        <p className="mt-1 flex items-center gap-1.5 font-barlow text-xs font-light text-charcoal/50">
          <Lock className="h-3 w-3 shrink-0" strokeWidth={1.5} aria-hidden />
          Your card details are encrypted and sent directly to Boulevard. We never store them.
        </p>
      </div>

      <div className="relative">
        <label htmlFor="card-name" className="mb-1.5 block font-barlow text-xs font-light uppercase tracking-[0.08em] text-charcoal/60">
          Cardholder Name
        </label>
        <Input
          id="card-name"
          name="card-name"
          autoComplete="cc-name"
          placeholder="Name on card"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
          required
        />
      </div>

      <div>
        <label htmlFor="card-number" className="mb-1.5 block font-barlow text-xs font-light uppercase tracking-[0.08em] text-charcoal/60">
          Card Number
        </label>
        <div className="relative">
          <CreditCard
            className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-warm-brown/70"
            strokeWidth={1.25}
            aria-hidden
          />
          <Input
            id="card-number"
            name="card-number"
            inputMode="numeric"
            autoComplete="cc-number"
            placeholder="1234 5678 9012 3456"
            value={formatCardNumber(number)}
            onChange={(e) => handleNumberChange(e.target.value)}
            className={`${inputClass} pl-10`}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <label htmlFor="card-exp-month" className="mb-1.5 block font-barlow text-xs font-light uppercase tracking-[0.08em] text-charcoal/60">
            Month
          </label>
          <Input
            id="card-exp-month"
            name="card-exp-month"
            inputMode="numeric"
            autoComplete="cc-exp-month"
            placeholder="MM"
            maxLength={2}
            value={expMonth}
            onChange={(e) => setExpMonth(e.target.value.replace(/\D/g, "").slice(0, 2))}
            className={inputClass}
            required
          />
        </div>
        <div>
          <label htmlFor="card-exp-year" className="mb-1.5 block font-barlow text-xs font-light uppercase tracking-[0.08em] text-charcoal/60">
            Year
          </label>
          <Input
            id="card-exp-year"
            name="card-exp-year"
            inputMode="numeric"
            autoComplete="cc-exp-year"
            placeholder="YY"
            maxLength={2}
            value={expYear}
            onChange={(e) => setExpYear(e.target.value.replace(/\D/g, "").slice(0, 2))}
            className={inputClass}
            required
          />
        </div>
        <div>
          <label htmlFor="card-cvv" className="mb-1.5 block font-barlow text-xs font-light uppercase tracking-[0.08em] text-charcoal/60">
            CVV
          </label>
          <Input
            id="card-cvv"
            name="card-cvv"
            inputMode="numeric"
            autoComplete="cc-csc"
            placeholder="123"
            maxLength={4}
            value={cvv}
            onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
            className={inputClass}
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="card-postal" className="mb-1.5 block font-barlow text-xs font-light uppercase tracking-[0.08em] text-charcoal/60">
          Postal Code
        </label>
        <Input
          id="card-postal"
          name="card-postal"
          autoComplete="postal-code"
          placeholder="Postal / ZIP code"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          className={inputClass}
          required
        />
      </div>

      {(validationError ?? error) && (
        <p className="rounded-none border border-red-200 bg-red-50 px-4 py-3 font-barlow text-sm font-light text-red-600">
          {validationError ?? error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary px-6 py-4 font-barlow text-[11px] font-light uppercase tracking-[0.1em] text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.5} />
            Processing…
          </span>
        ) : (
          "Confirm & Pay"
        )}
      </button>
    </form>
    </div>
  );
}
