type Variant =
  | "recessed"
  | "gallery"
  | "sage-wash"
  | "sage-orb"
  | "terra-orb"
  | "dark-pricing"
  | "contact-glow";

const shared =
  "pointer-events-none absolute inset-0 z-0 overflow-hidden select-none";

/** Soft vertical blend into the page cream */
function EdgeFade() {
  return (
    <>
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-base to-transparent md:h-28" />
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-base to-transparent md:h-28" />
    </>
  );
}

export default function SectionBackdrop({ variant }: { variant: Variant }) {
  switch (variant) {
    case "recessed":
      return (
        <div className={shared} aria-hidden>
          <div className="absolute inset-0 bg-base-700" />
          <EdgeFade />
        </div>
      );

    case "gallery":
      return (
        <div className={shared} aria-hidden>
          <div className="absolute inset-0 bg-[#ebe3d4]" />
          <div className="absolute -left-[6%] top-[10%] h-[min(400px,50vw)] w-[min(400px,50vw)] rounded-full bg-[radial-gradient(circle,rgba(217,140,106,0.22),transparent_66%)] blur-[70px]" />
          <EdgeFade />
        </div>
      );

    case "sage-wash":
      return (
        <div className={shared} aria-hidden>
          <div className="absolute inset-0 bg-[#e5e8df]" />
          <div className="absolute inset-0 bg-[radial-gradient(85%_65%_at_50%_40%,rgba(127,138,111,0.18),transparent_72%)]" />
          <EdgeFade />
        </div>
      );

    case "sage-orb":
      return (
        <div className={shared} aria-hidden>
          <div className="absolute inset-0 bg-base-700/70" />
          <div className="absolute -right-[10%] top-[6%] h-[min(440px,58vw)] w-[min(440px,58vw)] rounded-full bg-[radial-gradient(circle,rgba(127,138,111,0.24),transparent_64%)] blur-[72px]" />
          <div className="absolute -left-[14%] bottom-[8%] h-[min(280px,38vw)] w-[min(280px,38vw)] rounded-full bg-[radial-gradient(circle,rgba(201,154,91,0.16),transparent_66%)] blur-[60px]" />
          <EdgeFade />
        </div>
      );

    case "terra-orb":
      return (
        <div className={shared} aria-hidden>
          <div className="absolute inset-0 bg-[#f0e4d8]" />
          <div className="absolute -left-[6%] top-[15%] h-[min(420px,52vw)] w-[min(420px,52vw)] rounded-full bg-[radial-gradient(circle,rgba(196,98,63,0.22),transparent_64%)] blur-[68px]" />
          <div className="absolute -right-[8%] bottom-[10%] h-[min(300px,40vw)] w-[min(300px,40vw)] rounded-full bg-[radial-gradient(circle,rgba(217,140,106,0.16),transparent_66%)] blur-[64px]" />
          <EdgeFade />
        </div>
      );

    case "dark-pricing":
      return (
        <div className={shared} aria-hidden>
          <div className="absolute inset-0 bg-ink" />
          <div className="absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-base to-transparent md:h-20" />
          <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-base to-transparent md:h-20" />
          <div className="absolute left-1/2 top-0 h-[55%] w-[min(900px,90%)] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(196,98,63,0.14),transparent_68%)]" />
        </div>
      );

    case "contact-glow":
      return (
        <div className={shared} aria-hidden>
          <div className="absolute inset-0 bg-base-700/65" />
          <div className="absolute inset-0 bg-[radial-gradient(80%_65%_at_50%_100%,rgba(196,98,63,0.18),transparent_66%)]" />
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-base to-transparent md:h-24" />
        </div>
      );
  }
}

/** Wrap section content so backdrops paint above the global Aurora but below content */
export function sectionContentClass() {
  return "relative z-10";
}

/** Apply to any <section> that uses SectionBackdrop */
export function sectionShellClass(extra = "") {
  return `relative isolate ${extra}`.trim();
}
