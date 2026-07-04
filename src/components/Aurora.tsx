// Soft, warm ambient background. Pure CSS transforms = GPU-friendly, 60fps.
export default function Aurora() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* warm cream base wash */}
      <div className="absolute inset-0 bg-[radial-gradient(130%_120%_at_50%_-10%,#faf3e8_0%,#f4ede1_55%,#eee3d3_100%)]" />

      {/* drifting warm colour fields, gentle and low-opacity */}
      <div className="absolute -left-[10%] -top-[15%] h-[60vmax] w-[60vmax] animate-aurora rounded-full bg-[radial-gradient(circle,rgba(196,98,63,0.16),transparent_62%)] blur-[110px] will-change-transform" />
      <div className="absolute -right-[15%] top-[8%] h-[52vmax] w-[52vmax] animate-aurora-slow rounded-full bg-[radial-gradient(circle,rgba(217,140,106,0.15),transparent_62%)] blur-[120px] will-change-transform" />
      <div className="absolute bottom-[-22%] left-[18%] h-[54vmax] w-[54vmax] animate-aurora rounded-full bg-[radial-gradient(circle,rgba(127,138,111,0.14),transparent_62%)] blur-[130px] [animation-delay:-8s] will-change-transform" />

      {/* faint warm grid for subtle structure */}
      <div
        className="absolute inset-0 opacity-[0.05] mask-fade-b"
        style={{
          backgroundImage:
            "linear-gradient(rgba(44,38,32,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(44,38,32,0.5) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      {/* soft cream vignette to settle edges */}
      <div className="absolute inset-0 bg-[radial-gradient(100%_70%_at_50%_45%,transparent,rgba(244,237,225,0.5))]" />
    </div>
  );
}
