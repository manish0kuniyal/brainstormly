// components/Hero.tsx
"use client";
import { useThemeStore } from "../store/Theme";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react"; // optional icon for the button

export function Hero() {
  const dark = useThemeStore((s) => s.dark);

  const placeholders = [
    "I want to create a Cake Shop 🎂",
    "I want to create an Online Clothing Brand 👕",
    "I want to create a Fitness App 🏋️",
    "I want to create a Travel Planner ✈️",
    "I want to create an AI Startup 🤖",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % placeholders.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className={`flex flex-col items-center justify-center text-center py-24 px-6 transition-colors ${
        dark
          ? "bg-black"
          : "bg-gradient-to-b from-indigo-50 to-white"
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

        {/* Input + Button in a single row */}
        <div className="flex w-full max-w-3xl mb-6">
          <div className="relative flex-1">
            <input
              type="text"
              className={`w-full px-4 py-3 rounded-l-2xl border text-lg focus:outline-none shadow-sm ${
                dark
                  ? "bg-gray-800 border-gray-700 text-white"
                  : "bg-white border-gray-300 text-gray-800"
              }`}
            />
            <AnimatePresence mode="wait">
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className={`absolute left-4 top-3 pointer-events-none text-lg ${
                  dark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {placeholders[index]}
              </motion.span>
            </AnimatePresence>
          </div>
          <button
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
