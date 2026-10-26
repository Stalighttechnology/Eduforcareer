import React, { useState, useMemo, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Briefcase,
  Building2,
  MapPin,
  Users,
  Search,
  Filter,
  CheckCircle2,
  Utensils,
  Home,
  Bus,
  FileText,
  Upload,
  X,
  ArrowRight,
  ShieldCheck,
  Check,
  GraduationCap,
  Sparkles,
  ChevronRight,
  IndianRupee,
  Layers,
  SlidersHorizontal,
  BadgeCheck,
  TrendingUp,
  Award,
  Zap,
  Calendar,
  Phone,
  Mail,
  User,
  Clock,
  Compass,
} from "lucide-react";
import pastelWavesBg from "@/assets/Pastel Abstract Gradient Waves.png";
import studentsHero from "@/assets/smiling_students_clean_transparent.png";
import { SEED_JOBS, JobOpening, submitJobApplication, getJobs } from "@/lib/jobService";
import { toast } from "sonner";

// Company logos from 'carrier company logo' directory
import pittiLogo from "@/carrier company logo/pitti.png";
import otisLogo from "@/carrier company logo/otis-logo.png";
import avirataLogo from "@/carrier company logo/avirata.png";
import datacorpLogo from "@/carrier company logo/datacorp-logo.png";
import indomimLogo from "@/carrier company logo/INDO-MIM.png";
import wiproGeLogo from "@/carrier company logo/wipro ge health care.webp";
import felsomatLogo from "@/carrier company logo/FELSOMAT_Logo_26.png";
import ucamLogo from "@/carrier company logo/Logo_UCAM-cropped.svg";
import bilvaLogo from "@/carrier company logo/bilva tech.png";

export const Route = createFileRoute("/placement")({
  head: () => ({
    meta: [
      { title: "Career Opportunities & Placement Drives – Trublend EduforCareer" },
      {
        name: "description",
        content: "Explore 1,029+ verified openings across 18 leading manufacturing and engineering companies in Karnataka. Free application and placement support.",
      },
      { property: "og:title", content: "Career Opportunities – Trublend EduforCareer" },
    ],
  }),
  component: PlacementPage,
});

const COMPANY_LOGOS: Record<string, string> = {
  "Pitti Industries Pvt Ltd": pittiLogo,
  "OTIS": otisLogo,
  "Avirata Defence Systems": avirataLogo,
  "Datacorp Traffic Pvt Ltd": datacorpLogo,
  "Indomim": indomimLogo,
  "Wipro GE Healthcare": wiproGeLogo,
  "Felsomat": felsomatLogo,
  "Ucam Pvt Ltd": ucamLogo,
  "Bilwa Technologies": bilvaLogo,
};

const COMPANY_CODES: Record<string, string> = {
  "Mobile Manufacturing Company Devanahalli": "MM",
  "Pitti Industries Pvt Ltd": "PI",
  "OTIS": "OT",
  "Avirata Defence Systems": "AD",
  "Datacorp Traffic Pvt Ltd": "DT",
  "Indomim": "IN",
  "Wipro GE Healthcare": "WG",
  "Global Printing": "GP",
  "GE BEL": "GB",
  "Kern Liebers": "KL",
  "Felsomat": "FE",
  "Trident": "TR",
  "Ucam Pvt Ltd": "UC",
  "Bilwa Technologies": "BT",
  "Unique Punch Systems Pvt Ltd": "UP",
  "Homag": "HO",
  "Hawe Hydraulics": "HH",
  "BBM": "BB",
};

const getCompanyCode = (company: string): string => {
  if (COMPANY_CODES[company]) return COMPANY_CODES[company];
  const words = company.trim().split(/\s+/);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return company.substring(0, 2).toUpperCase();
};

export default function PlacementPage() {
  const [jobs, setJobs] = useState<JobOpening[]>(() => getJobs());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedQualification, setSelectedQualification] = useState("ALL");
  const [selectedLocation, setSelectedLocation] = useState("ALL");
  const [selectedGender, setSelectedGender] = useState("ALL");
  const [onlyFreeFood, setOnlyFreeFood] = useState(false);
  const [onlyFreeAcc, setOnlyFreeAcc] = useState(false);
  const [onlyFreeTransport, setOnlyFreeTransport] = useState(false);

  // Sync state when admin pauses/updates jobs
  useEffect(() => {
    const handleSync = () => setJobs(getJobs());
    window.addEventListener("storage", handleSync);
    window.addEventListener("focus", handleSync);
    return () => {
      window.removeEventListener("storage", handleSync);
      window.removeEventListener("focus", handleSync);
    };
  }, []);

  // Active Job for Apply Modal
  const [activeJobForApply, setActiveJobForApply] = useState<JobOpening | null>(null);

  // Unique locations for filter dropdown
  const locationList = useMemo(() => {
    const locs = new Set<string>();
    jobs.forEach((j) => {
      j.location.split(",").forEach((l) => locs.add(l.trim()));
    });
    return Array.from(locs).sort();
  }, [jobs]);

  // Filtered jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        job.company.toLowerCase().includes(q) ||
        (job.roleTitle && job.roleTitle.toLowerCase().includes(q)) ||
        (job.sector && job.sector.toLowerCase().includes(q)) ||
        job.trade.toLowerCase().includes(q) ||
        job.location.toLowerCase().includes(q) ||
        job.qualification.toLowerCase().includes(q);

      const matchesQual =
        selectedQualification === "ALL" ||
        job.qualification.toLowerCase().includes(selectedQualification.toLowerCase());

      const matchesLoc =
        selectedLocation === "ALL" ||
        job.location.toLowerCase().includes(selectedLocation.toLowerCase());

      const matchesGender =
        selectedGender === "ALL" ||
        job.gender === selectedGender ||
        job.gender === "Male & Female";

      const matchesFood = !onlyFreeFood || job.food === "Free";
      const matchesAcc = !onlyFreeAcc || job.accommodation === "Free";
      const matchesTransport = !onlyFreeTransport || job.transport === "Free";

      return (
        matchesSearch &&
        matchesQual &&
        matchesLoc &&
        matchesGender &&
        matchesFood &&
        matchesAcc &&
        matchesTransport
      );
    });
  }, [
    jobs,
    searchQuery,
    selectedQualification,
    selectedLocation,
    selectedGender,
    onlyFreeFood,
    onlyFreeAcc,
    onlyFreeTransport,
  ]);

  const totalOpeningsCount = useMemo(() => {
    return jobs.reduce((acc, curr) => acc + (curr.openings || 0), 0);
  }, [jobs]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 pb-28">
      {/* 1. HERO SECTION - HIREFY STYLE */}
      <section className="relative overflow-hidden border-b border-slate-200/80 pt-10 pb-10 lg:pt-14 lg:pb-12 bg-gradient-to-r from-[#F0F5FF] via-[#F8FAFC] to-[#FFF7ED]">
        {/* Pastel Abstract Gradient Waves Background - Vividly & Correctly Visible Full Width */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none w-full h-full">
          <img
            src={pastelWavesBg}
            alt="Pastel Abstract Gradient Waves"
            className="w-full h-full object-cover object-center contrast-[1.2] saturate-[1.35] opacity-100"
          />
          {/* Subtle bottom fade for seamless transition to filter bar */}
          <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#F8FAFC] to-transparent"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="grid items-center gap-8 lg:grid-cols-12">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-4">
              {/* Tagged Type UI Badge matching user reference */}
              <div className="inline-flex items-center rounded-full border-2 border-[#FF6B00] bg-white/95 backdrop-blur-md p-1 pr-3 sm:pr-4 shadow-sm hover:shadow-md transition-all group cursor-default max-w-full">
                {/* Left Hexagonal Tag */}
                <div className="relative -ml-0.5 flex h-7 w-8 sm:h-8 sm:w-9 items-center justify-center bg-gradient-to-br from-[#FF6B00] via-[#FF7A1A] to-[#E05300] text-white [clip-path:polygon(22%_0%,78%_0%,100%_50%,78%_100%,22%_100%,0%_50%)] shrink-0 filter drop-shadow-[0_2px_4px_rgba(255,107,0,0.35)] transition-transform duration-200 group-hover:scale-105">
                  <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-85"></span>
                    <span className="relative inline-flex rounded-full h-full w-full bg-white"></span>
                  </span>
                </div>

                {/* Tagged Content Text */}
                <div className="flex items-center gap-1.5 sm:gap-2 pl-2 sm:pl-2.5 text-xs sm:text-sm">
                  <span className="font-montserrat font-extrabold text-slate-900 tracking-tight text-[11px] sm:text-xs md:text-sm truncate">
                    Direct Recruitment Drives
                  </span>
                  <span className="text-orange-400 font-bold">•</span>
                  <span className="font-montserrat font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs shrink-0">
                    Zero Placement Fees
                  </span>
                </div>
              </div>

              <h1 className="font-montserrat font-extrabold text-2xl sm:text-4xl lg:text-5xl tracking-tight text-[#0F172A] leading-[1.12]">
                Connecting Talent with <span className="text-[#1A62EA]">Top Industry Leaders</span>
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-slate-700 max-w-2xl leading-relaxed">
                Explore 1,029+ verified openings across 18 leading manufacturing, electronics, and engineering companies in Karnataka. 100% free placement support with zero service charges.
              </p>

              {/* 4 Value Metrics in Tagged Type UI (2-column on mobile, inline-flex on tablet/desktop) */}
              <div className="pt-2 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-2.5">
                {/* 1. 18 Verified Companies */}
                <div className="group inline-flex items-center rounded-full border border-blue-500/70 bg-white/95 backdrop-blur-md p-1 pr-2.5 sm:pr-3.5 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-default">
                  <div className="relative -ml-0.5 flex h-6 w-6 sm:w-7 items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700 text-white [clip-path:polygon(22%_0%,78%_0%,100%_50%,78%_100%,22%_100%,0%_50%)] shrink-0 filter drop-shadow-[0_1.5px_3px_rgba(37,99,235,0.35)] transition-transform duration-200 group-hover:scale-110">
                    <Briefcase className="h-3 w-3 text-white" />
                  </div>
                  <span className="font-montserrat font-extrabold pl-1.5 sm:pl-2 text-[10.5px] sm:text-xs text-slate-900 tracking-tight truncate">
                    18 Verified Companies
                  </span>
                </div>

                {/* 2. 1,029 Total Vacancies */}
                <div className="group inline-flex items-center rounded-full border border-emerald-500/70 bg-white/95 backdrop-blur-md p-1 pr-2.5 sm:pr-3.5 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-default">
                  <div className="relative -ml-0.5 flex h-6 w-6 sm:w-7 items-center justify-center bg-gradient-to-br from-emerald-500 to-emerald-700 text-white [clip-path:polygon(22%_0%,78%_0%,100%_50%,78%_100%,22%_100%,0%_50%)] shrink-0 filter drop-shadow-[0_1.5px_3px_rgba(16,185,129,0.35)] transition-transform duration-200 group-hover:scale-110">
                    <Users className="h-3 w-3 text-white" />
                  </div>
                  <span className="font-montserrat font-extrabold pl-1.5 sm:pl-2 text-[10.5px] sm:text-xs text-slate-900 tracking-tight truncate">
                    1,029 Total Vacancies
                  </span>
                </div>

                {/* 3. 100% Free Placement */}
                <div className="group inline-flex items-center rounded-full border border-[#FF6B00]/70 bg-white/95 backdrop-blur-md p-1 pr-2.5 sm:pr-3.5 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-default">
                  <div className="relative -ml-0.5 flex h-6 w-6 sm:w-7 items-center justify-center bg-gradient-to-br from-[#FF6B00] to-[#E05300] text-white [clip-path:polygon(22%_0%,78%_0%,100%_50%,78%_100%,22%_100%,0%_50%)] shrink-0 filter drop-shadow-[0_1.5px_3px_rgba(255,107,0,0.35)] transition-transform duration-200 group-hover:scale-110">
                    <ShieldCheck className="h-3 w-3 text-white" />
                  </div>
                  <span className="font-montserrat font-extrabold pl-1.5 sm:pl-2 text-[10.5px] sm:text-xs text-slate-900 tracking-tight truncate">
                    100% Free Placement
                  </span>
                </div>

                {/* 4. Immediate Joining */}
                <div className="group inline-flex items-center rounded-full border border-teal-500/70 bg-white/95 backdrop-blur-md p-1 pr-2.5 sm:pr-3.5 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-default">
                  <div className="relative -ml-0.5 flex h-6 w-6 sm:w-7 items-center justify-center bg-gradient-to-br from-teal-500 to-teal-700 text-white [clip-path:polygon(22%_0%,78%_0%,100%_50%,78%_100%,22%_100%,0%_50%)] shrink-0 filter drop-shadow-[0_1.5px_3px_rgba(20,184,166,0.35)] transition-transform duration-200 group-hover:scale-110">
                    <TrendingUp className="h-3 w-3 text-white" />
                  </div>
                  <span className="font-montserrat font-extrabold pl-1.5 sm:pl-2 text-[10.5px] sm:text-xs text-slate-900 tracking-tight truncate">
                    Immediate Joining
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Smiling Students Image (Clean, transparent, seamless PNG) */}
            <div className="relative lg:col-span-5 flex items-end justify-center lg:justify-end self-end">
              <div className="relative w-full max-w-lg lg:max-w-none flex justify-center lg:justify-end">
                <img
                  src={studentsHero}
                  alt="Smiling Students with Books and Laptop"
                  className="w-full h-auto object-contain max-h-[380px] sm:max-h-[440px] lg:max-h-[500px] select-none pointer-events-none drop-shadow-md lg:-mb-10"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SEARCH & FILTER CONSOLE */}
      <section className="relative -mt-6 z-20 mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="rounded-lg border border-slate-200/90 bg-white p-4 shadow-xs">
          {/* Top Row: Search + Location + Gender */}
          <div className="grid gap-2.5 lg:grid-cols-12 items-center">
            {/* Search Input */}
            <div className="relative lg:col-span-6">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search company (e.g. Wipro, OTIS), role, trade, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-md border border-slate-200 bg-slate-50/70 py-2 pl-9 pr-8 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 transition-colors focus:border-blue-500 focus:bg-white focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-0.5 text-slate-400 hover:text-slate-600"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Location Dropdown */}
            <div className="lg:col-span-3">
              <div className="relative">
                <MapPin className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full appearance-none rounded-md border border-slate-200 bg-slate-50/70 py-2 pl-8 pr-7 text-xs sm:text-sm font-medium text-slate-700 transition-colors focus:border-blue-500 focus:bg-white focus:outline-none cursor-pointer"
                >
                  <option value="ALL">All Locations ({jobs.length} companies)</option>
                  {locationList.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
                <ChevronRight className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 rotate-90 text-slate-400" />
              </div>
            </div>

            {/* Gender Dropdown */}
            <div className="lg:col-span-3">
              <div className="relative">
                <Users className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                <select
                  value={selectedGender}
                  onChange={(e) => setSelectedGender(e.target.value)}
                  className="w-full appearance-none rounded-md border border-slate-200 bg-slate-50/70 py-2 pl-8 pr-7 text-xs sm:text-sm font-medium text-slate-700 transition-colors focus:border-blue-500 focus:bg-white focus:outline-none cursor-pointer"
                >
                  <option value="ALL">All Candidates (Male & Female)</option>
                  <option value="Female">Female Candidates Only</option>
                  <option value="Male">Male Candidates Only</option>
                </select>
                <ChevronRight className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 rotate-90 text-slate-400" />
              </div>
            </div>
          </div>

          {/* Bottom Row: Qualification Tabs & Amenity Filters */}
          <div className="mt-3 pt-3 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-2.5">
            {/* Qualification Pills */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-slate-400 font-semibold mr-1">
                Qualification:
              </span>
              {[
                { label: "All Roles", value: "ALL" },
                { label: "SSLC / 10th", value: "SSLC" },
                { label: "PUC / 12th", value: "PUC" },
                { label: "ITI", value: "ITI" },
                { label: "Diploma", value: "Diploma" },
                { label: "BE / Degree", value: "BE" },
              ].map((q) => (
                <button
                  key={q.value}
                  onClick={() => setSelectedQualification(q.value)}
                  className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-all ${selectedQualification === q.value
                      ? "bg-slate-900 text-white shadow-2xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                    }`}
                >
                  {q.label}
                </button>
              ))}
            </div>

            {/* Perks Toggles */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <button
                onClick={() => setOnlyFreeFood(!onlyFreeFood)}
                className={`rounded-md border px-2.5 py-1 font-medium transition-colors ${onlyFreeFood
                    ? "border-emerald-500 bg-emerald-50 text-emerald-800 font-semibold"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
              >
                Free Food
              </button>

              <button
                onClick={() => setOnlyFreeAcc(!onlyFreeAcc)}
                className={`rounded-md border px-2.5 py-1 font-medium transition-colors ${onlyFreeAcc
                    ? "border-sky-500 bg-sky-50 text-sky-800 font-semibold"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
              >
                Free Stay
              </button>

              <button
                onClick={() => setOnlyFreeTransport(!onlyFreeTransport)}
                className={`rounded-md border px-2.5 py-1 font-medium transition-colors ${onlyFreeTransport
                    ? "border-purple-500 bg-purple-50 text-purple-800 font-semibold"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
              >
                Free Transport
              </button>

              {(selectedQualification !== "ALL" ||
                selectedLocation !== "ALL" ||
                selectedGender !== "ALL" ||
                searchQuery ||
                onlyFreeFood ||
                onlyFreeAcc ||
                onlyFreeTransport) && (
                  <button
                    onClick={() => {
                      setSelectedQualification("ALL");
                      setSelectedLocation("ALL");
                      setSelectedGender("ALL");
                      setSearchQuery("");
                      setOnlyFreeFood(false);
                      setOnlyFreeAcc(false);
                      setOnlyFreeTransport(false);
                    }}
                    className="text-xs font-semibold text-orange-600 hover:underline px-1.5"
                  >
                    Clear Filters
                  </button>
                )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. JOB OPENINGS GRID */}
      <section className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 xl:px-10 mt-8 sm:mt-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <h2 className="font-montserrat font-extrabold text-2xl sm:text-3xl lg:text-4xl tracking-tight text-slate-900">
              Available Job Openings
            </h2>
            <p className="font-montserrat font-semibold text-xs sm:text-sm text-slate-600 mt-1">
              Showing <strong className="font-montserrat font-extrabold text-slate-900">{filteredJobs.length}</strong> verified opportunities ({totalOpeningsCount.toLocaleString()} total vacancies)
            </p>
          </div>

          <div className="flex items-center">
            {/* Tagged Type UI Badge matching user reference */}
            <div className="inline-flex items-center rounded-full border border-emerald-500/80 bg-white/95 backdrop-blur-md p-1 pr-3 sm:pr-3.5 shadow-2xs hover:shadow-sm transition-all group cursor-default">
              <div className="relative -ml-0.5 flex h-6 w-6 sm:w-7 items-center justify-center bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 text-white [clip-path:polygon(22%_0%,78%_0%,100%_50%,78%_100%,22%_100%,0%_50%)] shrink-0 filter drop-shadow-[0_1.5px_3px_rgba(16,185,129,0.35)] transition-transform duration-200 group-hover:scale-110">
                <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-85"></span>
                  <span className="relative inline-flex rounded-full h-full w-full bg-white"></span>
                </span>
              </div>
              <span className="font-montserrat font-extrabold pl-1.5 sm:pl-2 text-xs sm:text-sm text-emerald-800 tracking-tight">
                Direct Recruitment Drives
              </span>
            </div>
          </div>
        </div>

        {filteredJobs.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-300 bg-white p-12 text-center shadow-xs">
            <Building2 className="mx-auto h-10 w-10 text-slate-300" />
            <h3 className="mt-3 text-base font-semibold text-slate-800">No matching job openings found</h3>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
              We couldn't find any job drives matching your current filter criteria.
            </p>
            <button
              onClick={() => {
                setSelectedQualification("ALL");
                setSelectedLocation("ALL");
                setSelectedGender("ALL");
                setSearchQuery("");
                setOnlyFreeFood(false);
                setOnlyFreeAcc(false);
                setOnlyFreeTransport(false);
              }}
              className="mt-4 rounded-md bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 transition-colors shadow-2xs"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid gap-3.5 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job) => {
              const hasFreePerks =
                job.food === "Free" ||
                job.accommodation === "Free" ||
                job.transport === "Free" ||
                job.food === "Subsidized Canteen";

              // Clean sub-note without duplicating the main salary figure
              let salaryExtraNote = "";
              if (job.salary.includes("Shift Allowance") && !job.salaryHighlight?.includes("Shift")) {
                salaryExtraNote = "+ Shift Allowance & Bonus";
              } else if (
                job.salary.includes("Local Conveyance") &&
                !job.salaryHighlight?.includes("Conveyance") &&
                !job.takeHomeHighlight?.includes("Conveyance")
              ) {
                salaryExtraNote = "+ ₹2,000 Local Conveyance";
              } else if (job.salary.includes("Free Stay & Food Included")) {
                salaryExtraNote = "Free Stay & Food Included";
              } else if (job.salary.includes("Based on Qualification")) {
                salaryExtraNote = "Based on Qualification";
              } else if (job.salary.includes("Free Food & Cab")) {
                salaryExtraNote = "Free Food & Cab Included";
              } else if (job.salary.includes("15K + ₹1.5K Bonus") || job.salary.includes("18K + ₹1.5K Bonus")) {
                salaryExtraNote = "+ ₹1,500 Monthly Bonus";
              }

              return (
                <div
                  key={job.id}
                  className="group flex flex-col justify-between rounded-lg border border-slate-200/90 bg-white p-3.5 sm:p-4 shadow-2xs hover:border-slate-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-out"
                >
                  <div>
                    {/* Top Row: Logo / Monogram + Company & Sector + Openings */}
                    <div className="flex items-start justify-between gap-2.5">
                      <div className="flex items-center gap-2.5 min-w-0">
                        {COMPANY_LOGOS[job.company] ? (
                          <div className="w-12 h-9 rounded-md bg-white border border-slate-200/90 p-1 flex items-center justify-center shrink-0 shadow-2xs">
                            <img
                              src={COMPANY_LOGOS[job.company]}
                              alt={job.company}
                              className="max-h-full max-w-full object-contain"
                              loading="lazy"
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-9 rounded-md bg-slate-900 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0 tracking-wider shadow-2xs">
                            {getCompanyCode(job.company)}
                          </div>
                        )}
                        <div className="min-w-0">
                          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider truncate">
                            {job.sector || "Manufacturing"}
                          </div>
                          <div className="font-montserrat font-bold text-xs sm:text-sm text-slate-800 truncate" title={job.company}>
                            {job.company}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {job.status === "Paused" && (
                          <span className="font-montserrat font-bold rounded bg-amber-50 px-2 py-0.5 text-[10.5px] text-amber-700 border border-amber-300/80 whitespace-nowrap">
                            Paused
                          </span>
                        )}
                        <span className="font-montserrat font-bold rounded bg-emerald-50 px-2 py-0.5 text-[11px] text-emerald-700 border border-emerald-200/80 whitespace-nowrap shrink-0">
                          {job.openings} Openings
                        </span>
                      </div>
                    </div>

                    {/* Role Title */}
                    <h3 className="font-montserrat font-extrabold mt-2.5 text-[15px] sm:text-[16px] text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1 leading-snug tracking-tight">
                      {job.roleTitle || job.trade}
                    </h3>

                    {/* Location, Gender/Age, Category */}
                    <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500 flex-wrap">
                      <span className="font-medium text-slate-700">{job.location}</span>
                      <span className="text-slate-300">•</span>
                      <span>{job.gender} ({job.age} yrs)</span>
                      <span className="text-slate-300">•</span>
                      <span className="font-semibold text-slate-700">{job.category}</span>
                    </div>

                    {/* Offered Salary / Stipend Block */}
                    <div className="mt-2.5 rounded-xl bg-slate-50 border border-slate-200/80 p-2.5">
                      <div className="font-montserrat font-bold text-[9.5px] uppercase tracking-wider text-slate-400">
                        Offered Salary / Stipend
                      </div>
                      <div className="mt-1 flex items-baseline justify-between gap-2 flex-wrap">
                        <span className="font-montserrat font-extrabold text-[16px] text-slate-900 tracking-tight">
                          {job.salaryHighlight || job.salary.split("/-")[0]}
                        </span>
                        {job.takeHomeHighlight && (
                          <span className="font-montserrat font-bold text-[10.5px] text-emerald-800 bg-emerald-100/70 border border-emerald-200/80 px-2 py-0.5 rounded whitespace-nowrap">
                            {job.takeHomeHighlight}
                          </span>
                        )}
                      </div>

                      {salaryExtraNote && (
                        <div className="text-[10.5px] font-medium text-slate-500 mt-1">
                          {salaryExtraNote}
                        </div>
                      )}
                    </div>

                    {/* Specifications: Eligibility & Trade */}
                    <div className="mt-2 space-y-0.5 text-xs text-slate-600 border-t border-slate-100 pt-2">
                      <div className="line-clamp-1">
                        <span className="font-semibold text-slate-700">Eligibility: </span>
                        <span>{job.qualification}</span>
                      </div>
                      <div className="line-clamp-1">
                        <span className="font-semibold text-slate-700">Trade: </span>
                        <span>{job.trade}</span>
                      </div>
                    </div>

                    {/* Perks / Benefits Tags (No icons, clean text tags) */}
                    {hasFreePerks && (
                      <div className="mt-2 flex flex-wrap gap-1.5 pt-1.5 border-t border-slate-100">
                        {job.food === "Free" && (
                          <span className="rounded bg-slate-100 text-slate-700 text-[10.5px] font-medium px-2 py-0.5 border border-slate-200/50">
                            Free Meals
                          </span>
                        )}
                        {job.food === "Subsidized Canteen" && (
                          <span className="rounded bg-slate-100 text-slate-700 text-[10.5px] font-medium px-2 py-0.5 border border-slate-200/50">
                            Canteen Available
                          </span>
                        )}
                        {job.accommodation === "Free" && (
                          <span className="rounded bg-slate-100 text-slate-700 text-[10.5px] font-medium px-2 py-0.5 border border-slate-200/50">
                            Free Stay
                          </span>
                        )}
                        {job.transport === "Free" && (
                          <span className="rounded bg-slate-100 text-slate-700 text-[10.5px] font-medium px-2 py-0.5 border border-slate-200/50">
                            Free Transport
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
                    {job.status === "Paused" ? (
                      <span className="text-[11px] font-semibold text-amber-600 flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                        Drive Paused
                      </span>
                    ) : (
                      <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Direct Drive
                      </span>
                    )}

                    {job.status === "Paused" ? (
                      <button
                        disabled
                        className="rounded-xl bg-slate-100 text-slate-400 text-xs font-semibold px-4 py-2 cursor-not-allowed border border-slate-200"
                        title="This recruitment drive is currently paused by admin"
                      >
                        On Hold
                      </button>
                    ) : (
                      <button
                        onClick={() => setActiveJobForApply(job)}
                        className="group relative inline-flex items-center gap-1.5 overflow-hidden rounded-xl bg-gradient-to-r from-[#FF6B00] via-[#FF7A1A] to-[#EA580C] px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-orange-500/25 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-xl hover:shadow-orange-500/40 active:translate-y-0 active:scale-95"
                      >
                        {/* Shimmer sweep reflection on hover */}
                        <span className="absolute inset-0 w-1/2 h-full bg-white/25 skew-x-[-25deg] -translate-x-full group-hover:translate-x-[300%] transition-transform duration-700 ease-out pointer-events-none" />
                        
                        <span>Apply Now</span>
                        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 shrink-0" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 4. APPLICATION FORM MODAL */}
      {activeJobForApply && (
        <ApplyModal
          job={activeJobForApply}
          onClose={() => setActiveJobForApply(null)}
        />
      )}
    </div>
  );
}

/**
 * Clean & Professional Application Modal with Document Uploaders
 */
interface ApplyModalProps {
  job: JobOpening;
  onClose: () => void;
}

function ApplyModal({ job, onClose }: ApplyModalProps) {
  // Parse locations: e.g. "Bangalore & Chennai" -> ["Bangalore", "Chennai"]
  const availableLocations = useMemo(() => {
    if (!job.location) return ["Karnataka"];
    const parts = job.location
      .split(/&|\band\b|\/|,/i)
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    if (parts.length > 1) {
      return [...parts, `Open to Both (${parts.join(" & ")})`];
    }
    return [job.location];
  }, [job.location]);

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    dob: "",
    gender: job.gender === "Female" ? "Female" : job.gender === "Male" ? "Male" : "Male",
    preferredLocation: availableLocations[0],
    qualification: job.qualification.split(",")[0].trim() || "ITI",
    trade: job.trade === "Any Trade" ? "" : job.trade.split(",")[0].trim(),
    address: "",
  });

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [marksCardFile, setMarksCardFile] = useState<File | null>(null);
  const [additionalDocFile, setAdditionalDocFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: "resume" | "markscard" | "additional") => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error(`"${file.name}" exceeds 2MB limit (${(file.size / (1024 * 1024)).toFixed(1)}MB). Please upload a document under 2MB.`);
        e.target.value = "";
        return;
      }
      if (type === "resume") {
        setResumeFile(file);
        toast.success(`Resume "${file.name}" attached (${(file.size / 1024).toFixed(0)} KB).`);
      } else if (type === "markscard") {
        setMarksCardFile(file);
        toast.success(`Marks Card "${file.name}" attached (${(file.size / 1024).toFixed(0)} KB).`);
      } else {
        setAdditionalDocFile(file);
        toast.success(`Additional document "${file.name}" attached (${(file.size / 1024).toFixed(0)} KB).`);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.contact.trim() || !formData.address.trim()) {
      toast.error("Please fill in your Name, Contact Mobile, and Address.");
      return;
    }

    setLoading(true);
    try {
      await submitJobApplication({
        jobId: job.id,
        jobCompany: job.company,
        jobRole: job.roleTitle || job.trade,
        name: formData.name,
        email: formData.email,
        contact: formData.contact,
        dob: formData.dob,
        gender: formData.gender,
        address: formData.address,
        qualification: formData.qualification,
        trade: formData.trade,
        preferredLocation: formData.preferredLocation,
        resumeFile: resumeFile,
        marksCardFile: marksCardFile,
        additionalDocFile: additionalDocFile,
      });

      setSubmittedSuccess(true);
      toast.success(`Application for ${job.company} successfully submitted!`);
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Application submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm overflow-y-auto"
      data-lenis-prevent
    >
      <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl my-6 border border-slate-200">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 p-6 bg-slate-50/80 rounded-t-2xl gap-4">
          <div className="flex items-center gap-3.5 min-w-0">
            {COMPANY_LOGOS[job.company] ? (
              <div className="w-14 h-11 rounded-md bg-white border border-slate-200 p-1 flex items-center justify-center shrink-0 shadow-2xs">
                <img
                  src={COMPANY_LOGOS[job.company]}
                  alt={job.company}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ) : (
              <div className="w-12 h-10 rounded-md bg-slate-900 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0 tracking-wider shadow-2xs">
                {getCompanyCode(job.company)}
              </div>
            )}
            <div className="min-w-0">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-blue-700 border border-blue-200/60">
                Applying for {job.sector || "Manufacturing"}
              </div>
              <h3 className="mt-1 text-lg sm:text-xl font-bold text-slate-900 truncate">{job.roleTitle || job.company}</h3>
              <p className="text-xs text-slate-500 mt-0.5 truncate">
                Company: <span className="font-semibold text-slate-700">{job.company}</span> • Location:{" "}
                <span className="font-semibold text-slate-700">{job.location}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-colors shrink-0"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {submittedSuccess ? (
          <div className="p-8 sm:p-10 text-center space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-xs">
              <Check className="h-8 w-8 stroke-[3]" />
            </div>

            <div className="space-y-1">
              <span className="font-montserrat font-bold inline-block text-xs uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/80 mb-1">
                Application Received Successfully
              </span>
              <h3 className="font-montserrat font-extrabold text-2xl sm:text-3xl tracking-tight text-slate-900">
                Thank You!
              </h3>
            </div>

            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Your application and documents for <strong className="text-slate-900">{job.company}</strong> ({job.roleTitle || job.trade}) have been recorded successfully. Our recruitment team will review your profile and contact you soon on your mobile number.
            </p>

            <div className="pt-4 flex justify-center">
              <button
                onClick={onClose}
                className="font-montserrat font-bold w-full sm:w-auto rounded-xl bg-gradient-to-r from-[#FF6B00] via-[#FF7A1A] to-[#EA580C] hover:from-[#EA580C] hover:to-[#C2410C] px-8 py-3 text-sm text-white shadow-md shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all"
              >
                Close & Browse More Jobs
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
            {/* Step 1: Personal Details */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-blue-600" /> 1. Personal Details
              </h4>
              <div className="grid gap-3.5 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Candidate Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="contact"
                    required
                    value={formData.contact}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@gmail.com"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Gender</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none cursor-pointer"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Date of Birth</label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 px-2 py-1.5 text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Address & Education */}
            <div className="border-t border-slate-100 pt-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-blue-600" /> 2. Address & Educational Background
              </h4>
              <div className="space-y-3.5">
                {/* Preferred Work Location Dropdown */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-blue-600" /> Preferred Work Location <span className="text-red-500">*</span>
                    </span>
                    {availableLocations.length > 1 && (
                      <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200/80">
                        {availableLocations.length - 1} Locations Offered
                      </span>
                    )}
                  </label>
                  <div className="relative">
                    <select
                      name="preferredLocation"
                      value={formData.preferredLocation}
                      onChange={handleChange}
                      className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2 text-sm font-semibold text-slate-800 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                    >
                      {availableLocations.map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                    <ChevronRight className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 rotate-90 text-slate-400" />
                  </div>
                  <p className="text-[10.5px] text-slate-400 mt-1">
                    Select your preferred posting city for this drive (Drive Location: <strong className="text-slate-600">{job.location}</strong>)
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Permanent / Current Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="address"
                    required
                    rows={2}
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Village / Town, Taluk, District, Pin Code"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="grid gap-3.5 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Highest Qualification <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="qualification"
                      required
                      value={formData.qualification}
                      onChange={handleChange}
                      placeholder="e.g. ITI, Diploma, SSLC, PUC, BE"
                      className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Trade / Specialization
                    </label>
                    <input
                      type="text"
                      name="trade"
                      value={formData.trade}
                      onChange={handleChange}
                      placeholder="e.g. Electrician, Fitter, Mechanical"
                      className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Documents Upload */}
            <div className="border-t border-slate-100 pt-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5 text-blue-600" /> 3. Document Uploads (Resume & Certificates)
              </h4>
              <p className="text-xs text-slate-500 mb-3">
                Attach your resume and academic/trade certificates for faster verification by company recruiters.
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                {/* 1. Resume Upload */}
                <div className="rounded-xl border border-dashed border-slate-300 p-3.5 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="h-4 w-4 text-orange-500" />
                    <label className="text-xs font-bold text-slate-800">Resume / Bio-Data</label>
                  </div>
                  <p className="text-[11px] text-slate-400 mb-2">PDF, DOC, DOCX up to 2MB</p>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,image/*"
                    onChange={(e) => handleFileChange(e, "resume")}
                    className="block w-full text-xs text-slate-500 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-orange-500 file:text-white hover:file:bg-orange-600 cursor-pointer"
                  />
                  {resumeFile && (
                    <div className="mt-2 text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Attached: {resumeFile.name}
                    </div>
                  )}
                </div>

                {/* 2. Marks Card Upload */}
                <div className="rounded-xl border border-dashed border-slate-300 p-3.5 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-2 mb-1">
                    <GraduationCap className="h-4 w-4 text-sky-500" />
                    <label className="text-xs font-bold text-slate-800">Marks Card / Certificate</label>
                  </div>
                  <p className="text-[11px] text-slate-400 mb-2">10th / ITI / Diploma Marks Card (up to 2MB)</p>
                  <input
                    type="file"
                    accept=".pdf,image/*"
                    onChange={(e) => handleFileChange(e, "markscard")}
                    className="block w-full text-xs text-slate-500 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-sky-600 file:text-white hover:file:bg-sky-700 cursor-pointer"
                  />
                  {marksCardFile && (
                    <div className="mt-2 text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Attached: {marksCardFile.name}
                    </div>
                  )}
                </div>

                {/* 3. Additional Document / ID Proof Upload */}
                <div className="sm:col-span-2 rounded-xl border border-dashed border-slate-300 p-3.5 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-2 mb-1">
                    <ShieldCheck className="h-4 w-4 text-purple-600" />
                    <label className="text-xs font-bold text-slate-800">
                      Additional Document / Aadhaar Card / Experience Certificate (Optional)
                    </label>
                  </div>
                  <p className="text-[11px] text-slate-400 mb-2">
                    Aadhaar card, ITI apprenticeship certificate, or past experience letter (PDF, Image up to 2MB)
                  </p>
                  <input
                    type="file"
                    accept=".pdf,image/*,.doc,.docx"
                    onChange={(e) => handleFileChange(e, "additional")}
                    className="block w-full text-xs text-slate-500 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 cursor-pointer"
                  />
                  {additionalDocFile && (
                    <div className="mt-2 text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Attached: {additionalDocFile.name}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={onClose}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`group relative overflow-hidden inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#FF6B00] via-[#FF7A1A] to-[#EA580C] px-7 py-3 text-sm font-bold text-white shadow-md shadow-orange-500/25 transition-all duration-200 ease-out ${loading
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:-translate-y-0.5 hover:shadow-xl hover:shadow-orange-500/40 active:translate-y-0 active:scale-98"
                  }`}
              >
                {/* Shimmer sweep reflection on hover */}
                <span className="absolute inset-0 w-1/2 h-full bg-white/25 skew-x-[-25deg] -translate-x-full group-hover:translate-x-[300%] transition-transform duration-700 ease-out pointer-events-none" />

                {loading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Submitting Application...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Application</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 shrink-0" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
