// Animated aurora/gradient background. Pure CSS transforms = GPU-friendly, 60fps.
export default function Aurora() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* deep base vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_-10%,#0b0f16_0%,#06070a_55%,#050609_100%)]" />

      {/* drifting colour fields */}
      <div className="absolute -left-[10%] -top-[15%] h-[60vmax] w-[60vmax] animate-aurora rounded-full bg-[radial-gradient(circle,rgba(46,230,192,0.5),transparent_60%)] blur-[100px] will-change-transform" />
      <div className="absolute -right-[15%] top-[5%] h-[55vmax] w-[55vmax] animate-aurora-slow rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.4),transparent_60%)] blur-[110px] will-change-transform" />
      <div className="absolute bottom-[-20%] left-[20%] h-[55vmax] w-[55vmax] animate-aurora rounded-full bg-[radial-gradient(circle,rgba(139,123,255,0.32),transparent_60%)] blur-[120px] [animation-delay:-8s] will-change-transform" />

      {/* fine grid for depth */}
      <div
        className="absolute inset-0 opacity-[0.18] mask-fade-b"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* darken for text contrast */}
      <div className="absolute inset-0 bg-[radial-gradient(100%_60%_at_50%_40%,transparent,rgba(6,7,10,0.55))]" />
    </div>
  );
}
