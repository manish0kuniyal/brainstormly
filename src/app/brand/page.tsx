// app/brand/page.tsx
"use client";
import { useSearchParams } from "next/navigation";
import { ColorThemeCard } from "./ColorThemeCard";
import { FontPreviewCard } from "./FontPreviewCard";
import { BrandPreview } from "./BrandPreview";
import {
  Poppins,
  Merriweather,
  Lobster,
  Roboto_Mono,
  Montserrat,
  Lora,
  Oswald,
  Pacifico,
  Raleway,
  Indie_Flower,
} from "next/font/google";
import NameMottoGenerator from "../component/NameMotoGenrator";

// 🎨 Color Themes
// themes.ts
export const themes = {
  Luxury: ["#0D0D0D", "#1C1C1C", "#BFA760", "#E5D9B6", "#8C7853"],
  Minimal: ["#FFFFFF", "#F7F7F7", "#E0E0E0", "#A0A0A0", "#333333"],
  Playful: ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#FF8FAB"],
  Tech: ["#0F172A", "#1E293B", "#38BDF8", "#6366F1", "#94A3B8"],
  Nature: ["#35524A", "#627C85", "#779CAB", "#A2E8DD", "#E9FFC7"],
  Retro: ["#F94144", "#F3722C", "#F8961E", "#90BE6D", "#577590"],
  Futuristic: ["#1F1C2C", "#928DAB", "#0F2027", "#2C5364", "#00F5D4"],
};
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });
const merriweather = Merriweather({ subsets: ["latin"], weight: ["400", "700"] });
const lobster = Lobster({ subsets: ["latin"], weight: ["400"] });
const robotoMono = Roboto_Mono({ subsets: ["latin"], weight: ["400", "700"] });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700"] });
const lora = Lora({ subsets: ["latin"], weight: ["400", "700"] });
const oswald = Oswald({ subsets: ["latin"], weight: ["400", "700"] });
const pacifico = Pacifico({ subsets: ["latin"], weight: ["400"] });
const raleway = Raleway({ subsets: ["latin"], weight: ["400", "700"] });
const indieFlower = Indie_Flower({ subsets: ["latin"], weight: ["400"] });

// ✅ Now build the array
export const fonts = [
  { name: "Poppins", style: poppins.className },
  { name: "Merriweather", style: merriweather.className },
  { name: "Lobster", style: lobster.className },
  { name: "Roboto Mono", style: robotoMono.className },
  { name: "Montserrat", style: montserrat.className },
  { name: "Lora", style: lora.className },
  { name: "Oswald", style: oswald.className },
  { name: "Pacifico", style: pacifico.className },
  { name: "Raleway", style: raleway.className },
  { name: "Indie Flower", style: indieFlower.className },
];
export default function BrandPage() {
  const params = useSearchParams();
  const idea = params.get("idea");

  if (!idea) {
    return <p className="text-center mt-20">⚠️ No idea provided.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
  {/* 🎨 Color Themes */}
  <div className="p-6 rounded-2xl shadow-md border bg-white">
    <h2 className="text-xl font-semibold mb-4">🎨 Possible Color Themes</h2>
    <div className="flex flex-wrap gap-6">
      {Object.entries(themes).map(([name, colors]) => (
        <ColorThemeCard key={name} name={name} colors={colors} />
      ))}
    </div>
  </div>

  {/* 🔤 Fonts */}
  <div className="p-6 rounded-2xl shadow-md border bg-white">
    <h2 className="text-xl font-semibold mb-4">🔤 Suggested Fonts</h2>
    <div className="flex flex-wrap gap-6">
      {fonts.map((f) => (
        <FontPreviewCard key={f.name} name={f.name} className={f.style} />
      ))}
    </div>
  </div>
  <div className="md:col-span-2">
      <NameMottoGenerator idea={idea} />
    </div>
  {/* 🖼 Brand Preview */}
  {/* <div className="md:col-span-2">
    <BrandPreview
      idea={idea}
      primaryFont={poppins.className}
      secondaryFont={lobster.className}
      primaryColor={themes.Luxury[2]}
      secondaryColor={themes.Playful[0]}
    />
  </div> */}
</div>

  );
}
