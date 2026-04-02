"use client";

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      {/* Sun glow — top right */}
      <div className="sun-glow top-4 right-12 md:right-28" />

      {/* Rainbow arc — subtle, top right */}
      <div
        className="rainbow-arc absolute -top-36 -right-36 w-72 h-72 md:w-96 md:h-96 opacity-40"
        style={{ transform: 'rotate(-18deg)' }}
      />

      {/* Clouds — softer, fewer, more premium */}
      <div className="cloud cloud-lg animate-cloud-drift" style={{ top: '6%', animationDelay: '-8s' }} />
      <div className="cloud cloud-md animate-cloud-drift-slow" style={{ top: '16%', animationDelay: '-25s' }} />
      <div className="cloud cloud-sm animate-cloud-drift-reverse" style={{ top: '10%', animationDelay: '-15s' }} />
      <div className="cloud cloud-md animate-cloud-drift" style={{ top: '24%', animationDelay: '-40s', opacity: 0.4 }} />
      <div className="cloud cloud-sm animate-cloud-drift-slow" style={{ top: '4%', animationDelay: '-55s', opacity: 0.5 }} />
    </div>
  );
}
