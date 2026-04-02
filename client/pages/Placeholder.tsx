import { Link } from "react-router-dom";
import Layout from "@/components/Layout";

interface PlaceholderProps {
  title: string;
}

export default function Placeholder({ title }: PlaceholderProps) {
  return (
    <Layout>
      <section className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center px-6 text-center bg-background">
        <p className="font-barlow font-light text-xs tracking-[0.1em] uppercase text-warm-brown mb-4">
          Coming Soon
        </p>
        <h1 className="font-barlow font-extralight text-[clamp(36px,5vw,64px)] tracking-[-0.04em] text-charcoal mb-6 capitalize">
          {title}
        </h1>
        <p className="font-barlow font-light text-base leading-6 text-warm-brown max-w-md mb-10">
          This page is being crafted with care. Continue prompting to fill in this section with content tailored to your needs.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-primary-foreground font-barlow font-light text-xs tracking-[0.1em] uppercase hover:bg-primary/90 transition-colors"
        >
          Return Home
        </Link>
      </section>
    </Layout>
  );
}
