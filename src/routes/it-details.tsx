import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Code2, Coffee, ShieldCheck, Cpu, CheckCircle2,
  ArrowRight, BookOpen, Terminal, Database,
  Award, Briefcase, GraduationCap, Zap, Users,
  ChevronDown, Loader2, AlertCircle
} from "lucide-react";
import React from "react";
import { supabase } from "../lib/supabase";
import { toast } from "sonner";

export const Route = createFileRoute("/it-details")({
  head: () => ({
    meta: [
      { title: "IT Training Deep Dive | Python & Java | Trublend EduforCareer" },
      {
        name: "description",
        content: "Explore our professional IT training modules. Detailed curriculum for Python Full Stack and Java Enterprise development.",
      },
    ],
  }),
  component: ITDetailsPage,
});

const modules = [
  {
    id: "python",
    title: "Python Full Stack Development",
    icon: <Code2 className="h-8 w-8 text-blue-500" />,
    color: "blue",
    description: "Master the most versatile language in tech. From web apps with Django to data processing, this track covers everything needed for a modern developer role.",
    curriculum: [
      { section: "Foundations", items: ["Python Core Syntax", "Data Structures", "OOP Principles", "Error Handling"] },
      { section: "Backend Mastery", items: ["Django Framework", "REST APIs", "PostgreSQL", "Authentication"] },
      { section: "Frontend Integration", items: ["React.js Basics", "State Management", "Tailwind CSS", "API Integration"] },
      { section: "Deployment", items: ["Git/GitHub", "AWS Deployment", "Docker Basics", "CI/CD Concepts"] }
    ],
    career: "Full Stack Developer, Backend Engineer",
    badge: "Most Versatile"
  },
  {
    id: "java",
    title: "Java Enterprise Architecture",
    icon: <Coffee className="h-8 w-8 text-orange-500" />,
    color: "orange",
    description: "Build the backbone of enterprise software. Java remains the industry standard for scalable, secure, and robust corporate applications.",
    curriculum: [
      { section: "Java Foundations", items: ["Core Syntax & Basics", "OOPs Principles", "Collections Framework", "Exception Handling"] },
      { section: "Spring Boot Basics", items: ["Spring MVC Architecture", "Dependency Injection", "REST API Development", "Spring Data JPA"] },
      { section: "Database Essentials", items: ["SQL Queries & Basics", "CRUD Operations", "Table Relationships", "JDBC Connectivity"] },
      { section: "Professional Tools", items: ["Git & Version Control", "Maven/Gradle Basics", "Unit Testing Essentials", "Basic API Hosting"] }
    ],
    career: "Junior Java Developer, Backend Developer",
    badge: "Industry Standard"
  }
];

function ITDetailsPage() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    course: "python",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\s+/g, "").replace("+91", ""))) {
      newErrors.phone = "Must be a 10-digit number";
    }
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

  setIsLoading(true);

  try {
    const { error } = await supabase
      .from('it_training_application')
      .insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone, // ✅ important fix
          course: formData.course,
          message: formData.message,
        }
      ]);

    if (error) throw error;

    setIsSubmitted(true);
    toast.success("Application submitted successfully! 🚀");

    setFormData({
      name: "",
      email: "",
      phone: "",
      course: "python",
      message: ""
    });

  } catch (error: any) {
    console.error("Submission error:", error);
    toast.error(error.message || "Failed to submit application.");
  } finally {
    setIsLoading(false);
  }
};

  const scrollToForm = () => {
    document.getElementById('enroll-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#FAFAFC] font-poppins text-slate-800 selection:bg-blue-500 selection:text-white pb-20">
      {/* Custom Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700&display=swap');
        .font-montserrat { font-family: 'Montserrat', sans-serif !important; }
        .font-poppins { font-family: 'Poppins', sans-serif !important; }
        
        .glass-card {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.5);
        }

        .form-input {
          @apply w-full rounded-xl border border-slate-200 bg-white px-5 py-4 text-slate-900 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10;
        }
      `}} />

      {/* --- HERO --- */}
      <section className="relative pt-20 pb-12 md:pt-24 md:pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop"
            alt="IT Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/80 to-slate-900" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 text-center">
          <span className="inline-block rounded-full bg-blue-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-400 border border-blue-500/20 mb-6 animate-fade-in">
            Course Deep Dive
          </span>
          <h1 className="font-montserrat text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight mb-6 md:mb-8 animate-slide-up">
            Professional <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">IT Training Modules</span>
          </h1>
          <p className="max-w-2xl mx-auto text-base md:text-lg text-slate-400 font-light leading-relaxed mb-8 md:mb-10 animate-slide-up">
            Detailed curriculum breakdown and career paths for our industry-standard technical tracks. Architected for your professional success.
          </p>
          <div className="mt-8 md:mt-10 animate-slide-up">
            <button
              onClick={scrollToForm}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 px-8 py-3 text-sm font-bold text-white transition-all backdrop-blur-md active:scale-95"
            >
              Skip to Application <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* --- MODULES --- */}
      <section className="py-12 md:py-20 lg:py-32 max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid gap-16 md:gap-24 lg:gap-32">
          {modules.map((m) => (
            <div key={m.id} id={m.id} className="relative group">
              <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-20 items-start">

                {/* Info Side */}
                <div className="lg:sticky lg:top-32 mb-12 lg:mb-0">
                  <div className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-6 ${m.color === 'blue' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-orange-50 text-orange-600 border-orange-100'
                    } border animate-fade-in`}>
                    <Zap className="h-3 w-3" /> {m.badge}
                  </div>

                  <div className="flex items-center gap-4 mb-6">
                    <div className="shrink-0">{m.icon}</div>
                    <h2 className="font-montserrat text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight">{m.title}</h2>
                  </div>

                  <p className="text-base md:text-lg text-slate-600 font-light leading-relaxed mb-8">
                    {m.description}
                  </p>

                  <div className="p-5 md:p-6 rounded-2xl md:rounded-3xl bg-white shadow-sm border border-slate-100 mb-6 md:mb-8">
                    <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                      <GraduationCap className="h-4 w-4" /> Target Roles
                    </h4>
                    <p className="text-slate-800 font-bold">{m.career}</p>
                  </div>

                  <button
                    onClick={() => {
                      setFormData(prev => ({ ...prev, course: m.id }));
                      scrollToForm();
                    }}
                    className={`inline-flex items-center justify-center gap-3 rounded-2xl ${m.color === 'blue' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-orange-600 hover:bg-orange-700'
                      } px-10 py-5 text-base font-bold text-white shadow-xl transition-all hover:-translate-y-1 active:scale-95 w-full md:w-auto lg:w-full xl:w-auto`}
                  >
                    Enroll in this track <ArrowRight className="h-5 w-5" />
                  </button>
                </div>

                {/* Curriculum Side */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  {m.curriculum.map((section, idx) => (
                    <div key={idx} className="glass-card rounded-2xl md:rounded-[2rem] p-6 md:p-8 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 group/card">
                      <div className="flex items-center gap-3 mb-6">
                        <div className={`h-8 w-8 rounded-lg flex items-center justify-center text-white ${m.color === 'blue' ? 'bg-blue-500' : 'bg-orange-500'
                          }`}>
                          <BookOpen className="h-4 w-4" />
                        </div>
                        <h3 className="font-montserrat text-lg font-bold text-slate-900">{section.section}</h3>
                      </div>
                      <ul className="space-y-4">
                        {section.items.map((item, iidx) => (
                          <li key={iidx} className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                            <CheckCircle2 className={`h-4 w-4 shrink-0 ${m.color === 'blue' ? 'text-blue-500' : 'text-orange-500'
                              }`} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

              </div>

              {/* Divider for next section */}
              {m.id === 'python' && (
                <div className="mt-16 md:mt-24 lg:mt-32 h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* --- ENROLLMENT FORM SECTION --- */}
      <section id="enroll-form" className="py-16 md:py-24 lg:py-32 bg-white relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] right-[-5%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-[10%] left-[-5%] w-[40%] h-[40%] bg-teal-500/5 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">

            {/* Left Side: Trust & Context */}
            <div className="mb-12 lg:mb-0">
              <span className="font-montserrat text-xs font-bold tracking-[0.2em] text-blue-600 uppercase block mb-4">Admissions Open</span>
              <h2 className="font-montserrat text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight mb-6 md:mb-8">
                Ready to Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">Tech Journey?</span>
              </h2>
              <p className="text-slate-500 text-base md:text-lg leading-relaxed mb-8 md:mb-12 max-w-lg">
                Fill out the enrollment form to secure your seat. Our admissions team will contact you for a brief technical assessment and onboarding session.
              </p>

              <div className="space-y-6 md:space-y-8">
                {[
                  { icon: CheckCircle2, title: "Zero Upfront Cost", desc: "No registration fees. Pay only when you start the program." },
                  { icon: Award, title: "Industry Recognition", desc: "Course curriculum vetted by top tech hiring partners." },
                  { icon: Users, title: "Peer Learning", desc: "Join an elite community of aspiring software engineers." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 md:gap-5">
                    <div className="flex-shrink-0 h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-montserrat text-base md:text-lg font-bold text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side: The Form */}
            <div className="bg-white rounded-2xl sm:rounded-3xl md:rounded-[3rem] p-6 sm:p-8 md:p-12 border border-slate-100 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] relative">
              {isSubmitted ? (
                <div className="text-center py-8 md:py-12">
                  <div className="inline-flex h-20 w-20 md:h-24 md:w-24 items-center justify-center rounded-full bg-green-50 text-green-500 mb-6 md:mb-8">
                    <CheckCircle2 className="h-10 w-10 md:h-12 md:w-12 animate-pulse" />
                  </div>
                  <h3 className="font-montserrat text-2xl md:text-3xl font-black text-slate-900 mb-4 tracking-tight">Application Sent!</h3>
                  <p className="text-slate-600 mb-8 md:mb-10 text-base md:text-lg">We've received your data for the <span className="font-bold text-blue-600">{formData.course.toUpperCase()}</span> track. We'll be in touch within 24 hours.</p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 text-white font-bold transition-all hover:bg-slate-800"
                  >
                    Close & Go Back
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                  {/* Name */}
                  <div className="space-y-2 group">
                    <label className="text-[10px] md:text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                    <div className="relative">
                      <Terminal className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-blue-500 transition-colors" />
                      <input
                        type="text" name="name" required placeholder="John Doe"
                        className={`w-full rounded-xl md:rounded-2xl border ${errors.name ? 'border-red-400' : 'border-slate-100'} bg-slate-50/50 py-3 md:py-4 pl-12 pr-5 text-slate-900 outline-none transition-all focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5`}
                        value={formData.name} onChange={handleInputChange}
                      />
                    </div>
                    {errors.name && <p className="text-red-500 text-[10px] mt-1 ml-1 flex items-center gap-1"><AlertCircle className="w-3 h-3"/>{errors.name}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {/* Email */}
                    <div className="space-y-2 group">
                      <label className="text-[10px] md:text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
                      <div className="relative">
                        <Terminal className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-blue-500 transition-colors" />
                        <input
                          type="email" name="email" required placeholder="john@example.com"
                          className={`w-full rounded-xl md:rounded-2xl border ${errors.email ? 'border-red-400' : 'border-slate-100'} bg-slate-50/50 py-3 md:py-4 pl-12 pr-5 text-slate-900 outline-none transition-all focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5`}
                          value={formData.email} onChange={handleInputChange}
                        />
                      </div>
                      {errors.email && <p className="text-red-500 text-[10px] mt-1 ml-1 flex items-center gap-1"><AlertCircle className="w-3 h-3"/>{errors.email}</p>}
                    </div>
                    {/* Phone */}
                    <div className="space-y-2 group">
                      <label className="text-[10px] md:text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Phone Number</label>
                      <div className="relative">
                        <Terminal className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-blue-500 transition-colors" />
                        <input
                          type="tel" name="phone" required placeholder="+91 98765 43210"
                          className={`w-full rounded-xl md:rounded-2xl border ${errors.phone ? 'border-red-400' : 'border-slate-100'} bg-slate-50/50 py-3 md:py-4 pl-12 pr-5 text-slate-900 outline-none transition-all focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5`}
                          value={formData.phone} onChange={handleInputChange}
                        />
                      </div>
                      {errors.phone && <p className="text-red-500 text-[10px] mt-1 ml-1 flex items-center gap-1"><AlertCircle className="w-3 h-3"/>{errors.phone}</p>}
                    </div>
                  </div>

                  {/* Course Select */}
                  <div className="space-y-2 group">
                    <label className="text-[10px] md:text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Selected Track</label>
                    <div className="relative">
                      <Database className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-blue-500 transition-colors" />
                      <select
                        name="course" className="w-full rounded-xl md:rounded-2xl border border-slate-200 bg-white py-3 md:py-4 pl-12 pr-12 text-slate-900 outline-none transition-all appearance-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 cursor-pointer shadow-sm"
                        value={formData.course} onChange={handleInputChange}
                      >
                        <option value="python">Python Full Stack</option>
                        <option value="java">Java Enterprise</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none group-focus-within:text-blue-500 transition-colors" />
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="space-y-2 group">
                    <label className="text-[10px] md:text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Career Goal (Optional)</label>
                    <textarea
                      name="message" rows={3} placeholder="Tell us about your background..."
                      className="w-full rounded-xl md:rounded-2xl border border-slate-100 bg-slate-50/50 py-3 md:py-4 px-5 text-slate-900 outline-none transition-all resize-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5"
                      value={formData.message} onChange={handleInputChange}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full group relative overflow-hidden inline-flex items-center justify-center gap-3 rounded-xl md:rounded-2xl bg-slate-900 px-8 py-4 md:py-5 font-montserrat font-black text-white transition-all duration-300 hover:bg-blue-600 hover:shadow-xl active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Submit Application
                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-[9px] md:text-[10px] text-slate-400 font-medium">
                    By submitting, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* --- WHY EDUFORCARE --- */}
      <section className="py-16 md:py-20 bg-slate-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10 text-center">
          <h2 className="font-montserrat text-2xl md:text-4xl lg:text-5xl font-black text-white mb-10 md:mb-16">Program Advantages</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 text-left">
            {[
              { icon: Award, title: "Official Certification", desc: "Get certified by Trublend EduforCareer with global industry recognition." },
              { icon: Briefcase, title: "Job Assistance", desc: "100% placement support with resume building and mock interviews." },
              { icon: Terminal, title: "Project Based", desc: "Build a portfolio of real-world enterprise applications." }
            ].map((adv, idx) => (
              <div key={idx} className="p-6 md:p-8 rounded-2xl md:rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors duration-300">
                <adv.icon className="h-10 w-10 text-blue-400 mb-6" />
                <h3 className="font-montserrat text-xl font-bold text-white mb-3">{adv.title}</h3>
                <p className="text-slate-400 font-light text-sm leading-relaxed">{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
