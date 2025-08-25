"use client";
import React from 'react'
import { Navbar } from './component/Navbar'
import { Hero } from './component/Hero'
import { FeatureSection } from './component/FeatureSection'
import { Footer } from './component/Footer'
import { useThemeStore } from './store/Theme'
function Page() {
  const dark = useThemeStore((s) => s.dark);


return (
<div
className={`flex flex-col min-h-screen lg:px-[20%] transition-colors ${
dark ? "bg-black" : "bg-white text-gray-900"
}`}
>
<Navbar />
<main className="flex-1">
<Hero />
<FeatureSection />
</main>
<Footer />
</div>
);
}

export default Page