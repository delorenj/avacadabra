"use client";

import { useEffect, useRef } from "react";

interface Props { onClose: () => void; }

export function TeacherNoteModal({ onClose }: Props) {
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm"
      onClick={(e) => e.target === backdropRef.current && onClose()}
    >
      <div className="w-full max-w-md animate-modal-enter" style={{ opacity: 0 }}>
        <div className="bevel-card">
          <div className="bevel-card-inner !p-0 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-sky-500 to-sky-600 px-6 py-5">
              <h3 className="font-display font-bold text-white text-lg tracking-tight">
                Hi Dr. Brenner!
              </h3>
              <p className="text-sky-100 text-sm mt-0.5">Welcome to Ava&rsquo;s math dashboard</p>
            </div>

            <div className="p-6 space-y-5">
              <p className="text-sm text-gray-600 leading-relaxed">
                This is your at-a-glance view of Ava&rsquo;s <strong className="text-sky-700">4-week math journey</strong>,
                pre-loaded with the full curriculum from the AvaMath roadmap.
              </p>

              <div className="space-y-3">
                {[
                  { n: 1, text: <><strong className="text-gray-800">Click any future date</strong> to open the lesson editor and customize the plan.</> },
                  { n: 2, text: <><strong className="text-gray-800">Change the concept, title, or notes</strong> to match what you&rsquo;d like Ava to work on.</> },
                  { n: 3, text: <><strong className="text-gray-800">Past days show session recaps</strong> with photos of scratch work and a transcript summary.</> },
                ].map((s) => (
                  <div key={s.n} className="flex items-start gap-3">
                    <span className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-sky-500 text-white flex items-center justify-center text-[10px] font-bold shadow-glow">
                      {s.n}
                    </span>
                    <p className="text-sm text-gray-500 leading-relaxed">{s.text}</p>
                  </div>
                ))}
              </div>

              <p className="text-[11px] text-gray-400 text-center italic leading-relaxed">
                The schedule is pre-seeded with the full 20-day curriculum.<br />
                Feel free to override any day to fit your teaching flow!
              </p>

              <div className="flex justify-center pt-1">
                <button
                  onClick={onClose}
                  className="group relative px-8 py-3 bg-gradient-to-r from-sky-500 to-sky-600 text-white text-sm font-display font-bold rounded-full shadow-glow hover:shadow-ambient-lg active:scale-[0.97] transition-all duration-300 ease-out-expo"
                >
                  <span className="relative z-10">Got it!</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
