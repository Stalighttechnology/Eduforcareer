import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Landmark,
  CheckCircle2,
  ArrowRight,
  GraduationCap,
} from "lucide-react";

import home2Img from "@/assets/tailoring-hero1.png";
import dduGkyImg from "@/assets/ddu-gky.jpg";
import govKarnatakaImg from "@/assets/government-of-karnataka.webp";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "DDU-GKY Skill Development Initiative | Trublend EduforCareer" },
      {
        name: "description",
        content:
          "Implementing the Deen Dayal Upadhyaya Grameen Kaushalya Yojana (DDU-GKY) in partnership with KSRLM for the Sampling Tailor job role.",
      },
      { property: "og:title", content: "DDU-GKY Program – Trublend EduforCareer" },
      {
        property: "og:description",
        content: "Empowering rural youth through industry-aligned skill development and sustainable livelihood creation.",
      },
    ],
  }),
  component: SkillsPage,
});

function SkillsPage() {
  return (
    <div className="bg-[#FAFAFC] font-['Poppins'] text-slate-800 overflow-hidden">
      {/* Premium Font & Custom Animation Injection */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700&display=swap');
        .font-montserrat { font-family: 'Montserrat', sans-serif; }
        .font-poppins { font-family: 'Poppins', sans-serif; }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        @keyframes imageZoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        .animate-image-zoom {
          animation: imageZoom 20s linear infinite alternate;
        }
      `}} />

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={home2Img}
            alt="Tailoring Training Facility"
            className="w-full h-full object-cover opacity-40 animate-image-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#00758B]/80 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 lg:px-8 flex flex-col items-start text-left w-full">
          <div className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl mb-8">
            <Landmark className="h-4 w-4 text-[#F26522]" />
            <span className="font-montserrat text-xs font-bold tracking-[0.15em] text-white uppercase">
              Government Skill Initiative
            </span>
          </div>

          <h1 className="animate-fade-in-up [animation-delay:100ms] opacity-0 font-montserrat text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] max-w-4xl drop-shadow-lg mb-6">
            Empowering Rural Youth Through <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F26522] to-amber-400">
              Skill Development.
            </span>
          </h1>

          <p className="animate-fade-in-up [animation-delay:200ms] opacity-0 font-poppins text-lg md:text-xl text-slate-300 font-light max-w-2xl leading-relaxed mb-10 border-l-4 border-[#F26522] pl-6">
            Implementing the flagship DDU-GKY initiative under the National Rural Livelihood Mission to drive income diversification and sustainable livelihood creation.
          </p>
        </div>
      </section>

      {/* --- OFFICIAL LOGOS & PARTNERS STRIP --- */}
      <div className="bg-white border-b border-slate-200 relative z-30 shadow-[0_15px_50px_rgba(0,0,0,0.06)] -mt-16 mx-4 lg:mx-auto max-w-6xl rounded-3xl">
        <div className="px-6 py-10 lg:py-12">
          <div className="flex flex-col md:flex-row items-center justify-center gap-10 lg:gap-20">
            
            {/* Ministry of Rural Development Logo */}
            <div className="flex flex-col items-center gap-4 group">
              <div className="h-20 w-auto transition-transform duration-500 group-hover:scale-105">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" 
                  alt="Government of India Emblem" 
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="text-center">
                <h4 className="font-montserrat font-extrabold text-slate-900 text-sm md:text-base uppercase tracking-wide">
                  Ministry of
                </h4>
                <p className="font-poppins text-slate-500 text-xs md:text-sm font-medium">Rural Development</p>
              </div>
            </div>
            
            <div className="w-full md:w-px h-px md:h-24 bg-slate-200" />
            
            {/* DDU-GKY Logo */}
            <div className="flex flex-col items-center gap-4 group">
              <div className="h-20 w-auto transition-transform duration-500 group-hover:scale-105">
                <img 
                  src={dduGkyImg} 
                  alt="DDU-GKY Logo" 
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="text-center">
                <h4 className="font-montserrat font-extrabold text-slate-900 text-sm md:text-base uppercase tracking-wide">
                  DDU-GKY
                </h4>
                <p className="font-poppins text-slate-500 text-xs md:text-sm font-medium">Flagship Program</p>
              </div>
            </div>

            <div className="w-full md:w-px h-px md:h-24 bg-slate-200" />
            
            {/* Karnataka State Logo */}
            <div className="flex flex-col items-center gap-4 group">
              <div className="h-20 w-auto transition-transform duration-500 group-hover:scale-105">
                <img 
                  src={govKarnatakaImg} 
                  alt="Government of Karnataka Logo" 
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="text-center">
                <h4 className="font-montserrat font-extrabold text-slate-900 text-sm md:text-base uppercase tracking-wide">
                  Karnataka State
                </h4>
                <p className="font-poppins text-slate-500 text-xs md:text-sm font-medium">Rural Livelihoods Mission</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* --- ABOUT THE INITIATIVE & WORK ORDER --- */}
      <section className="pt-32 pb-24 bg-[#FAFAFC] overflow-hidden relative">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00758B]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 lg:px-8 relative z-10">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            
            {/* Content Side */}
            <div className="order-2 lg:order-1 animate-fade-in-up">
              <span className="font-montserrat text-xs font-bold tracking-[0.2em] text-[#00758B] uppercase block mb-3">Project Mandate</span>
              <h2 className="font-montserrat text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-8">
                Deen Dayal Upadhyaya Grameen Kaushalya Yojana
              </h2>
              
              <div className="prose prose-lg text-slate-600 font-poppins leading-relaxed space-y-6">
                <p>
                  The Deen Dayal Upadhyaya Grameen Kaushalya Yojana, launched by the Ministry of Rural Development, is a flagship initiative under the National Rural Livelihood Mission aimed at enhancing the employability of rural youth from economically disadvantaged backgrounds. The program focuses on skill development, income diversification, and sustainable livelihood creation.
                </p>
                
                {/* Highlight Card */}
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-[0_10px_30px_rgba(0,0,0,0.04)] my-10 relative overflow-hidden group hover:border-[#F26522]/50 transition-colors duration-300">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[#F26522] to-amber-400" />
                  <h3 className="font-montserrat font-extrabold text-slate-900 text-xl mb-4 flex items-center gap-3">
                    <CheckCircle2 className="h-6 w-6 text-[#F26522]" />
  
                  </h3>
                  <p className="text-base text-slate-600 leading-relaxed">
                    Our organization has been entrusted with a work order from Karnataka State Rural Livelihoods Mission to implement the DDU-GKY project for the Sampling Tailor job role. The program is designed to deliver industry-aligned training, followed by On-the-Job Training (OJT) and structured placement support in compliance with DDU-GKY guidelines.
                  </p>
                </div>

                <p>
                  As a recently incorporated organization, our operational data is available from inception. This engagement reflects our capability to execute government-aligned skilling initiatives at scale, backed by robust infrastructure, effective training methodologies, and a strong placement ecosystem.
                </p>
              </div>
            </div>

            {/* Image Composition Side */}
            <div className="order-1 lg:order-2 relative animate-fade-in-up [animation-delay:200ms]">
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/5] transform transition-transform duration-700 hover:scale-[1.02] border-8 border-white">
                <img
                  src={home2Img}
                  alt="Tailoring Training Facility"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#00758B]/40 to-transparent mix-blend-multiply" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-24 relative overflow-hidden bg-[#00758B] text-center">
        {/* Abstract Backgrounds */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00AEEF]/20 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 mx-auto max-w-4xl px-4 lg:px-8 animate-fade-in-up">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/10 backdrop-blur-md mb-8">
            <GraduationCap className="h-10 w-10 text-white" strokeWidth={1.5} />
          </div>
          
          <h2 className="font-montserrat text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
            Building the Foundation for Rural Excellence.
          </h2>
          <p className="font-poppins text-lg text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            Reach out to our administrative team to learn more about our DDU-GKY implementation, infrastructure details, and partnership opportunities.
          </p>
          
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-3 rounded-2xl bg-white px-10 py-5 font-montserrat font-bold text-[#00758B] transition-all duration-300 hover:bg-slate-50 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:-translate-y-1 active:scale-95"
          >
            Contact Administration <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}