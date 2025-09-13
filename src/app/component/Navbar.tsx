"use client";
import { Brain } from "lucide-react"; // optional icon

export function Navbar() {
  return (
    <nav className="flex justify-between items-center p-6 text-gray-100 relative z-10">
      <div className="flex items-center space-x-2 relative">
        {/* 🔮 Blob behind logo */}
  <div
        className="absolute -top-30 left-1/2 transform -translate-x-1/2 w-[300px] h-[300px] rounded-full blur-3xl z-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(200, 255, 200, 0.82), transparent)',
        }}
      />



        {/* Optional logo icon */}
        {/* <Brain className="h-6 w-6 text-indigo-400 relative z-10" /> */}

        <span className="relative z-10 text-3xl font-bold">
          brainstormly
        </span>
      </div>
    </nav>
  );
}
