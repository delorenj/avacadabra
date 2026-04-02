"use client";

import { useEffect, useState, useCallback } from "react";
import { AgendaEditorModal } from "./agenda-editor-modal";
import { TeacherNoteModal } from "./teacher-note-modal";

interface ProgressEntry {
  id: number;
  date: string;
  concept: string;
  description: string;
  explanation: string;
  image_url: string | null;
}

interface AgendaItem {
  date: string;
  concept: string;
  title: string;
  notes: string;
  standard?: string;
  day_number?: number;
}

interface WeekTheme {
  week: number;
  title: string;
  standard: string;
  color: string;
}

const CONCEPTS: Record<string, { label: string; emoji: string; pill: string }> = {
  fractions:                  { label: "Fractions",      emoji: "\u00BD", pill: "bg-sky-50 text-sky-600 ring-1 ring-sky-200/60" },
  "fraction-multiplication":  { label: "Frac. Multiply", emoji: "\u00D7", pill: "bg-indigo-50 text-indigo-600 ring-1 ring-indigo-200/60" },
  decimals:                   { label: "Decimals",       emoji: ".",      pill: "bg-teal-50 text-teal-600 ring-1 ring-teal-200/60" },
  "word-problems":            { label: "Word Problems",  emoji: "\uD83D\uDCD6", pill: "bg-amber-50 text-amber-600 ring-1 ring-amber-200/60" },
  "volume-geometry":          { label: "Volume & Geo",   emoji: "\u25B3", pill: "bg-purple-50 text-purple-600 ring-1 ring-purple-200/60" },
};

const WEEK_COLORS: Record<string, { bg: string; text: string; ring: string; badge: string }> = {
  sky:    { bg: "bg-sky-500",    text: "text-sky-700",    ring: "ring-sky-200",    badge: "bg-sky-50 text-sky-600" },
  indigo: { bg: "bg-indigo-500", text: "text-indigo-700", ring: "ring-indigo-200", badge: "bg-indigo-50 text-indigo-600" },
  teal:   { bg: "bg-teal-500",   text: "text-teal-700",   ring: "ring-teal-200",   badge: "bg-teal-50 text-teal-600" },
  purple: { bg: "bg-purple-500", text: "text-purple-700", ring: "ring-purple-200", badge: "bg-purple-50 text-purple-600" },
};

function buildWeeks(startMonday: Date): { weekLabel: string; days: Date[] }[] {
  const weeks: { weekLabel: string; days: Date[] }[] = [];
  for (let w = 0; w < 5; w++) {
    const days: Date[] = [];
    for (let d = 0; d < 5; d++) {
      const date = new Date(startMonday);
      date.setDate(startMonday.getDate() + w * 7 + d);
      days.push(date);
    }
    weeks.push({ weekLabel: `Week ${w + 1}`, days });
  }
  return weeks;
}

function getMonday(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function fmtDate(d: Date): string { return d.toISOString().substring(0, 10); }
function fmtShort(d: Date): string { return d.toLocaleDateString("en-US", { month: "short", day: "numeric" }); }

const VACATION_START = new Date(2026, 3, 2);
const VACATION_END = new Date(2026, 3, 9);
VACATION_START.setHours(0, 0, 0, 0);
VACATION_END.setHours(0, 0, 0, 0);
function isVacation(d: Date): boolean { return d >= VACATION_START && d <= VACATION_END; }

export function WeekRoadmap() {
  const [entries, setEntries] = useState<ProgressEntry[]>([]);
  const [agenda, setAgenda] = useState<AgendaItem[]>([]);
  const [weekThemes, setWeekThemes] = useState<WeekTheme[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedDay, setExpandedDay] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<AgendaItem | null>(null);
  const [showTeacherNote, setShowTeacherNote] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/api/progress").then((r) => r.json()).catch(() => ({ entries: [] })),
      fetch("/api/agenda").then((r) => r.json()).catch(() => ({ agenda: [], weekThemes: [] })),
    ]).then(([prog, ag]) => {
      setEntries(prog.entries || []);
      setAgenda(ag.agenda || []);
      setWeekThemes(ag.weekThemes || []);
      setLoading(false);
    });
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStr = fmtDate(today);
  const startMonday = getMonday(today);
  const weeks = buildWeeks(startMonday);

  const entryMap = new Map<string, ProgressEntry>();
  entries.forEach((e) => { const k = e.date.substring(0, 10); if (!entryMap.has(k)) entryMap.set(k, e); });

  const agendaMap = new Map<string, AgendaItem>();
  agenda.forEach((a) => agendaMap.set(a.date.substring(0, 10), a));

  // Figure out which curriculum week each calendar week corresponds to
  function getWeekTheme(wi: number): WeekTheme | undefined {
    // The curriculum weeks are: 1=April 10 week, 2=April 13 week, etc.
    // Match by checking if any day in this calendar week has a day_number in the agenda
    const daysInWeek = weeks[wi]?.days || [];
    for (const d of daysInWeek) {
      const item = agendaMap.get(fmtDate(d));
      if (item?.day_number) {
        const currWeek = Math.ceil(item.day_number / 5);
        return weekThemes.find((t) => t.week === currWeek);
      }
    }
    return undefined;
  }

  const handleDayClick = useCallback((day: Date, dateStr: string) => {
    const isPast = day < today;
    const isToday = dateStr === todayStr;
    if (!isPast && !isToday) {
      const existing = agendaMap.get(dateStr);
      setEditingItem(existing || { date: dateStr, concept: "fractions", title: "", notes: "" });
    } else {
      setExpandedDay((prev) => (prev === dateStr ? null : dateStr));
    }
  }, [todayStr, agendaMap]);

  const handleAgendaSaved = useCallback((saved: AgendaItem) => {
    setAgenda((prev) => {
      const idx = prev.findIndex((a) => a.date.substring(0, 10) === saved.date);
      if (idx >= 0) { const u = [...prev]; u[idx] = saved; return u; }
      return [...prev, saved];
    });
  }, []);

  // Filter out weeks that are entirely vacation and have no agenda/entries
  const hasContent = (week: { days: Date[] }) =>
    week.days.some((d) => !isVacation(d) || agendaMap.has(fmtDate(d)) || entryMap.has(fmtDate(d)));

  return (
    <div className="space-y-10">
      {/* ── Dr. Brenner link ── */}
      <div className="text-center animate-enter-delay-4" style={{ opacity: 0 }}>
        <button
          onClick={() => setShowTeacherNote(true)}
          className="inline-flex items-center gap-2 text-[11px] font-semibold text-sky-400 hover:text-sky-600 transition-colors duration-500 ease-out-expo group uppercase tracking-[0.12em]"
        >
          <svg className="w-3.5 h-3.5 transition-transform duration-500 ease-out-expo group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Note for Dr. Brenner
        </button>
      </div>

      {loading ? (
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bevel-card">
              <div className="bevel-card-inner h-36 shimmer" />
            </div>
          ))}
        </div>
      ) : (
        weeks.filter(hasContent).map((week, wi) => {
          const theme = getWeekTheme(wi);
          const colors = theme ? WEEK_COLORS[theme.color] || WEEK_COLORS.sky : WEEK_COLORS.sky;
          const animClass = wi === 0 ? "animate-enter" : wi === 1 ? "animate-enter-delay-1" : wi === 2 ? "animate-enter-delay-2" : wi === 3 ? "animate-enter-delay-3" : "animate-enter-delay-4";

          return (
            <section key={wi} className={animClass} style={{ opacity: 0 }}>
              {/* ── Week header ── */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-9 h-9 rounded-full ${colors.bg} text-white flex items-center justify-center font-display font-bold text-sm shadow-glow`}>
                  {wi + 1}
                </div>
                <div className="flex-1 min-w-0">
                  {theme ? (
                    <>
                      <h2 className={`font-display font-bold text-base ${colors.text} truncate`}>
                        {theme.title}
                      </h2>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className={`eyebrow ${colors.badge} text-[9px] py-0.5`}>{theme.standard}</span>
                        <span className="text-[11px] text-gray-400 font-medium">
                          {fmtShort(week.days[0])} &ndash; {fmtShort(week.days[4])}
                        </span>
                      </div>
                    </>
                  ) : (
                    <h2 className="font-display font-bold text-base text-sky-700">
                      {fmtShort(week.days[0])} &ndash; {fmtShort(week.days[4])}
                    </h2>
                  )}
                </div>
                <div className="hidden sm:block flex-1 h-px bg-gradient-to-r from-sky-200/60 to-transparent" />
              </div>

              {/* ── Day cards ── */}
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                {week.days.map((day) => {
                  const dateStr = fmtDate(day);
                  const isPast = day < today;
                  const isToday = dateStr === todayStr;
                  const isFuture = !isPast && !isToday;
                  const vacation = isVacation(day);
                  const entry = entryMap.get(dateStr);
                  const agendaItem = agendaMap.get(dateStr);
                  const conceptKey = agendaItem?.concept || entry?.concept || "fractions";
                  const concept = CONCEPTS[conceptKey] || CONCEPTS.fractions;
                  const isExpanded = expandedDay === dateStr;

                  if (vacation) {
                    return (
                      <div key={dateStr} className="bevel-card opacity-60">
                        <div className="bevel-card-inner !p-3 border-l-[3px] border-orange-300 relative overflow-hidden">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-semibold text-gray-400 line-through">
                              {day.toLocaleDateString("en-US", { weekday: "short" })}
                            </span>
                            <span className="text-[10px] text-gray-400 line-through">{fmtShort(day)}</span>
                          </div>
                          {/* Diagonal strike */}
                          <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute top-0 left-0 w-[150%] h-px bg-orange-400/40 origin-top-left rotate-[26deg] translate-y-10" />
                          </div>
                          <p className="text-center mt-2 font-display font-bold text-sm text-orange-500">Texas !</p>
                          <p className="text-center text-[9px] text-orange-400 mt-0.5">No session</p>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <button
                      key={dateStr}
                      onClick={() => handleDayClick(day, dateStr)}
                      className={`
                        bevel-card text-left group
                        ${isToday ? "day-card-today" : isPast ? "day-card-past" : "day-card-future"}
                        ${isExpanded ? "sm:col-span-5" : ""}
                        ${isFuture ? "cursor-pointer" : ""}
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50 focus-visible:ring-offset-2
                        transition-all duration-500 ease-out-expo
                      `}
                    >
                      <div className={`bevel-card-inner !p-3 ${isExpanded ? "sm:grid sm:grid-cols-[1fr_2fr] sm:gap-5" : ""}`}>
                        {/* Today badge */}
                        {isToday && (
                          <span className="absolute -top-2 -right-2 z-10 px-2.5 py-0.5 bg-sunny-400 text-white text-[9px] font-bold rounded-full shadow-sunny animate-float tracking-wide uppercase">
                            Today
                          </span>
                        )}

                        <div className="relative">
                          {/* Date line */}
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                              {day.toLocaleDateString("en-US", { weekday: "short" })}
                            </span>
                            <span className="text-[10px] text-gray-400 font-medium">{fmtShort(day)}</span>
                          </div>

                          {/* Day number + concept pill */}
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {agendaItem?.day_number && (
                              <span className="text-[9px] font-bold text-gray-400 w-4">D{agendaItem.day_number}</span>
                            )}
                            <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${concept.pill}`}>
                              {concept.emoji} {concept.label}
                            </span>
                          </div>

                          {/* Lesson title */}
                          {agendaItem?.title && (
                            <p className="mt-1.5 text-[11px] font-semibold text-gray-700 leading-tight line-clamp-2">
                              {agendaItem.title}
                            </p>
                          )}

                          {/* Status */}
                          {isPast && entry ? (
                            <div className="mt-2">
                              <p className="text-[10px] text-gray-500 line-clamp-2 leading-relaxed">{entry.description}</p>
                              {entry.image_url && (
                                <div className="mt-1.5 flex items-center gap-1 text-[9px] text-sky-500 font-semibold">
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                  Photo attached
                                </div>
                              )}
                            </div>
                          ) : isPast && !entry ? (
                            <p className="mt-2 text-[10px] text-gray-400 italic">No session recorded</p>
                          ) : isToday ? (
                            <p className="mt-2 text-[10px] text-sky-600 font-semibold">In progress&hellip;</p>
                          ) : isFuture ? (
                            <p className="mt-2 text-[10px] text-sky-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out-expo">
                              Click to edit
                            </p>
                          ) : null}
                        </div>

                        {/* Expanded panel */}
                        {isExpanded && entry && (
                          <div className="mt-4 sm:mt-0 border-t sm:border-t-0 sm:border-l border-sky-200/60 pt-4 sm:pt-0 sm:pl-5">
                            <h3 className="font-display font-bold text-sm text-sky-800 mb-2">Session Summary</h3>
                            <p className="text-sm text-gray-600 mb-3 leading-relaxed">{entry.description}</p>
                            {entry.explanation && (
                              <div className="bg-sky-50/80 rounded-xl p-3.5 mb-3 ring-1 ring-sky-200/40">
                                <p className="text-[10px] font-bold text-sky-600 uppercase tracking-wider mb-1">Reflection</p>
                                <p className="text-sm text-gray-600 leading-relaxed">{entry.explanation}</p>
                              </div>
                            )}
                            {entry.image_url && (
                              <div>
                                <p className="text-[10px] font-bold text-sky-600 uppercase tracking-wider mb-1.5">Show Your Work!</p>
                                <div className="bevel-card !p-1">
                                  <img
                                    src={entry.image_url}
                                    alt="Student scratch work"
                                    className="w-full max-w-md rounded-[calc(2rem-0.5rem)] object-cover"
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          );
        })
      )}

      {/* ── Legend ── */}
      <div className="flex flex-wrap gap-5 justify-center text-[10px] text-gray-500 font-medium mt-6 uppercase tracking-wider">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm border-l-2 border-sky-400 bg-white/90 shadow-inner-highlight" /> Completed
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm border-l-2 border-sunny-400 bg-sunny-50/80" /> Today
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm border-l-2 border-sky-200 bg-white/60" /> Upcoming
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm border-l-2 border-orange-300 bg-orange-50/70" /> Vacation
        </span>
      </div>

      {/* ── Modals ── */}
      {editingItem && (
        <AgendaEditorModal item={editingItem} onClose={() => setEditingItem(null)} onSaved={handleAgendaSaved} />
      )}
      {showTeacherNote && (
        <TeacherNoteModal onClose={() => setShowTeacherNote(false)} />
      )}
    </div>
  );
}
