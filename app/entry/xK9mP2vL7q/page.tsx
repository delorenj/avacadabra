"use client";

import { useState, ChangeEvent, FormEvent } from "react";

interface ProgressEntry {
  date: string;
  concept: string;
  description: string;
  explanation: string;
}

const concepts = [
  { id: "fractions", label: "\u00BD Fractions" },
  { id: "fraction-multiplication", label: "\u00D7 Fraction Multiplication" },
  { id: "decimals", label: ". Decimals & Place Value" },
  { id: "word-problems", label: "\uD83D\uDCD6 Word Problems" },
  { id: "volume-geometry", label: "\u25B3 Volume & Geometry" },
];

export default function EntryPage() {
  const [entry, setEntry] = useState<ProgressEntry>({
    date: new Date().toISOString().substring(0, 10),
    concept: concepts[0].id,
    description: "",
    explanation: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEntry({ ...entry, [name]: value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      setFile(f);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(f);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("date", entry.date);
      formData.append("concept", entry.concept);
      formData.append("description", entry.description);
      formData.append("explanation", entry.explanation);
      if (file) formData.append("file", file);

      const res = await fetch("/api/progress", { method: "POST", body: formData });
      if (res.ok) {
        setMessage({ text: "Progress saved! Great work today.", type: "success" });
        setEntry({ date: entry.date, concept: concepts[0].id, description: "", explanation: "" });
        setFile(null);
        setPreview(null);
      } else {
        const text = await res.text();
        setMessage({ text: `Error: ${text}`, type: "error" });
      }
    } catch {
      setMessage({ text: "An unexpected error occurred.", type: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 pb-12 animate-enter" style={{ opacity: 0 }}>
      <div className="text-center">
        <div className="eyebrow bg-sky-100/80 text-sky-600 mx-auto w-max mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
          Session Entry
        </div>
        <h2 className="font-display text-2xl font-extrabold text-sky-900 tracking-tight">Daily Session Entry</h2>
        <p className="text-sm text-sky-500 mt-1">Record today&rsquo;s math adventure</p>
      </div>

      <form onSubmit={handleSubmit} className="bevel-card"><div className="bevel-card-inner space-y-5">
        {/* Date */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="date">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={entry.date}
            onChange={handleChange}
            className="w-full ring-1 ring-sky-200/60 rounded-xl px-3.5 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sky-400/50 transition-all duration-300 ease-out-expo bg-white shadow-inner-highlight"
            required
          />
        </div>

        {/* Concept */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="concept">
            Concept
          </label>
          <select
            id="concept"
            name="concept"
            value={entry.concept}
            onChange={handleChange}
            className="w-full ring-1 ring-sky-200/60 rounded-xl px-3.5 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sky-400/50 transition-all duration-300 ease-out-expo bg-white shadow-inner-highlight"
            required
          >
            {concepts.map((c) => (
              <option key={c.id} value={c.id}>{c.label}</option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="description">
            Problem / Activity Description
          </label>
          <textarea
            id="description"
            name="description"
            value={entry.description}
            onChange={handleChange}
            rows={3}
            className="w-full ring-1 ring-sky-200/60 rounded-xl px-3.5 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sky-400/50 transition-all duration-300 ease-out-expo bg-white shadow-inner-highlight resize-none"
            placeholder="Describe today's problem or activity..."
            required
          />
        </div>

        {/* Explanation / Transcript Summary */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="explanation">
            Session Transcript / Reflection
          </label>
          <textarea
            id="explanation"
            name="explanation"
            value={entry.explanation}
            onChange={handleChange}
            rows={4}
            className="w-full ring-1 ring-sky-200/60 rounded-xl px-3.5 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sky-400/50 transition-all duration-300 ease-out-expo bg-white shadow-inner-highlight resize-none"
            placeholder="Paste the session transcript summary or reflection..."
            required
          />
        </div>

        {/* Photo upload */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Scratch Work Photo
            <span className="text-xs font-normal text-gray-400 ml-1">(Show your work!)</span>
          </label>
          <div className="relative">
            <input
              type="file"
              id="file"
              name="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor="file"
              className="flex items-center justify-center gap-2 w-full border-2 border-dashed border-sky-200/60 rounded-xl px-4 py-6 text-sm text-sky-500 hover:border-sky-400 hover:bg-sky-50/30 transition-all duration-300 ease-out-expo cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {file ? file.name : "Upload a photo of scratch work"}
            </label>
          </div>
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-3 w-full max-w-xs rounded-xl shadow-card border border-sky-100"
            />
          )}
        </div>

        {/* Message */}
        {message && (
          <div className={`text-sm text-center py-2 px-3 rounded-xl font-medium ${
            message.type === "success"
              ? "bg-green-50 text-green-600 border border-green-200"
              : "bg-red-50 text-red-600 border border-red-200"
          }`}>
            {message.text}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 px-4 bg-gradient-to-r from-sky-500 to-sky-600 text-white font-display font-bold rounded-full shadow-glow hover:shadow-ambient-lg active:scale-[0.97] transition-all duration-300 ease-out-expo disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Saving...
            </span>
          ) : (
            "Save Progress"
          )}
        </button>
      </div></form>
    </div>
  );
}
