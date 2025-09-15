import Hero from "@/components/Home/Hero";
import About from "@/components/Home/About";
import Impact from "@/components/Home/Impact";
import SponsorModal from "@/components/ui/SponsorModal";
import { createStaticClient } from "@/utils/supabase/static";


export const metadata = {
  title: "LightLives - Empowering Children's Futures",
  description: "Empowering children with essential life skills and values for a brighter tomorrow through innovative education programs.",
  keywords: "child education, life skills, mentorship, youth development, values, morals, faith, leadership, LightLives, non-profit, NGO, India",
}

// Fetch impact data directly from Supabase
async function getImpactData() {
  try {
    const supabase = createStaticClient();
    const { data, error } = await supabase
      .from("impact")
      .select("value, format, label, description, decimals, usePointer, icon");

    if (error) {
      console.error('Error fetching impact data:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error connecting to Supabase:', error);
    return [];
  }
}

export default async function Home() {
  // Get impact stats directly from Supabase
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
