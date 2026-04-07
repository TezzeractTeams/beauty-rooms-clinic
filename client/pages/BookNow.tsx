import Layout from "@/components/Layout";
import { BookNowHero } from "@/components/booking/BookNowHero";
import { BookNowPathsSection } from "@/components/booking/BookNowPathsSection";
import { BookNowUnsureCta } from "@/components/booking/BookNowUnsureCta";

export default function BookNow() {
  return (
    <Layout>
      <BookNowHero />
      <BookNowPathsSection />
      <BookNowUnsureCta />
    </Layout>
  );
}
