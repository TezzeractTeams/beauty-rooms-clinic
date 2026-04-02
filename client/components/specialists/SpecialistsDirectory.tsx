import { useMemo, useState } from "react";
import {
  SPECIALIST_FILTERS,
  filterSpecialists,
  specialists,
  type SpecialistFilterId,
} from "./specialists-data";
import { SpecialistCard } from "./SpecialistCard";

export function SpecialistsDirectory() {
  const [activeFilter, setActiveFilter] = useState<SpecialistFilterId>("all");

  const visible = useMemo(
    () => filterSpecialists(specialists, activeFilter),
    [activeFilter],
  );

  return (
    <section className="w-full bg-white" aria-label="Specialists directory">
      <div className="mx-auto max-w-[1400px] px-6 pb-14 pt-10 lg:px-[90px] lg:pb-16 lg:pt-12">
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2 md:mb-12 md:gap-3">
          {SPECIALIST_FILTERS.map(({ id, label }) => {
            const isActive = activeFilter === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setActiveFilter(id)}
                className={`rounded-lg px-5 py-2.5 font-barlow text-xs font-light tracking-[0.12em] uppercase transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-warm-brown hover:bg-muted/50"
                }`}
                aria-pressed={isActive}
              >
                {label}
              </button>
            );
          })}
        </div>

        {visible.length === 0 ? (
          <p className="text-center font-barlow text-sm font-light text-muted-foreground">
            No specialists match this category yet.
          </p>
        ) : (
          <ul className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-10">
            {visible.map((s) => (
              <li key={s.id}>
                <SpecialistCard specialist={s} headingId={`specialist-${s.id}-heading`} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
