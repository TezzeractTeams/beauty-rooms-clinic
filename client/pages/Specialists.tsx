import Layout from "@/components/Layout";
import { SpecialistsDirectory } from "@/components/specialists/SpecialistsDirectory";
import { SpecialistsHero } from "@/components/specialists/SpecialistsHero";

export default function Specialists() {
  return (
    <Layout>
      <SpecialistsHero />
      <SpecialistsDirectory />
    </Layout>
  );
}
