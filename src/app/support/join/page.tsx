import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { CareersApplicationForm } from "@/components/Support/CareersApplicationForm";

const heroHighlights = [
  {
    title: "Money",
    description:
      "Over 50% of professionals are ready to explore opportunities that help them earn what they truly deserve. Our compensation packages are on par with the industry and include a comprehensive medical cover.",
  },
  {
    title: "Meaning",
    description:
      "An astonishing 89% of professionals insist that meaning and purpose at work are non-negotiable. At Light Lives you see the direct outcomes of your effort as we help children and young adults build values, practical skills, and a sustained learning environment to become independent and successful.",
  },
  {
    title: "Wellbeing",
    description:
      "Toxic cultures drain motivation. We resonate with Peter Drucker’s belief that culture eats strategy for breakfast—so we prioritise respect, freedom, flexibility, and trust, creating a space where you belong and can thrive.",
  },
  {
    title: "Learning",
    description:
      "Learning is one of the top reasons professionals value their workplace. At Light Lives you learn from hands-on projects, passionate colleagues, leadership mentorship, travel, on-field assignments, and experimental initiatives like our UK-India student exchange programs.",
  },
];

const jobOpenings = [
  {
    title: "Program Facilitator",
    department: "Programs",
    type: "Full-time",
    description:
      "Lead immersive learning experiences for students and coordinate with partner schools to deliver impactful sessions.",
    location: "Bengaluru (Hybrid)",
    experience: "3+ years in facilitation or teaching",
    posted: "2 weeks ago",
    requirements: [
      "Demonstrated experience conducting workshops or classroom sessions",
      "Strong communication and storytelling skills",
      "Comfortable with travel to partner institutions",
      "Ability to adapt content for diverse learner needs",
    ],
  },
  {
    title: "Impact Analyst",
    department: "Impact & Research",
    type: "Full-time",
    description:
      "Measure program outcomes, analyse data trends, and surface insights that sharpen our learning interventions.",
    location: "Remote-first",
    experience: "4+ years in impact measurement",
    posted: "1 month ago",
    requirements: [
      "Experience with mixed-method research and reporting",
      "Proficiency with data visualisation tools",
      "Familiarity with education or social impact programs",
      "Comfortable partnering with cross-functional teams",
    ],
  },
  {
    title: "Partnerships Manager",
    department: "Growth",
    type: "Contract",
    description:
      "Build and nurture relationships with corporates, schools, and foundations to expand Light Lives initiatives.",
    location: "Mumbai",
    experience: "5+ years in business development",
    posted: "3 days ago",
    requirements: [
      "Track record closing partnerships in the social sector",
      "Comfortable with stakeholder presentations",
      "Ability to translate program impact into compelling pitches",
      "Strong negotiation and relationship-building skills",
    ],
  },
];

const processSteps = [
  {
    step: "1",
    title: "Application Review",
    description:
      "Submit your application and resume; our team evaluates alignment with current opportunities.",
  },
  {
    step: "2",
    title: "Initial Conversation",
    description:
      "A relaxed chat to understand your motivations and share more about how we work.",
  },
  {
    step: "3",
    title: "Online Demo & Team Interview",
    description:
      "Facilitators showcase a short demo; everyone meets the broader team to explore fit.",
  },
  {
    step: "4",
    title: "Chat with Founder",
    description:
      "Final conversation focused on vision alignment and the impact you want to create with us.",
  },
];

export const metadata: Metadata = {
  title: "Join Light Lives",
  description:
    "Discover careers at Light Lives, explore open roles, learn about our hiring process, and share your profile to create impact together.",
};

export default function CareersJoinPage() {
  return (
    <main className="bg-background text-tertiary pb-24">
      <section className="relative w-full h-[420px] overflow-hidden">
        <Image
          src="/images/home0.jpg"
          alt="Light Lives team collaborating"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" /> */}
        <div className="relative h-full flex items-end">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            <div className="max-w-3xl space-y-6">
              <p className="uppercase tracking-[0.4em] text-xs text-white/80">
                Careers at Light Lives
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-white/80 leading-tight text-balance">
                Choose purpose, growth, and community in the work you do every day.
              </h1>
              <p className="text-lg md:text-xl text-white/70 text-pretty">
                Money + Meaning + Wellbeing + Learning. That sums up what the current generation seeks—and it&apos;s what we centre in every role at Light Lives.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[2fr,3fr] items-start">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-semibold text-tertiary text-balance">
                Why join Light Lives?
              </h2>
              <p className="text-lg text-tertiary-600 text-pretty">
                We offer more than a job: youll make a tangible difference while growing alongside people who care deeply about impact. Heres what you can expect when you join us.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {heroHighlights.map((item) => (
                <article
                  key={item.title}
                  className="border border-tertiary/10 bg-background/80 backdrop-blur-sm p-6 flex flex-col gap-3 transition duration-300 hover:-translate-y-1 hover:border-primary/40"
                >
                  <h3 className="text-xl font-semibold text-tertiary">{item.title}</h3>
                  <p className="text-sm md:text-base text-tertiary-600 text-pretty">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-16 space-y-6 text-tertiary-600 text-pretty max-w-4xl">
            <p>
              Money + Meaning + Wellbeing + Learning. That just about sums up what today’s generation of job seekers is looking for in an employer—and it’s what Light Lives brings together under one roof.
            </p>
            <p>
              Here’s what that translates to for you in daily life: a role where you make a real impact, stay financially secure, keep growing through continuous learning, and feel supported by a culture rooted in respect and trust.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Make an impact—not just work in a job.</li>
              <li>Earn well and build a strong financial foundation.</li>
              <li>Learn rapidly and grow fast.</li>
              <li>Thrive in a friendly, fun-filled environment based on respect, trust, and compassion.</li>
            </ul>
            <p>
              If that resonates, Light Lives may just be the space and opportunity you’ve been waiting for. Come join us. Choose to make a difference to others—and to yourself.
            </p>
          </div>
        </div>
      </section>

      <section id="openings" className="py-20 bg-muted/30 text-tertiary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-tertiary mb-6 text-balance">
              Current Opportunities
            </h2>
            <p className="text-xl text-tertiary-600 max-w-3xl mx-auto text-pretty">
              Explore our open positions and find the role that matches your skills and passion for social impact.
            </p>
          </div>

          <div className="space-y-8">
            {jobOpenings.map((job) => (
              <article
                key={job.title}
                className="border border-tertiary/10 bg-background/80 backdrop-blur-sm transition duration-300 hover:border-primary/40 hover:shadow-lg"
              >
                <div className="p-8">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="flex-1 space-y-6">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-2xl font-semibold text-tertiary">{job.title}</h3>
                        <span className="inline-flex items-center px-3 py-1 text-xs uppercase tracking-wider bg-primary/10 text-primary">
                          {job.department}
                        </span>
                        <span className="inline-flex items-center px-3 py-1 text-xs uppercase tracking-wider border border-tertiary/20 text-tertiary-600">
                          {job.type}
                        </span>
                      </div>

                      <p className="text-tertiary-600 text-pretty">{job.description}</p>

                      <dl className="flex flex-wrap gap-6 text-sm text-tertiary-600">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-tertiary">Location:</span>
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-tertiary">Experience:</span>
                          <span>{job.experience}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-tertiary">Posted:</span>
                          <span>{job.posted}</span>
                        </div>
                      </dl>

                      <div>
                        <h4 className="font-semibold text-tertiary mb-2">Key requirements</h4>
                        <ul className="space-y-2">
                          {job.requirements.map((req) => (
                            <li
                              key={req}
                              className="text-sm text-tertiary-600 flex items-start gap-3"
                            >
                              <span className="mt-2 block w-1.5 h-1.5 bg-primary" aria-hidden />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 lg:w-48">
                      <Link
                        href="#apply"
                        className="inline-flex items-center justify-center px-5 py-3 bg-primary text-primary-foreground text-sm font-semibold tracking-wide uppercase"
                      >
                        Apply now
                      </Link>
                      <Link
                        href="/contact"
                        className="inline-flex items-center justify-center px-5 py-3 border border-tertiary/20 text-sm font-semibold tracking-wide uppercase"
                      >
                        Learn more
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-tertiary mb-6 text-balance">
              Our Hiring Process
            </h2>
            <p className="text-xl text-tertiary-600 max-w-3xl mx-auto text-pretty">
              We keep hiring transparent, collaborative, and focused on finding the best fit for you and the team.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-4">
            {processSteps.map((step) => (
              <article
                key={step.step}
                className="border border-tertiary/10 bg-background/80 backdrop-blur-sm text-center p-8 flex flex-col gap-4"
              >
                <div className="w-12 h-12 mx-auto rounded-none border border-primary text-primary flex items-center justify-center font-semibold text-lg">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-tertiary">{step.title}</h3>
                <p className="text-sm text-tertiary-600 text-pretty">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="apply" className="py-20 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.4fr,1fr] items-start">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-tertiary text-balance">
                Share your profile with us
              </h2>
              <p className="text-lg text-tertiary-600 text-pretty">
                Submit your details and resumewell connect with you when theres a match with current or upcoming roles. Well soon pipe this directly to RecruitCRM; for now well store it securely and follow up over email.
              </p>
              <div className="space-y-4 text-sm text-tertiary-600">
                <p className="font-semibold text-tertiary">Need help?</p>
                <p>
                  Have questions before applying? Write to us at
                  <Link href="mailto:careers@lightlives.org" className="ml-2 underline">
                    careers@lightlives.org
                  </Link>
                  .
                </p>
              </div>
            </div>

            <div className="border border-tertiary/10 bg-background/80 backdrop-blur-sm p-8">
              <CareersApplicationForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
