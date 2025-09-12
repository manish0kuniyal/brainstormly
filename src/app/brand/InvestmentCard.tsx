// app/component/InvestmentCard.tsx
"use client";
import { Wallet } from "lucide-react";

export default function InvestmentCard({ range }: { range: string }) {
  return (
    <div className="h-full flex flex-col p-6 rounded-2xl shadow-lg border border-gray-800 bg-gray-900">
      {/* Heading with icon */}
      <div className="flex items-center gap-2 mb-4">
        <Wallet className="h-6 w-6 text-indigo-400" />
        <h2 className="text-xl font-bold">Investment Range</h2>
      </div>

      {/* Investment value */}
      <div className="flex-1 flex items-center">
        <span className="px-3 py-1 rounded-lg bg-green-500/20 text-green-300 text-lg font-semibold">
          {range}
        </span>
      </div>

      {/* Footer note */}
      <div className="mt-4 text-sm text-gray-400">
        Estimated setup + first 3 months
      </div>
    </div>
  );
}
