"use client";

import { useEffect, useState } from "react";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  color: string;
}

const COLORS = ["#fbbf24", "#f59e0b", "#a855f7", "#ec4899", "#6366f1", "#38bdf8"];

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function makeSparkle(): Sparkle {
  return {
    id: Date.now() + Math.random(),
    x: randomBetween(-8, 108),
    y: randomBetween(-40, 140),
    size: randomBetween(8, 16),
    delay: randomBetween(0, 2.5),
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  };
}

export function SparkleText({ children }: { children: React.ReactNode }) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    setSparkles(Array.from({ length: 7 }, makeSparkle));
    const interval = setInterval(() => {
      setSparkles((prev) =>
        prev.map((s) => (Math.random() > 0.65 ? makeSparkle() : s))
      );
    }, 1400);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="relative inline-block">
      {sparkles.map((s) => (
        <svg
          key={s.id}
          className="absolute pointer-events-none"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            animation: `sparkle 2s ease-in-out ${s.delay}s infinite`,
            willChange: 'transform, opacity',
          }}
          viewBox="0 0 24 24"
          fill={s.color}
        >
          <path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" />
        </svg>
      ))}
      <span className="relative z-10">{children}</span>
    </span>
  );
}
