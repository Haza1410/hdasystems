import { cta } from "@/lib/site";
import Reveal from "./Reveal";

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="container-x">
        <Reveal>
          <div className="glass relative overflow-hidden px-8 py-16 text-center md:px-14 md:py-24">
            {/* soft inner glow */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_0%,rgba(46,230,192,0.12),transparent_60%)]" />

            <div className="relative mx-auto flex max-w-2xl flex-col items-center">
              <span className="eyebrow">{cta.eyebrow}</span>
              <h2 className="display mt-5 text-[clamp(2.4rem,6vw,4.5rem)] leading-[1]">
                <span className="text-ink">{cta.heading[0]} </span>
                <span className="text-gradient">{cta.heading[1]}</span>
              </h2>
              <p className="mt-6 max-w-md text-lg text-ink-muted">{cta.sub}</p>

              <a
                href={cta.primary.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-9 !px-12 !py-4 !text-lg"
              >
                {cta.primary.label}
                <span aria-hidden>↗</span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
