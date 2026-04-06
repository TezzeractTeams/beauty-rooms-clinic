import Layout from "@/components/Layout";
import { BookNowHero } from "@/components/booking/BookNowHero";
import { BookNowPathsSection } from "@/components/booking/BookNowPathsSection";
import { BookNowUnsureCta } from "@/components/booking/BookNowUnsureCta";

const BOULEVARD_BUSINESS_ID = "563b491d-6e0d-4898-b272-6a9565abde38";

/** Inline embed: Boulevard’s injector only supports a full-page overlay; the widget loads here via the same URL. */
const BOULEVARD_WIDGET_SRC = `https://www.joinblvd.com/b/${BOULEVARD_BUSINESS_ID}/widget?injector-version=1.0`;

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
