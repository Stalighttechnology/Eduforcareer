import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Briefcase,
  Users,
  TrendingUp,
  Award,
  CheckCircle2,
  Target,
  Sparkles,
  Rocket,
  BookOpen,
  Zap,
  ArrowRight,
  BarChart,
  ShieldCheck
} from "lucide-react";

export const Route = createFileRoute("/corporate-training")({
  head: () => ({
    meta: [
      { title: "Corporate Training Programs – Workforce Development | Trublend EduforCareer" },
      {
        name: "description",
        content:
          "Customized corporate training solutions for workforce skill upgradation. Technology, soft skills, leadership, and onboarding programs tailored to your business needs.",
      },
      { property: "og:title", content: "Corporate Training – Trublend EduforCareer" },
      {
        property: "og:description",
        content: "Transform your workforce with industry-focused corporate training programs.",
      },
      {
        property: "og:image",
        content:
          "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  }),
  component: CorporateTrainingPage,
});

// Themed specifically to match the 4 colors of the provided Trublend EduforCareer brand
const trainingModules = [
  {
    icon: Zap,
    title: "Technology Upskilling",
    desc: "Python, Java, AI/ML, Cyber Security & Cloud computing.",
    color: "from-[#00AEEF] to-blue-600", // Logo Top-Left Blue
    bgLight: "bg-[#00AEEF]/10",
    textColor: "text-[#00AEEF]",
  },
  {
    icon: BookOpen,
    title: "Induction & Onboarding",
    desc: "Comprehensive onboarding and company orientation training.",
    color: "from-[#F26522] to-orange-600", // Logo Top-Right Orange
    bgLight: "bg-[#F26522]/10",
    textColor: "text-[#F26522]",
  },
  {
    icon: Users,
    title: "Soft Skills & Comm.",
    desc: "Communication, presentation, and interpersonal skills.",
    color: "from-[#8CC63F] to-green-600", // Logo Bottom-Left Green
    bgLight: "bg-[#8CC63F]/10",
    textColor: "text-[#8CC63F]",
  },
  {
    icon: Target,
    title: "Leadership & Team",
    desc: "Leadership development and team collaboration programs.",
    color: "from-[#00758B] to-teal-700", // Logo Bottom-Right Teal
    bgLight: "bg-[#00758B]/10",
    textColor: "text-[#00758B]",
  },
];

const outcomes = [
  "Improved employee productivity and output",
  "Enhanced skill alignment with business goals",
  "Better employee engagement and retention",
  "Measurable ROI and talent development",
];

const benefits = [
  { icon: Award, title: "Customized Solutions", desc: "Training frameworks tailored precisely to your specific business needs and goals." },
  { icon: Briefcase, title: "Industry Experts", desc: "Delivered by seasoned professionals with proven, real-world corporate expertise." },
  { icon: BarChart, title: "Measurable Results", desc: "Track employee progress and ROI with detailed pre- and post-training reports." },
  { icon: ShieldCheck, title: "Team Development", desc: "Build stronger, more capable, and cohesive teams that drive innovation." },
];

const whyChoose = [
  {
    title: "Flexible Delivery Options",
    desc: "On-site at your campus, fully remote, or hybrid training sessions tailored to your schedule.",
  },
  {
    title: "Expert Facilitators",
    desc: "Industry professionals with 10+ years of active experience in their respective domains.",
  },
  {
    title: "Interactive & Engaging",
    desc: "Hands-on sessions, real-world corporate case studies, and engaging group activities.",
  },
  {
    title: "Post-Training Support",
    desc: "Ongoing mentoring, continuous learning access, and performance tracking.",
  },
];

function CorporateTrainingPage() {
  return (
    <div className="bg-[#FAFAFC] font-['Poppins'] text-slate-800 overflow-hidden">
      {/* Premium Font & Animation Injection */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700&display=swap');
        .font-montserrat { font-family: 'Montserrat', sans-serif; }
        .font-poppins { font-family: 'Poppins', sans-serif; }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}} />

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-900">
        {/* Background Image & Overlays */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80"
            alt="Corporate Team Collaboration"
            className="w-full h-full object-cover opacity-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#00758B]/40 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 lg:px-8 flex flex-col items-center text-center w-full">
          
          <div className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl mb-8">
            <Sparkles className="h-4 w-4 text-[#00AEEF]" />
            <span className="font-montserrat text-xs font-bold tracking-[0.15em] text-white uppercase">
              Corporate Excellence Program
            </span>
          </div>

          <h1 className="animate-fade-in-up [animation-delay:100ms] opacity-0 font-montserrat text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] max-w-5xl drop-shadow-lg mb-6">
            Empower Your Workforce For <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00AEEF] via-[#8CC63F] to-[#00AEEF] bg-[length:200%_auto] animate-[pulse_4s_ease-in-out_infinite]">
              The Future of Business.
            </span>
          </h1>

          <p className="animate-fade-in-up [animation-delay:200ms] opacity-0 font-poppins text-lg md:text-2xl text-slate-300 font-light max-w-3xl leading-relaxed mb-10">
            Customized, high-impact corporate training solutions designed to upskill your team, enhance productivity, and drive measurable organizational growth.
          </p>

          <div className="animate-fade-in-up [animation-delay:300ms] opacity-0 flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
            <Link
              to="/contact"
              className="group relative overflow-hidden inline-flex items-center justify-center gap-3 rounded-xl bg-[#00758B] px-8 py-4 font-montserrat font-bold text-white transition-all duration-300 hover:bg-[#005a6b] hover:shadow-[0_0_30px_rgba(0,117,139,0.4)] active:scale-95"
            >
              <span className="relative z-10">Get a Proposal</span>
              <Rocket className="h-5 w-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-3 rounded-xl border-2 border-white/20 bg-white/5 backdrop-blur-sm px-8 py-4 font-montserrat font-bold text-white transition-all duration-300 hover:bg-white hover:text-slate-900 active:scale-95"
            >
              Schedule a Demo
            </Link>
          </div>

          <div className="animate-fade-in-up [animation-delay:400ms] opacity-0 mt-12 inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-white backdrop-blur-md">
            <CheckCircle2 className="h-5 w-5 text-[#8CC63F]" />
            <span className="font-poppins text-sm md:text-base font-medium text-slate-200">Trusted by 50+ Leading Organizations Across India</span>
          </div>
        </div>
      </section>

      {/* --- THEMED TRAINING MODULES (Brand Colors) --- */}
      <section className="py-24 lg:py-32 relative z-20 -mt-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          
          <div className="text-center mb-16">
            <span className="font-montserrat text-xs font-bold tracking-[0.2em] text-[#00758B] uppercase block mb-2">Our Services</span>
            <h2 className="font-montserrat text-3xl md:text-4xl font-extrabold text-slate-900">
              Corporate Training Includes
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {trainingModules.map((module, idx) => {
              const Icon = module.icon;
              return (
                <div
                  key={idx}
                  className="group relative flex flex-col rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-2 overflow-hidden"
                >
                  {/* Top Color Accent Line */}
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${module.color} scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100`} />
                  
                  <div className={`mb-6 inline-flex rounded-2xl ${module.bgLight} p-4 ${module.textColor} transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className="h-8 w-8" strokeWidth={1.5} />
                  </div>
                  
                  <h3 className="font-montserrat text-xl font-bold text-slate-900 mb-3">
                    {module.title}
                  </h3>
                  <p className="font-poppins text-sm text-slate-500 leading-relaxed mb-6 flex-grow">
                    {module.desc}
                  </p>

                  <Link
                    to="/contact"
                    className={`inline-flex items-center font-montserrat text-sm font-bold ${module.textColor} group/link`}
                  >
                    Learn More 
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- OUTCOMES (Split Image Layout) --- */}
      <section className="py-16 lg:py-24 bg-white border-y border-slate-100">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:gap-16 lg:grid-cols-2 items-center">
            
            {/* Image Composition */}
            <div className="relative order-2 lg:order-1">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop"
                  alt="Corporate Training Session"
                  className="w-full object-cover aspect-[4/3] hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
              </div>
              
              {/* Floating Stat Card */}
              <div className="absolute -bottom-6 -right-6 lg:-right-8 rounded-3xl bg-white p-6 shadow-[0_20px_50px_rgb(0,0,0,0.1)] border border-slate-100 max-w-[200px] animate-bounce-slow">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00AEEF]/10 text-[#00AEEF]">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <div className="font-montserrat text-3xl font-black text-slate-900">50+</div>
                </div>
                <div className="font-poppins text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Organizations Successfully Trained
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <span className="font-montserrat text-xs font-bold tracking-[0.2em] text-[#F26522] uppercase block mb-3">The Impact</span>
              <h2 className="font-montserrat text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
                Measurable Training Outcomes
              </h2>
              <p className="font-poppins text-slate-500 text-lg leading-relaxed mb-8">
                We don't just conduct sessions; we deliver transformations. Our corporate training programs are meticulously designed to deliver tangible results that positively impact your bottom line and company culture.
              </p>

              <div className="space-y-4 mb-10">
                {outcomes.map((outcome, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 transition-colors hover:border-[#8CC63F]/50 hover:bg-[#8CC63F]/5">
                    <CheckCircle2 className="h-6 w-6 text-[#8CC63F] flex-shrink-0" />
                    <span className="font-poppins text-slate-700 font-medium">{outcome}</span>
                  </div>
                ))}
              </div>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-slate-900 px-8 py-4 font-montserrat font-bold text-white transition-all hover:bg-slate-800 hover:shadow-lg active:scale-95"
              >
                Start the Transformation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- BENEFITS BENTO GRID --- */}
      <section className="py-24 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-montserrat text-xs font-bold tracking-[0.2em] text-[#00AEEF] uppercase block mb-2">The Advantage</span>
            <h2 className="font-montserrat text-3xl md:text-4xl font-extrabold text-slate-900">
              Why Partner With Trublend EduforCareer?
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={idx}
                  className="group rounded-3xl bg-white border border-slate-200 p-8 text-center transition-all duration-500 hover:shadow-xl hover:border-[#00758B]/30 hover:-translate-y-1"
                >
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 border border-slate-100 text-slate-600 transition-colors duration-300 group-hover:bg-[#00758B] group-hover:text-white">
                    <Icon className="h-8 w-8" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-montserrat text-lg font-bold text-slate-900 mb-3">
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

      {/* --- HOW IT WORKS (Z-Pattern Layout) --- */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-montserrat text-xs font-bold tracking-[0.2em] text-[#8CC63F] uppercase block mb-2">Our Methodology</span>
            <h2 className="font-montserrat text-3xl md:text-4xl font-extrabold text-slate-900">
              What Makes Our Training Different
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {whyChoose.map((item, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-8 lg:p-10 transition-all duration-300 hover:bg-white hover:shadow-lg hover:border-[#F26522]/30"
              >
                <div className="flex items-start gap-6 relative z-10">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm text-[#F26522] flex-shrink-0 group-hover:bg-[#F26522] group-hover:text-white transition-colors duration-300">
                    <span className="font-montserrat font-black text-xl">0{idx + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-montserrat text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="font-poppins text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PREMIUM CTA SECTION --- */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#00758B]" />
        {/* Abstract Background Patterns */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-white/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#00AEEF]/20 blur-3xl pointer-events-none" />
        
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center lg:px-8">
          <h2 className="font-montserrat text-4xl md:text-5xl font-extrabold text-white mb-6">
            Ready to Build a High-Performance Team?
          </h2>
          <p className="font-poppins text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Let's discuss how we can tailor our programs to help your organization achieve its unique operational and strategic goals.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-white px-8 py-4 font-montserrat font-bold text-[#00758B] shadow-xl transition-all duration-300 hover:bg-slate-50 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:-translate-y-1 active:scale-95"
            >
              Request a Custom Proposal <Rocket className="h-5 w-5" />
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-3 rounded-xl border border-white/30 bg-white/5 px-8 py-4 font-montserrat font-bold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/50 active:scale-95"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}