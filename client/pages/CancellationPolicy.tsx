import Layout from "@/components/Layout";

const h2Class =
  "mb-4 font-barlow font-extralight text-xl tracking-[-0.02em] text-charcoal md:text-2xl";
const pClass =
  "font-barlow font-light text-base leading-relaxed text-[rgba(45,41,38,0.85)] md:text-[17px] md:leading-[1.7]";
const sectionClass =
  "scroll-mt-24 border-b border-[rgba(103,92,83,0.1)] pb-10 last:border-0 last:pb-0 md:pb-12";

export default function CancellationPolicy() {
  return (
    <Layout>
      <h1 className="sr-only">Cancellation policy</h1>

      <article className="w-full bg-[#FAFAF5] px-6 py-16 md:px-10 md:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl space-y-10 md:space-y-12">
          <section className={sectionClass}>
            <p className={pClass}>
              At BEAUTY ROOMS. CLINIC, we value both our clients&apos; time and our artists&apos; schedules. Our
              providers often book out in advance, and last-minute cancellations prevent us from offering that
              appointment time to other clients who may be waiting.
            </p>
            <p className={`${pClass} mt-6`}>
              To ensure fairness to our team and our guests, we have the following policy:
            </p>
          </section>

          <section className={sectionClass} aria-labelledby="cancellation-24h">
            <h2 id="cancellation-24h" className={h2Class}>
              24-Hour Cancellation Requirement
            </h2>
            <p className={pClass}>
              Clients must cancel or reschedule their appointment at least 24 hours prior to the scheduled
              appointment time.
            </p>
          </section>

          <section className={sectionClass} aria-labelledby="cancellation-late">
            <h2 id="cancellation-late" className={h2Class}>
              Late Cancellations &amp; No-Shows
            </h2>
            <p className={pClass}>
              If an appointment is canceled with less than 24 hours&apos; notice, or if the client does not show up,
              a 25% cancellation fee of the scheduled service price will be charged to the card on file.
            </p>
          </section>

          <section className={sectionClass}>
            <p className={pClass}>
              This policy allows us to respect the time of our artists and accommodate other clients who are eager
              to book appointments.
            </p>
            <p className={`${pClass} mt-6`}>
              By booking an appointment with BEAUTY ROOMS. CLINIC, you acknowledge and agree to this cancellation
              policy.
            </p>
            <p className={`${pClass} mt-6`}>
              Thank you for understanding and supporting our team. 🤍
            </p>
          </section>
        </div>
      </article>
    </Layout>
  );
}
