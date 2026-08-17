import { createFileRoute } from "@tanstack/react-router";
import aboutImg from "@/assets/about-us.jpg";
import visionImg from "@/assets/vision.jpg";
import missionImg from "@/assets/mission.jpg";
import { Target, Users, BookOpen, Award, Eye, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us – Trublend EduforCareer" },
      { name: "description", content: "Learn about Trublend EduforCareer, a leading training and career development institute based in Bangalore." },
      { property: "og:title", content: "About Us – Trublend EduforCareer" },
      { property: "og:description", content: "Building skills, creating careers since day one." },
    ],
  }),
  component: AboutPage,
});

const values = [
  { icon: Target, title: "Mission-Driven", desc: "We are committed to empowering every learner with industry-relevant skills." },
  { icon: Users, title: "Expert Trainers", desc: "Learn from certified professionals with real industry experience." },
  { icon: BookOpen, title: "Practical Learning", desc: "Hands-on projects, labs, and real-time case studies." },
  { icon: Award, title: "Placement Support", desc: "Dedicated placement assistance to help you land your dream job." },
];

function AboutPage() {
  return (
    <>
      {/* Banner */}
      <section className="page-header-banner py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <p className="section-label text-sm font-semibold tracking-wider text-primary">LEARN. GROW. SUCCEED.</p>
          <h1 className="mt-2 font-heading text-4xl font-bold text-foreground md:text-5xl">About Us</h1>
        </div>
      </section>

      {/* About content */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 px-4 lg:flex-row lg:px-8">
          <div className="flex-1">
            <img src={aboutImg} alt="About Trublend EduforCareer" className="rounded-xl shadow-lg" loading="lazy" width={800} height={600} />
          </div>
          <div className="flex-1">
            <h2 className="font-heading text-3xl font-bold text-foreground">Trublend EduforCareer</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              At Trublend EduforCareer, we believe meaningful careers are built with the right guidance and practical learning. Our programs are designed by industry experts and delivered through real-time projects, hands-on labs, and personalized mentoring.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Based in Bangalore, we work closely with students, professionals, and organizations to create impactful training experiences that produce job-ready talent.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="pb-16 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
            
            {/* Vision Card */}
            <div className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="relative h-56 w-full overflow-hidden">
                <img 
                  src={visionImg} 
                  alt="Our Vision" 
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  loading="lazy" 
                />
                {/* Floating Icon Over Image */}
                <div className="absolute left-6 top-6 flex h-12 w-12 items-center justify-center rounded-xl bg-background/90 text-primary shadow-sm backdrop-blur-md">
                  <Eye className="h-6 w-6" />
                </div>
              </div>
              <div className="p-8">
                <h2 className="font-heading text-2xl font-bold text-foreground">Our Vision</h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  To become a trusted partner in workforce transformation by enabling people and organizations to thrive in a technology-driven future.
                </p>
              </div>
            </div>

            {/* Mission Card */}
            <div className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="relative h-56 w-full overflow-hidden">
                <img 
                  src={missionImg} 
                  alt="Our Mission" 
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  loading="lazy" 
                />
                {/* Floating Icon Over Image */}
                <div className="absolute left-6 top-6 flex h-12 w-12 items-center justify-center rounded-xl bg-background/90 text-primary shadow-sm backdrop-blur-md">
                  <Target className="h-6 w-6" />
                </div>
              </div>
              <div className="p-8">
                <h2 className="font-heading text-2xl font-bold text-foreground">Our Mission</h2>
                <ul className="mt-4 space-y-4 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <span className="leading-relaxed">To deliver high-impact training aligned with industry 4.0 technologies and evolving job roles.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <span className="leading-relaxed">To foster long-term partnerships with corporate clients for continuous workforce upskilling and talent development.</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-muted py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-center font-heading text-3xl font-bold text-foreground">Why Choose Us</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="rounded-xl bg-background p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-hero-bg text-primary">
                  <v.icon className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}