"use client";

import { useCallback, useRef, useState } from "react";
import { transform } from "@/lib/site";
import Reveal from "./Reveal";

function Check({ ok }: { ok: boolean }) {
  return (
    <span
      className={`flex h-5 w-5 flex-none items-center justify-center rounded-full text-[11px] ${
        ok ? "bg-accent-teal text-[#04110d]" : "bg-white/10 text-ink-faint"
      }`}
    >
      {ok ? "✓" : "✕"}
    </span>
  );
}

export default function BeforeAfter() {
  const [pct, setPct] = useState(52);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const p = ((clientX - r.left) / r.width) * 100;
    setPct(Math.min(96, Math.max(4, p)));
  }, []);

  return (
    <section className="relative py-24 md:py-32">
      <div className="container-x">
        <Reveal>
          <div className="mb-10 text-center">
            <span className="eyebrow">{transform.eyebrow}</span>
            <h2 className="display mt-4 text-[clamp(2rem,5.5vw,4rem)] text-ink">
              From forgettable to{" "}
              <span className="text-gradient">unforgettable.</span>
            </h2>
            <p className="mt-4 text-ink-muted">{transform.sub}</p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            ref={ref}
            onPointerDown={(e) => {
              dragging.current = true;
              setFromClientX(e.clientX);
            }}
            onPointerMove={(e) => dragging.current && setFromClientX(e.clientX)}
            onPointerUp={() => (dragging.current = false)}
            onPointerLeave={() => (dragging.current = false)}
            className="glass relative aspect-[16/10] cursor-ew-resize select-none overflow-hidden rounded-3xl md:aspect-[2/1]"
          >
            {/* AFTER (full, underneath) */}
            <div className="absolute inset-0">
              <Panel variant="after" />
            </div>

            {/* BEFORE (clipped on top) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${pct}%` }}
            >
              <div
                className="h-full"
                style={{ width: ref.current?.offsetWidth ?? "100%" }}
              >
                <Panel variant="before" />
              </div>
            </div>

            {/* handle */}
            <div
              className="absolute inset-y-0 z-20 flex items-center"
              style={{ left: `${pct}%`, transform: "translateX(-50%)" }}
            >
              <div className="h-full w-px bg-white/40" />
              <div className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/10 text-ink backdrop-blur-md">
                ⇄
              </div>
            </div>

            <span className="absolute left-4 top-4 z-10 rounded-full border border-white/10 bg-black/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-muted backdrop-blur">
              {transform.before.label}
            </span>
            <span className="absolute right-4 top-4 z-10 rounded-full border border-accent-teal/40 bg-accent-teal/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-accent-teal backdrop-blur">
              {transform.after.label}
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-2">
            <div className="glass-soft p-5">
              <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint">
                {transform.before.name}
              </div>
              <ul className="space-y-2.5">
                {transform.before.points.map((p) => (
                  <li key={p} className="flex items-center gap-3 text-sm text-ink-muted">
                    <Check ok={false} />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-soft p-5">
              <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-accent-teal">
                {transform.after.name}
              </div>
              <ul className="space-y-2.5">
                {transform.after.points.map((p) => (
                  <li key={p} className="flex items-center gap-3 text-sm text-ink">
                    <Check ok />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Panel({ variant }: { variant: "before" | "after" }) {
  if (variant === "before") {
    return (
      <div className="flex h-full w-full flex-col bg-[#e9e7e1] text-[#2a2a28]">
        <div className="flex items-center justify-between border-b border-black/10 px-5 py-3">
          <span className="font-serif text-lg font-bold">Joe&apos;s Plumbing</span>
          <span className="text-xs text-black/50">Home · About · Contact</span>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
          <span className="font-serif text-xl underline">Welcome to our website!!!</span>
          <span className="max-w-sm text-xs text-black/60">
            We do plumbing in the local area. Please call us on the number below.
            Best plumber. Est. 2004.
          </span>
          <span className="mt-2 rounded border border-black/30 bg-[#d8d5cc] px-3 py-1 text-xs">
            Contact us
          </span>
          <div className="mt-2 h-16 w-24 rounded bg-black/10" />
        </div>
      </div>
    );
  }
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-[#070809]">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(110% 90% at 80% 0%, rgba(46,230,192,0.28), transparent 55%), radial-gradient(90% 90% at 0% 100%, rgba(139,123,255,0.22), transparent 55%)",
        }}
      />
      <div className="relative flex items-center justify-between px-6 py-4">
        <span className="text-sm font-semibold tracking-tight text-white">Joe&apos;s Plumbing</span>
        <span className="rounded-full bg-accent-teal px-3 py-1 text-[11px] font-semibold text-[#04110d]">
          Book online
        </span>
      </div>
      <div className="relative flex flex-1 flex-col justify-center px-6 md:px-10">
        <span className="font-sans text-3xl font-semibold leading-[1.05] tracking-tight text-white md:text-5xl">
          Emergency plumber,
          <br />
          <span className="text-gradient">on the way in 30.</span>
        </span>
        <span className="mt-3 max-w-xs text-xs text-white/60 md:text-sm">
          Trusted by 1,200+ local homes. Book online in 60 seconds.
        </span>
        <div className="mt-4 flex gap-2">
          <span className="rounded-full bg-accent-teal px-4 py-1.5 text-xs font-semibold text-[#04110d]">
            Get a quote
          </span>
          <span className="rounded-full border border-white/20 px-4 py-1.5 text-xs text-white">
            Call now
          </span>
        </div>
      </div>
    </div>
  );
}
