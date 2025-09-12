"use client";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function Hero() {
  const [idea, setIdea] = useState("");
  const router = useRouter();

  const handleGenerate = () => {
    if (!idea.trim()) return;
    router.push(`/brand?idea=${encodeURIComponent(idea)}`);
  };

  return (
    <section className="relative flex flex-col items-center justify-center text-center py-28 mt-4 px-6 text-gray-100">
      <div className="max-w-4xl mx-auto px-4">
        {/* Bigger Heading without gradient */}
        <h1 className="text-6xl md:text-7xl font-extrabold mb-8 leading-tight text-gray-100">
          Turn Ideas Into Reality 🚀
        </h1>

        {/* Larger Subtext */}
        <p className="text-xl md:text-2xl mb-10 text-gray-300">
          A modern workspace to brainstorm, craft, and shape your next big project idea.
        </p>

        {/* Enlarged Input + Button */}
        <div className="flex w-full max-w-3xl mx-auto mb-8 shadow-xl">
          <input
            type="text"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="I want to create a Cake Shop 🎂"
            className="w-full px-6 py-4 rounded-l-2xl border text-lg md:text-xl bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:outline-none"
          />
          <button
            onClick={handleGenerate}
            className="flex items-center justify-center px-8 py-4 text-lg md:text-xl font-semibold rounded-r-2xl bg-indigo-500 hover:bg-indigo-600 text-white transition"
          >
            Generate <ArrowRight className="ml-2 h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
