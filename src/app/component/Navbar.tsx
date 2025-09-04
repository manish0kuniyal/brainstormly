"use client";
import { useThemeStore } from "../store/Theme";
import { Moon, Sun } from "lucide-react";
import Image from "next/image";

export function Navbar() {
  const { dark, toggleDark } = useThemeStore();

  return (
    <nav
      className={`flex justify-between items-center p-6 shadow-md transition-colors ${
        dark ? "bg-black" : "bg-white text-gray-900"
      }`}
    >
      <div className="flex items-center space-x-2">
       {/* <BrainCircuit/> */}
        <span
          className={`text-2xl font-bold ${
            dark ? "text-indigo-400" : "text-indigo-600"
          }`}
        >
          brainstormly
        </span>
      </div>

      <div className="flex items-center space-x-6">
        <button
          onClick={toggleDark}
          className={`p-2 rounded-full border transition ${
            dark
              ? "bg-gray-700 hover:bg-gray-600 border-gray-600 text-yellow-400"
              : "bg-gray-100 hover:bg-gray-200 border-gray-300 text-gray-700"
          }`}
        >
          {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
      </div>
    </nav>
  );
}
