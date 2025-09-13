"use client";

import React, { memo } from "react";
import { ArrowRight, ArrowDown, Rocket } from "lucide-react";

export default memo(function LaunchRoadmapCard({
  roadmap,
}: {
  roadmap: { phase: string; goals: string | string[]; timeEstimate?: string }[];
}) {
  // Normalize incoming roadmap and ensure we always render 3 blocks (MVP, Beta, Full Launch)
  const incoming = Array.isArray(roadmap) ? roadmap : [];
  const blocks = incoming.slice(0, 3).map((b) => ({ ...b }));

  while (blocks.length < 3) {
    blocks.push({
      phase: blocks.length === 0 ? "MVP" : blocks.length === 1 ? "Beta" : "Full Launch",
      goals: "No details provided.",
      timeEstimate: "",
    });
  }

  return (
    <section
      aria-labelledby="launch-roadmap-heading"
      className="p-6 rounded-2xl shadow-lg border border-gray-800 bg-gray-900 col-span-full"
    >
      <h2 id="launch-roadmap-heading" className="text-xl font-bold mb-6 flex items-center gap-3">
        <Rocket className="w-5 h-5 text-indigo-400" />
        <span>Launch Roadmap</span>
      </h2>

      {/* Layout: column on small screens, horizontal on sm+ */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {blocks.map((b, i) => (
          <React.Fragment key={i}>
            <div className="flex items-center w-full">
              <article className="w-full sm:w-80 p-4 rounded-xl border border-gray-700 bg-gray-800">
                <div className="flex items-start justify-between mb-2 gap-2">
                  <h3 className="font-semibold text-gray-100">{b.phase}</h3>
                  {b.timeEstimate ? (
                    <span className="text-xs text-green-400"> {b.timeEstimate}</span>
                  ) : (
                    <span className="text-xs text-gray-500">&nbsp;</span>
                  )}
                </div>

                <ol className="list-decimal pl-5 text-sm text-gray-300 space-y-1">
                  {splitGoalsIntoList(b.goals).map((g, idx) => (
                    <li key={idx} className="text-gray-300">{g}</li>
                  ))}
                </ol>
              </article>

              {/* Arrows: right-facing for sm+ and down-facing for small screens */}
              {i < blocks.length - 1 && (
                <div className="flex items-center">
                  {/* Right arrow only visible on sm+ */}
                  <div className="hidden sm:flex items-center px-3 text-gray-400" aria-hidden>
                    <ArrowRight className="w-6 h-6" />
                  </div>

                  {/* Down arrow only visible on xs (when stacked) */}
                  <div className="flex sm:hidden items-center px-2 text-gray-400" aria-hidden>
                    <ArrowDown className="w-5 h-5" />
                  </div>
                </div>
              )}
            </div>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
});

/** helper: split a goals string (or array) into 1-4 short bullet points */
function splitGoalsIntoList(goals: string | string[]): string[] {
  if (!goals) return ["No details provided."];

  // If it's already an array, normalize and trim
  if (Array.isArray(goals)) {
    return goals.map((g) => g.trim()).filter(Boolean).slice(0, 4);
  }
const text = goals.trim();
  // If the string contains numbered bullets like "1. ... 2. ...", split on numbers
  if (/\d+\./.test(text)) {
    const parts = text.split(/\d+\.\s*/).map((p) => p.trim()).filter(Boolean);
    if (parts.length > 1) return parts.slice(0, 4);
  }

  // Prefer splitting on newlines / semicolons / pipes first
  let parts = text.split(/\r?\n|;|\|/).map((s) => s.trim()).filter(Boolean);

  // If that yields just one part, try splitting on sentence boundaries (periods) or commas
  if (parts.length === 1) {
    parts = text.split(/[.?!]+\s+|,\s+/).map((s) => s.trim().replace(/[.?!]$/, "")).filter(Boolean);
  }

  // Final fallback: if still one long string, try to intelligently chop into shorter phrases (~60 chars)
  if (parts.length === 1 && parts[0].length > 80) {
    const words = parts[0].split(/\s+/);
    const chunks: string[] = [];
    let current = "";
    for (const w of words) {
      if ((current + " " + w).trim().length > 60) {
        chunks.push(current.trim());
        current = w;
      } else {
        current = (current + " " + w).trim();
      }
    }
    if (current) chunks.push(current.trim());
    parts = chunks;
  }

  return parts.map((p) => p.replace(/^[\-–—]\s*/, "").trim()).slice(0, 4);
}