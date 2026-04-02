import { ServiceTextCard } from "./ServiceTextCard";

/** New photography assets (filenames as on disk; Permanent uses client’s spelling “Makup”). */
const IMG_HEAD_SPA = "/images/Head%20SPA.JPG";
const IMG_PERMANENT_MAKEUP = "/images/Permanent%20Makup.jpg";
const IMG_LIP_BLUSH_TINT = "/images/LipBlush.jpg";
const IMG_LASHES_BROWS = "/images/home-lashes.jpg";

const tileMinH = "max-h-[45vh]";

const splitCardClass = `h-full min-h-[180px] ${tileMinH} py-6 px-6 sm:px-8 md:py-8 md:px-10 lg:px-12`;

interface ServiceSplitTileProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  to: string;
}

function ServiceSplitTile({ imageSrc, imageAlt, title, description, to }: ServiceSplitTileProps) {
  return (
    <div className={`flex flex-col md:flex-row w-full min-h-0 ${tileMinH}`}>
      <div className={`w-full md:w-1/2 h-[min(38vw,220px)] md:h-auto ${tileMinH} shrink-0 overflow-hidden`}>
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className={`w-full md:w-1/2 flex flex-col min-h-0 ${tileMinH}`}>
        <ServiceTextCard
          title={title}
          description={description}
          to={to}
          className={splitCardClass}
        />
      </div>
    </div>
  );
}

/** Display order: Lashes → Lip → Permanent → Head Spa (reading order in 2×2 grid). */
const SERVICES: ServiceSplitTileProps[] = [
  {
    imageSrc: IMG_LASHES_BROWS,
    imageAlt: "Close-up of classic eyelash extensions and soft shaded eyeliner",
    title: "Lashes & Brows",
    description:
      "From lifted, fuller lashes to perfectly shaped brows, we refine what frames your face. Custom lash treatments and brow design that look polished yet natural.",
    to: "/services/lash",
  },
  {
    imageSrc: IMG_LIP_BLUSH_TINT,
    imageAlt: "Lip blush and tint treatment",
    title: "Lip Blush & Tint",
    description:
      "Enhance your natural lip color and shape with a soft tint that adds definition and the illusion of fullness.",
    to: "/services/pmu",
  },
  {
    imageSrc: IMG_PERMANENT_MAKEUP,
    imageAlt: "Permanent makeup consultation and treatment",
    title: "Permanent Makeup",
    description:
      "Wake up ready with our bespoke cosmetic tattooing. Each treatment is tailored to your unique bone structure and aesthetic goals.",
    to: "/services/pmu",
  },
  {
    imageSrc: IMG_HEAD_SPA,
    imageAlt: "Head spa and scalp wellness treatment",
    title: "Head Spa",
    description:
      "Scalp-focused rituals that melt tension away while supporting healthier hair from the root. Choose hydration, detox, or relaxation sessions tailored to you.",
    to: "/services/head-spa",
  },
];

export function ServicesSection() {
  return (
    <section className="w-full bg-[#FAFAF5] mt-10 pb-16 md:pb-24">
      {/*
        2×2 grid (four tiles). Gutter between tiles; each tile still has flush image | text.
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 w-[95vw] max-w-[95vw] mx-auto">
        {SERVICES.map((s) => (
          <ServiceSplitTile key={s.title} {...s} />
        ))}
      </div>
    </section>
  );
}
