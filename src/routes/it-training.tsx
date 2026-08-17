import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Terminal,
  Database,
  ShieldCheck,
  Cpu,
  Rocket,
  CheckCircle2,
  Award,
  Users,
  TrendingUp,
  BookOpen,
  Briefcase,
  Clock,
  ArrowRight,
  Code2
} from "lucide-react";

export const Route = createFileRoute("/it-training")({
  head: () => ({
    meta: [
      { title: "Premium IT Training – Python, Java, Cyber Security & AI | Trublend EduforCareer" },
      {
        name: "description",
        content:
          "Professional IT training in Python, Java, Cyber Security, and AI/Machine Learning with guaranteed job placement. Start your tech career with Trublend EduforCareer.",
      },
      { property: "og:title", content: "Premium IT Training – Trublend EduforCareer" },
      {
        property: "og:description",
        content: "Industry-focused IT training with 100% placement support.",
      },
      {
        property: "og:image",
        content:
          "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=630&fit=crop",
      },
    ],
  }),
  component: ITTrainingPage,
});

// Mapped exactly to the Trublend EduforCareer Brand Colors
const courses = [
  {
    id: "python",
    icon: Terminal,
    title: "Python Full Stack",
    desc: "Master Python for modern web development, data science, and automation.",
    duration: "3 Months",
    skills: ["Django", "FastAPI", "Data Science", "React"],
    color: "from-[#00AEEF] to-blue-600", // Brand Sky Blue
    bgLight: "bg-[#00AEEF]/10",
    textColor: "text-[#00AEEF]",
  },
  {
    id: "java",
    icon: Database,
    title: "Java Enterprise",
    desc: "Build highly scalable, enterprise-level applications with Java and Spring.",
    duration: "3 Months",
    skills: ["Spring Boot", "Microservices", "REST APIs", "SQL"],
    color: "from-[#F26522] to-orange-600", // Brand Orange
    bgLight: "bg-[#F26522]/10",
    textColor: "text-[#F26522]",
  }
];

const benefits = [
  { icon: Award, title: "Industry Certification", desc: "Earn credentials globally recognized by top-tier tech companies." },
  { icon: Briefcase, title: "100% Placement", desc: "Guaranteed interview opportunities and dedicated career coaching." },
  { icon: Users, title: "Expert Mentorship", desc: "Learn directly from senior developers with 10+ years of experience." },
  { icon: TrendingUp, title: "Career Acceleration", desc: "Bypass entry-level hurdles with portfolio-ready technical skills." },
];

const whyChoose = [
  { icon: Code2, title: "100% Hands-On Coding", desc: "Zero theoretical fluff. Build real-world, deployable projects from week one." },
  { icon: Clock, title: "Flexible Architectures", desc: "Weekend and weekday intensive batches tailored for students and professionals." },
  { icon: BookOpen, title: "Industry-Sync Curriculum", desc: "Syllabus updated quarterly to match current enterprise technology stacks." },
  { icon: Users, title: "Elite Batch Sizes", desc: "Capped classroom sizes to guarantee personalized code reviews and mentoring." },
];

function ITTrainingPage() {
  return (
    <div className="bg-[#FAFAFC] font-['Poppins'] text-slate-800 overflow-hidden">
      {/* Premium Typography & Animation Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700&display=swap');
        .font-montserrat { font-family: 'Montserrat', sans-serif; }
        .font-poppins { font-family: 'Poppins', sans-serif; }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0A0F1C] px-4 py-20 lg:px-8">
        {/* Abstract Tech Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop"
            alt="Code Background"
            className="w-full h-full object-cover opacity-20 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C] via-[#0A0F1C]/80 to-transparent" />
          {/* Brand Color Glows */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-[#00AEEF]/10 rounded-full blur-[100px] md:blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-[#00758B]/20 rounded-full blur-[100px] md:blur-[120px] pointer-events-none" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl flex flex-col items-center text-center w-full">
          <div className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl mb-6 md:mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00AEEF] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00AEEF]"></span>
            </span>
            <span className="font-montserrat text-[10px] md:text-xs font-bold tracking-[0.15em] text-slate-300 uppercase">
              2026 Tech Batches Open
            </span>
          </div>

          <h1 className="animate-fade-in-up [animation-delay:100ms] opacity-0 font-montserrat text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] max-w-5xl drop-shadow-lg mb-6">
            Architect Your Future In <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00AEEF] to-[#40C4FF]">
              Software Engineering.
            </span>
          </h1>

          <p className="animate-fade-in-up [animation-delay:200ms] opacity-0 font-poppins text-base md:text-lg lg:text-xl text-slate-400 font-light max-w-2xl leading-relaxed mb-10 px-4">
            Intensive, industry-aligned training in Python, Java, Cyber Security, and AI. Master the stack, build enterprise projects, and secure your placement.
          </p>

          <div className="animate-fade-in-up [animation-delay:300ms] opacity-0 w-full px-4 sm:px-0 sm:w-auto flex justify-center">
            <Link
              to="/contact"
              className="group relative overflow-hidden inline-flex items-center justify-center gap-3 rounded-xl bg-[#00AEEF] px-8 py-4 font-montserrat font-bold text-white transition-all duration-300 hover:bg-[#0095CC] hover:shadow-[0_0_30px_rgba(0,174,239,0.4)] active:scale-95 w-full sm:w-auto"
            >
              <span className="relative z-10">Apply For Batch</span>
              <ArrowRight className="h-5 w-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="animate-fade-in-up [animation-delay:400ms] opacity-0 mt-10 md:mt-12 flex flex-wrap items-center justify-center gap-4 md:gap-6 text-xs md:text-sm text-slate-400 font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-[#8CC63F]" /> Guaranteed Placement
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-[#8CC63F]" /> Capstone Projects
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-[#8CC63F]" /> Mock Interviews
            </div>
          </div>
        </div>
      </section>

      {/* --- PREMIUM COURSE GRID --- */}
      <section className="py-16 md:py-24 lg:py-32 relative z-20 bg-slate-50 border-b border-slate-200/50">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <span className="font-montserrat text-xs font-bold tracking-[0.2em] text-[#00AEEF] uppercase block mb-3">Core Programs</span>
            <h2 className="font-montserrat text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
              Choose Your Tech Stack
            </h2>
          </div>

          <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            {courses.map((course, idx) => {
              const Icon = course.icon;
              return (
                <Link
                  key={idx}
                  to="/it-details"
                  hash={course.id}
                  className="group flex flex-col rounded-3xl bg-white border border-slate-200 p-6 md:p-8 shadow-sm transition-all duration-500 hover:shadow-xl hover:border-slate-300 hover:-translate-y-2 relative overflow-hidden h-full cursor-pointer"
                >
                  {/* Subtle Background Gradient on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${course.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 pointer-events-none`} />

                  <div className="flex items-center justify-between mb-6">
                    <div className={`flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-2xl ${course.bgLight} ${course.textColor} transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3`}>
                      <Icon className="h-6 w-6 md:h-7 md:w-7" strokeWidth={1.5} />
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-poppins text-xs font-semibold">
                      <Clock className="h-3 w-3 md:h-3.5 md:w-3.5" />
                      {course.duration}
                    </div>
                  </div>
                  
                  <h3 className="font-montserrat text-lg md:text-xl font-bold text-slate-900 mb-3 group-hover:text-slate-800 transition-colors">
                    {course.title}
                  </h3>
                  <p className="font-poppins text-sm text-slate-500 leading-relaxed mb-6 flex-grow">
                    {course.desc}
                  </p>

                  <div className="flex items-center justify-between gap-4 mt-auto pt-6 border-t border-slate-50">
                    <div className="flex flex-wrap gap-2">
                      {course.skills.map((skill, sidx) => (
                        <span
                          key={sidx}
                          className={`inline-block rounded-md ${course.bgLight} px-2.5 py-1 text-[10px] md:text-[11px] font-bold ${course.textColor} uppercase tracking-wider`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="flex-shrink-0 inline-flex items-center gap-2 text-sm font-bold text-[#00AEEF] hover:text-blue-600 transition-colors group/link">
                      Explore
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- SPLIT LAYOUT: WHY CHOOSE US --- */}
      <section className="py-16 md:py-24 bg-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:gap-16 lg:grid-cols-2 items-center">
            
            <div className="order-2 lg:order-1">
              <span className="font-montserrat text-xs font-bold tracking-[0.2em] text-[#00758B] uppercase block mb-3">The Trublend EduforCareer Difference</span>
              <h2 className="font-montserrat text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
                Engineered For <br className="hidden md:block" /> Career Success.
              </h2>
              <p className="font-poppins text-base md:text-lg text-slate-500 leading-relaxed mb-8 md:mb-10">
                Traditional education focuses on theory. We focus on deployment. Learn the exact tools, workflows, and best practices used by modern tech companies.
              </p>

              <div className="space-y-6 md:space-y-8">
                {whyChoose.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="flex gap-4 md:gap-5 group">
                      <div className="flex-shrink-0 mt-1">
                        <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-xl bg-slate-50 border border-slate-100 text-[#00758B] transition-all duration-300 group-hover:bg-[#00758B] group-hover:text-white group-hover:shadow-md group-hover:-translate-y-1">
                          <Icon className="h-5 w-5" strokeWidth={2} />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-montserrat text-base md:text-lg font-bold text-slate-900 mb-1">{item.title}</h4>
                        <p className="font-poppins text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="order-1 lg:order-2 relative px-4 sm:px-8 lg:px-0">
              <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100 aspect-[4/5] sm:aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
                  alt="Students Coding"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#00758B]/10 mix-blend-multiply" />
              </div>

              {/* Floating Success Card */}
              <div className="absolute -bottom-6 -left-2 sm:-bottom-8 sm:-left-6 lg:-left-12 rounded-3xl bg-white p-4 sm:p-6 shadow-[0_20px_40px_rgba(0,0,0,0.08)] border border-slate-100 w-56 sm:w-64 animate-bounce-slow z-10">
                <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#8CC63F]/10 text-[#8CC63F]">
                    <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div>
                    <div className="font-montserrat text-xl sm:text-2xl font-black text-slate-900">100%</div>
                    <div className="font-poppins text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">Placement Rate</div>
                  </div>
                </div>
                <div className="h-1.5 sm:h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#8CC63F] w-full rounded-full" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- BENEFITS BENTO GRID --- */}
      <section className="py-16 md:py-24 bg-slate-50 border-t border-slate-200/50">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h2 className="font-montserrat text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900">
              The Academy Advantage
            </h2>
          </div>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={idx}
                  className="group bg-white rounded-3xl border border-slate-200 p-6 md:p-8 text-center transition-all duration-500 hover:shadow-xl hover:border-[#00AEEF]/30 hover:-translate-y-1"
                >
                  <div className="mx-auto mb-5 md:mb-6 flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-2xl bg-slate-50 border border-slate-100 text-slate-700 transition-all duration-300 group-hover:bg-[#00AEEF] group-hover:border-[#00AEEF] group-hover:text-white">
                    <Icon className="h-6 w-6 md:h-7 md:w-7" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-montserrat text-base md:text-lg font-bold text-slate-900 mb-2 md:mb-3">
                    {benefit.title}
                  </h3>
                  <p className="font-poppins text-sm text-slate-500 leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- PREMIUM CTA SECTION --- */}
      <section className="py-16 md:py-24 relative overflow-hidden bg-[#0A0F1C] px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0F1C] to-[#0f172a]" />
        
        {/* Abstract Glowing Orbs */}
        <div className="absolute top-0 right-0 md:right-1/4 w-72 h-72 md:w-96 md:h-96 bg-[#00AEEF]/20 rounded-full blur-[80px] md:blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 md:left-1/4 w-72 h-72 md:w-96 md:h-96 bg-[#00758B]/20 rounded-full blur-[80px] md:blur-[100px] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-4xl text-center lg:px-8">
          <h2 className="font-montserrat text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 md:mb-6 leading-tight">
            Your Future In Tech Starts Here.
          </h2>
          <p className="font-poppins text-base md:text-lg text-slate-400 mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed">
            Stop waiting. Join our upcoming batch, master in-demand skills, and let us handle the placement. Seats are strictly limited.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 md:gap-5 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-[#00AEEF] px-8 py-4 font-montserrat font-bold text-white transition-all duration-300 hover:bg-[#0095CC] hover:shadow-[0_0_30px_rgba(0,174,239,0.4)] active:scale-95"
            >
              Secure Your Seat <Rocket className="h-5 w-5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-3 rounded-xl border border-slate-700 bg-white/5 px-8 py-4 font-montserrat font-bold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-slate-500 active:scale-95"
            >
              Contact Admissions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}