import { ServiceTextCard } from "./ServiceTextCard";

export function ServicesSection() {
  return (
    <section className="w-full bg-[#FAFAF5] mt-10 px-6 md:px-10 pb-16 md:pb-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="aspect-square md:aspect-auto md:min-h-[380px] overflow-hidden">
          <img
            src="https://images.pexels.com/photos/10850706/pexels-photo-10850706.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="Lip treatment"
            className="w-full h-full object-cover object-center grayscale"
          />
        </div>

        <div className="min-h-[320px] md:min-h-0">
          <ServiceTextCard
            title={"Microblading\n& Brows"}
            description="Enhance your natural lip color and shape with a soft tint that adds definition and the illusion of fullness."
            to="/services"
          />
        </div>

        <div className="aspect-square md:aspect-auto md:min-h-[380px] overflow-hidden">
          <img
            src="https://images.pexels.com/photos/30896215/pexels-photo-30896215.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="Microblading & brows treatment"
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
            src="https://images.pexels.com/photos/5725146/pexels-photo-5725146.jpeg?auto=compress&cs=tinysrgb&w=800"
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
