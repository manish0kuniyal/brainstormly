// app/component/TechStackCard.tsx
"use client";
import { Cpu, CheckCircle2 } from "lucide-react";

export default function TechStackCard({ stack }: { stack: string[] }) {
  return (
    <div className="p-6 rounded-2xl shadow-lg border border-gray-800 bg-gray-900">
      {/* Heading with icon */}
      <div className="flex items-center gap-2 mb-4">
        <Cpu className="h-6 w-6 text-indigo-400" />
        <h2 className="text-xl font-bold">Tech Stack</h2>
      </div>

      {/* Stack list */}
      <ul className="space-y-2">
        {stack.map((t, i) => (
          <li
            key={i}
            className="flex items-center gap-2 text-sm text-gray-300 hover:text-indigo-300 transition"
          >
            <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0" />
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
