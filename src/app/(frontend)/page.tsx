import Hero from "@/components/Home/Hero";
import About from "@/components/Home/About";
import Impact from "@/components/Home/Impact";
import SponsorModal from "@/components/ui/SponsorModal";
import { getImpactData } from "@/lib/payload/fetch";


export const metadata = {
  title: "LightLives - Empowering Children's Futures",
  description: "Empowering children with essential life skills and values for a brighter tomorrow through innovative education programs.",
  keywords: "child education, life skills, mentorship, youth development, values, morals, faith, leadership, LightLives, non-profit, NGO, India",
}

// Enable static generation
export const dynamic = 'force-static'

export default async function Home() {
  // Get impact stats from Payload CMS
  const stats = await getImpactData();
  
  return (
    <main>
      <SponsorModal />
      <Hero />
      <About />
      <Impact stats={stats} />
    </main>
  );
}
