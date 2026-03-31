import Layout from "@/components/Layout";
import { BookNowHero } from "@/components/booking/BookNowHero";
import { BookNowPathsSection } from "@/components/booking/BookNowPathsSection";
import { BookNowUnsureCta } from "@/components/booking/BookNowUnsureCta";

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
            className="min-h-[min(480px,65vh)] w-full scroll-mt-24 rounded-[40px] bg-[#D9D9D9] md:min-h-[560px]"
            data-slot="booking-embed-placeholder"
          />
        </div>
      </section>
      <BookNowPathsSection />
      <BookNowUnsureCta />
    </Layout>
  );
}
