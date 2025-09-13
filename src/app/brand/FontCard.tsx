// app/component/FontCard.tsx
"use client";
import { Type } from "lucide-react";

export default function FontsCard({
  primary,
  secondary,
}: {
  primary?: string;
  secondary?: string;
}) {
  return (
    <div className="h-full flex flex-col p-6 rounded-2xl shadow-lg border border-gray-800 bg-gray-900">
      {/* Heading with Icon */}
      <div className="flex items-center gap-2 mb-4">
        <Type className="h-6 w-6 text-indigo-400" />
        <h2 className="text-xl font-bold">Fonts</h2>
      </div>

      {/* Fonts Preview */}
      <div className="flex-1 flex flex-col justify-start gap-3">
        {primary ? (
          <div>
            <p className="text-lg font-medium">{primary}</p>
            <p className="text-sm text-gray-300 underline">
              The quick brown fox jumps over the lazy dog.
            </p>
          </div>
        ) : null}

        {secondary ? (
          <div>
            <p className="text-lg  font-medium">{secondary}</p>
            <p className="text-sm text-gray-300 underline">
              The quick brown fox jumps over the lazy dog.
            </p>
          </div>
        ) : null}

        <div className="mt-auto text-xs text-gray-400">
          Google Fonts recommended
        </div>
      </div>
    </div>
  );
}
