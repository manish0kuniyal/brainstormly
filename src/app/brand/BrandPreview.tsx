// components/BrandPreview.tsx
"use client";

interface BrandPreviewProps {
  idea: string;
  primaryFont: string;
  secondaryFont: string;
  primaryColor: string;
  secondaryColor: string;
}

export function BrandPreview({
  idea,
  primaryFont,
  secondaryFont,
  primaryColor,
  secondaryColor,
}: BrandPreviewProps) {
  return (
    <div className="p-6 rounded-2xl shadow-md border bg-white">
      <h2 className="text-xl font-semibold mb-4">🖼 Preview</h2>
      <p className={`${primaryFont} text-2xl mb-2`} style={{ color: primaryColor }}>
        {idea}
      </p>
      <p className={`${secondaryFont} text-xl`} style={{ color: secondaryColor }}>
        Example Logo / Tagline in a complementary style
      </p>
    </div>
  );
}
