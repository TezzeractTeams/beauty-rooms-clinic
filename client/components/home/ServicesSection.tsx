import { ServiceTextCard } from "./ServiceTextCard";

export function ServicesSection() {
  return (
    <section className="w-full bg-[#FAFAF5] mt-10 px-6 md:px-10 pb-16 md:pb-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="aspect-square md:aspect-auto md:min-h-[380px] overflow-hidden">
          <img
            src="/images/lashes.webp"
            alt="Lashes and brow styling"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="min-h-[320px] md:min-h-0">
          <ServiceTextCard
            title={"Lashes\n& Brows"}
            description="From lifted, fuller lashes to perfectly shaped brows, we refine what frames your face. Custom lash treatments and brow design that look polished yet natural—so you leave feeling confident and camera-ready every day."
            to="/services"
          />
        </div>

        <div className="aspect-square md:aspect-auto md:min-h-[380px] overflow-hidden">
          <img
            src="/images/Permanent%20Makeup.webp"
            alt="Permanent makeup treatment"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="min-h-[320px] md:min-h-0">
          <ServiceTextCard
            title="Permanent Makeup"
            description="Wake up ready with our bespoke cosmetic tattooing. Each treatment is tailored to your unique bone structure and aesthetic goals."
            to="/services"
          />
        </div>

        <div className="aspect-square md:aspect-auto md:min-h-[380px] overflow-hidden">
          <img
            src="/images/Lip%20Blush.webp"
            alt="Lip blush treatment"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="min-h-[320px] md:min-h-0">
          <ServiceTextCard
            title="Lip Blush"
            description="Enhance your natural lip color and shape with a soft tint that adds definition and the illusion of fullness."
            to="/services"
          />
        </div>
      </div>
    </section>
  );
}
