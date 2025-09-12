// components/FeatureSection.tsx
"use client";
import { Lightbulb, Sparkles, Users } from "lucide-react";
import { useThemeStore } from "../store/Theme";

const features = [
  {
    title: "Idea Generator",
    desc: "Get AI-powered prompts to kickstart your project ideas.",
    icon: Lightbulb,
  },
  {
    title: "Creative Templates",
    desc: "Organize your thoughts with structured project templates.",
    icon: Sparkles,
  },
  {
    title: "Collaborate",
    desc: "Work with your team to refine and expand ideas.",
    icon: Users,
  },
];

export function FeatureSection() {
  const dark = useThemeStore((s) => s.dark);

  return (
   <section className="py-20 px-6 ">
  <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
    {features.map((f, i) => (
      <div
        key={i}
        className="p-6 rounded-2xl shadow-md hover:shadow-lg bg-gray-800 text-gray-100"
      >
        <f.icon className="h-10 w-10 mb-4 text-indigo-400" />
        <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
        <p className="text-gray-300">{f.desc}</p>
      </div>
    ))}
  </div>
</section>

  );
}
