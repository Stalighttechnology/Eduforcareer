import React, { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import aviationImage from "../assets/av1.png";
import heroStudent from "../assets/herosection image.png";
import corporateHero from "../assets/hero-corporate.png";
import tailoringHero from "../assets/hero-tailoring.png";

const slides = [
  {
    id: "main",
    label: "LEARN. GROW. SUCCEED.",
    title: (
      <>
        Trublend EduforCareer  <span className="text-blue-500">Building Skills.</span> <br className="hidden lg:block" /> Creating Careers.
      </>
    ),
    copy:
      "We prepare individuals for the fast-growing IT and corporate workforce with industry-aligned curriculum, expert mentors, and strong placement support to jumpstart your professional journey.",
    img: corporateHero,
    cta: { text: "Get Started", to: "/contact" },
    badgeHighlight: "Job Guaranteed",
  },
  {
    id: "aviation",
    label: "SOAR HIGH.",
    title: "Aviation Training — Fly Into Your Future",
    copy:
      "Our aviation programs combine hands-on flight training, simulated scenarios, and industry partnerships to prepare aspiring pilots and aviation professionals for fast-paced careers in the skies.",
    img: aviationImage,
    cta: { text: "Explore Aviation", to: "/aviation" },
    badgeHighlight: "Start earning in just 90 days",
  },
  {
    id: "tailoring",
    label: "IMMEDIATE HIRING",
    title: "Professional Tailoring & Design",
    copy: "Accelerate your career in Bangalore's premier garment sector. Experience comprehensive corporate benefits, stable career growth, and a definitive path to leadership.",
    img: tailoringHero,
    cta: { text: "Apply Now", to: "/apply-tailoring" },
    badge: "Monthly Salary + Benefits",
    badgeHighlight: "₹16k – ₹18k",
  },
];

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setIndex((i) => (i + 1) % slides.length);

  // Auto-advance using a single timeout so it resets cleanly when `index` changes.
  // Pause when `isPaused` is true (e.g. on hover).
  useEffect(() => {
    if (isPaused) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % slides.length), 5000);
    return () => clearTimeout(t);
  }, [index, isPaused]);

  return (
    <section className="hero-gradient h-screen overflow-hidden">
      <div className="mx-auto width-full h-full">
        <div className="relative h-full overflow-hidden">
          {/* Navigation arrows */}
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={next}
            aria-label="Next slide"
            className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div
            className="flex h-full transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {slides.map((s) => {
              const isAviation = s.id === "aviation";
              const isTailoring = s.id === "tailoring";
              
              // Theme-specific styles
              let overlayClass = "absolute inset-0 bg-gradient-to-r from-white/100 via-white/90 to-transparent";
              let textColor = "text-slate-900";
              let mutedTextColor = "text-slate-700 font-medium";
              let labelColor = "text-blue-700";
              let labelBg = "bg-blue-50";
              let btnColor = "bg-blue-600";
              let badgeColor = "text-blue-700";

              if (isAviation) {
                overlayClass = "absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent";
                textColor = "text-white";
                mutedTextColor = "text-white/90";
                labelColor = "text-white";
                labelBg = "bg-white/10";
                btnColor = "bg-blue-500";
                badgeColor = "text-yellow-300";
              } else if (isTailoring) {
                overlayClass = "absolute inset-0 bg-gradient-to-r from-teal-50/100 via-teal-50/90 to-transparent";
                textColor = "text-slate-900";
                mutedTextColor = "text-slate-700 font-medium";
                labelColor = "text-teal-800";
                labelBg = "bg-teal-50";
                btnColor = "bg-teal-600";
                badgeColor = "text-teal-700";
              }

              return (
                <div key={s.id} className="min-w-full h-full">
                  <div
                    className="relative flex h-full items-center px-6 lg:px-12"
                    style={{ backgroundImage: `url(${s.img})`, backgroundSize: "cover", backgroundPosition: "center" }}
                  >
                    {/* Cinematic Overlay */}
                    <div className={overlayClass} />

                    <div className="relative z-10 max-w-4xl text-left py-0 pl-6 lg:pl-16">
                      <p className={`mb-4 inline-block rounded-full ${labelBg} px-4 py-1 text-xs font-bold uppercase tracking-widest ${labelColor} border ${isTailoring ? 'border-teal-100' : ''}`}>
                        {s.label}
                      </p>
                      
                      <h1 className={`font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] ${textColor} tracking-tight`}>
                        {s.title}
                      </h1>
                      
                      <p className={`mt-6 text-lg sm:text-xl leading-relaxed ${mutedTextColor} max-w-2xl`}>
                        {s.copy}
                      </p>

                      <div className="mt-10 flex flex-wrap gap-4">
                        <Link 
                          to={s.cta.to} 
                          className={`inline-flex items-center gap-3 rounded-full ${btnColor} px-8 py-4 text-base font-bold text-white shadow-xl transition-all hover:brightness-110 hover:-translate-y-0.5 active:translate-y-0`}
                        >
                          {isAviation ? 'Apply Now' : s.cta.text}
                        </Link>

                      </div>

                      {/* Specialized Badges */}
                      <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <div className={`inline-block rounded-full ${isAviation ? 'bg-white/10' : isTailoring ? 'bg-white shadow-sm border border-teal-100' : 'bg-slate-100'} py-2 px-4 text-sm font-semibold ${textColor}`}>
                          <strong className={badgeColor}>
                            {s.badgeHighlight}
                          </strong>
                          {" "}{s.badge}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
