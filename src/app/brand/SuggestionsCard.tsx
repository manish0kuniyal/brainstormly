// app/component/SuggestionsCard.tsx
"use client";
import { Sparkles } from "lucide-react";

export default function SuggestionsCard({
  suggestions,
}: {
  suggestions: { name: string; motto: string }[];
}) {
  return (
    <div className="p-6 rounded-2xl shadow-lg border border-gray-800 bg-gray-900">
      {/* Heading with icon */}
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-6 w-6 text-indigo-400" />
        <h2 className="text-xl font-bold">Brand Names</h2>
      </div>

      {/* List of brand names + mottos */}
      <ul className="space-y-4">
        {suggestions.map((s, i) => (
          <li key={i} className="flex flex-col">
            <span className="text-lg font-semibold text-gray-100">
              {s.name}
            </span>
            <span className="text-sm italic text-gray-400 mt-1">
              “{s.motto}”
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
