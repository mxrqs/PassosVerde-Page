import { useEffect, useState } from "react";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { PainPoints } from "@/components/landing/PainPoints";
import { Benefits } from "@/components/landing/Benefits";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Community } from "@/components/landing/Community";
import { Pricing } from "@/components/landing/Pricing";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";
import { Questionnaire } from "@/components/landing/Questionnaire";

const STORAGE_KEY = "passos-verdes:onboarding-v1";

function readDone(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw) as { done?: boolean };
    return Boolean(parsed.done);
  } catch {
    return false;
  }
}

export default function Home() {
  const [unlocked, setUnlocked] = useState<boolean | null>(null);

  useEffect(() => {
    setUnlocked(readDone());
  }, []);

  if (unlocked === null) {
    return <div className="min-h-screen bg-background" aria-hidden />;
  }

  if (!unlocked) {
    return <Questionnaire onComplete={() => setUnlocked(true)} />;
  }

  return (
    <div className="min-h-screen bg-background font-sans">
      <Header />
      <main>
        <Hero />
        <PainPoints />
        <Benefits />
        <HowItWorks />
        <Community />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
