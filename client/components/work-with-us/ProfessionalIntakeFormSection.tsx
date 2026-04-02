const labelClass =
  "mb-2 block font-barlow text-[11px] font-normal uppercase tracking-[0.14em] text-warm-brown/85 md:text-xs";

const inputClass =
  "w-full border border-[rgba(103,92,83,0.22)] bg-[#FAFAF5] px-4 py-3.5 font-barlow font-normal text-base text-charcoal placeholder:text-charcoal/30 shadow-none transition-colors focus:border-[rgba(103,92,83,0.45)] focus:outline-none focus:ring-1 focus:ring-warm-brown/25 [color-scheme:light]";

const sectionIntroClass =
  "font-barlow font-normal text-lg leading-[1.65] text-[rgba(45,41,38,0.75)] md:text-xl";

interface ProfessionalIntakeFormSectionProps {
  professionSuggestions: readonly string[];
}

export function ProfessionalIntakeFormSection({ professionSuggestions }: ProfessionalIntakeFormSectionProps) {
  return (
    <section
      className="w-full  px-6 py-20 md:px-10 md:py-28 lg:py-32"
      aria-labelledby="professional-intake-heading"
    >
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 font-barlow font-normal text-[10px] tracking-[0.15em] text-warm-brown/80 md:text-xs">
          Talent pipeline
        </p>
        <h2
          id="professional-intake-heading"
          className="mb-6 font-barlow font-extralight text-2xl tracking-[-0.02em] text-charcoal md:text-3xl"
        >
          Professional intake
        </h2>
        <p className={`mb-10 max-w-4xl ${sectionIntroClass}`}>
          We maintain a CRM-backed roster of professionals so we can scale coverage and stay less dependent
          on any single provider. Share your details and resume—submissions will feed directly into our
          system once live.
        </p>

        <div className="border border-[rgba(103,92,83,0.12)] p-8 shadow-[0_1px_0_rgba(255,255,255,0.5)_inset] md:p-10 [color-scheme:light]">
          <form
            className="professional-intake-form flex flex-col gap-8 [color-scheme:light]"
            onSubmit={(e) => e.preventDefault()}
            noValidate
          >
            <div>
              <label htmlFor="intake-name" className={labelClass}>
                Name
              </label>
              <input
                id="intake-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Full name"
                className={inputClass}
              />
            </div>

            <div className="grid gap-8 md:grid-cols-2 md:gap-6">
              <div>
                <label htmlFor="intake-email" className={labelClass}>
                  Email
                </label>
                <input
                  id="intake-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="intake-phone" className={labelClass}>
                  Telephone number
                </label>
                <input
                  id="intake-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="(941) 555-0100"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="intake-social" className={labelClass}>
                Social media
              </label>
              <input
                id="intake-social"
                name="socialMedia"
                type="text"
                placeholder="Instagram, LinkedIn, or profile URL"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="intake-profession" className={labelClass}>
                Profession
              </label>
              <input
                id="intake-profession"
                name="profession"
                type="text"
                list="intake-profession-suggestions"
                placeholder="Your primary role or specialty"
                className={inputClass}
              />
              <datalist id="intake-profession-suggestions">
                {professionSuggestions.map((s) => (
                  <option key={s} value={s} />
                ))}
              </datalist>
            </div>

            <div>
              <label htmlFor="intake-license" className={labelClass}>
                License held
              </label>
              <textarea
                id="intake-license"
                name="licenseHeld"
                rows={3}
                placeholder="License type, number, state, and expiry if applicable"
                className={`${inputClass} min-h-[6.5rem] resize-y py-3`}
              />
            </div>

            <div>
              <label htmlFor="intake-resume" className={labelClass}>
                Resume
              </label>
              <div className="relative">
                <input
                  id="intake-resume"
                  name="resume"
                  type="file"
                  accept=".pdf,.doc,.docx,application/pdf"
                  className="block w-full cursor-pointer border border-dashed border-[rgba(103,92,83,0.28)] bg-[#FAFAF5] px-4 py-8 font-barlow text-sm font-normal text-charcoal/70 shadow-none [color-scheme:light] file:mr-4 file:cursor-pointer file:border-0 file:bg-primary file:px-4 file:py-2 file:font-barlow file:text-xs file:uppercase file:tracking-[0.1em] file:text-primary-foreground focus-within:border-[rgba(103,92,83,0.45)] focus-within:ring-1 focus-within:ring-warm-brown/25"
                />
              </div>
              <p className="mt-2 font-barlow text-xs font-normal text-charcoal/45">
                PDF or Word, typically under 5 MB when submission is enabled.
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                className="inline-flex w-full items-center justify-center bg-primary px-10 py-5 font-barlow font-normal text-xs uppercase tracking-[0.1em] text-primary-foreground opacity-50 cursor-not-allowed sm:w-auto"
                disabled
              >
                Submit application
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
