import Layout from "@/components/Layout";
import { BookNowHero } from "@/components/booking/BookNowHero";
import { BookNowPathsSection } from "@/components/booking/BookNowPathsSection";
import { BookNowUnsureCta } from "@/components/booking/BookNowUnsureCta";
import { BOULEVARD_INJECTOR_SCRIPT_SRC } from "@/lib/boulevardBooking";

/** Inline iframe widget; global overlay uses `injector.min.js` in `index.html` head. */
const BOULEVARD_WIDGET_SRC = BOULEVARD_INJECTOR_SCRIPT_SRC;

export default function BookNow() {
  return (
    <Layout>
      <BookNowHero />
      <section
        className="w-full bg-[#F9F9F7] pb-16 pt-2 md:pb-24 lg:pb-28"
        aria-label="Appointment booking"
      >
        <div className="mx-auto w-[90%]">
          <div
            id="booking-embed"
            className="scroll-mt-24 overflow-hidden rounded-[40px] bg-[#D9D9D9] shadow-sm"
            data-slot="booking-embed-placeholder"
          >
            <iframe
              title="Book an appointment online"
              src={BOULEVARD_WIDGET_SRC}
              className="block min-h-[min(480px,65vh)] w-full border-0 md:min-h-[560px]"
              sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
            />
          </div>
        </div>
      </section>
      <BookNowPathsSection />
      <BookNowUnsureCta />
    </Layout>
  );
}
