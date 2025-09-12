"use client";
import React from "react";
import { Navbar } from "../component/Navbar";
import { Hero } from "../component/Hero";
import { FeatureSection } from "../component/FeatureSection";
import { Footer } from "../component/Footer";
import { motion } from "framer-motion";

function LandingPage() {
  return (
    <div className="relative flex flex-col min-h-screen bg-black text-gray-100 overflow-hidden">
      {/* 🔮 Blobs */}
    
      {/* 🔮 Blob behind logo */}
{/* Semicircle Glow at Bottom */}
{/* Semicircle Glow at Bottom (only visible on lg+) */}
<div className="hidden lg:block absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none z-0">
  <div
    className="mx-auto w-[100vw] h-[100vw] rounded-full blur-3xl"
    style={{
      background:
        "radial-gradient(circle, rgba(43,133,250,0.6), rgba(7,34,70,0.2) 70%, transparent)",
    }}
  />
</div>



      {/* NAV */}
      <motion.div
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="sticky top-0 z-40"
      >
        <div className="backdrop-blur-sm ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Navbar />
          </div>
        </div>
      </motion.div>

      {/* Hero + Features */}
      <main className="flex-1 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.08 }}
          >
            <Hero />
          </motion.div>

          {/* <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: { opacity: 0, y: 50 },
              show: {
                opacity: 1,
                y: 0,
                transition: {
                  staggerChildren: 0.18,
                  duration: 0.7,
                  ease: "easeOut",
                },
              },
            }}
          >
            <FeatureSection />
          </motion.div> */}
        </div>
      </main>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Footer />
        </div>
      </motion.div>
    </div>
  );
}

export default LandingPage;
