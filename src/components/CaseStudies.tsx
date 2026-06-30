"use client";

import { useRef, type MouseEvent } from "react";
import { caseStudies } from "@/lib/site";
import Counter from "./Counter";
import Reveal from "./Reveal";

function BrowserMock({
  accent,
  title,
  real,
}: {
  accent: string;
  title: string;
  real: boolean;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-base-800/80 shadow-2xl">
      <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="ml-3 h-4 flex-1 rounded-full bg-white/[0.04]" />
      </div>
      <div
        className="relative flex aspect-[16/10] items-center justify-center"
        style={{
          background: `radial-gradient(120% 100% at 80% 0%, ${accent}40, transparent 55%), linear-gradient(160deg, #0c0e14, #070809)`,
        }}
      >
        <div
          className="absolute -right-10 -top-10 h-44 w-44 rounded-3xl border border-white/10 blur-[1px]"
          style={{ background: `${accent}26`, transform: "rotate(16deg)" }}
        />
        <div
          className="absolute bottom-6 left-6 h-2 w-24 rounded-full"
          style={{ background: `${accent}cc` }}
        />
        <div className="absolute bottom-12 left-6 h-2 w-40 rounded-full bg-white/10" />
        <span
          className="relative font-sans text-3xl font-semibold tracking-tight text-white/90 md:text-4xl"
          style={{ textShadow: `0 0 40px ${accent}66` }}
        >
          {title}
        </span>
        <span className="absolute right-5 top-5 rounded-full border border-white/15 bg-black/30 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-white/70 backdrop-blur">
          {real ? "Live build" : "Sample"}
        </span>
      </div>
    </div>
  );
}

function CaseCard({
  cs,
  index,
}: {
  cs: (typeof caseStudies)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const flip = index % 2 === 1;

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1200px) rotateY(${px * 5}deg) rotateX(${-py * 5}deg)`;
  };
  const reset = () => {
    if (ref.current)
      ref.current.style.transform = "perspective(1200px) rotateY(0) rotateX(0)";
  };

  return (
    <Reveal delay={0.05}>
      <div className="glass grid items-center gap-8 p-6 md:grid-cols-2 md:gap-12 md:p-10">
        <div
          ref={ref}
          onMouseMove={onMove}
          onMouseLeave={reset}
          className={`transition-transform duration-200 will-change-transform ${
            flip ? "md:order-2" : ""
          }`}
        >
          <BrowserMock accent={cs.accent} title={cs.title} real={cs.real} />
        </div>

        <div className={flip ? "md:order-1" : ""}>
          <div className="eyebrow">{cs.sector}</div>
          <h3 className="display mt-3 text-3xl text-ink md:text-4xl">{cs.title}</h3>
          <p className="mt-3 max-w-md text-ink-muted">{cs.blurb}</p>

          <div className="mt-7 flex items-end gap-4">
            <div
              className="display text-5xl md:text-6xl"
              style={{ color: cs.accent }}
            >
              <Counter
                value={cs.metric.value}
                prefix={cs.metric.prefix}
                suffix={cs.metric.suffix}
              />
            </div>
            <div className="mb-2 text-sm text-ink-muted">{cs.metric.label}</div>
          </div>

          <div className="mt-7 flex flex-wrap gap-2">
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
              Real businesses. Real results. Built on the same £299/month plan.
            </p>
          </div>
        </Reveal>

        <div className="flex flex-col gap-7">
          {caseStudies.map((cs, i) => (
            <CaseCard key={cs.title} cs={cs} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
