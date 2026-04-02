import "./globals.css";
import { ReactNode } from "react";
import { AnimatedBackground } from "../components/animated-background";
import { SparkleText } from "../components/sparkle-text";

export const metadata = {
  title: "Ava-cadabra | Math is Magic!",
  description: "Math is magic! Track Ava's daily math practice with photo uploads and teacher review.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-[100dvh]">
        <AnimatedBackground />

        {/* ── Header ── */}
        <header className="relative z-10 pt-10 pb-6 md:pt-14 md:pb-8">
          <div className="max-w-5xl mx-auto px-4 text-center">
            {/* Eyebrow */}
            <div className="eyebrow bg-sky-100/80 text-sky-600 mx-auto w-max mb-4 animate-enter" style={{ opacity: 0 }}>
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-float" />
              Grade 5 Math
            </div>

            {/* Title */}
            <h1 className="font-display text-5xl md:text-6xl font-extrabold text-sky-900 tracking-tight animate-enter-delay-1" style={{ opacity: 0 }}>
              <SparkleText>Ava-cadabra</SparkleText>
            </h1>

            {/* Rainbow bar */}
            <div className="mx-auto mt-3 w-40 h-1 rounded-full bg-rainbow-gradient opacity-70 animate-enter-delay-2" style={{ opacity: 0 }} />

            {/* Tagline */}
            <p className="mt-3 text-lg md:text-xl font-display font-semibold text-sky-500 animate-enter-delay-3 animate-float-slow" style={{ opacity: 0 }}>
              Math is Magic!
            </p>
          </div>
        </header>

        {/* ── Main content ── */}
        <main className="relative z-10 max-w-5xl mx-auto px-4 mt-2">
          {children}
        </main>

        {/* ── Footer ── */}
        <footer className="relative z-10 text-center py-12 mt-16">
          <p className="text-[11px] text-sky-400/50 font-medium tracking-wide">
            Ava-cadabra &middot; Show your work!
          </p>
        </footer>
      </body>
    </html>
  );
}
