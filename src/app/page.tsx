import Hero from "@/components/Home/Hero";
import About from "@/components/Home/About";
import Impact from "@/components/Home/Impact";

export const metadata = {
  title: "LightLives - Empowering Children's Futures",
  description: "Empowering children with essential life skills and values for a brighter tomorrow through innovative education programs.",
  keywords: "child education, life skills, mentorship, youth development",
}

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Impact />
    </main>
  );
}
