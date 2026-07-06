import VideoDemo from "@/components/VideoDemo";
import Reveal from "@/components/Reveal";

type Stat = {
  value: string;
  label: string;
};

type Props = {
  id: string;
  title: string;
  stats: Stat[];
  videoSrc?: string;
  poster?: string;
  reverse?: boolean;
};

export default function DemoSection({
  id,
  title,
  stats,
  videoSrc,
  poster,
  reverse = false,
}: Props) {
  return (
    <section id={id} className="scroll-mt-28 py-16 md:py-24">
      <div className="container-x">
        <Reveal>
          <h2 className="display mb-10 text-center text-[clamp(1.8rem,4.5vw,3rem)] leading-[1.05] text-ink md:mb-14">
            {title}
          </h2>
        </Reveal>

        <div
          className={`grid items-start gap-8 lg:gap-10 ${
            reverse
              ? "lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.95fr)]"
              : "lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.35fr)]"
          }`}
        >
          <Reveal delay={0.05} className={reverse ? "lg:col-start-2" : undefined}>
            <div className="flex flex-col gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="glass p-5 sm:p-6">
                  <div className="display text-4xl text-gradient-accent sm:text-5xl">
                    {stat.value}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-ink sm:text-[1rem]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal
            delay={0.1}
            className={reverse ? "lg:col-start-1 lg:row-start-1" : "lg:col-start-2"}
          >
            <div>
              <p className="mb-4 text-center text-sm font-medium text-ink-muted">
                See a short demo below
              </p>
              <VideoDemo title={title} videoSrc={videoSrc} poster={poster} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
