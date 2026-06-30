import { stats } from "@/lib/site";
import Counter from "./Counter";
import Reveal from "./Reveal";

export default function Stats() {
  return (
    <section className="relative py-16 md:py-24">
      <div className="container-x">
        <Reveal>
          <div className="glass grid grid-cols-2 gap-px overflow-hidden rounded-3xl md:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex flex-col gap-2 p-7 md:p-9"
              >
                <div className="display text-4xl text-gradient-accent md:text-5xl">
                  {s.display ? (
                    s.display
                  ) : (
                    <Counter
                      value={s.value ?? 0}
                      prefix={s.prefix}
                      suffix={s.suffix}
                    />
                  )}
                </div>
                <div className="text-sm text-ink-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
