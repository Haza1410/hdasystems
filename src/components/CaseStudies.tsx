"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { caseStudies } from "@/lib/site";
import Reveal from "./Reveal";

const ease = [0.16, 1, 0.3, 1] as const;

function hostOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

/* Live, interactive site preview that enlarges on hover so visitors
   can scroll and click through the real site (Cuberto-style). */
function LivePreview({
  url,
  title,
  accent,
}: {
  url: string;
  title: string;
  accent: string;
}) {
  const [active, setActive] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      initial={false}
      animate={{ height: active ? 600 : 380 }}
      transition={{ duration: 0.55, ease }}
      className="group/preview relative overflow-hidden rounded-2xl border border-white/10 bg-base-800"
      style={{
        boxShadow: active
          ? `0 40px 120px -40px ${accent}55, inset 0 1px 0 0 rgba(255,255,255,0.06)`
          : "inset 0 1px 0 0 rgba(255,255,255,0.06)",
      }}
    >
      {/* browser chrome */}
      <div className="relative z-10 flex items-center gap-1.5 border-b border-white/[0.06] bg-base-900/80 px-4 py-2.5 backdrop-blur">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="ml-3 flex-1 truncate rounded-full bg-white/[0.05] px-3 py-1 font-mono text-[11px] text-ink-faint">
          {hostOf(url)}
        </span>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="ml-2 rounded-full border border-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted transition-colors hover:border-accent-teal/50 hover:text-accent-teal"
        >
          Open ↗
        </a>
      </div>

      {/* the live site */}
      <iframe
        src={url}
        title={title}
        loading="lazy"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        className="h-[calc(100%-41px)] w-full bg-white"
        style={{ pointerEvents: active ? "auto" : "none" }}
      />

      {/* hover-to-interact hint (fades out once active) */}
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center pb-5 transition-opacity duration-300 ${
          active ? "opacity-0" : "opacity-100"
        }`}
      >
        <span className="flex items-center gap-2 rounded-full border border-white/10 bg-base-900/80 px-4 py-2 text-sm text-ink backdrop-blur-md">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: accent }}
          />
          Hover to explore — scroll &amp; click the live site
        </span>
      </div>
    </motion.div>
  );
}

function ComingSoon({ title, accent }: { title: string; accent: string }) {
  return (
    <div className="relative flex h-[380px] items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-base-800">
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background: `radial-gradient(120% 90% at 80% 0%, ${accent}33, transparent 55%), linear-gradient(160deg,#0c0e14,#070809)`,
        }}
      />
      <div className="relative flex flex-col items-center gap-3 text-center">
        <span className="font-sans text-3xl font-semibold tracking-tight text-white/90 md:text-4xl">
          {title}
        </span>
        <span className="rounded-full border border-white/15 bg-black/30 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-muted backdrop-blur">
          Live preview coming soon
        </span>
      </div>
    </div>
  );
}

function CaseCard({ cs }: { cs: (typeof caseStudies)[number] }) {
  return (
    <Reveal delay={0.05}>
      <div className="glass p-5 md:p-7">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="eyebrow">{cs.sector}</div>
            <h3 className="display mt-2 text-2xl text-ink md:text-3xl">
              {cs.title}
            </h3>
            <p className="mt-2 max-w-xl text-ink-muted">{cs.blurb}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {cs.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/[0.1] bg-white/[0.03] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {cs.url ? (
          <LivePreview url={cs.url} title={cs.title} accent={cs.accent} />
        ) : (
          <ComingSoon title={cs.title} accent={cs.accent} />
        )}
      </div>
    </Reveal>
  );
}

export default function CaseStudies() {
  return (
    <section id="work" className="relative py-24 md:py-32">
      <div className="container-x">
        <Reveal>
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="eyebrow">Selected work</span>
              <h2 className="display mt-4 text-[clamp(2.2rem,6vw,4.5rem)] text-ink">
                Proof, not <span className="text-gradient">promises.</span>
              </h2>
            </div>
            <p className="max-w-xs text-ink-muted">
              These are real, live sites. Hover any one to scroll and click
              through it — right here on the page.
            </p>
          </div>
        </Reveal>

        <div className="flex flex-col gap-7">
          {caseStudies.map((cs) => (
            <CaseCard key={cs.title} cs={cs} />
          ))}
        </div>
      </div>
    </section>
  );
}
