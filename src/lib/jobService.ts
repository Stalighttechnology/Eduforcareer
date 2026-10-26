import { supabase } from "@/lib/supabase";

export interface JobOpening {
  id: string;
  sNo: number;
  company: string;
  roleTitle?: string;
  sector?: string;
  qualification: string;
  trade: string;
  category: string; // NAPS / Contractual Staffing
  gender: "Male" | "Female" | "Male & Female";
  age: string;
  salary: string;
  salaryHighlight?: string;
  takeHomeHighlight?: string;
  accommodation: "Free" | "No";
  food: "Free" | "Subsidized Canteen" | "No";
  transport: "Free" | "No";
  location: string;
  state: string;
  openings: number;
  featured?: boolean;
  status?: "Active" | "Paused" | "Closed";
}

export interface JobApplicationSubmission {
  jobId: string;
  jobCompany: string;
  jobRole: string;
  name: string;
  email?: string;
  contact: string;
  dob?: string;
  gender?: string;
  address: string;
  qualification: string;
  trade?: string;
  preferredLocation?: string;
  resumeFile?: File | null;
  marksCardFile?: File | null;
  additionalDocFile?: File | null;
}

export interface StoredJobApplication {
  id: string;
  job_id: string;
  job_company: string;
  job_role: string;
  name: string;
  email: string | null;
  contact: string;
  dob: string | null;
  gender: string | null;
  address: string;
  qualification: string;
  trade: string | null;
  preferred_location?: string | null;
  resume_url: string | null;
  marks_card_url: string | null;
  additional_doc_url?: string | null;
  status: "Pending" | "Shortlisted" | "Contacted" | "Rejected";
  notes?: string | null;
  created_at: string;
}

export const SEED_JOBS: JobOpening[] = [
  {
    id: "job-1",
    sNo: 1,
    company: "Mobile Manufacturing Company Devanahalli",
    roleTitle: "Mobile Assembly & Production Specialist",
    sector: "Electronics & Smartphone Mfg",
    qualification: "SSLC, PUC, ITI, Diploma, Graduate",
    trade: "Any Trade",
    category: "Contractual Staffing",
    gender: "Female",
    age: "18-30",
    salary: "Rs. 18,258/- CTC (Rs. 15,700/- Take Home including Shift Allowance & Attendance Bonus)",
    salaryHighlight: "₹18,258 CTC",
    takeHomeHighlight: "₹15,700 In-Hand + Bonus",
    accommodation: "Free",
    food: "Free",
    transport: "Free",
    location: "Devanahalli, Bangalore",
    state: "Karnataka",
    openings: 500,
    featured: true,
  },
  {
    id: "job-2",
    sNo: 4,
    company: "Pitti Industries Pvt Ltd",
    roleTitle: "CNC Machinist / Tool & Die Technician",
    sector: "Precision Heavy Engineering",
    qualification: "SSLC, PUC & ITI",
    trade: "Fitter, Turner, Electrician, Mechanical, Tool & Die Making (TDM), Electronic Mechanic & Machinist",
    category: "NAPS",
    gender: "Male",
    age: "18-22",
    salary: "Rs. 17,500/-",
    salaryHighlight: "₹17,500",
    takeHomeHighlight: "Monthly Stipend",
    accommodation: "No",
    food: "Free",
    transport: "Free",
    location: "Tumkur",
    state: "Karnataka",
    openings: 150,
    featured: true,
  },
  {
    id: "job-3",
    sNo: 6,
    company: "OTIS",
    roleTitle: "Elevator Electrical Installation Tech",
    sector: "Elevators & Escalators",
    qualification: "ITI",
    trade: "Electrical",
    category: "NAPS",
    gender: "Male",
    age: "18-28",
    salary: "Rs. 18,217/- + Local Conveyance Rs. 2,000/-",
    salaryHighlight: "₹18,217",
    takeHomeHighlight: "+ ₹2,000 Local Conveyance",
    accommodation: "No",
    food: "No",
    transport: "No",
    location: "Bangalore & Chennai",
    state: "Karnataka",
    openings: 60,
  },
  {
    id: "job-4",
    sNo: 8,
    company: "Avirata Defence Systems",
    roleTitle: "Defence Systems & Electronics Tech",
    sector: "Aerospace & Defence Systems",
    qualification: "ITI, Diploma",
    trade: "ITI- Any Trade, Diploma- EEE, ECE, EM",
    category: "Contractual Staffing",
    gender: "Male",
    age: "18-25",
    salary: "Diploma: Rs. 21,836 CTC (Rs. 16,941 NTH) + Shift Allowance Rs. 75-90/shift",
    salaryHighlight: "₹21,836 CTC",
    takeHomeHighlight: "₹16,941 NTH + Shift Bonus",
    accommodation: "No",
    food: "Subsidized Canteen",
    transport: "No",
    location: "Whitefield, Bangalore",
    state: "Karnataka",
    openings: 50,
  },
  {
    id: "job-5",
    sNo: 9,
    company: "Datacorp Traffic Pvt Ltd",
    roleTitle: "Traffic Systems & Hardware Associate",
    sector: "Smart Traffic & Computer Systems",
    qualification: "ITI, Diploma, Any Degree, BE",
    trade: "Related to Computer Courses",
    category: "NAPS",
    gender: "Male & Female",
    age: "18-30",
    salary: "Rs. 16,500/-",
    salaryHighlight: "₹16,500",
    takeHomeHighlight: "Fixed Monthly Stipend",
    accommodation: "No",
    food: "No",
    transport: "No",
    location: "Kengeri, Bangalore",
    state: "Karnataka",
    openings: 50,
  },
  {
    id: "job-6",
    sNo: 10,
    company: "Indomim",
    roleTitle: "Metal Injection Molding (MIM) Operator",
    sector: "Precision Metallurgy & Components",
    qualification: "ITI, Diploma",
    trade: "Any Trade",
    category: "NAPS",
    gender: "Male",
    age: "18-24",
    salary: "ITI: Rs. 14,900/- | Diploma: Rs. 15,700/-",
    salaryHighlight: "₹14,900 - ₹15,700",
    takeHomeHighlight: "Free Stay & Food Included",
    accommodation: "Free",
    food: "Free",
    transport: "Free",
    location: "Doddaballapura, Bangalore",
    state: "Karnataka",
    openings: 50,
  },
  {
    id: "job-7",
    sNo: 13,
    company: "Wipro GE Healthcare",
    roleTitle: "Medical Diagnostic Equipment Assembly Tech",
    sector: "Healthcare & MedTech",
    qualification: "Diploma",
    trade: "EEE, ECE, Mechanical, Automobile",
    category: "NAPS",
    gender: "Female",
    age: "18-24",
    salary: "Diploma: Rs. 20,000/-",
    salaryHighlight: "₹20,000",
    takeHomeHighlight: "Diploma Stipend",
    accommodation: "No",
    food: "Subsidized Canteen",
    transport: "No",
    location: "Whitefield, Bangalore",
    state: "Karnataka",
    openings: 30,
    featured: true,
  },
  {
    id: "job-8",
    sNo: 14,
    company: "Global Printing",
    roleTitle: "Industrial Printing & Finishing Tech",
    sector: "Packaging & Print Technology",
    qualification: "SSLC, PUC, ITI",
    trade: "Any Trade",
    category: "NAPS",
    gender: "Male & Female",
    age: "18-28",
    salary: "SSLC & PUC: Rs. 17,000/- | ITI: Rs. 19,000/-",
    salaryHighlight: "₹17,000 - ₹19,000",
    takeHomeHighlight: "Based on Qualification",
    accommodation: "No",
    food: "Subsidized Canteen",
    transport: "No",
    location: "Kumbalagodu, Bangalore",
    state: "Karnataka",
    openings: 25,
  },
  {
    id: "job-9",
    sNo: 16,
    company: "GE BEL",
    roleTitle: "Aerospace Radar & Avionics Assembly Tech",
    sector: "Aerospace & Defence Electronics",
    qualification: "ITI",
    trade: "Any Trade",
    category: "NAPS",
    gender: "Male",
    age: "18-24",
    salary: "ITI: Rs. 17,000/- + Shift Allowance",
    salaryHighlight: "₹17,000",
    takeHomeHighlight: "+ Shift Allowance & Cab",
    accommodation: "No",
    food: "Subsidized Canteen",
    transport: "Free",
    location: "Whitefield, Bangalore",
    state: "Karnataka",
    openings: 20,
  },
  {
    id: "job-10",
    sNo: 17,
    company: "Kern Liebers",
    roleTitle: "Precision Springs & Stamping Tech",
    sector: "Automotive Precision Springs",
    qualification: "ITI & Diploma",
    trade: "Any Trade",
    category: "NAPS",
    gender: "Male",
    age: "18-28",
    salary: "ITI: Rs. 17,984/- | Diploma: Rs. 18,964/-",
    salaryHighlight: "₹17,984 - ₹18,964",
    takeHomeHighlight: "ITI & Diploma",
    accommodation: "No",
    food: "Subsidized Canteen",
    transport: "No",
    location: "Tumkur",
    state: "Karnataka",
    openings: 20,
  },
  {
    id: "job-11",
    sNo: 18,
    company: "Felsomat",
    roleTitle: "Mechanical Machine Assembly & Fitter",
    sector: "Automated Systems & Tooling",
    qualification: "ITI, Diploma",
    trade: "Fitter, Mechanical",
    category: "NAPS",
    gender: "Male",
    age: "18-25",
    salary: "ITI: Rs. 18,000/- | Diploma: Rs. 19,500/-",
    salaryHighlight: "₹18,000 - ₹19,500",
    takeHomeHighlight: "Monthly Stipend",
    accommodation: "No",
    food: "Subsidized Canteen",
    transport: "No",
    location: "Doddaballapura, Bangalore",
    state: "Karnataka",
    openings: 13,
  },
  {
    id: "job-12",
    sNo: 19,
    company: "Trident",
    roleTitle: "Manufacturing Process & Machine Operator",
    sector: "Textiles & Engineering",
    qualification: "ITI, Diploma",
    trade: "Any Trade",
    category: "NAPS",
    gender: "Male",
    age: "18-30",
    salary: "ITI: Rs. 18,000/- | Diploma: Rs. 20,000/-",
    salaryHighlight: "₹18,000 - ₹20,000",
    takeHomeHighlight: "Monthly Stipend",
    accommodation: "No",
    food: "No",
    transport: "No",
    location: "Goraguntepalya, Bangalore",
    state: "Karnataka",
    openings: 10,
  },
  {
    id: "job-13",
    sNo: 20,
    company: "Ucam Pvt Ltd",
    roleTitle: "CNC Rotary Table & Turning Tech",
    sector: "CNC Machine Accessories",
    qualification: "ITI, Diploma",
    trade: "ITI: Fitter, Electrician, Mechanical, Turner | Diploma: Mechanical",
    category: "NAPS",
    gender: "Male",
    age: "18-24",
    salary: "ITI: Rs. 20,000/- | Diploma: Rs. 23,500 + 1,500",
    salaryHighlight: "₹20,000 - ₹25,000",
    takeHomeHighlight: "Free Food & Cab Included",
    accommodation: "No",
    food: "Free",
    transport: "Free",
    location: "Peenya, Dabaspet",
    state: "Karnataka",
    openings: 10,
  },
  {
    id: "job-14",
    sNo: 21,
    company: "Bilwa Technologies",
    roleTitle: "Advanced CNC Turning & Milling Machinist",
    sector: "Precision CNC Machining",
    qualification: "ITI",
    trade: "Fitter, Turner, Machinist, CNC Advance, Mechanical",
    category: "NAPS",
    gender: "Male",
    age: "18-26",
    salary: "Rs. 18,000 + 1,500 = Rs. 19,500/-",
    salaryHighlight: "₹19,500",
    takeHomeHighlight: "₹18K + ₹1.5K Bonus",
    accommodation: "No",
    food: "Subsidized Canteen",
    transport: "No",
    location: "Dabaspet",
    state: "Karnataka",
    openings: 10,
  },
  {
    id: "job-15",
    sNo: 22,
    company: "Unique Punch Systems Pvt Ltd",
    roleTitle: "CNC Turret Punching & Sheet Metal Tech",
    sector: "Precision Sheet Metal Systems",
    qualification: "ITI, Diploma",
    trade: "Any Trade",
    category: "NAPS",
    gender: "Male",
    age: "18-28",
    salary: "ITI: Rs. 18,000/- | Diploma: Rs. 21,500/-",
    salaryHighlight: "₹18,000 - ₹21,500",
    takeHomeHighlight: "Free Cab Included",
    accommodation: "No",
    food: "No",
    transport: "Free",
    location: "Nelamangala, Bangalore",
    state: "Karnataka",
    openings: 10,
  },
  {
    id: "job-16",
    sNo: 23,
    company: "Homag",
    roleTitle: "Industrial Woodworking Machinery Tech",
    sector: "Wood Processing Technology",
    qualification: "ITI & Diploma",
    trade: "Any Trade",
    category: "NAPS",
    gender: "Male",
    age: "18-27",
    salary: "ITI: Rs. 18,500+1,500 = 20,000/- | Diploma: Rs. 22,000+1,500 = 23,500/-",
    salaryHighlight: "₹20,000 - ₹23,500",
    takeHomeHighlight: "Free Food Included",
    accommodation: "No",
    food: "Free",
    transport: "No",
    location: "Dabaspet",
    state: "Karnataka",
    openings: 8,
  },
  {
    id: "job-17",
    sNo: 24,
    company: "Hawe Hydraulics",
    roleTitle: "Industrial Hydraulic Systems Tech",
    sector: "Hydraulics & Fluid Power",
    qualification: "ITI",
    trade: "Any Trade",
    category: "NAPS",
    gender: "Male",
    age: "18-30",
    salary: "Rs. 20,500/-",
    salaryHighlight: "₹20,500",
    takeHomeHighlight: "Free Food Included",
    accommodation: "No",
    food: "Free",
    transport: "No",
    location: "Dabaspet",
    state: "Karnataka",
    openings: 7,
  },
  {
    id: "job-18",
    sNo: 25,
    company: "BBM",
    roleTitle: "Mechanical Component Production Trainee",
    sector: "Automotive & Mechanical Mfg",
    qualification: "ITI",
    trade: "Any Trade",
    category: "NAPS",
    gender: "Male",
    age: "18-25",
    salary: "Based on Interview",
    salaryHighlight: "Best in Industry",
    takeHomeHighlight: "Free Food Included",
    accommodation: "No",
    food: "Free",
    transport: "No",
    location: "Peenya, Bangalore",
    state: "Karnataka",
    openings: 6,
  },
];

/**
 * Fetch all job openings from Supabase (if available, with fallback)
 */
export async function fetchJobsFromSupabase(): Promise<JobOpening[]> {
  try {
    const { data, error } = await supabase.from("jobs").select("*").order("openings", { ascending: false });
    if (!error && data && data.length > 0) {
      return data as JobOpening[];
    }
  } catch (err) {
    console.warn("Supabase jobs table not found or query error, using pre-seeded job records:", err);
  }
  return SEED_JOBS;
}

/**
 * Helper to upload file to Supabase storage 'job-documents'
 */
async function uploadDocument(file: File, folder: "resumes" | "markscards" | "documents", applicantName: string): Promise<string | null> {
  try {
    const cleanName = applicantName.toLowerCase().replace(/[^a-z0-9]/g, "-").slice(0, 30);
    const ext = file.name.split(".").pop() || "pdf";
    const path = `${folder}/${cleanName}_${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("job-documents")
      .upload(path, file, { cacheControl: "3600", upsert: true });

    if (uploadError) {
      console.warn(`File upload warning for ${folder}:`, uploadError.message);
      // Fallback: If bucket is not configured, generate local blob URL for immediate preview
      try {
        return URL.createObjectURL(file);
      } catch {
        return null;
      }
    }

    const { data } = supabase.storage.from("job-documents").getPublicUrl(path);
    return data?.publicUrl || null;
  } catch (e) {
    console.error(`Document upload error for ${folder}:`, e);
    return null;
  }
}

/**
 * Submit candidate application to Supabase table
 */
export async function submitJobApplication(application: JobApplicationSubmission) {
  let resumeUrl: string | null = null;
  let marksCardUrl: string | null = null;
  let additionalDocUrl: string | null = null;

  // 1. Upload Resume if provided
  if (application.resumeFile) {
    resumeUrl = await uploadDocument(application.resumeFile, "resumes", application.name);
  }

  // 2. Upload Marks Card / Certificate if provided
  if (application.marksCardFile) {
    marksCardUrl = await uploadDocument(application.marksCardFile, "markscards", application.name);
  }

  // 3. Upload Additional Document / ID Proof if provided
  if (application.additionalDocFile) {
    additionalDocUrl = await uploadDocument(application.additionalDocFile, "documents", application.name);
  }

  const payload = {
    job_id: application.jobId,
    job_company: application.jobCompany,
    job_role: application.jobRole,
    name: application.name.trim(),
    email: application.email?.trim() || null,
    contact: application.contact.trim(),
    dob: application.dob || null,
    gender: application.gender || null,
    address: application.address.trim(),
    qualification: application.qualification,
    trade: application.trade || null,
    preferred_location: application.preferredLocation || null,
    resume_url: resumeUrl,
    marks_card_url: marksCardUrl,
    additional_doc_url: additionalDocUrl,
    status: "Pending",
  };

  const { data, error } = await supabase
    .from("job_applications")
    .insert([payload])
    .select();

  if (error) {
    // If the table is not created yet, store in browser localStorage so admin can immediately test & see it!
    console.warn("Supabase job_applications insert failed, falling back to local persistence:", error.message);
    const localApps: StoredJobApplication[] = JSON.parse(localStorage.getItem("local_job_applications") || "[]");
    const simulatedRecord: StoredJobApplication = {
      id: "local-" + Date.now(),
      ...payload,
      created_at: new Date().toISOString(),
      status: "Pending",
    };
    localApps.unshift(simulatedRecord);
    localStorage.setItem("local_job_applications", JSON.stringify(localApps));
    return [simulatedRecord];
  }

  return data;
}

/**
 * Fetch applications for Admin, optionally filtered by jobId
 */
export async function getApplications(jobId?: string): Promise<StoredJobApplication[]> {
  let dbApps: StoredJobApplication[] = [];
  try {
    let query = supabase.from("job_applications").select("*").order("created_at", { ascending: false });
    if (jobId && jobId !== "ALL") {
      query = query.eq("job_id", jobId);
    }
    const { data, error } = await query;
    if (!error && data) {
      dbApps = data as StoredJobApplication[];
    }
  } catch (err) {
    console.warn("Fetching applications from Supabase encountered error:", err);
  }

  // Also merge with locally persisted applications (for testing before Supabase table is created)
  try {
    const localApps: StoredJobApplication[] = JSON.parse(localStorage.getItem("local_job_applications") || "[]");
    const filteredLocal = jobId && jobId !== "ALL" 
      ? localApps.filter(a => a.job_id === jobId)
      : localApps;
    
    // Combine and deduplicate by id
    const combined = [...dbApps];
    for (const localApp of filteredLocal) {
      if (!combined.some(a => a.id === localApp.id)) {
        combined.push(localApp);
      }
    }
    return combined.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  } catch {
    return dbApps;
  }
}

/**
 * Update application status (Pending -> Shortlisted / Contacted / Rejected)
 */
export async function updateApplicationStatus(id: string, newStatus: StoredJobApplication["status"], notes?: string) {
  try {
    await supabase
      .from("job_applications")
      .update({ status: newStatus, ...(notes ? { notes } : {}) })
      .eq("id", id);
  } catch (err) {
    console.warn("Failed to update status on Supabase, updating local fallback:", err);
  }

  // Update local storage fallback too
  try {
    const localApps: StoredJobApplication[] = JSON.parse(localStorage.getItem("local_job_applications") || "[]");
    const updated = localApps.map(a => a.id === id ? { ...a, status: newStatus, ...(notes ? { notes } : {}) } : a);
    localStorage.setItem("local_job_applications", JSON.stringify(updated));
  } catch (e) {
    console.error(e);
  }

  return true;
}

const JOBS_STORAGE_KEY = "trublend_managed_jobs_v1";

/**
 * Get all job openings, merging SEED_JOBS with any admin state (paused, edited openings, etc.)
 */
export function getJobs(): JobOpening[] {
  try {
    const stored = typeof window !== "undefined" ? localStorage.getItem(JOBS_STORAGE_KEY) : null;
    if (stored) {
      const parsed: JobOpening[] = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error("Error reading jobs from storage:", err);
  }
  // Initialize with SEED_JOBS, default status to Active
  return SEED_JOBS.map((j) => ({ ...j, status: j.status || "Active" }));
}

/**
 * Persist jobs list to storage and broadcast change
 */
export function saveJobs(jobs: JobOpening[]): void {
  try {
    localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(jobs));
    window.dispatchEvent(new Event("storage"));
  } catch (err) {
    console.error("Error saving jobs to storage:", err);
  }
}

/**
 * Toggle job drive status between 'Active' and 'Paused'
 */
export function toggleJobStatus(jobId: string): "Active" | "Paused" {
  const allJobs = getJobs();
  let updatedStatus: "Active" | "Paused" = "Active";
  const updatedJobs = allJobs.map((j) => {
    if (j.id === jobId) {
      updatedStatus = j.status === "Paused" ? "Active" : "Paused";
      return { ...j, status: updatedStatus };
    }
    return j;
  });
  saveJobs(updatedJobs);
  return updatedStatus;
}

/**
 * Update an existing job opening
 */
export function updateJobOpening(jobId: string, updates: Partial<JobOpening>): JobOpening | null {
  const allJobs = getJobs();
  let updatedJob: JobOpening | null = null;
  const updatedJobs = allJobs.map((j) => {
    if (j.id === jobId) {
      updatedJob = { ...j, ...updates };
      return updatedJob;
    }
    return j;
  });
  if (updatedJob) {
    saveJobs(updatedJobs);
  }
  return updatedJob;
}

/**
 * Add a new job opening
 */
export function addJobOpening(newJobData: Omit<JobOpening, "id">): JobOpening {
  const allJobs = getJobs();
  const newJob: JobOpening = {
    ...newJobData,
    id: "job-" + Date.now(),
    sNo: allJobs.length + 1,
    status: newJobData.status || "Active",
  };
  const updated = [newJob, ...allJobs];
  saveJobs(updated);
  return newJob;
}

/**
 * Delete a job opening
 */
export function deleteJobOpening(jobId: string): void {
  const allJobs = getJobs();
  const filtered = allJobs.filter((j) => j.id !== jobId);
  saveJobs(filtered);
}

/**
 * Reset jobs to initial default list
 */
export function resetJobsToDefault(): JobOpening[] {
  try {
    localStorage.removeItem(JOBS_STORAGE_KEY);
    window.dispatchEvent(new Event("storage"));
  } catch (err) {
    console.error(err);
  }
  return SEED_JOBS.map((j) => ({ ...j, status: "Active" }));
}

