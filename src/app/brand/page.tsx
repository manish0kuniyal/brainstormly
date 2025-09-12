"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import FeatureKanban from "../component/FeatureKanban";

import { motion, Variants } from "framer-motion";
import ExplanationsCard from "./ExplanationCard";
import LaunchRoadmapCard from "./LaunchCard";
import CompetitorsCard from "./CompetitorCard";
import TechStackCard from "./TechStackCard";
import InvestmentCard from "./InvestmentCard";
import SuggestionsCard from "./SuggestionsCard";
import FontsCard from "./FontCard";
import ThemeCard from "./ThemeCard";

type Feature = { name: string; timeEstimate?: string };
type GeneratedOutput = {
  idea?: string;
  themeName?: string;
  colors?: { [key: string]: string };
  fonts?: { primary?: string; secondary?: string; fallbacks?: string[] };
  suggestions?: { name: string; motto: string }[];
  businessSetup?: {
    investmentRange?: string;
    techStack?: string[];
    features?: Feature[];
  };
  competitors?: { name: string; note: string }[];
  launchRoadmap?: { phase: string; goals: string; timeEstimate: string }[];
  explanations?: string;
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, when: "beforeChildren" },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.99 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.36, ease: "easeOut" },
  },
};

export default function BrandPage() {
  const params = useSearchParams();
  const idea = params.get("idea") || "";
  const [generated, setGenerated] = useState<GeneratedOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // central fetch function so we can re-use for regenerate
  async function fetchData() {
    if (!idea) return;
    setLoading(true);
    setErr(null);
    setGenerated(null);

    try {
      const r = await fetch("/api/brand/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idea,
          styleHints: ["modern", "friendly", "trustworthy"],
        }),
      });
      const json = await r.json();
      if (json.error) throw new Error(json.error);
      setGenerated(json);
    } catch (e: any) {
      setErr(e?.message || "Error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idea]);

  if (!idea)
    return (
      <p className="text-center mt-20 text-gray-300">⚠️ No idea provided.</p>
    );

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex justify-center px-4 py-10">
      <div className="w-full max-w-7xl">
        {/* Centered loader (when generating) */}
        {loading && (
          <div className="col-span-full flex items-center justify-center py-20">
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-300 animate-pulse">
                Generating your idea…
              </p>
              <div className="flex mt-4 items-center justify-center gap-2">
                <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce" />
                <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce delay-150" />
                <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce delay-300" />
              </div>
            </div>
          </div>
        )}

        {err && <p className="text-red-500 text-center mb-6">{err}</p>}

        {/* Grid: 1 col mobile, 3 cols on sm+ */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 auto-rows-min items-start"
          variants={containerVariants}
          initial="hidden"
          animate={generated ? "show" : "hidden"}
        >
          {/* ROW 1: Theme | Fonts | Investment (each card wrapper has h-full to equalize heights) */}

          {/* Theme card */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -6 }}
            layout
            className="col-span-full sm:col-span-1"
          >
            <div className="h-full">
              {generated?.themeName && generated?.colors ? (
                <ThemeCard themeName={generated.themeName} colors={generated.colors} />
              ) : (
                <div className="p-6 rounded-2xl shadow-lg border border-gray-800 bg-gray-900 h-full flex flex-col justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-200 mb-2">🎨 Theme</h2>
                    <p className="text-sm text-gray-400">No theme generated yet.</p>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => fetchData()}
                      className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md text-sm font-medium"
                    >
                      Regenerate theme
                    </button>
                    <button
                      onClick={() => {
                        // quick fallback: set a default theme locally so UI shows something
                        setGenerated((prev) => ({
                          ...prev,
                          themeName: "Minimal (fallback)",
                          colors: {
                            primary: "#0F172A",
                            secondary: "#6366F1",
                            accent: "#38BDF8",
                            background: "#0B1220",
                            muted: "#0F172A",
                          },
                        }));
                      }}
                      className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm text-gray-200"
                    >
                      Use fallback
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Fonts card */}
          <motion.div variants={cardVariants} whileHover={{ y: -6 }} layout className="col-span-full sm:col-span-1">
            <div className="h-full">
              {generated?.fonts ? (
                <FontsCard primary={generated.fonts.primary} secondary={generated.fonts.secondary} />
              ) : (
                <div className="p-6 rounded-2xl shadow-lg border border-gray-800 bg-gray-900 h-full">
                  <h2 className="text-lg font-semibold text-gray-200 mb-2">🔤 Fonts</h2>
                  <p className="text-sm text-gray-400">No fonts generated yet.</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Investment card */}
          <motion.div variants={cardVariants} whileHover={{ y: -6 }} layout className="col-span-full sm:col-span-1">
            <div className="h-full">
              {generated?.businessSetup?.investmentRange ? (
                <InvestmentCard range={generated.businessSetup.investmentRange} />
              ) : (
                <div className="p-6 rounded-2xl shadow-lg border border-gray-800 bg-gray-900 h-full">
                  <h2 className="text-lg font-semibold text-gray-200 mb-2">💰 Investment</h2>
                  <p className="text-sm text-gray-400">No estimate yet.</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* ROW 2: Suggestions | Tech Stack | Competitors */}
          <motion.div variants={cardVariants} whileHover={{ y: -6 }} layout className="col-span-full sm:col-span-1">
            <div className="h-full">
              {generated?.suggestions ? (
                <SuggestionsCard suggestions={generated.suggestions} />
              ) : (
                <div className="p-6 rounded-2xl shadow-lg border border-gray-800 bg-gray-900 h-full">
                  <h2 className="text-lg font-semibold text-gray-200 mb-2">💡 Suggestions</h2>
                  <p className="text-sm text-gray-400">No suggestions yet.</p>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div variants={cardVariants} whileHover={{ y: -6 }} layout className="col-span-full sm:col-span-1">
            <div className="h-full">
              {generated?.businessSetup?.techStack ? (
                <TechStackCard stack={generated.businessSetup.techStack} />
              ) : (
                <div className="p-6 rounded-2xl shadow-lg border border-gray-800 bg-gray-900 h-full">
                  <h2 className="text-lg font-semibold text-gray-200 mb-2">🛠️ Tech Stack</h2>
                  <p className="text-sm text-gray-400">No tech stack suggested yet.</p>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div variants={cardVariants} whileHover={{ y: -6 }} layout className="col-span-full sm:col-span-1">
            <div className="h-full">
              {generated?.competitors ? (
                <CompetitorsCard competitors={generated.competitors} />
              ) : (
                <div className="p-6 rounded-2xl shadow-lg border border-gray-800 bg-gray-900 h-full">
                  <h2 className="text-lg font-semibold text-gray-200 mb-2">🏆 Competitors</h2>
                  <p className="text-sm text-gray-400">No competitors generated yet.</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* ROW 3: Launch roadmap (full width) */}
          <motion.div variants={cardVariants} whileHover={{ y: -6 }} layout className="col-span-full">
            {generated?.launchRoadmap ? (
              <LaunchRoadmapCard roadmap={generated.launchRoadmap} />
            ) : (
              <div className="p-6 rounded-2xl shadow-lg border border-gray-800 bg-gray-900">
                <h2 className="text-lg font-semibold text-gray-200 mb-2">🚀 Launch Roadmap</h2>
                <p className="text-sm text-gray-400">No roadmap generated yet.</p>
              </div>
            )}
          </motion.div>

          {/* ROW 4: Kanban (full width, static wrapper) */}
          {generated?.businessSetup?.features && (
            <div className="col-span-full">
              <div className="p-6 rounded-2xl shadow-lg border border-gray-800 bg-gray-900">
                <h2 className="text-xl font-bold mb-4">📋 Features Board</h2>
                <FeatureKanban features={generated.businessSetup.features} />
              </div>
            </div>
          )}

          {/* Explanations card (full width, placed after kanban) */}
          {generated?.explanations && (
            <motion.div variants={cardVariants} whileHover={{ y: -6 }} layout className="col-span-full">
              <ExplanationsCard text={generated.explanations} />
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
