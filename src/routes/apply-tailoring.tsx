import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { 
  CheckCircle2, MapPin, ShieldCheck, Home, 
  UserCheck, User, Mail, Phone, Calendar, BookOpen, Send, ChevronRight, Bus, HeartPulse,
  AlertCircle
} from "lucide-react";
// CRITICAL: Ensure your actual file is renamed to "tailoring-video.mp4" (no spaces)
import tailoringVideo from "@/assets/tailoring video.mp4";
import { submitTailoringApplication } from "@/lib/applicationService";
import { toast } from "sonner";
import shahiImg from "@/assets/shahi.png";


export const Route = createFileRoute("/apply-tailoring")({
  head: () => ({
    meta: [
      { title: "Apply Tailoring Program | Trublend EduforCareer" },
      {
        name: "description",
        content:
          "Immediate hiring program for skilled tailoring roles in Bangalore with corporate benefits, training, and placement support.",
      },
    ],
  }),
  component: TailoringApplyPage,
});

const partnerLogos = [
  { name: "Shahi Exports", src: shahiImg },
];

function TailoringApplyPage() {
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    dob: "",
    qualification: "",
    customQualification: "",
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
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.contact.trim()) {
      newErrors.contact = "Contact number is required";
    } else if (!/^\d{10}$/.test(formData.contact.replace(/\s+/g, ""))) {
      newErrors.contact = "Must be a 10-digit number";
    }
    if (!formData.dob) newErrors.dob = "Date of Birth is required";
    if (!formData.qualification) newErrors.qualification = "Qualification is required";
    
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
      toast.error("Please fix the errors in the form");
      return;
    }

    try {
      setLoading(true);
      await submitTailoringApplication(formData);
      toast.success("Application submitted successfully! 🚀");

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
      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 selection:bg-teal-500 selection:text-white overflow-x-hidden relative">
      
      {/* --- CUSTOM ANIMATIONS --- */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite; 
        }
        .animate-marquee-slow {
          animation: marquee 60s linear infinite; 
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        /* Safari rounded video corner fix */
        .safari-video-fix {
          -webkit-mask-image: -webkit-radial-gradient(white, black);
          -webkit-backface-visibility: hidden;
          -moz-backface-visibility: hidden;
        }
      `}} />

      {/* Seamless Integrated Background */}
      <div className="absolute top-0 inset-x-0 h-full bg-gradient-to-b from-teal-50/80 via-[#F8FAFC] to-[#F8FAFC] pointer-events-none -z-10" />
      <div className="absolute right-0 top-0 w-[50vw] h-[600px] bg-teal-100/40 rounded-full blur-[120px] pointer-events-none -translate-y-1/4 translate-x-1/4 -z-10"></div>
      <div className="absolute left-0 top-[20%] w-[40vw] h-[500px] bg-cyan-50/50 rounded-full blur-[100px] pointer-events-none -translate-x-1/3 -z-10 animate-pulse" style={{ animationDuration: '10s' }}></div>

      {/* HERO SECTION */}
      <section className="relative px-4 pt-24 pb-12 sm:px-6 lg:px-8 lg:pt-36 lg:pb-16 max-w-7xl mx-auto flex flex-col justify-center min-h-[90vh]">
        <div className="grid gap-10 lg:gap-16 lg:grid-cols-[1.1fr_0.9fr] items-center">
          
          {/* Left Content */}
          <div className="relative z-10 order-2 lg:order-1">
            <span className="animate-fade-in-up inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-teal-700 shadow-sm border border-teal-100 mb-6 transition-all hover:shadow-md hover:-translate-y-0.5">
              <CheckCircle2 className="h-4 w-4 text-teal-500" /> Immediate Hiring
            </span>
            
            <h1 className="animate-fade-in-up delay-100 text-4xl sm:text-5xl lg:text-[4rem] font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-6">
              Professional <br className="hidden sm:block" />
              <span className="relative inline-block mt-1 sm:mt-2">
                <span className="text-teal-600">Tailoring & Design</span>
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-teal-200/50 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </span>
            </h1>
            
            <p className="animate-fade-in-up delay-200 max-w-xl text-lg text-slate-600 leading-relaxed mb-8 sm:mb-10 font-light">
              Accelerate your career in Bangalore's premier garment sector. Experience comprehensive corporate benefits, stable career growth, and a definitive path to leadership.
            </p>

            <div className="grid gap-4 sm:grid-cols-2 animate-fade-in-up delay-300">
              {[
                { label: "Locations", value: "Ramanagara & Kengeri", icon: MapPin },
                { label: "Monthly Salary", value: "₹16k – ₹18k + Benefits", icon: ShieldCheck },
                { label: "Eligibility", value: "10th, PUC, or Degree", icon: UserCheck },
                { label: "Age Group", value: "18 to 35 years", icon: Home },
              ].map((item) => (
                <div key={item.label} className="group flex items-start gap-4 rounded-2xl bg-white/70 backdrop-blur-sm p-4 sm:p-5 shadow-[0_2px_15px_rgb(0,0,0,0.02)] border border-slate-200/50 transition-all duration-300 hover:shadow-[0_8px_25px_rgba(20,184,166,0.1)] hover:border-teal-200 hover:-translate-y-1 hover:bg-white">
                  <div className="rounded-xl bg-slate-50 p-2 sm:p-2.5 text-slate-400 transition-colors duration-300 group-hover:bg-teal-50 group-hover:text-teal-600">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">{item.label}</p>
                    <p className="text-sm font-bold text-slate-800">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Performance Optimized Video Layout */}
          <div className="relative w-full max-w-lg mx-auto lg:ml-auto lg:mt-0 animate-fade-in-up delay-[400ms] order-1 lg:order-2">
            <div className="absolute inset-0 translate-x-3 translate-y-3 sm:translate-x-4 sm:translate-y-4 rounded-[2rem] border-2 border-teal-100/80 -z-10 transition-transform duration-500 group-hover:translate-x-5 group-hover:translate-y-5"></div>
            
            <div className="relative rounded-[2rem] bg-white p-2 sm:p-2.5 shadow-xl shadow-slate-200/60 border border-slate-100/80 overflow-hidden group animate-float safari-video-fix">
              <div className="overflow-hidden rounded-[1.5rem] relative bg-slate-100 safari-video-fix">
                
                {/* Embedded Video - Optimized for mobile scroll */}
                <video 
                  src={tailoringVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  disablePictureInPicture
                  className="h-[350px] sm:h-[450px] lg:h-[520px] w-full object-cover transition-transform duration-1000 group-hover:scale-105 pointer-events-none"
                />
                
                {/* Cinematic Overlays */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_40%,_rgba(15,23,42,0.2)_100%)] pointer-events-none z-10 transition-opacity duration-500 group-hover:opacity-40"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-70 pointer-events-none z-10"></div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* WHY CHOOSE US - ANIMATED GRID SECTION */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 relative z-10">
        
        {/* Decorative elements to fill blank space smoothly */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent opacity-50"></div>

        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 animate-fade-in-up delay-200">
          <span className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-teal-700 border border-teal-100/50 mb-4 sm:mb-6 shadow-sm">
            Benefits Program
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Why Choose Us</h2>
          <p className="text-slate-500 text-base sm:text-lg font-light leading-relaxed px-4">
            We support your entry with comprehensive services that make work secure and accessible for everyone.
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { 
              icon: ShieldCheck, 
              title: "Financial Security", 
              desc: "ESI & PF included for all enrolled candidates.", 
              bgColor: "bg-sky-500",
              glow: "group-hover:shadow-[0_15px_35px_rgba(14,165,233,0.15)]",
              shape: "rounded-tl-[1.5rem] rounded-br-[1.5rem] rounded-tr-md rounded-bl-md",
              bubble: "bg-sky-400/10",
              delay: "delay-[100ms]" 
            },
            { 
              icon: Bus, 
              title: "Transportation", 
              desc: "Pickup and drop service for daily commuting.", 
              bgColor: "bg-orange-500",
              glow: "group-hover:shadow-[0_15px_35px_rgba(249,115,22,0.12)]",
              shape: "rounded-tr-[1.5rem] rounded-bl-[1.5rem] rounded-tl-md rounded-br-md",
              bubble: "bg-orange-400/10",
              delay: "delay-[200ms]" 
            },
            { 
              icon: Home, 
              title: "Accommodation", 
              desc: "Hostel facility is available for eligible trainees.", 
              bgColor: "bg-lime-500",
              glow: "group-hover:shadow-[0_15px_35px_rgba(132,204,22,0.15)]",
              shape: "rounded-bl-[1.5rem] rounded-tr-[1.5rem] rounded-tl-md rounded-br-md",
              bubble: "bg-lime-400/10",
              delay: "delay-[300ms]" 
            },
            { 
              icon: HeartPulse, 
              title: "Health Support", 
              desc: "Insurance coverage keeps you protected.", 
              bgColor: "bg-teal-600",
              glow: "group-hover:shadow-[0_15px_35px_rgba(13,148,136,0.15)]",
              shape: "rounded-br-[1.5rem] rounded-tl-[1.5rem] rounded-tr-md rounded-bl-md",
              bubble: "bg-teal-500/10",
              delay: "delay-[400ms]" 
            },
          ].map((item) => (
            <div 
              key={item.title} 
              className={`group relative bg-white rounded-[1.5rem] sm:rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2 overflow-hidden animate-fade-in-up ${item.delay} ${item.glow}`}
            >
              <div className={`absolute -right-8 -bottom-8 w-32 h-32 sm:w-40 sm:h-40 rounded-full blur-2xl transition-all duration-700 ease-out opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-[2.5] ${item.bubble}`} />
              
              <div className="relative z-10">
                <div className={`w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mb-5 sm:mb-6 transition-transform duration-500 group-hover:scale-110 shadow-sm ${item.bgColor} ${item.shape}`}>
                  <item.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" strokeWidth={2.5} />
                </div>
                
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 sm:mb-3">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-light">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- INDUSTRY PARTNER SECTION --- */}
      <section className="py-20 bg-white/40 relative flex flex-col items-center justify-center overflow-hidden border-y border-slate-100">
        <div className="text-center mb-12 relative z-20">
          <span className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-teal-700 border border-teal-100/50 mb-4 shadow-sm">
            Industry Partner
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our Hiring Partner
          </h2>
        </div>

        <div className="absolute left-0 top-0 z-20 h-full w-20 md:w-40 bg-gradient-to-r from-[#F8FAFC] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 z-20 h-full w-20 md:w-40 bg-gradient-to-l from-[#F8FAFC] to-transparent pointer-events-none" />

        <div className="flex w-max animate-marquee-slow hover:[animation-play-state:paused] py-8">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="flex items-center justify-center w-[300px] sm:w-[400px] flex-shrink-0 px-8 group cursor-default"
            >
              <div className="relative flex items-center justify-center w-full h-32 rounded-[2.5rem] bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2 hover:border-teal-200 px-12 py-8">
                <img 
                  src={partnerLogos[0].src} 
                  alt={partnerLogos[0].name} 
                  className="max-h-16 w-full object-contain relative z-10 transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center relative z-20">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 shadow-sm transition-all hover:border-teal-200">
            <CheckCircle2 className="h-5 w-5 text-teal-600" />
            <p className="font-semibold text-slate-700 text-sm">
              Direct Recruitment with India's Largest Garment Manufacturer
            </p>
          </div>
        </div>
      </section>

      {/* ULTRA-CLEAN APPLICATION FORM */}
      <section className="mx-auto max-w-4xl px-4 py-12 sm:py-16 sm:px-6 lg:px-8 relative z-10 animate-fade-in-up delay-[500ms]">
        <div className="relative rounded-[2rem] sm:rounded-[2.5rem] bg-white p-6 sm:p-14 shadow-[0_10px_40px_rgb(0,0,0,0.04)] border border-slate-100">
          
          <div className="text-center mb-10 sm:mb-14">
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-4 sm:px-5 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-600 mb-4 sm:mb-6 border border-slate-200/60 shadow-sm">
              <BookOpen className="h-4 w-4 text-teal-600" /> Enrollment Form
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mb-3 sm:mb-4 tracking-tight">
              Apply today and secure your future.
            </h2>
            <p className="text-slate-500 text-sm sm:text-lg max-w-2xl mx-auto font-light">
              Fill out the form below and our admissions team will get back to you shortly to discuss eligibility and next steps.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            <div className="grid gap-5 sm:gap-6 sm:grid-cols-2">
              
              {/* Name Input */}
              <div className="space-y-1.5 sm:space-y-2 group">
                <label className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Full Name / ಪೂರ್ಣ ಹೆಸರು <span className="text-teal-500">*</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 sm:pl-5 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-slate-400 group-focus-within:text-teal-500 transition-colors duration-300" />
                  </div>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required 
                    placeholder="John Doe" 
                    className={`w-full rounded-xl sm:rounded-2xl border ${errors.name ? 'border-red-400' : 'border-slate-200'} bg-slate-50/50 py-3.5 sm:py-4 pl-12 sm:pl-14 pr-4 sm:pr-5 text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-300 hover:border-slate-300 hover:bg-slate-50 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 text-sm sm:text-base`} 
                  />
                  {errors.name && <p className="text-red-500 text-[10px] mt-1 ml-1 flex items-center gap-1"><AlertCircle className="w-3 h-3"/>{errors.name}</p>}
                </div>
              </div>

              {/* Email Input */}
              <div className="space-y-1.5 sm:space-y-2 group">
                <label className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Email Address / ಇಮೇಲ್ ವಿಳಾಸ</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 sm:pl-5 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-teal-500 transition-colors duration-300" />
                  </div>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com (Optional)" 
                    className={`w-full rounded-xl sm:rounded-2xl border ${errors.email ? 'border-red-400' : 'border-slate-200'} bg-slate-50/50 py-3.5 sm:py-4 pl-12 sm:pl-14 pr-4 sm:pr-5 text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-300 hover:border-slate-300 hover:bg-slate-50 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 text-sm sm:text-base`} 
                  />
                  {errors.email && <p className="text-red-500 text-[10px] mt-1 ml-1 flex items-center gap-1"><AlertCircle className="w-3 h-3"/>{errors.email}</p>}
                </div>
              </div>

              {/* Contact Number */}
              <div className="space-y-1.5 sm:space-y-2 group">
                <label className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Contact Number / ದೂರವಾಣಿ ಸಂಖ್ಯೆ <span className="text-teal-500">*</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 sm:pl-5 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-slate-400 group-focus-within:text-teal-500 transition-colors duration-300" />
                  </div>
                  <input 
                    type="tel" 
                    name="contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                    required 
                    placeholder="+91 98765 43210" 
                    className={`w-full rounded-xl sm:rounded-2xl border ${errors.contact ? 'border-red-400' : 'border-slate-200'} bg-slate-50/50 py-3.5 sm:py-4 pl-12 sm:pl-14 pr-4 sm:pr-5 text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-300 hover:border-slate-300 hover:bg-slate-50 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 text-sm sm:text-base`} 
                  />
                  {errors.contact && <p className="text-red-500 text-[10px] mt-1 ml-1 flex items-center gap-1"><AlertCircle className="w-3 h-3"/>{errors.contact}</p>}
                </div>
              </div>

              {/* Date of Birth */}
              <div className="space-y-1.5 sm:space-y-2 group">
                <label className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Date of Birth / ಜನ್ಮ ದಿನಾಂಕ <span className="text-teal-500">*</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 sm:pl-5 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-slate-400 group-focus-within:text-teal-500 transition-colors duration-300" />
                  </div>
                  <input 
                    type="date" 
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                    required 
                    className={`w-full rounded-xl sm:rounded-2xl border ${errors.dob ? 'border-red-400' : 'border-slate-200'} bg-slate-50/50 py-3.5 sm:py-4 pl-12 sm:pl-14 pr-4 sm:pr-5 text-slate-900 outline-none transition-all duration-300 hover:border-slate-300 hover:bg-slate-50 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 text-sm sm:text-base`} 
                  />
                  {errors.dob && <p className="text-red-500 text-[10px] mt-1 ml-1 flex items-center gap-1"><AlertCircle className="w-3 h-3"/>{errors.dob}</p>}
                </div>
              </div>
            </div>

            {/* Select Menus */}
            <div className="grid gap-5 sm:gap-6 sm:grid-cols-2">
              <div className="space-y-1.5 sm:space-y-2 group">
                <label className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Qualification / ಅರ್ಹತೆ <span className="text-teal-500">*</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 sm:pl-5 flex items-center pointer-events-none">
                    <BookOpen className="h-5 w-5 text-slate-400 group-focus-within:text-teal-500 transition-colors duration-300" />
                  </div>
                  <select 
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleInputChange}
                    required 
                    className={`w-full appearance-none rounded-xl sm:rounded-2xl border ${errors.qualification ? 'border-red-400' : 'border-slate-200'} bg-slate-50/50 py-3.5 sm:py-4 pl-12 sm:pl-14 pr-10 text-slate-900 outline-none transition-all duration-300 hover:border-slate-300 hover:bg-slate-50 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 invalid:text-slate-400 cursor-pointer text-sm sm:text-base`}
                  >
                    <option value="" disabled>Select qualification</option>
                    {["10th", "PUC", "Degree", "Other"].map(qual => (
                      <option key={qual} value={qual} className="text-slate-900">{qual}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 sm:px-5 pointer-events-none">
                    <ChevronRight className="h-4 w-4 text-slate-400 rotate-90 transition-transform duration-300 group-focus-within:-rotate-90" />
                  </div>
                </div>
                {errors.qualification && <p className="text-red-500 text-[10px] mt-1 ml-1 flex items-center gap-1"><AlertCircle className="w-3 h-3"/>{errors.qualification}</p>}
                
                {/* Other Qualification Input */}
                {formData.qualification === "Other" && (
                  <div className="mt-4 animate-fade-in-up">
                    <input 
                      type="text" 
                      name="customQualification"
                      value={formData.customQualification}
                      onChange={handleInputChange}
                      placeholder="Specify your qualification" 
                      className={`w-full rounded-xl border ${errors.customQualification ? 'border-red-400' : 'border-slate-200'} bg-slate-50/50 py-3 px-4 text-slate-900 outline-none focus:border-teal-500 transition-all text-sm`} 
                    />
                    {errors.customQualification && <p className="text-red-500 text-[10px] mt-1 ml-1 flex items-center gap-1"><AlertCircle className="w-3 h-3"/>{errors.customQualification}</p>}
                  </div>
                )}
              </div>

              <div className="space-y-1.5 sm:space-y-2 group">
                <label className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Preferred Location / ಆದ್ಯತೆಯ ಸ್ಥಳ <span className="text-teal-500">*</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 sm:pl-5 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-slate-400 group-focus-within:text-teal-500 transition-colors duration-300" />
                  </div>
                  <select 
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required 
                    className={`w-full appearance-none rounded-xl sm:rounded-2xl border ${errors.location ? 'border-red-400' : 'border-slate-200'} bg-slate-50/50 py-3.5 sm:py-4 pl-12 sm:pl-14 pr-10 text-slate-900 outline-none transition-all duration-300 hover:border-slate-300 hover:bg-slate-50 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 invalid:text-slate-400 cursor-pointer text-sm sm:text-base`}
                  >
                    <option value="" disabled>Select a location</option>
                    <option value="Kengeri, Bangalore" className="text-slate-900">Kengeri, Bangalore</option>
                    <option value="Ramanagara" className="text-slate-900">Ramanagara</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 sm:px-5 pointer-events-none">
                    <ChevronRight className="h-4 w-4 text-slate-400 rotate-90 transition-transform duration-300 group-focus-within:-rotate-90" />
                  </div>
                </div>
                {errors.location && <p className="text-red-500 text-[10px] mt-1 ml-1 flex items-center gap-1"><AlertCircle className="w-3 h-3"/>{errors.location}</p>}
              </div>
            </div>

            {/* Residence Address */}
            <div className="space-y-1.5 sm:space-y-2 group">
              <label className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Residence Address /ನಿವಾಸದ ವಿಳಾಸ <span className="text-teal-500">*</span></label>
              <div className="relative">
                <div className="absolute top-4 sm:top-5 left-0 pl-4 sm:pl-5 flex items-start pointer-events-none">
                  <Home className="h-5 w-5 text-slate-400 group-focus-within:text-teal-500 transition-colors duration-300" />
                </div>
                <textarea 
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required 
                  rows={4}
                  placeholder="Enter your full residential address..." 
                  className={`w-full resize-none rounded-xl sm:rounded-2xl border ${errors.address ? 'border-red-400' : 'border-slate-200'} bg-slate-50/50 py-3.5 sm:py-4 pl-12 sm:pl-14 pr-4 sm:pr-5 text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-300 hover:border-slate-300 hover:bg-slate-50 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 text-sm sm:text-base`} 
                />
                {errors.address && <p className="text-red-500 text-[10px] mt-1 ml-1 flex items-center gap-1"><AlertCircle className="w-3 h-3"/>{errors.address}</p>}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 sm:pt-6">
              <button 
                type="submit" 
                disabled={loading}
                className={`group relative flex w-full items-center justify-center gap-3 rounded-xl sm:rounded-2xl bg-teal-600 py-4 text-sm sm:text-base font-bold text-white shadow-[0_6px_20px_rgba(13,148,136,0.25)] transition-all duration-300 hover:-translate-y-1 hover:bg-teal-700 hover:shadow-[0_12px_30px_rgba(13,148,136,0.35)] overflow-hidden ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                
                <span className="relative z-10 flex items-center gap-2">
                  {loading ? "Submitting..." : "Submit Application"}
                  {!loading && <Send className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />}
                </span>
              </button>
            
            </div>
          </form>
        </div>
      </section>

    </main>
  );
}