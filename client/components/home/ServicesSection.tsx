import { ServiceTextCard } from "./ServiceTextCard";

/** New photography assets (filenames as on disk; Permanent uses client’s spelling “Makup”). */
const IMG_HEAD_SPA = "/images/Head%20SPA.JPG";
const IMG_PERMANENT_MAKEUP = "/images/Permanent%20Makup.jpg";
const IMG_LASHES_BROWS = "/images/home-lashes.jpg";
/** Placeholder until dedicated Aesthetics photography is added */
const IMG_AESTHETICS = "/images/our-products.png";

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

/** Display order: top row Lashes & Brows | Head Spa; bottom row PMU | Aesthetics (2×2 grid). */
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
    imageSrc: IMG_HEAD_SPA,
    imageAlt: "Head spa and scalp wellness treatment",
    title: "Head Spa",
    description:
      "Scalp-focused rituals that melt tension away while supporting healthier hair from the root. Choose hydration, detox, or relaxation sessions tailored to you.",
    to: "/services/head-spa",
  },
  {
    imageSrc: IMG_PERMANENT_MAKEUP,
    imageAlt: "Permanent makeup consultation and treatment",
    title: "PMU",
    description:
      "Wake up ready with our bespoke cosmetic tattooing. Each treatment is tailored to your unique bone structure and aesthetic goals.",
    to: "/services/pmu",
  },
  {
    imageSrc: IMG_AESTHETICS,
    imageAlt: "Aesthetics and advanced skin treatments",
    title: "Aesthetics",
    description:
      "Targeted facials and advanced skin treatments designed to refine texture, restore radiance, and support long-term skin health.",
    to: "/services/esthetician",
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
