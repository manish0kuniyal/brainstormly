"use client";

interface ColorThemeCardProps {
  name: string;
  colors: string[];
}

export function ColorThemeCard({ name, colors }: ColorThemeCardProps) {
  return (
    <div className="p-4 w-48 flex flex-col gap-3">
      <h3 className="font-semibold text-center">{name}</h3>
      <div className="flex flex-col gap-2">
        {colors.map((c) => (
          <div
            key={c}
            className="w-full h-10 rounded-md border flex items-center justify-center text-xs font-mono"
            style={{ backgroundColor: c }}
            title={c}
          >
            <span
              className="px-1 rounded"
              style={{
                backgroundColor: "rgba(255,255,255,0.6)",
                color: "#000",
              }}
            >
              {c}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
