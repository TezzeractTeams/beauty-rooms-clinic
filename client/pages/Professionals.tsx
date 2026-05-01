import { useEffect } from "react";
import Layout from "@/components/Layout";
import { ProfessionalsDirectory } from "@/components/professionals/ProfessionalsDirectory";
import { ProfessionalsHero } from "@/components/professionals/ProfessionalsHero";

export default function Professionals() {
  useEffect(() => {
    document.title = "Professionals | Beauty Rooms Clinic";
    return () => {
      document.title = "Beauty Rooms Clinic";
    };
  }, []);

  return (
    <Layout>
      <ProfessionalsHero />
      <ProfessionalsDirectory />
    </Layout>
  );
}
