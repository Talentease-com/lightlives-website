import Hero from "@/components/Home/Hero";
import About from "@/components/Home/About";
import Impact from "@/components/Home/Impact";
import SponsorModal from "@/components/ui/SponsorModal";
import fs from 'fs';
import path from 'path';

export const metadata = {
  title: "LightLives - Empowering Children's Futures",
  description: "Empowering children with essential life skills and values for a brighter tomorrow through innovative education programs.",
  keywords: "child education, life skills, mentorship, youth development, values, morals, faith, leadership, LightLives, non-profit, NGO, India",
}

export default async function Home() {
    const filePath = path.join(process.cwd(), "public", "impact.json");
    const stats = JSON.parse(fs.readFileSync(filePath, "utf8"));
  return (
    <main>
      <SponsorModal />
      <Hero />
      <About />
      <Impact stats={stats} />
    </main>
  );
}
