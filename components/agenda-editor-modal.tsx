"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MathContent } from "./math-content";

interface AgendaItem {
  date: string;
  concept: string;
  title: string;
  notes: string;
}

const CONCEPTS = [
  { id: "fractions", label: "\u00BD Fractions" },
  { id: "fraction-multiplication", label: "\u00D7 Fraction Multiplication" },
  { id: "decimals", label: ". Decimals & Place Value" },
  { id: "word-problems", label: "\uD83D\uDCD6 Word Problems" },
  { id: "volume-geometry", label: "\u25B3 Volume & Geometry" },
];

interface Props {
  item: AgendaItem;
  onClose: () => void;
  onSaved: (item: AgendaItem) => void;
}

export function AgendaEditorModal({ item, onClose, onSaved }: Props) {
  const [concept, setConcept] = useState(item.concept);
  const [title, setTitle] = useState(item.title);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(true);
  const [previewHtml, setPreviewHtml] = useState(item.notes);
  const editorRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current) editorRef.current.innerHTML = item.notes;
  }, [item.notes]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  const syncPreview = useCallback(() => {
    if (editorRef.current) setPreviewHtml(editorRef.current.innerHTML);
  }, []);

  const exec = useCallback((cmd: string) => {
    document.execCommand(cmd, false);
    editorRef.current?.focus();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    const notes = editorRef.current?.innerHTML || "";
    try {
      const res = await fetch("/api/agenda", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: item.date, concept, title, notes }),
      });
      if (res.ok) {
        onSaved({ date: item.date, concept, title, notes });
        onClose();
      } else {
        const text = await res.text();
        setError(text || "Failed to save");
      }
    } catch (err: any) {
      setError(err.message || "Network error");
    } finally {
      setSaving(false);
    }
  };

  const dateObj = new Date(item.date + "T00:00:00");
  const dateLabel = dateObj.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm"
      onClick={(e) => e.target === backdropRef.current && onClose()}
    >
      <div className="w-full max-w-lg animate-modal-enter" style={{ opacity: 0 }}>
        <div className="bevel-card">
          <div className="bevel-card-inner !p-0 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-sky-500 to-sky-600 px-6 py-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display font-bold text-white text-lg tracking-tight">Edit Lesson Plan</h3>
                  <p className="text-sky-100 text-sm mt-0.5">{dateLabel}</p>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25 transition-all duration-300 ease-out-expo active:scale-95"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-5">
              {/* Concept */}
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Concept</label>
                <select
                  value={concept}
                  onChange={(e) => setConcept(e.target.value)}
                  className="w-full ring-1 ring-sky-200/60 rounded-xl px-3.5 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sky-400/50 transition-all duration-300 ease-out-expo bg-white shadow-inner-highlight"
                >
                  {CONCEPTS.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
                </select>
              </div>

              {/* Title */}
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Lesson Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full ring-1 ring-sky-200/60 rounded-xl px-3.5 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sky-400/50 transition-all duration-300 ease-out-expo bg-white shadow-inner-highlight"
                  placeholder="e.g. Adding fractions with unlike denominators"
                />
              </div>

              {/* WYSIWYG */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider">Notes & Plan</label>
                  <button
                    type="button"
                    onClick={() => { syncPreview(); setShowPreview((p) => !p); }}
                    className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2.5 py-1 rounded-full transition-all duration-300 ease-out-expo ${
                      showPreview
                        ? "bg-sky-100 text-sky-700 ring-1 ring-sky-300"
                        : "text-gray-400 hover:text-sky-600 hover:bg-sky-50"
                    }`}
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {showPreview ? "Edit" : "Preview"}
                  </button>
                </div>

                {showPreview ? (
                  <MathContent html={previewHtml} worksheet className="min-h-[120px]" />
                ) : (
                  <div className="ring-1 ring-sky-200/60 rounded-xl overflow-hidden bg-white shadow-inner-highlight">
                    {/* Toolbar */}
                    <div className="flex items-center gap-0.5 border-b border-sky-100 px-2 py-1.5 bg-sky-50/40">
                      {[
                        { label: "B", cmd: "bold", cls: "font-bold" },
                        { label: "I", cmd: "italic", cls: "italic" },
                        { label: "U", cmd: "underline", cls: "underline" },
                      ].map((b) => (
                        <button
                          key={b.cmd}
                          type="button"
                          title={b.cmd}
                          onMouseDown={(e) => { e.preventDefault(); exec(b.cmd); }}
                          className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs text-sky-700 hover:bg-sky-100 transition-all duration-200 ${b.cls}`}
                        >{b.label}</button>
                      ))}
                      <div className="w-px h-4 bg-sky-200 mx-1" />
                      <button type="button" title="Bullet list" onMouseDown={(e) => { e.preventDefault(); exec("insertUnorderedList"); }}
                        className="w-7 h-7 flex items-center justify-center rounded-lg text-xs text-sky-700 hover:bg-sky-100 transition-all duration-200"
                      >{"\u2022"}</button>
                      <button type="button" title="Numbered list" onMouseDown={(e) => { e.preventDefault(); exec("insertOrderedList"); }}
                        className="w-7 h-7 flex items-center justify-center rounded-lg text-xs text-sky-700 hover:bg-sky-100 transition-all duration-200"
                      >1.</button>
                    </div>
                    {/* Editor */}
                    <div
                      ref={editorRef}
                      contentEditable
                      className="min-h-[120px] max-h-[220px] overflow-y-auto px-3.5 py-3 text-sm text-gray-700 focus:outline-none
                        [&_ul]:list-disc [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:ml-4 [&_li]:mb-0.5 [&_b]:font-semibold"
                      suppressContentEditableWarning
                    />
                  </div>
                )}
              </div>

              {/* Error */}
              {error && (
                <div className="text-sm text-red-600 bg-red-50 ring-1 ring-red-200 rounded-xl px-3 py-2 font-medium">
                  {error}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-gray-600 transition-colors duration-300 ease-out-expo">
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="group relative px-6 py-2.5 bg-gradient-to-r from-sky-500 to-sky-600 text-white text-sm font-display font-bold rounded-full shadow-glow hover:shadow-ambient-lg active:scale-[0.97] transition-all duration-300 ease-out-expo disabled:opacity-50 overflow-hidden"
                >
                  <span className="relative z-10">{saving ? "Saving\u2026" : "Save Changes"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
