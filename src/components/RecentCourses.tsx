import React, { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { 
  Check, ArrowRight, Plane, Code, Shield, 
  BrainCircuit, Coffee, Scissors, Sparkles 
} from "lucide-react";

// Assets
import av4 from "../assets/av4.png";
import av3 from "../assets/av3_optimized.jpg";
import tailoringImg from "../assets/tailoring.jpg"; // Added tailoring image import

// --- Native Scroll Animation Component ---
// This handles the smooth fade-up effect as you scroll down the page
const FadeInOnScroll = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.unobserve(domRef.current);
        }
      },
      { threshold: 0.15, rootMargin: "50px" } // Triggers slightly before element comes into view
    );

    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-500 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const courses = [
  {
    type: "hero",
    image: av3,
    title: "Aviation & Airport Management",
    icon: <Plane className="w-6 h-6 text-teal-600" />,
    desc: "Launch your career at world-class hubs like KIA Bangalore. Get trained in premium passenger handling and modern airport logistics.",
    bullets: [
      "Airport Ground Staff & T2 Operations",
      "International Flight Handling & Safety",
      "Luxury Customer Service Excellence",
      "Advanced Soft Skills & Grooming",
    ],
    career: "Ground Staff, Cabin Crew, VIP Services.",
    link: "/aviation",
    badge: "Most Popular",
  },
  {
    type: "hero",
    image: tailoringImg, // Updated to use the local asset
    title: "Professional Tailoring & Design",
    icon: <Scissors className="w-6 h-6 text-orange-600" />,
    desc: "Immediate hiring program for skilled roles in Bangalore's garment sector. Includes full corporate benefits and stable growth.",
    bullets: [
      "Locations: Ramnagara & Kengeri",
      "Salary: ₹16,000 – ₹18,000 + Benefits",
      "Age Group: 18 to 35 Years",
      "Eligibility: 10th, PUC, or Any Degree",
    ],
    career: "Tailoring Specialist, Floor Lead.",
    link: "/apply-tailoring",
    badge: "Immediate Hiring",
  },
  {
    id: "python",
    type: "standard",
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2031&auto=format&fit=crop",
    title: "Python Full Stack",
    icon: <Code className="w-5 h-5 text-slate-700" />,
    desc: "Master front-end to back-end deployment with modern frameworks.",
    bullets: ["Python & Django", "React & Modern UI", "Cloud Deployment"],
    career: "Full Stack Developer",
  },
  {
    id: "java",
    type: "standard",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop",
    title: "Java Enterprise",
    icon: <Coffee className="w-5 h-5 text-slate-700" />,
    desc: "Build robust, scalable enterprise applications with Java frameworks.",
    bullets: ["Spring Boot & Hibernate", "Microservices", "API Security"],
    career: "Backend Engineer",
  },
];

export default function RecentCourses() {
  const heroImages = [av4, av3];
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setHeroIndex((i) => (i + 1) % heroImages.length);
    }, 4500); // Slightly slower rotation for a more elegant feel
    return () => clearInterval(t);
  }, [heroImages.length]);

  return (
    <section id="opportunity-hub" className="bg-[#FAFAFC] py-24 lg:py-32 overflow-hidden font-sans">
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <FadeInOnScroll delay={0}>
          <div className="mb-20 text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="h-[2px] w-10 bg-teal-500 rounded-full"></span>
              <span className="text-xs font-bold tracking-[0.3em] text-teal-600 uppercase">
                Opportunity Hub
              </span>
              <span className="h-[2px] w-10 bg-teal-500 rounded-full"></span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-6">
              Bridge the Gap to <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-emerald-500 to-cyan-500">
                Future Readiness
              </span>
            </h2>
            <p className="text-slate-500 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
              Industry-validated certifications and high-impact placement programs designed for modern professionals.
            </p>
          </div>
        </FadeInOnScroll>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 xl:gap-10">
          
          {courses.map((course, index) => {
            if (course.type === "hero") {
              return (
                <FadeInOnScroll 
                  key={course.title} 
                  delay={index * 150} 
                  className="md:col-span-2 lg:col-span-4"
                >
                  <div className="group relative flex flex-col lg:flex-row bg-white rounded-[2rem] border border-slate-200/70 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 overflow-hidden">
                    {/* Hero Image Section */}
                    <div className="relative w-full lg:w-[50%] xl:w-[55%] h-80 sm:h-96 lg:h-auto overflow-hidden">
                      <img
                        src={index === 0 ? heroImages[heroIndex] : course.image}
                        alt={course.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent lg:bg-gradient-to-r lg:from-slate-900/50 lg:via-transparent" />
                      
                      <div className="absolute top-6 left-6 z-10">
                        <span className="bg-white/95 backdrop-blur-md text-slate-900 px-4 py-2 rounded-full text-xs font-bold shadow-lg uppercase tracking-wider flex items-center gap-2 border border-white/20">
                          <Sparkles className="w-3.5 h-3.5 text-teal-500" />
                          {course.badge}
                        </span>
                      </div>
                    </div>

                    {/* Hero Content Section */}
                    <div className="flex flex-col justify-center w-full lg:w-[50%] xl:w-[45%] p-8 sm:p-12 lg:p-14 bg-white z-10 relative">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="p-3.5 bg-teal-50/80 text-teal-600 rounded-2xl shadow-sm border border-teal-100">
                          {course.icon}
                        </div>
                        <h3 className="text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight">
                          {course.title}
                        </h3>
                      </div>

                      <p className="text-slate-500 text-lg leading-relaxed mb-8 font-light italic border-l-4 border-teal-100 pl-4">
                        "{course.desc}"
                      </p>

                      <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4 mb-10">
                        {course.bullets.map((bullet, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <div className="mt-0.5 bg-teal-50 p-1 rounded-full shrink-0">
                              <Check className="w-3.5 h-3.5 text-teal-600" strokeWidth={3} />
                            </div>
                            <span className="text-[15px] text-slate-700 font-medium leading-snug">{bullet}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-8 border-t border-slate-100 mt-auto">
                        <div className="flex-1">
                          <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-slate-400 mb-1.5">Career Goal</p>
                          <p className="text-sm font-bold text-slate-800">{course.career}</p>
                        </div>
                        <Link
                          to={course.link}
                          className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 text-white font-bold text-sm transition-all duration-300 hover:bg-teal-600 hover:shadow-[0_10px_20px_rgba(13,148,136,0.2)] flex items-center justify-center gap-3 hover:-translate-y-1 active:scale-95 group/btn"
                        >
                          Enroll Now
                          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </FadeInOnScroll>
              );
            }

            // Standard Tech Cards
            return (
              <FadeInOnScroll key={course.title} delay={index * 100}>
                <Link
                  to="/it-details"
                  hash={course.id}
                  className="group flex flex-col bg-white rounded-[2rem] border border-slate-200/60 p-5 transition-all duration-500 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:border-teal-500/30 hover:-translate-y-2 h-full cursor-pointer"
                >
                  <div className="relative aspect-[4/3] rounded-[1.5rem] overflow-hidden mb-6 shadow-sm">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500" />
                    <div className="absolute top-4 left-4 p-2.5 bg-white/95 backdrop-blur-md rounded-xl shadow-sm border border-slate-100/50">
                      {course.icon}
                    </div>
                  </div>

                  <div className="px-2 flex flex-col flex-1">
                    <h3 className="text-xl font-extrabold text-slate-900 mb-3 group-hover:text-teal-600 transition-colors duration-300">
                      {course.title}
                    </h3>
                    <p className="text-slate-500 text-[15px] leading-relaxed mb-6 font-light">
                      {course.desc}
                    </p>

                    <div className="space-y-3.5 mb-8">
                      {course.bullets.map((bullet, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-teal-500/60 mt-2 shrink-0" />
                          <span className="text-[14px] text-slate-600 font-medium leading-tight">{bullet}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-auto pt-5 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <p className="text-[11px] uppercase tracking-wider font-bold text-slate-400">Target Role</p>
                        <p className="text-sm font-bold text-slate-800 mt-1">{course.career}</p>
                      </div>
                      <div className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 group/link">
                        Explore
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeInOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}