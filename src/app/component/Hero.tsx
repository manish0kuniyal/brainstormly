// components/Hero.tsx
"use client";
import { useThemeStore } from "../store/Theme";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function Hero() {
  const dark = useThemeStore((s) => s.dark);
  const [idea, setIdea] = useState("");
  const router = useRouter();

  const handleGenerate = () => {
    if (!idea.trim()) return;
    router.push(`/brand?idea=${encodeURIComponent(idea)}`);
  };

  return (
    <section
      className={`flex flex-col items-center justify-center text-center py-24 px-6 transition-colors ${
        dark ? "bg-black" : "bg-gradient-to-b from-indigo-50 to-white"
      }`}
    >
      <div className="max-w-3xl mx-auto px-4">
        <h2
          className={`text-5xl font-extrabold mb-6 ${
            dark ? "text-gray-100" : "text-gray-800"
          }`}
        >
          Turn Ideas Into Reality 🚀
        </h2>
        <p
          className={`text-lg mb-8 ${
            dark ? "text-gray-300" : "text-gray-600"
          }`}
        >
          A modern workspace to brainstorm, craft, and shape your next big project
          idea.
        </p>

        <div className="flex w-full max-w-3xl mb-6">
          <input
            type="text"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="I want to create a Cake Shop 🎂"
            className={`w-full px-4 py-3 rounded-l-2xl border text-lg focus:outline-none shadow-sm ${
              dark
                ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-800 placeholder-gray-500"
            }`}
          />
          <button
            onClick={handleGenerate}
            className={`flex items-center justify-center px-6 py-3 text-lg font-medium rounded-r-2xl shadow-lg transition ${
              dark
                ? "bg-indigo-500 hover:bg-indigo-600 text-white"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}
          >
            Generate <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
