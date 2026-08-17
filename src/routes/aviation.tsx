import React, { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Plane,
  GraduationCap,
  DollarSign,
  Rocket,
  CheckCircle2,
  Briefcase,
  Users,
  Shield,
  Wrench,
  Coffee,
  Headphones,
  MapPin,
  Phone,
  Sparkles,
  Award,
  Clock,
  TrendingUp,
  AlertCircle,
  Mail
} from "lucide-react";

// Import logo images
import downloadImg from "@/assets/download.jpg";
import download2 from "@/assets/download-2.png";
import download3 from "@/assets/download-3.png";
import download4 from "@/assets/download-4.png";
import download5 from "@/assets/download-5.png";
import download6 from "@/assets/download-6.png";
import aviationLandImg from "@/assets/aviationland.png";
import { submitApplication } from "@/lib/applicationService";
import { toast } from "sonner";

export const Route = createFileRoute("/aviation")({
  head: () => ({
    meta: [
      { title: "Airport Career Program | Premium Aviation Training | Trublend EduforCareer" },
      {
        name: "description",
        content: "1 Month Premium Aviation Training with Guaranteed Airport Job Placement. Earn while you study your degree. Start earning in 90 days.",
      },
    ],
  }),
  component: AviationPage,
});

// UPDATED: Colors are now static (removed hover prefixes)
const benefits = [
  { 
    icon: Plane, 
    title: "Guaranteed Airport Job", 
    desc: "Direct, assured placement support across major Indian airports.",
    colors: {
      borderColor: "border-sky-300",
      shadowColor: "hover:shadow-sky-500/15",
      glow: "from-sky-300/40",
      iconBg: "bg-sky-50",
      iconBorder: "border-sky-200",
      iconText: "text-sky-600",
      titleColor: "text-sky-700",
      bottomLine: "from-sky-400 to-sky-600"
    }
  },
  { 
    icon: DollarSign, 
    title: "Salary from Day One", 
    desc: "Start earning a professional salary the moment you join.",
    colors: {
      borderColor: "border-orange-300",
      shadowColor: "hover:shadow-orange-500/15",
      glow: "from-orange-300/40",
      iconBg: "bg-orange-50",
      iconBorder: "border-orange-200",
      iconText: "text-orange-600",
      titleColor: "text-orange-700",
      bottomLine: "from-orange-400 to-orange-600"
    }
  },
  { 
    icon: GraduationCap, 
    title: "Dual Work-Study Model", 
    desc: "Build your career and complete your qualifications simultaneously.",
    colors: {
      borderColor: "border-lime-300",
      shadowColor: "hover:shadow-lime-500/15",
      glow: "from-lime-300/40",
      iconBg: "bg-lime-50",
      iconBorder: "border-lime-200",
      iconText: "text-lime-600",
      titleColor: "text-lime-700",
      bottomLine: "from-lime-400 to-lime-600"
    }
  },
  { 
    icon: Clock, 
    title: "Job-Ready in 90 Days", 
    desc: "Elite, fast-track program designed for rapid career entry.",
    colors: {
      borderColor: "border-teal-300",
      shadowColor: "hover:shadow-teal-500/15",
      glow: "from-teal-300/40",
      iconBg: "bg-teal-50",
      iconBorder: "border-teal-200",
      iconText: "text-teal-600",
      titleColor: "text-teal-700",
      bottomLine: "from-teal-400 to-teal-600"
    }
  },
];

const whiteCollar = [
  { icon: Briefcase, title: "Airport Operations Management" },
  { icon: Users, title: "Cabin Crew & Fleet Management" },
  { icon: Coffee, title: "Luxury Hospitality Services" },
];

const blueCollar = [
  { icon: Wrench, title: "Ground Support & Ramp Operations" },
  { icon: Shield, title: "Aviation Security & Catering" },
  { icon: Headphones, title: "Terminal Maintenance & Support" },
];

const partnerLogos = [
  { name: "IndiGo", src: downloadImg },
  { name: "SATS", src: download2 },
  { name: "Menzies Aviation", src: download3 },
  { name: "BIRD Group", src: download4 },
  { name: "KIA Bengaluru", src: download5 },
  { name: "GlobeGround", src: download6 },
];

const whyUs = [
  { icon: Award, title: "Industry-Validated Curriculum", desc: "Designed in collaboration with elite aviation experts." },
  { icon: Clock, title: "Rapid Career Entry", desc: "Transition from student to professional in exactly 90 days." },
  { icon: GraduationCap, title: "Earn While You Learn", desc: "Secure a steady income while pursuing your higher education." },
  { icon: TrendingUp, title: "Premium Placement Network", desc: "Exclusive tie-ups with top-tier airport service providers." },
  { icon: Sparkles, title: "Exclusive Batch Sizes", desc: "Limited seats to guarantee personalized, high-impact mentoring." },
];

function AviationPage() {
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    dob: "",
    qualification: "",
    customQualification: "", // State for the "Other" input
    location: "",
    address: "",
  });

  // Validation Errors State
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error for the field being typed in
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    // If qualification changes, clear the custom qualification error just in case
    if (name === "qualification" && errors.customQualification) {
      setErrors((prev) => ({ ...prev, customQualification: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.contact.trim()) {
      newErrors.contact = "Contact number is required";
    } else if (!/^\d{10}$/.test(formData.contact.replace(/\s+/g, ""))) {
      newErrors.contact = "Must be a 10-digit number";
    }
    if (!formData.dob) newErrors.dob = "Date of Birth is required";
    if (!formData.qualification) newErrors.qualification = "Qualification is required";
    
    // Specific validation for the "Other" option
    if (formData.qualification === "Other" && !formData.customQualification.trim()) {
      newErrors.customQualification = "Please specify your qualification";
    }

    if (!formData.location) newErrors.location = "Location preference is required";
    if (!formData.address.trim()) newErrors.address = "Residence address is required";

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);

      await submitApplication(formData);

      toast.success("Submitted successfully 🚀");

      setFormData({
        name: "",
        email: "",
        contact: "",
        dob: "",
        qualification: "",
        customQualification: "",
        location: "",
        address: "",
      });

    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#FAFAFC] font-['Poppins'] text-slate-800 overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700&display=swap');
        .font-montserrat { font-family: 'Montserrat', sans-serif; }
        .font-poppins { font-family: 'Poppins', sans-serif; }
        
        @keyframes shimmer { 100% { transform: translateX(100%); } }

        @keyframes slowZoom { 0% { transform: scale(1); } 50% { transform: scale(1.06); } 100% { transform: scale(1); } }
        
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite; 
        }
      `}} />

      {/* --- CINEMATIC HERO SECTION --- */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0">
          <img
            src={aviationLandImg}
            alt="Aviation Background"
            className="w-full h-full object-cover opacity-70 animate-[slowZoom_40s_ease-in-out_infinite_alternate]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/65 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 lg:px-8 text-center sm:text-left flex flex-col items-center sm:items-start w-full">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl mb-8 transition-transform hover:scale-105">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            <span className="font-montserrat text-xs font-bold tracking-[0.2em] text-white uppercase">
              2026 Admissions Open
            </span>
          </div>

          <h1 className="font-montserrat text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] max-w-4xl drop-shadow-lg mb-6">
            Launch Your Career <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-500">
              At The Airport.
            </span>
          </h1>

          <p className="font-poppins text-lg md:text-2xl text-slate-200 font-light max-w-2xl leading-relaxed mb-10 border-l-4 border-orange-500 pl-4">
            1 Month Elite Training • Guaranteed Placement • Earn While You Complete Your Degree.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
            <a
              href="#apply"
              className="group relative overflow-hidden inline-flex items-center justify-center gap-3 rounded-xl bg-orange-500 px-8 py-4 font-montserrat font-bold text-white transition-all duration-300 hover:bg-orange-600 hover:shadow-[0_0_30px_rgba(249,115,22,0.4)] active:scale-95"
            >
              <span className="relative z-10">Start Your Journey</span>

              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
            </a>

            <div className="inline-flex items-center justify-center gap-3 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm px-8 py-4 text-white">
              <Clock className="h-5 w-5 text-orange-400" />
              <span className="font-poppins font-medium">Earn in just 90 Days</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- PREMIUM STATIC BENEFITS SECTION (4 CARDS) --- */}
      <section className="py-24 lg:py-32 relative z-20 -mt-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-16">
            <span className="font-montserrat text-xs font-bold tracking-[0.2em] text-orange-500 uppercase block mb-2">Program Value</span>
            <h2 className="font-montserrat text-3xl md:text-4xl font-extrabold text-slate-900">
              Why Choose Trublend EduforCareer Aviation?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {benefits.map((b) => (
              <div
                key={b.title}
                // Border color is static, hover keeps the shadow and subtle translation
                className={`group relative bg-white rounded-[2rem] p-8 lg:p-10 border transition-all duration-500 ${b.colors.borderColor} hover:shadow-2xl ${b.colors.shadowColor} hover:-translate-y-1 overflow-hidden z-10 flex flex-col h-full`}
              >
                {/* Static Ambient Glow */}
                <div className={`absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br ${b.colors.glow} to-transparent rounded-full blur-[40px] opacity-100 pointer-events-none -z-10`} />
                
                <div className="flex flex-col h-full">
                  {/* Premium Static Icon Container (Keeps hover scale) */}
                  <div className={`mb-8 inline-flex items-center justify-center w-16 h-16 rounded-[1.25rem] border shadow-sm ${b.colors.iconBg} ${b.colors.iconBorder} group-hover:scale-110 transition-transform duration-500`}>
                    <b.icon className={`w-7 h-7 ${b.colors.iconText} stroke-[1.5]`} />
                  </div>

                  <h3 className={`font-montserrat text-xl font-bold mb-4 ${b.colors.titleColor}`}>
                    {b.title}
                  </h3>
                  
                  <p className="font-poppins text-slate-500 leading-relaxed text-sm">
                    {b.desc}
                  </p>
                </div>

                {/* Static Colored Bottom Line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r ${b.colors.bottomLine}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SPLIT LAYOUT: CAREER ROLES --- */}
      <section className="py-16 lg:py-24 bg-slate-50 border-y border-slate-200/50">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-montserrat text-xs font-bold tracking-[0.2em] text-orange-500 uppercase block mb-3">Career Trajectories</span>
            <h2 className="font-montserrat text-4xl font-extrabold text-slate-900">Choose Your Aviation Path</h2>
            <p className="font-poppins text-slate-500 mt-4">
              Multiple career options tailored to your skills and aspirations
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="group relative overflow-hidden rounded-3xl bg-white border border-slate-200 p-10 lg:p-14 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-bl-full opacity-50 -z-10 transition-transform duration-700 group-hover:scale-110" />
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-800 font-montserrat font-bold text-xs uppercase tracking-wide mb-6 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                <Briefcase className="h-4 w-4" /> White-Collar Roles
              </div>
              <p className="font-poppins font-semibold text-slate-400 text-sm mb-8">Age Requirement: &lt; 26 Years</p>
              <ul className="space-y-4">
                {whiteCollar.map((r) => (
                  <li key={r.title} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-transparent transition-all hover:border-orange-200 hover:bg-orange-50 hover:scale-[1.02] group/item">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm text-slate-400 group-hover/item:text-orange-500 transition-colors duration-300">
                      <r.icon className="h-5 w-5" />
                    </div>
                    <span className="font-poppins font-semibold text-slate-700">{r.title}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="group relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 p-10 lg:p-14 shadow-sm hover:shadow-xl hover:shadow-slate-900/20 transition-all duration-300">
              <div className="absolute top-0 right-0 w-64 h-64 bg-slate-800 rounded-bl-full opacity-50 -z-10 transition-transform duration-700 group-hover:scale-110" />
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 border border-slate-700 text-orange-400 font-montserrat font-bold text-xs uppercase tracking-wide mb-6 group-hover:bg-orange-500/20 group-hover:border-orange-500/50 transition-all duration-300">
                <Wrench className="h-4 w-4" /> Blue-Collar Roles
              </div>
              <p className="font-poppins font-semibold text-slate-400 text-sm mb-8">Age Requirement: &lt; 28 Years</p>
              <ul className="space-y-4">
                {blueCollar.map((r) => (
                  <li key={r.title} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/50 border border-transparent transition-all hover:border-slate-700 hover:bg-slate-800 hover:scale-[1.02] group/item">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 shadow-inner text-slate-400 group-hover/item:text-orange-400 transition-colors duration-300">
                      <r.icon className="h-5 w-5" />
                    </div>
                    <span className="font-poppins font-semibold text-slate-200">{r.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- ENHANCED PARTNER LOGO MARQUEE --- */}
      <section className="py-24 bg-white relative flex flex-col items-center justify-center overflow-hidden">
        <div className="text-center mb-16 relative z-20">
          <span className="font-montserrat text-xs font-bold tracking-[0.2em] text-orange-500 uppercase block mb-2">
            Partner Network
          </span>
          <h2 className="font-montserrat text-3xl md:text-4xl font-extrabold text-slate-900">
            Hiring Across Major Industry Partners
          </h2>
        </div>

        <div className="absolute left-0 top-0 z-20 h-full w-20 md:w-40 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 z-20 h-full w-20 md:w-40 bg-gradient-to-l from-white to-transparent pointer-events-none" />

        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] py-4">
          {[...partnerLogos, ...partnerLogos].map((logo, i) => (
            <div 
              key={i} 
              className="flex items-center justify-center w-56 sm:w-64 flex-shrink-0 px-4 group cursor-default"
            >
              <div className="relative flex items-center justify-center w-full h-28 rounded-2xl bg-white border border-slate-100 shadow-[0_4px_15px_rgb(0,0,0,0.03)] transition-all duration-300 hover:shadow-[0_12px_25px_rgb(0,0,0,0.08)] hover:-translate-y-1 hover:border-orange-200 px-8 py-6">
                <img 
                  src={logo.src} 
                  alt={logo.name} 
                  className="max-h-14 w-full object-contain relative z-10 transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center relative z-20">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-50 border border-slate-200">
            <CheckCircle2 className="h-5 w-5 text-orange-500" />
            <p className="font-poppins font-semibold text-slate-700 text-sm">
              100% Placement Support with Premium Network
            </p>
          </div>
        </div>
      </section>

      {/* --- COMBINED FORM & CONTACT SECTION --- */}
      <section id="apply" className="py-16 pb-32">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          
          <div className="text-center mb-16">
            <span className="font-montserrat text-xs font-bold tracking-[0.2em] text-orange-500 uppercase block mb-2">Get Connected</span>
            <h2 className="font-montserrat text-3xl md:text-4xl font-extrabold text-slate-900">
              Start Your Journey Today
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            
            {/* LEFT COLUMN: APPLICATION FORM */}
            <div className="lg:col-span-2 bg-white rounded-3xl p-8 lg:p-12 border border-slate-200 shadow-xl shadow-slate-200/50">
              <div className="mb-8">
                <h3 className="font-montserrat text-2xl font-bold text-slate-900 mb-2">Apply today and secure your future in aviation!</h3>
                <p className="font-poppins text-slate-500 text-sm">Fill out the form below and our admissions team will get back to you shortly.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className={`w-full bg-slate-50 border ${errors.name ? 'border-red-400' : 'border-slate-200'} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm font-poppins`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3"/>{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@example.com"
                      className={`w-full bg-slate-50 border ${errors.email ? 'border-red-400' : 'border-slate-200'} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm font-poppins`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3"/>{errors.email}</p>}
                  </div>

                  {/* Contact */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Contact Number *</label>
                    <input
                      type="tel"
                      name="contact"
                      value={formData.contact}
                      onChange={handleInputChange}
                      placeholder="10-digit mobile number"
                      className={`w-full bg-slate-50 border ${errors.contact ? 'border-red-400' : 'border-slate-200'} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm font-poppins`}
                    />
                    {errors.contact && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3"/>{errors.contact}</p>}
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Date of Birth *</label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleInputChange}
                      className={`w-full bg-slate-50 border ${errors.dob ? 'border-red-400' : 'border-slate-200'} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm font-poppins text-slate-700`}
                    />
                    {errors.dob && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3"/>{errors.dob}</p>}
                  </div>

                  {/* Qualification Dropdown + Conditional Input */}
                  <div className="flex flex-col gap-3">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Qualification *</label>
                      <div className="relative">
                        <select
                          name="qualification"
                          value={formData.qualification}
                          onChange={handleInputChange}
                          className={`w-full appearance-none bg-slate-50 border ${errors.qualification ? 'border-red-400' : 'border-slate-200'} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm font-poppins text-slate-700`}
                        >
                          <option value="" disabled>Select highest qualification</option>
                          <option value="PU">PUC / 12th</option>
                          <option value="Diploma">Diploma</option>
                          <option value="Pursuing Degree">Pursuing Degree</option>
                          <option value="BE/B.Tech">BE / B.Tech</option>
                          <option value="BCA">BCA</option>
                          <option value="BSC">B.Sc</option>
                          <option value="B.Com">B.Com</option>
                          <option value="BBA">BBA</option>
                          <option value="BA">BA</option>
                          <option value="MCA">MCA</option>
                          <option value="M.Com">M.Com</option>
                          <option value="MBA">MBA</option>
                          <option value="MSc">M.Sc</option>
                          <option value="MA">MA</option>
                          <option value="MTech">M.Tech</option>
                          <option value="Other">Other</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                          <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                      </div>
                      {errors.qualification && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3"/>{errors.qualification}</p>}
                    </div>
                    
                    {/* Conditional 'Other' Text Input */}
                    {formData.qualification === "Other" && (
                      <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                        <input
                          type="text"
                          name="customQualification"
                          value={formData.customQualification}
                          onChange={handleInputChange}
                          placeholder="Please specify your qualification"
                          className={`w-full bg-slate-50 border ${errors.customQualification ? 'border-red-400' : 'border-slate-200'} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm font-poppins`}
                        />
                        {errors.customQualification && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3"/>{errors.customQualification}</p>}
                      </div>
                    )}
                  </div>

                  {/* Preferred Work Location */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Preferred Work Location *</label>
                    <div className="relative">
                      <select
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className={`w-full appearance-none bg-slate-50 border ${errors.location ? 'border-red-400' : 'border-slate-200'} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm font-poppins text-slate-700`}
                      >
                        <option value="" disabled>Select a location</option>
                        <option value="Bengaluru">Bengaluru</option>
                        <option value="Outside Bengaluru">Outside Bengaluru</option>
                        <option value="Outside Karnataka">Outside Karnataka</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                        <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                      </div>
                    </div>
                    {errors.location && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3"/>{errors.location}</p>}
                  </div>
                </div>

                {/* Residence Address */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Residence Address *</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Enter your full residential address"
                    className={`w-full bg-slate-50 border ${errors.address ? 'border-red-400' : 'border-slate-200'} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm font-poppins resize-none`}
                  />
                  {errors.address && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3"/>{errors.address}</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full group relative overflow-hidden inline-flex items-center justify-center gap-3 rounded-xl px-8 py-4 font-montserrat font-bold text-white transition-all duration-300 mt-4
                    ${loading 
                      ? "bg-orange-400 cursor-not-allowed opacity-70" 
                      : "bg-orange-500 hover:bg-orange-600 hover:shadow-[0_0_20px_rgba(249,115,22,0.3)] active:scale-95"
                    }`}
                >
                  <span className="relative z-10">
                    {loading ? "Submitting..." : "Submit Application"}
                  </span>

                  {!loading && (
                    <Rocket className="h-5 w-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  )}

                  {!loading && (
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
                  )}
                </button>
              </form>
            </div>

            {/* RIGHT COLUMN: SMALL COMPACT CONTACT CARDS */}
            <div className="lg:col-span-1 flex flex-col gap-6">
              
              {/* Campus Card */}
              <div className="group relative overflow-hidden bg-slate-900 rounded-3xl p-6 lg:p-8 text-white transition-all duration-300 hover:shadow-xl hover:shadow-slate-900/20">
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-800 rounded-bl-full opacity-50 -z-10 transition-transform duration-700 group-hover:scale-110" />
                <MapPin className="h-6 w-6 text-orange-500 mb-4 transition-transform duration-300 group-hover:scale-110" />
                <h3 className="font-montserrat text-xl font-bold mb-4">Visit Our Campus</h3>
                <address className="font-poppins not-italic text-slate-400 leading-relaxed text-sm">
                  No. 130, 2nd Floor<br />
                  Dr. Rajkumar Road, 1st Block<br />
                  Rajajinagar, Bengaluru – 560010
                </address>
              </div>

              {/* Get in Touch Card */}
              <div className="group relative overflow-hidden bg-white rounded-3xl p-6 lg:p-8 border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-orange-200">
                <Phone className="h-6 w-6 text-orange-500 mb-4 transition-transform duration-300 group-hover:scale-110" />
                <h3 className="font-montserrat text-xl font-bold text-slate-900 mb-6">Get in Touch</h3>
                
                <div className="space-y-4">
                  {/* Phone */}
                  <a href="tel:7760826949" className="flex items-center gap-3 group/link p-3 rounded-xl transition-all hover:bg-orange-50 border border-transparent hover:border-orange-100">
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 group-hover/link:bg-white group-hover/link:border-orange-200 transition-colors flex items-center justify-center">
                      <Phone className="h-4 w-4 text-slate-400 group-hover/link:text-orange-500 transition-colors" />
                    </div>
                    <div>
                      <p className="font-poppins text-[10px] text-slate-400 uppercase font-bold tracking-wide">Admissions</p>
                      <span className="font-montserrat font-bold text-slate-900 text-sm md:text-base group-hover/link:text-orange-600 transition-colors">+91 77608 26949</span>
                    </div>
                  </a>
                  
                  {/* Email */}
                  <a href="mailto:info@eduforcareer.com" className="flex items-center gap-3 group/link p-3 rounded-xl transition-all hover:bg-orange-50 border border-transparent hover:border-orange-100">
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 group-hover/link:bg-white group-hover/link:border-orange-200 transition-colors flex items-center justify-center">
                      <Mail className="h-4 w-4 text-slate-400 group-hover/link:text-orange-500 transition-colors" />
                    </div>
                    <div>
                      <p className="font-poppins text-[10px] text-slate-400 uppercase font-bold tracking-wide">Email Us</p>
                      <span className="font-montserrat font-bold text-slate-900 text-sm md:text-base group-hover/link:text-orange-600 transition-colors">info@eduforcareer.com</span>
                    </div>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}