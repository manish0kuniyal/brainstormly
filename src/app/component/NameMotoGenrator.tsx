"use client";
import { useState, useEffect } from "react";

export default function NameMottoGenerator({ idea }: { idea: string }) {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<{ name: string; motto: string }[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function generate() {
    try {
      setError(null);
      setLoading(true);
      setSuggestions([]);

      const res = await fetch("/api/brand/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idea,
          count: 10,
          language: "en",
          styleHints: ["modern", "friendly", "trustworthy"],
        }),
      });

      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || `HTTP ${res.status}`);
      }

      const data = await res.json();
      setSuggestions(data.suggestions || []);
    } catch (e: any) {
      setError(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  // 👇 Run immediately on mount if idea exists
  useEffect(() => {
    if (idea) {
      generate();
    }
  }, [idea]);

  return (
    <div className="p-6 rounded-2xl shadow-md border bg-white">
      <h2 className="text-xl font-semibold">💡 Brand Names & Mottos</h2>

      {loading && <p className="mt-4 text-gray-500">Generating… ⏳</p>}
      {error && <p className="mt-4 text-red-600 text-sm">Error: {error}</p>}

      <ul className="mt-4 space-y-3">
        {suggestions.map((s, i) => (
          <li
            key={`${s.name}-${i}`}
            className="flex items-center justify-between p-3 rounded-xl border"
          >
            <div>
              <p className="font-medium">{s.name}</p>
              <p className="text-sm text-gray-600">{s.motto}</p>
            </div>
            <button
              onClick={() => navigator.clipboard.writeText(`${s.name} — ${s.motto}`)}
              className="text-xs px-3 py-1 rounded-md border"
            >
              Copy
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
