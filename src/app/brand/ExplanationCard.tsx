"use client";

export default function ExplanationsCard({ text }: { text: string }) {
  return (
    <div className="p-6 rounded-2xl shadow-lg border border-gray-800 bg-gray-900 col-span-full">
      <h2 className="text-xl font-bold mb-4">📖 Explanations</h2>
      <p className="text-sm text-gray-300 whitespace-pre-line">{text}</p>
    </div>
  );
}
