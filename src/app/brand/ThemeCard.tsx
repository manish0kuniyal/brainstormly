// components/ThemeCard.tsx
"use client";
import { Palette } from "lucide-react";

type ThemeCardProps = {
  themeName: string;
  colors: { [key: string]: string };
};

export default function ThemeCard({ themeName, colors }: ThemeCardProps) {
  return (
    <div className="p-6 rounded-2xl shadow-lg border border-gray-800 bg-gray-900 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Palette className="h-6 w-6 text-indigo-400" />
        <h2 className="text-xl font-bold">Theme: {themeName}</h2>
      </div>

      <div className="flex flex-wrap gap-6">
        {Object.entries(colors).map(([name, hex]) => (
          <div key={name} className="flex flex-col items-center">
            <div
              className="w-14 h-14 rounded-md border border-gray-700"
              style={{ backgroundColor: hex }}
            />
            <span className="text-xs mt-2 text-gray-400">{name}</span>
            <span className="text-[10px] text-gray-500">{hex}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
