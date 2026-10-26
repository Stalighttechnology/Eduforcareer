import { useNavigate } from "@tanstack/react-router";
import { Plane, MonitorPlay, Briefcase, Award, ArrowRight, Scissors } from "lucide-react";

// Web-optimized assets for instant loading & 60/120fps scrolling
import aviationBg from "../assets/aviationlogo.jpg";
import itTrainingBg from "../assets/it_training_optimized.jpg";
import corporateTrainingBg from "../assets/corporate_training_optimized.jpg";
import skillsBg from "../assets/skill india.png";
import tailoringBg from "../assets/tailoring.jpg";

const categories = [
  {
    name: "Aviation",
    icon: Plane,
    background: aviationBg,
    path: "/aviation",
    bgSize: "95%",
  },
  {
    name: "Tailoring",
    icon: Scissors,
    background: tailoringBg,
    path: "/apply-tailoring",
  },
  {
    name: "IT Training",
    icon: MonitorPlay,
    background: itTrainingBg,
    path: "/it-training",
  },
  {
    name: "Corporate Training",
    icon: Briefcase,
    background: corporateTrainingBg,
    path: "/corporate-training",
  },
  {
    name: "Skills",
    icon: Award,
    background: skillsBg,
    path: "/skills",
    bgSize: "70%",
  },
];

export default function CoursesOffered() {
  const navigate = useNavigate();

  const handleCardClick = (path: string) => {
    navigate({ to: path });
  };

  return (
    <section className="bg-[#FAFAFC] py-20 lg:py-28 font-sans overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="h-px w-10 bg-orange-500/50" />
            <span className="text-xs font-bold tracking-[0.2em] text-orange-500 uppercase">
              Popular Categories
            </span>
            <span className="h-px w-10 bg-orange-500/50" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Courses Offered
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Choose from industry-focused programs designed to help you learn faster, grow smarter, and secure your future.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((c) => (
            <div
              key={c.name}
              onClick={() => handleCardClick(c.path)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleCardClick(c.path);
                }
              }}
              style={{
                transform: "translate3d(0, 0, 0)",
                backfaceVisibility: "hidden",
              }}
              className="group relative cursor-pointer overflow-hidden rounded-2xl min-h-[340px] shadow-sm transition-transform transition-shadow duration-300 ease-out hover:shadow-xl hover:-translate-y-1.5 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {/* Background Image with GPU-accelerated Zoom */}
              <div
                className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-105"
                style={{
                  backgroundImage: `url('${c.background}')`,
                  backgroundSize: c.bgSize || "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundColor: c.bgSize ? "#ffffff" : "#0f172a",
                  transform: "translate3d(0, 0, 0)",
                  backfaceVisibility: "hidden",
                  willChange: "transform",
                }}
              />
              
              {/* Gradient Overlay for Legibility */}
              <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-slate-900/50 to-slate-950/95 transition-opacity duration-300 group-hover:opacity-90" />
              
              {/* Card Content */}
              <div className="relative z-10 flex h-full flex-col p-6 sm:p-7 justify-between">
                
                {/* Top Icon Pill */}
                <div 
                  style={{ transform: "translate3d(0, 0, 0)" }}
                  className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm border border-white/25 text-white shadow-md transition-colors duration-300 group-hover:bg-orange-500 group-hover:border-orange-400"
                >
                  <c.icon strokeWidth={1.75} className="h-7 w-7 text-white" />
                </div>
                
                {/* Bottom Title & Action */}
                <div className="pt-12">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-tight drop-shadow-sm">
                    {c.name}
                  </h3>
                  
                  {/* Action Link */}
                  <div className="flex items-center text-orange-400 font-semibold text-xs sm:text-sm tracking-wide">
                    Explore Program 
                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </div>
                </div>
                
              </div>
              
              {/* Accent Bottom Border */}
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-orange-500 transition-all duration-300 ease-out group-hover:w-full z-20" />
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}