"use client";

import { useState, ChangeEvent, FormEvent } from 'react';

interface ProgressEntry {
  date: string;
  concept: string;
  description: string;
  explanation: string;
}

const concepts = [
  { id: 'fractions', label: 'Fractions' },
  { id: 'fraction-multiplication', label: 'Fraction Multiplication' },
  { id: 'decimals', label: 'Decimals & Place Value' },
  { id: 'word-problems', label: 'Word Problems' },
  { id: 'volume-geometry', label: 'Volume & Geometry' }
];

export default function HomePage() {
  const [entry, setEntry] = useState<ProgressEntry>({
    date: new Date().toISOString().substring(0, 10),
    concept: concepts[0].id,
    description: '',
    explanation: ''
  });
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEntry({ ...entry, [name]: value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('date', entry.date);
      formData.append('concept', entry.concept);
      formData.append('description', entry.description);
      formData.append('explanation', entry.explanation);
      if (file) {
        formData.append('file', file);
      }

      const res = await fetch('/api/progress', {
        method: 'POST',
        body: formData
      });
      if (res.ok) {
        setMessage('Progress saved successfully!');
        setEntry({
          date: entry.date,
          concept: concepts[0].id,
          description: '',
          explanation: ''
        });
        setFile(null);
      } else {
        const text = await res.text();
        setMessage(`Error: ${text}`);
      }
    } catch (error) {
      setMessage('An unexpected error occurred.');
    }
  };

  return (
    <div className="space-y-8">
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Daily Progress</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="date">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={entry.date}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="concept">
              Concept
            </label>
            <select
              id="concept"
              name="concept"
              value={entry.concept}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
              required
            >
              {concepts.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="description"
            >
              Problem / Activity Description
            </label>
            <textarea
              id="description"
              name="description"
              value={entry.description}
              onChange={handleChange}
              rows={3}
              className="w-full border rounded-md p-2"
              placeholder="Describe today’s problem or activity"
              required
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="explanation"
            >
              Explanation / Reflection
            </label>
            <textarea
              id="explanation"
              name="explanation"
              value={entry.explanation}
              onChange={handleChange}
              rows={3}
              className="w-full border rounded-md p-2"
              placeholder="Explain your reasoning or what you learned"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="file">
              Photo (optional)
            </label>
            <input
              type="file"
              id="file"
              name="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          {message && <p className="text-sm text-center text-green-600">{message}</p>}
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </section>
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Grade 5 Math Priorities</h2>
        <p className="mb-2 font-medium">Here’s a high‑level view of key concepts to practice:</p>
        <ul className="list-disc ml-6 space-y-1">
          <li><strong>Fractions:</strong> name, compare, and operate on fractions with visual models.</li>
          <li><strong>Fraction Multiplication:</strong> multiply fractions and connect to area/number lines.</li>
          <li><strong>Decimals & Place Value:</strong> read, write, and compare decimals; understand powers of ten.</li>
          <li><strong>Word Problems:</strong> translate stories into expressions and solve with clear reasoning.</li>
          <li><strong>Volume & Geometry:</strong> understand volume as counting unit cubes and solve simple measurement problems.</li>
        </ul>
        <p className="mt-4 text-sm text-gray-600">
          Rotate through these topics each day to build confidence. Use the daily progress form above to log a quick problem and reflection. Attach a photo of work so teachers can see evidence of understanding.
        </p>
      </section>
    </div>
  );
}