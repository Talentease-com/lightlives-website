import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GRACES Culture | Light Lives",
  description:
    "Discover the culture we choose and nurture at Light Lives - our beliefs, core values, and the GRACES framework that guides how we work and team together.",
};

const quotes = [
  {
    text: "Culture eats strategy for breakfast",
    author: "Peter Drucker",
  },
  {
    text: "I firmly believe that any organization, in order to survive and achieve success, must have a sound set of beliefs on which it premises all its policies and actions. Next, I believe that the most important single factor in corporate success is faithful adherence to those beliefs. And finally, I believe that if an organisation is to meet the challenges of a changing world, it must be prepared to change everything about itself… except those beliefs…",
    author: "Tom Watson Jr",
    title: "IBM Chairman and son of its Founder",
  },
  {
    text: "Organizational culture comes about in one of two ways. It's either decisively defined, nurtured and protected from the inception of the organization; or -more typically- it comes about haphazardly as a collective sum of the beliefs, experiences and behaviours of those on the team. Either way you will have a culture. For better or worse.",
    author: "Brent Gleeson",
    title: "leadership coach and Navy SEAL combat veteran",
  },
];

const beliefs = [
  "…most of the big and important problems in the world and squandered opportunities often exist because there's a lack of value driven leadership.",
  "… that if we want to change the world, the best way is to create more value-driven leaders.",
  "… these leaders are best formed when human beings are starting off - as children and young adults.",
  "… that leadership is a combination of competence, character and the right convictions.",
  "… leadership development is not a 'magic pill' but a continuous and disciplined journey best done through carefully chosen life-principles and deliberately crafted habits.",
  "… we can achieve this mission with a team of self-driven and committed people who facilitate with passion and preparation and role model the skills and values we teach.",
];

const coreValues = [
  {
    letter: "C",
    title: "the Child and Young adult at the centre",
    description:
      "Their interests, needs and wants must drive our offerings and the way we work.",
  },
  {
    letter: "O",
    title: "Ownership",
    description: "We approach our work with an ownership mindset.",
  },
  {
    letter: "R",
    title: "Radical Change",
    description:
      "We don't want to just improve things we want to radically change the communities we live in and the world.",
  },
  {
    letter: "E",
    title: "Excellence for itself",
    description:
      "We are a team that pursues excellence because of a personal code. We are driven from the inside to deliver outstanding work.",
  },
];

const gracesData = [
  {
    letter: "G",
    wow: "Growth mindset vs the status quo",
    wot: "Greater Good",
  },
  {
    letter: "R",
    wow: "Results, not just effort",
    wot: "Respect and Openness",
  },
  {
    letter: "A",
    wow: "Accountability vs ambiguity",
    wot: "Achieve Together not just as individuals",
  },
  {
    letter: "C",
    wow: "Commitment vs convenience",
    wot: "Communicate with honesty, with empathy",
  },
  {
    letter: "E",
    wow: "Execution vs just debate",
    wot: "Engage, Energise and Elevate",
  },
  {
    letter: "S",
    wow: "Stretch vs just our comfort zone",
    wot: "Serve, to lead",
  },
];

export default function GracesCulturePage() {
  return (
    <main className="bg-background text-tertiary pb-24">
      {/* Hero Section */}
      <section className="relative w-full h-[420px] overflow-hidden">
        <Image
          src="/images/home0.jpg"
          alt="Light Lives team culture"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="relative h-full flex items-end">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            <div className="max-w-3xl space-y-6">
              <p className="uppercase tracking-[0.4em] text-xs text-white/80">
                Our Culture
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-white/80 leading-tight text-balance">
                The culture we choose and nurture at LightLives
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Quotes Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8 max-w-5xl mx-auto">
            {quotes.map((quote, index) => (
              <blockquote
                key={index}
                className="border border-tertiary/10 bg-background/80 backdrop-blur-sm p-8 space-y-4"
              >
                <p className="text-lg md:text-xl text-tertiary-600 italic text-pretty">
                  &ldquo;{quote.text}&rdquo;
                </p>
                <footer className="text-sm text-tertiary">
                  <cite className="not-italic font-semibold">— {quote.author}</cite>
                  {quote.title && (
                    <span className="text-tertiary-600">, {quote.title}</span>
                  )}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Our Driving Beliefs Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-tertiary text-balance">
              Our driving beliefs. We believe…
            </h2>
            <ol className="space-y-6">
              {beliefs.map((belief, index) => (
                <li
                  key={index}
                  className="flex items-start gap-4 text-lg text-tertiary-600 text-pretty"
                >
                  <span className="font-semibold text-primary text-xl min-w-[2rem]">
                    {index + 1}.
                  </span>
                  <span>{belief}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Our CORE Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto space-y-12">
            <h2 className="text-3xl md:text-4xl font-bold text-tertiary text-balance">
              Our CORE
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {coreValues.map((value) => (
                <article
                  key={value.letter}
                  className="border border-tertiary/10 bg-background/80 backdrop-blur-sm p-8 flex flex-col gap-4 transition duration-300 hover:-translate-y-1 hover:border-primary/40"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                      {value.letter}
                    </div>
                    <h3 className="text-xl font-semibold text-tertiary">
                      {value.title}
                    </h3>
                  </div>
                  <p className="text-tertiary-600 text-pretty">{value.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GRACES Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-tertiary text-balance">
                We express our culture and live it every day through GRACES
              </h2>
            </div>

            <div className="border border-tertiary/10 bg-background/80 backdrop-blur-sm overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-primary/5 border-b border-tertiary/10">
                    <th className="py-4 px-6 text-left font-semibold text-tertiary w-12"></th>
                    <th className="py-4 px-6 text-left font-semibold text-tertiary">
                      WoW – Ways of Working
                    </th>
                    <th className="py-4 px-6 text-left font-semibold text-tertiary">
                      WoT – Ways of Teaming
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {gracesData.map((item, index) => (
                    <tr
                      key={item.letter}
                      className={`border-b border-tertiary/10 ${
                        index % 2 === 0 ? "bg-background/50" : "bg-background/80"
                      } transition duration-200 hover:bg-primary/5`}
                    >
                      <td className="py-6 px-6">
                        <div className="w-10 h-10 bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                          {item.letter}
                        </div>
                      </td>
                      <td className="py-6 px-6 text-tertiary-600">{item.wow}</td>
                      <td className="py-6 px-6 text-tertiary-600">{item.wot}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
