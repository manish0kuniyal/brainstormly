// app/component/CompetitorsCard.tsx
"use client";
import { UsersRound, Shield } from "lucide-react";

export default function CompetitorsCard({
  competitors,
}: {
  competitors: { name: string; note: string }[];
}) {
  return (
    <div className="p-6 rounded-2xl shadow-lg border border-gray-800 bg-gray-900">
      {/* Heading with icon */}
      <div className="flex items-center gap-2 mb-4">
        <UsersRound className="h-6 w-6 text-indigo-400" />
        <h2 className="text-xl font-bold">Competitors</h2>
      </div>

      {/* Competitors list */}
      <ul className="space-y-3">
        {competitors.map((c, i) => (
          <li
            key={i}
            className="p-4 rounded-xl border border-gray-700 bg-gray-800/50 hover:bg-gray-800 transition flex flex-col"
          >
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-indigo-400 flex-shrink-0" />
              <p className="font-medium text-gray-100">{c.name}</p>
            </div>
            <p className="text-sm text-gray-400 italic mt-1">{c.note}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
