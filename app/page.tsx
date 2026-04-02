import { WeekRoadmap } from "../components/week-roadmap";

const CONCEPTS = [
  { emoji: "\u00BD", label: "Fractions", sub: "5.NF.A", gradient: "from-sky-400 to-sky-500" },
  { emoji: "\u00D7", label: "Multiply", sub: "5.NF.B", gradient: "from-indigo-400 to-indigo-500" },
  { emoji: ".", label: "Decimals", sub: "5.NBT", gradient: "from-teal-400 to-teal-500" },
  { emoji: "\uD83D\uDCD6", label: "Word Prob.", sub: "5.NF", gradient: "from-amber-400 to-amber-500" },
  { emoji: "\u25B3", label: "Geometry", sub: "5.MD, 5.G", gradient: "from-purple-400 to-purple-500" },
];

export default function TeacherDashboard() {
  return (
    <div className="space-y-10 pb-16">
      {/* ── Concept pills ── */}
      <div className="grid grid-cols-5 gap-2 sm:gap-3 animate-enter" style={{ opacity: 0 }}>
        {CONCEPTS.map((c) => (
          <div key={c.label} className="bevel-card">
            <div className={`bevel-card-inner !p-2.5 sm:!p-3.5 text-center bg-gradient-to-br ${c.gradient} !bg-opacity-100 !shadow-none`}>
              <div className="text-xl sm:text-2xl text-white drop-shadow-sm">{c.emoji}</div>
              <div className="text-[10px] sm:text-xs font-bold text-white/95 mt-0.5 leading-tight">{c.label}</div>
              <div className="text-[8px] sm:text-[9px] font-medium text-white/60 mt-0.5 tracking-wider">{c.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Motto ── */}
      <div className="text-center animate-enter-delay-1" style={{ opacity: 0 }}>
        <p className="text-sm font-display font-semibold text-sky-500/80 italic tracking-wide">
          &ldquo;Show your work!&rdquo;
        </p>
      </div>

      {/* ── 4-week roadmap ── */}
      <WeekRoadmap />
    </div>
  );
}
