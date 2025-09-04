"use client";

interface FontPreviewCardProps {
  name: string;
  className: string;
}

export function FontPreviewCard({ name, className }: FontPreviewCardProps) {
  return (
    <div className={`p-4  flex flex-col`}>
      <p className="text-xs text-gray-500 mb-2">{name}</p>
      <p className={`text-lg ${className}`}>
        The quick brown fox jumps over the lazy dog
      </p>
    </div>
  );
}
