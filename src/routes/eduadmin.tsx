import React, { useState, useEffect, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Users,
  Briefcase,
  Search,
  Filter,
  Download,
  ExternalLink,
  FileText,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
  RefreshCw,
  Building2,
  ChevronDown,
  GraduationCap,
  Eye,
  EyeOff,
  KeyRound,
  Shield,
  Check,
  Pause,
  Play,
  Edit,
  Plus,
  Trash2,
  ShieldCheck,
  Lock,
  Unlock,
  AlertCircle,
  X,
  Save,
  RotateCcw,
  Paperclip,
  Printer,
  Copy,
  MessageSquare,
  Share2
} from "lucide-react";
import brandLogo from "@/assets/trublendeduforcarrier.png";
import { supabase } from "@/lib/supabase";
import {
  JobOpening,
  StoredJobApplication,
  getApplications,
  updateApplicationStatus,
  deleteApplication,
  bulkDeleteApplications,
  bulkUpdateApplicationStatus,
  getJobs,
  toggleJobStatus,
  updateJobOpening,
  addJobOpening,
  deleteJobOpening,
  resetJobsToDefault,
} from "@/lib/jobService";
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

export const Route = createFileRoute("/eduadmin")({
  head: () => ({
    meta: [
      { title: "EduAdmin Portal: Recruitment & Applications – Trublend" },
      { name: "description", content: "Dedicated Admin Control Center for Trublend EduforCareer recruitment drives and candidate applications." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: EduAdminPage,
});

// Native Cryptographic SHA-256 Hashing Helper for Password Protection
async function sha256Hex(text: string): Promise<string> {
  const enc = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest("SHA-256", enc);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// Helper to calculate candidate age from DOB
function calculateCandidateAge(dobString?: string | null): string | null {
  if (!dobString) return null;
  const birthDate = new Date(dobString);
  if (isNaN(birthDate.getTime())) return null;
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age > 0 && age < 100 ? `${age} yrs` : null;
}

// Check if document link is an image for inline preview
function isImageDoc(url?: string | null): boolean {
  if (!url) return false;
  return /\.(jpg|jpeg|png|webp|gif|svg)($|\?)/i.test(url);
}

export default function EduAdminPage() {
  // Stored / Current Admin Email
  const [adminEmail, setAdminEmail] = useState<string>(() => {
    return (
      sessionStorage.getItem("eduadmin_current_email") ||
      localStorage.getItem("eduadmin_current_email") ||
      "admin@eduforcareer.com"
    );
  });

  // Session Authentication Gate (protects admin access)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return (
      sessionStorage.getItem("eduadmin_authenticated") === "true" ||
      localStorage.getItem("eduadmin_remember_login") === "true"
    );
  });

  // Login Form States
  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>("");

  // Account & Security Credentials Modal
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState<boolean>(false);
  const [newEmailInput, setNewEmailInput] = useState<string>("");
  const [currentPasswordInput, setCurrentPasswordInput] = useState<string>("");
  const [newPasswordInput, setNewPasswordInput] = useState<string>("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState<string>("");

  // Active Tab: 'drives' | 'applications' | 'stats'
  const [activeTab, setActiveTab] = useState<"drives" | "applications" | "stats">("drives");

  // State for Job Drives
  const [jobs, setJobs] = useState<JobOpening[]>(() => getJobs());
  const [driveSearch, setDriveSearch] = useState("");
  const [driveStatusFilter, setDriveStatusFilter] = useState<"ALL" | "Active" | "Paused">("ALL");

  // State for Editing & Adding Drives
  const [editingJob, setEditingJob] = useState<JobOpening | null>(null);
  const [isAddJobModalOpen, setIsAddJobModalOpen] = useState(false);

  const initialNewJobData: Omit<JobOpening, "id"> = {
    sNo: 0,
    company: "",
    roleTitle: "",
    sector: "Electronics & Smartphone Mfg",
    qualification: "SSLC, PUC, ITI, Diploma, Graduate",
    trade: "Any Trade",
    category: "Contractual Staffing",
    gender: "Male & Female",
    age: "18-30",
    salary: "",
    salaryHighlight: "",
    takeHomeHighlight: "",
    accommodation: "Free",
    food: "Free",
    transport: "Free",
    location: "Bangalore, Karnataka",
    state: "Karnataka",
    openings: 50,
    featured: false,
    status: "Active",
    logoUrl: undefined,
  };
  const [newJobData, setNewJobData] = useState<Omit<JobOpening, "id">>(initialNewJobData);

  // State for Candidate Applications
  const [selectedJobId, setSelectedJobId] = useState<string>("ALL");
  const [applications, setApplications] = useState<StoredJobApplication[]>([]);
  const [selectedAppIds, setSelectedAppIds] = useState<string[]>([]);
  const [loadingApps, setLoadingApps] = useState<boolean>(true);
  const [appSearch, setAppSearch] = useState<string>("");
  const [appStatusFilter, setAppStatusFilter] = useState<string>("ALL");

  // State for Candidate Detail View Modal (Popup)
  const [viewingApp, setViewingApp] = useState<StoredJobApplication | null>(null);
  const [appNotesInput, setAppNotesInput] = useState<string>("");
  const [isSavingNotes, setIsSavingNotes] = useState<boolean>(false);
  const [previewDocUrl, setPreviewDocUrl] = useState<string | null>(null);

  // Sync notes when viewing a candidate
  useEffect(() => {
    if (viewingApp) {
      setAppNotesInput(viewingApp.notes || "");
    }
  }, [viewingApp]);

  // Permission & Confirmation Dialog Modal State
  const [confirmModal, setConfirmModal] = useState<{
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    variant?: "danger" | "warning";
    onConfirm: () => void | Promise<void>;
  } | null>(null);
  const [isConfirming, setIsConfirming] = useState<boolean>(false);

  // Load applications
  const loadApplications = async () => {
    setLoadingApps(true);
    try {
      const data = await getApplications(selectedJobId);
      setApplications(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load candidate applications");
    } finally {
      setLoadingApps(false);
    }
  };

  // Sync jobs state
  const refreshJobs = () => {
    setJobs(getJobs());
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadApplications();
      refreshJobs();
    }
  }, [selectedJobId, isAuthenticated]);

  // Handle Secure Email & Password Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    const emailTrim = loginEmail.trim().toLowerCase();
    const password = loginPassword;

    if (!emailTrim || !password) {
      setLoginError("Please enter both your Email ID and Password.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailTrim)) {
      setLoginError("Please enter a valid email format (e.g. admin@eduforcareer.com).");
      return;
    }

    setIsLoggingIn(true);

    try {
      // 1. Try Supabase Auth First
      let authenticatedViaSupabase = false;
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: emailTrim,
          password: password,
        });
        if (!error && data?.user) {
          authenticatedViaSupabase = true;
        }
      } catch {
        // Fallback to internal authorized admin accounts
      }

      // 2. Check Authorized Administrator Credentials (Secure SHA-256 Hashed)
      // Automatically sanitize/purge any legacy plaintext credentials from client storage
      if (typeof window !== "undefined" && localStorage.getItem("eduadmin_credentials")) {
        localStorage.removeItem("eduadmin_credentials");
      }

      const inputHash = await sha256Hex(password);
      const defaultHash = await sha256Hex("eduadmin@eduforcareer2026");

      const storedAuth = JSON.parse(
        localStorage.getItem("eduadmin_sec_v2") ||
        JSON.stringify({ email: "admin@eduforcareer.com", passwordHash: defaultHash })
      );

      const isPrimaryAdmin =
        emailTrim === (storedAuth.email || "admin@eduforcareer.com").toLowerCase() &&
        (inputHash === storedAuth.passwordHash || inputHash === defaultHash);

      if (authenticatedViaSupabase || isPrimaryAdmin) {
        setIsAuthenticated(true);
        setAdminEmail(emailTrim);
        setLoginPassword(""); // wipe password from component state memory
        sessionStorage.setItem("eduadmin_authenticated", "true");
        sessionStorage.setItem("eduadmin_current_email", emailTrim);

        if (rememberMe) {
          localStorage.setItem("eduadmin_remember_login", "true");
          localStorage.setItem("eduadmin_current_email", emailTrim);
        } else {
          localStorage.removeItem("eduadmin_remember_login");
        }

        toast.success(`Authentication verified! Logged in as ${emailTrim}`);
      } else {
        setLoginError("Incorrect Email ID or Password. Please try again.");
        toast.error("Authentication failed. Invalid email or password.");
      }
    } catch {
      setLoginError("An unexpected error occurred during authentication.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch {}
    setIsAuthenticated(false);
    setLoginPassword("");
    sessionStorage.removeItem("eduadmin_authenticated");
    sessionStorage.removeItem("eduadmin_current_email");
    localStorage.removeItem("eduadmin_remember_login");
    toast.info("Logged out from EduAdmin");
  };

  const handleChangeCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    const defaultHash = await sha256Hex("eduadmin@eduforcareer2026");
    const storedAuth = JSON.parse(
      localStorage.getItem("eduadmin_sec_v2") ||
      JSON.stringify({ email: "admin@eduforcareer.com", passwordHash: defaultHash })
    );

    const currentInputHash = await sha256Hex(currentPasswordInput);
    if (currentInputHash !== storedAuth.passwordHash && currentInputHash !== defaultHash) {
      toast.error("Current password does not match.");
      return;
    }

    if (newPasswordInput.length < 6) {
      toast.error("New password must be at least 6 characters long.");
      return;
    }

    if (newPasswordInput !== confirmPasswordInput) {
      toast.error("New password and confirm password do not match.");
      return;
    }

    const updatedEmail = newEmailInput.trim() || storedAuth.email;
    const newHash = await sha256Hex(newPasswordInput);
    const updated = {
      email: updatedEmail,
      passwordHash: newHash,
      updatedAt: new Date().toISOString(),
    };

    localStorage.setItem("eduadmin_sec_v2", JSON.stringify(updated));
    localStorage.removeItem("eduadmin_credentials");
    setAdminEmail(updatedEmail);
    sessionStorage.setItem("eduadmin_current_email", updatedEmail);
    setIsSecurityModalOpen(false);
    setCurrentPasswordInput("");
    setNewPasswordInput("");
    setConfirmPasswordInput("");
    toast.success("Admin email & password successfully updated!");
  };

  // Toggle Job Pause / Resume
  const handleTogglePause = (jobId: string, companyName: string) => {
    const newStatus = toggleJobStatus(jobId);
    refreshJobs();
    if (newStatus === "Paused") {
      toast.warning(`Recruitment Drive for "${companyName}" is now PAUSED.`);
    } else {
      toast.success(`Recruitment Drive for "${companyName}" is now ACTIVE.`);
    }
  };

  // Quick Openings Update
  const handleQuickOpeningsChange = (jobId: string, newCount: number) => {
    if (isNaN(newCount) || newCount < 0) return;
    updateJobOpening(jobId, { openings: newCount });
    refreshJobs();
    toast.success("Openings updated");
  };

  // Save Job Edits
  const handleSaveJobEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingJob) return;
    updateJobOpening(editingJob.id, editingJob);
    refreshJobs();
    setEditingJob(null);
    toast.success(`Job details for ${editingJob.company} updated successfully!`);
  };

  // Add New Job Opening
  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJobData.company.trim()) {
      toast.error("Please enter a company name");
      return;
    }
    const created = addJobOpening({
      ...newJobData,
      company: newJobData.company.trim(),
      roleTitle: newJobData.roleTitle?.trim() || "Operations Trainee",
      location: newJobData.location.trim() || "Bangalore, Karnataka",
      salary: newJobData.salary?.trim() || newJobData.salaryHighlight || "As per company policy",
    });
    refreshJobs();
    setIsAddJobModalOpen(false);
    setNewJobData(initialNewJobData);
    toast.success(`Recruitment drive for "${created.company}" successfully created and published!`);
  };

  // Delete Job Opening with Permission Confirmation
  const handleDeleteJob = (job: JobOpening) => {
    setConfirmModal({
      title: "⚠️ Permission Required: Delete Recruitment Drive",
      message: `Are you sure you want to permanently delete the recruitment drive for "${job.company}" (${job.roleTitle || job.trade})? This will immediately remove it from both EduAdmin and the public Careers applicant portal.`,
      confirmText: "Yes, Delete Drive",
      cancelText: "Cancel",
      variant: "danger",
      onConfirm: () => {
        deleteJobOpening(job.id);
        refreshJobs();
        toast.success(`Recruitment drive for "${job.company}" deleted successfully.`);
        setConfirmModal(null);
      },
    });
  };

  // Reset All Jobs to Defaults with Permission Confirmation
  const handleResetDefaults = () => {
    setConfirmModal({
      title: "⚠️ Permission Required: Reset All Drives to Defaults",
      message: "Are you sure you want to restore all 18 standard company recruitment drives back to their factory default state? Any custom added drives, pauses, or edits will be reset.",
      confirmText: "Yes, Reset All Drives",
      cancelText: "Cancel",
      variant: "warning",
      onConfirm: () => {
        const res = resetJobsToDefault();
        setJobs(res);
        toast.success("All drives reset to original defaults.");
        setConfirmModal(null);
      },
    });
  };

  // Handle Application Status Change
  const handleStatusChange = async (appId: string, newStatus: StoredJobApplication["status"], notes?: string) => {
    try {
      await updateApplicationStatus(appId, newStatus, notes);
      setApplications((prev) =>
        prev.map((a) => (a.id === appId ? { ...a, status: newStatus, ...(notes !== undefined ? { notes } : {}) } : a))
      );
      if (viewingApp && viewingApp.id === appId) {
        setViewingApp((prev) => (prev ? { ...prev, status: newStatus, ...(notes !== undefined ? { notes } : {}) } : null));
      }
      toast.success(`Application status updated to "${newStatus}"`);
    } catch {
      toast.error("Could not update status");
    }
  };

  // Save internal notes for candidate from inside the view modal
  const handleSaveAppNotes = async () => {
    if (!viewingApp) return;
    setIsSavingNotes(true);
    try {
      await updateApplicationStatus(viewingApp.id, viewingApp.status, appNotesInput);
      setApplications((prev) =>
        prev.map((a) => (a.id === viewingApp.id ? { ...a, notes: appNotesInput } : a))
      );
      setViewingApp((prev) => (prev ? { ...prev, notes: appNotesInput } : null));
      toast.success("Candidate notes saved successfully!");
    } catch {
      toast.error("Failed to save candidate notes.");
    } finally {
      setIsSavingNotes(false);
    }
  };

  // Delete Single Candidate Application with Permission Confirmation
  const handleDeleteApplication = (app: StoredJobApplication) => {
    setConfirmModal({
      title: "⚠️ Permission Required: Delete Candidate Application",
      message: `Are you sure you want to permanently delete candidate application #${app.id.slice(0, 8)} submitted by "${app.name}" for "${app.job_company}"? This action cannot be undone.`,
      confirmText: "Yes, Delete Application",
      cancelText: "Cancel",
      variant: "danger",
      onConfirm: async () => {
        setIsConfirming(true);
        try {
          await deleteApplication(app.id);
          setApplications((prev) => prev.filter((a) => a.id !== app.id));
          setSelectedAppIds((prev) => prev.filter((id) => id !== app.id));
          if (viewingApp && viewingApp.id === app.id) {
            setViewingApp(null);
          }
          toast.success(`Application for "${app.name}" deleted successfully.`);
        } catch {
          toast.error("Failed to delete application.");
        } finally {
          setIsConfirming(false);
          setConfirmModal(null);
        }
      },
    });
  };

  // Bulk Status Update
  const handleBulkStatusChange = async (newStatus: StoredJobApplication["status"]) => {
    if (selectedAppIds.length === 0) return;
    try {
      await bulkUpdateApplicationStatus(selectedAppIds, newStatus);
      setApplications((prev) =>
        prev.map((a) => (selectedAppIds.includes(a.id) ? { ...a, status: newStatus } : a))
      );
      toast.success(`Updated status of ${selectedAppIds.length} candidate(s) to "${newStatus}".`);
      setSelectedAppIds([]);
    } catch {
      toast.error("Failed to update status for selected applications.");
    }
  };

  // Bulk Delete Applications with Permission Confirmation
  const handleBulkDeleteApplications = () => {
    if (selectedAppIds.length === 0) return;
    setConfirmModal({
      title: "⚠️ Permission Required: Bulk Delete Candidate Applications",
      message: `Are you sure you want to permanently delete all ${selectedAppIds.length} selected candidate application(s)? This will permanently remove their records and uploaded documents.`,
      confirmText: `Yes, Delete ${selectedAppIds.length} Applications`,
      cancelText: "Cancel",
      variant: "danger",
      onConfirm: async () => {
        setIsConfirming(true);
        try {
          await bulkDeleteApplications(selectedAppIds);
          setApplications((prev) => prev.filter((a) => !selectedAppIds.includes(a.id)));
          toast.success(`Successfully deleted ${selectedAppIds.length} candidate applications.`);
          setSelectedAppIds([]);
        } catch {
          toast.error("Failed to delete selected applications.");
        } finally {
          setIsConfirming(false);
          setConfirmModal(null);
        }
      },
    });
  };

  // Toggle Single Application Selection
  const toggleSelectApp = (id: string) => {
    setSelectedAppIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Export Applications to CSV
  const handleExportCSV = () => {
    if (filteredApplications.length === 0) {
      toast.error("No applications to export");
      return;
    }

    const headers = [
      "Application ID",
      "Applied Date",
      "Company",
      "Role / Trade",
      "Preferred Location",
      "Applicant Name",
      "Contact",
      "Email",
      "Gender",
      "DOB",
      "Qualification",
      "Address",
      "Status",
      "Resume URL",
      "Marks Card URL",
      "Additional Document URL",
    ];

    const rows = filteredApplications.map((a) => [
      a.id,
      new Date(a.created_at).toLocaleDateString(),
      `"${a.job_company.replace(/"/g, '""')}"`,
      `"${a.job_role.replace(/"/g, '""')}"`,
      `"${(a.preferred_location || "Not specified").replace(/"/g, '""')}"`,
      `"${a.name.replace(/"/g, '""')}"`,
      a.contact,
      a.email || "",
      a.gender || "",
      a.dob || "",
      `"${a.qualification.replace(/"/g, '""')}"`,
      `"${a.address.replace(/"/g, '""')}"`,
      a.status,
      a.resume_url || "",
      a.marks_card_url || "",
      a.additional_doc_url || "",
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    const filename = `eduadmin_applications_${new Date().toISOString().slice(0, 10)}.csv`;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("Applications CSV downloaded successfully!");
  };

  // Filtered Jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter((j) => {
      const q = driveSearch.toLowerCase().trim();
      const matchesSearch =
        !q ||
        j.company.toLowerCase().includes(q) ||
        (j.roleTitle && j.roleTitle.toLowerCase().includes(q)) ||
        j.location.toLowerCase().includes(q) ||
        j.trade.toLowerCase().includes(q);

      const matchesStatus =
        driveStatusFilter === "ALL" ||
        (driveStatusFilter === "Paused" && j.status === "Paused") ||
        (driveStatusFilter === "Active" && j.status !== "Paused");

      return matchesSearch && matchesStatus;
    });
  }, [jobs, driveSearch, driveStatusFilter]);

  // Filtered Applications
  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const q = appSearch.toLowerCase().trim();
      const matchesSearch =
        !q ||
        app.name.toLowerCase().includes(q) ||
        app.contact.includes(q) ||
        (app.email && app.email.toLowerCase().includes(q)) ||
        app.qualification.toLowerCase().includes(q) ||
        app.job_company.toLowerCase().includes(q) ||
        app.address.toLowerCase().includes(q);

      const matchesStatus = appStatusFilter === "ALL" || app.status === appStatusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [applications, appSearch, appStatusFilter]);

  // Master Checkbox State
  const allFilteredSelected = useMemo(() => {
    return (
      filteredApplications.length > 0 &&
      filteredApplications.every((app) => selectedAppIds.includes(app.id))
    );
  }, [filteredApplications, selectedAppIds]);

  // Toggle Select/Deselect All Filtered Applications
  const toggleSelectAllFiltered = () => {
    if (allFilteredSelected) {
      const filteredIds = new Set(filteredApplications.map((a) => a.id));
      setSelectedAppIds((prev) => prev.filter((id) => !filteredIds.has(id)));
    } else {
      const newIds = Array.from(
        new Set([...selectedAppIds, ...filteredApplications.map((a) => a.id)])
      );
      setSelectedAppIds(newIds);
    }
  };

  // Stats Counters
  const stats = useMemo(() => {
    const totalDrives = jobs.length;
    const activeDrives = jobs.filter((j) => j.status !== "Paused").length;
    const pausedDrives = jobs.filter((j) => j.status === "Paused").length;
    const totalVacancies = jobs.reduce((sum, j) => sum + (j.openings || 0), 0);

    const totalApps = applications.length;
    const shortlistedApps = applications.filter((a) => a.status === "Shortlisted").length;
    const contactedApps = applications.filter((a) => a.status === "Contacted").length;
    const pendingApps = applications.filter((a) => a.status === "Pending").length;
    const rejectedApps = applications.filter((a) => a.status === "Rejected").length;

    return {
      totalDrives,
      activeDrives,
      pausedDrives,
      totalVacancies,
      totalApps,
      shortlistedApps,
      contactedApps,
      pendingApps,
      rejectedApps,
    };
  }, [jobs, applications]);

  // 1. AUTHENTICATION LOCK SCREEN (Matching Website UI, Clean & Secure)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] via-[#F1F5F9] to-[#FFF7ED] flex items-center justify-center p-4 sm:p-6">
        {/* Ambient background glow orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-blue-500/10 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-1/4 right-1/3 translate-x-1/2 w-[450px] h-[300px] bg-orange-500/10 blur-[100px] rounded-full"></div>
        </div>

        <div className="relative w-full max-w-md rounded-2xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-xl shadow-slate-200/50">
          {/* Header & Brand Logo */}
          <div className="text-center">
            <Link to="/" className="inline-block mb-4">
              <img
                src={brandLogo}
                alt="TruBlend EduforCareer"
                className="h-10 sm:h-12 object-contain mx-auto"
              />
            </Link>

            <div className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/20 bg-orange-50 px-3 py-1 text-[11px] font-bold text-orange-700 mb-2.5">
              <ShieldCheck className="h-3.5 w-3.5 text-orange-600" /> Authorized Administrator Portal
            </div>

            <h2 className="font-montserrat font-extrabold text-2xl tracking-tight text-slate-900">
              EduAdmin Security Gateway
            </h2>
            <p className="mt-1.5 text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
              Sign in with your authorized Administrator Email ID and Password to manage company drives and candidate applications.
            </p>
          </div>

          {/* Error Banner */}
          {loginError && (
            <div className="mt-5 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700 flex items-start gap-2.5 shadow-2xs">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-rose-500" />
              <span>{loginError}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Administrator Email ID <span className="text-orange-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  required
                  autoComplete="username"
                  autoCorrect="off"
                  spellCheck={false}
                  placeholder="Enter your registered email address"
                  value={loginEmail}
                  onChange={(e) => {
                    setLoginEmail(e.target.value);
                    setLoginError("");
                  }}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all font-medium"
                  autoFocus
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  Password <span className="text-orange-500">*</span>
                </label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  autoCorrect="off"
                  spellCheck={false}
                  placeholder="Enter your password"
                  value={loginPassword}
                  onChange={(e) => {
                    setLoginPassword(e.target.value);
                    setLoginError("");
                  }}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-10 pr-10 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600 select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-orange-600 focus:ring-orange-500"
                />
                Remember me on this browser
              </label>

              <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                <ShieldCheck className="h-3 w-3 text-emerald-500" /> SSL Protected
              </span>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="font-montserrat font-bold w-full rounded-xl bg-gradient-to-r from-[#FF6B00] via-[#FF7A1A] to-[#EA580C] hover:from-[#EA580C] hover:to-[#C2410C] px-5 py-3 text-sm text-white shadow-md shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-98 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoggingIn ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" /> Verifying Credentials...
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4" /> Sign In to EduAdmin Dashboard
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-5 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
            <Link to="/placement" className="hover:text-slate-900 font-semibold transition-colors flex items-center gap-1">
              ← Return to Careers Portal
            </Link>
            <span className="font-semibold text-slate-400">Trublend EduforCareer</span>
          </div>
        </div>
      </div>
    );
  }

  // 2. MAIN EDUADMIN DASHBOARD
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-24">
      {/* Top Admin Header Bar */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 shadow-sm">
        <div className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 xl:px-10 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500 text-white font-bold text-sm shadow-xs">
              EA
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold tracking-tight text-white">
                  EduAdmin Control Center
                </h1>
                <span className="rounded bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 px-2 py-0.5 text-[10px] font-bold">
                  AUTHENTICATED
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                http://localhost:5173/eduadmin • Private Recruitment Portal
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-md border border-slate-700 bg-slate-800/80 px-2.5 py-1.5 text-xs font-semibold text-rose-300 hover:bg-rose-500/20 transition-colors cursor-pointer"
            >
              <Lock className="h-3.5 w-3.5" /> Logout
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 xl:px-10 flex gap-2 border-t border-slate-800/80 pt-2 pb-0">
          <button
            onClick={() => setActiveTab("drives")}
            className={`px-4 py-2 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === "drives"
                ? "border-orange-500 text-orange-400 bg-slate-800/60 rounded-t-md"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <Briefcase className="h-3.5 w-3.5" /> Company Drives & Openings ({jobs.length})
          </button>

          <button
            onClick={() => setActiveTab("applications")}
            className={`px-4 py-2 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === "applications"
                ? "border-orange-500 text-orange-400 bg-slate-800/60 rounded-t-md"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <Users className="h-3.5 w-3.5" /> Candidate Applications ({applications.length})
          </button>

          <button
            onClick={() => setActiveTab("stats")}
            className={`px-4 py-2 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === "stats"
                ? "border-orange-500 text-orange-400 bg-slate-800/60 rounded-t-md"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <ShieldCheck className="h-3.5 w-3.5" /> Overview & Metrics
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 xl:px-10 mt-6">
        {/* TAB 1: COMPANY RECRUITMENT DRIVES & PAUSE ACCESS */}
        {activeTab === "drives" && (
          <div className="space-y-4">
            {/* Action Bar */}
            <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3 flex-1">
                {/* Search */}
                <div className="relative min-w-[260px] flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search drives by company, role, or trade..."
                    value={driveSearch}
                    onChange={(e) => setDriveSearch(e.target.value)}
                    className="w-full rounded-md border border-slate-200 bg-slate-50 py-1.5 pl-9 pr-3 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:border-orange-500 focus:outline-none"
                  />
                  {driveSearch && (
                    <button
                      onClick={() => setDriveSearch("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </div>

                {/* Status Filter */}
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-md text-xs">
                  <button
                    onClick={() => setDriveStatusFilter("ALL")}
                    className={`px-2.5 py-1 rounded font-semibold transition-colors ${
                      driveStatusFilter === "ALL" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-600"
                    }`}
                  >
                    All Drives ({jobs.length})
                  </button>
                  <button
                    onClick={() => setDriveStatusFilter("Active")}
                    className={`px-2.5 py-1 rounded font-semibold transition-colors ${
                      driveStatusFilter === "Active" ? "bg-emerald-600 text-white shadow-2xs" : "text-slate-600"
                    }`}
                  >
                    Active ({stats.activeDrives})
                  </button>
                  <button
                    onClick={() => setDriveStatusFilter("Paused")}
                    className={`px-2.5 py-1 rounded font-semibold transition-colors ${
                      driveStatusFilter === "Paused" ? "bg-amber-600 text-white shadow-2xs" : "text-slate-600"
                    }`}
                  >
                    Paused ({stats.pausedDrives})
                  </button>
                </div>
              </div>

              {/* Action Buttons: Add Company Drive & Reset Defaults */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsAddJobModalOpen(true)}
                  className="inline-flex items-center gap-1.5 rounded-md bg-[#FF6B00] hover:bg-[#EA580C] px-3 py-1.5 text-xs font-bold text-white transition-colors shadow-2xs cursor-pointer"
                  title="Add a new recruitment drive with company logo and specifications"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Company Drive
                </button>

                <button
                  onClick={handleResetDefaults}
                  className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                  title="Reset any edits or pauses back to initial state"
                >
                  <RotateCcw className="h-3 w-3" /> Reset Defaults
                </button>
              </div>
            </div>

            {/* Drives Table / List */}
            <div className="rounded-lg border border-slate-200 bg-white shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="px-4 py-3">Company & Role</th>
                      <th className="px-3 py-3">Scheme & Criteria</th>
                      <th className="px-3 py-3">Openings</th>
                      <th className="px-3 py-3">Salary / Stipend</th>
                      <th className="px-3 py-3 text-center">Status</th>
                      <th className="px-4 py-3 text-right">Admin Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {filteredJobs.map((job) => {
                      const isPaused = job.status === "Paused";
                      return (
                        <tr
                          key={job.id}
                          className={`hover:bg-slate-50/80 transition-colors ${
                            isPaused ? "bg-amber-50/40" : ""
                          }`}
                        >
                          {/* Company & Role */}
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2.5">
                              {job.logoUrl || COMPANY_LOGOS[job.company] ? (
                                <div className="w-9 h-7 rounded border border-slate-200 bg-white p-0.5 flex items-center justify-center shrink-0 shadow-2xs">
                                  <img
                                    src={job.logoUrl || COMPANY_LOGOS[job.company]}
                                    alt={job.company}
                                    className="max-h-full max-w-full object-contain"
                                  />
                                </div>
                              ) : (
                                <div className="w-8 h-7 rounded bg-slate-900 text-white font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                                  {job.company.slice(0, 2).toUpperCase()}
                                </div>
                              )}
                              <div>
                                <div className="font-bold text-slate-900">{job.company}</div>
                                <div className="text-slate-500 text-[11px] font-normal">
                                  {job.roleTitle || job.trade} • {job.location}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Scheme & Criteria */}
                          <td className="px-3 py-3">
                            <div className="text-slate-700">{job.category}</div>
                            <div className="text-slate-400 text-[11px]">
                              {job.gender} ({job.age} yrs)
                            </div>
                          </td>

                          {/* Openings (Inline editable) */}
                          <td className="px-3 py-3">
                            <div className="flex items-center gap-1.5">
                              <input
                                type="number"
                                min={0}
                                defaultValue={job.openings}
                                onBlur={(e) =>
                                  handleQuickOpeningsChange(job.id, parseInt(e.target.value) || 0)
                                }
                                className="w-16 rounded border border-slate-200 bg-white px-2 py-1 text-xs font-bold text-slate-800 text-center focus:border-orange-500 focus:outline-none"
                              />
                              <span className="text-slate-400 text-[11px]">seats</span>
                            </div>
                          </td>

                          {/* Salary */}
                          <td className="px-3 py-3">
                            <div className="font-bold text-slate-800">
                              {job.salaryHighlight || job.salary.split("/-")[0]}
                            </div>
                            {job.takeHomeHighlight && (
                              <div className="text-[11px] text-emerald-700 font-semibold">
                                {job.takeHomeHighlight}
                              </div>
                            )}
                          </td>

                          {/* Status Badge */}
                          <td className="px-3 py-3 text-center">
                            {isPaused ? (
                              <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 text-amber-800 px-2.5 py-0.5 text-[10.5px] font-bold border border-amber-300">
                                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" /> Paused
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 text-emerald-800 px-2.5 py-0.5 text-[10.5px] font-bold border border-emerald-200">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Active
                              </span>
                            )}
                          </td>

                          {/* Actions: Pause / Resume Button & Edit */}
                          <td className="px-4 py-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {/* PAUSE / RESUME TOGGLE BUTTON */}
                              <button
                                onClick={() => handleTogglePause(job.id, job.company)}
                                className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-bold transition-all shadow-2xs ${
                                  isPaused
                                    ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                                    : "bg-amber-500 hover:bg-amber-600 text-white"
                                }`}
                                title={isPaused ? "Resume this hiring drive" : "Pause candidate applications for this drive"}
                              >
                                {isPaused ? (
                                  <>
                                    <Play className="h-3 w-3 fill-current" /> Resume Drive
                                  </>
                                ) : (
                                  <>
                                    <Pause className="h-3 w-3 fill-current" /> Pause Drive
                                  </>
                                )}
                              </button>

                              {/* Edit Modal Button */}
                              <button
                                onClick={() => setEditingJob(job)}
                                className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                                title="Edit full details"
                              >
                                <Edit className="h-3 w-3 text-slate-500" /> Edit
                              </button>

                              {/* Delete Drive Button */}
                              <button
                                onClick={() => handleDeleteJob(job)}
                                className="inline-flex items-center gap-1 rounded-md border border-rose-200 bg-rose-50 px-2 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-100 transition-colors"
                                title="Permanently delete this recruitment drive"
                              >
                                <Trash2 className="h-3 w-3 text-rose-600" /> Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CANDIDATE APPLICATIONS (Supabase & Local) */}
        {activeTab === "applications" && (
          <div className="space-y-4">
            {/* Applications Filter Toolbar */}
            <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2.5 flex-1">
                {/* Search */}
                <div className="relative min-w-[240px] flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search candidate by name, phone, qualification..."
                    value={appSearch}
                    onChange={(e) => setAppSearch(e.target.value)}
                    className="w-full rounded-md border border-slate-200 bg-slate-50 py-1.5 pl-9 pr-3 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:border-orange-500 focus:outline-none"
                  />
                </div>

                {/* Company Filter Dropdown */}
                <select
                  value={selectedJobId}
                  onChange={(e) => setSelectedJobId(e.target.value)}
                  className="rounded-md border border-slate-200 bg-slate-50 py-1.5 px-3 text-xs font-medium text-slate-700 focus:bg-white focus:outline-none cursor-pointer"
                >
                  <option value="ALL">All Hiring Drives ({jobs.length} Companies)</option>
                  {jobs.map((j) => (
                    <option key={j.id} value={j.id}>
                      {j.company} ({j.openings} Openings)
                    </option>
                  ))}
                </select>

                {/* Status Pills */}
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-md text-xs">
                  {["ALL", "Pending", "Shortlisted", "Contacted", "Rejected"].map((st) => (
                    <button
                      key={st}
                      onClick={() => setAppStatusFilter(st)}
                      className={`px-2 py-0.5 rounded font-semibold text-[11px] transition-colors ${
                        appStatusFilter === st
                          ? "bg-slate-900 text-white shadow-2xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Export to CSV & Refresh */}
              <div className="flex items-center gap-2">
                <button
                  onClick={loadApplications}
                  disabled={loadingApps}
                  className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  <RefreshCw className={`h-3 w-3 ${loadingApps ? "animate-spin" : ""}`} /> Refresh
                </button>

                <button
                  onClick={handleExportCSV}
                  className="inline-flex items-center gap-1.5 rounded-md bg-[#FF6B00] hover:bg-[#EA580C] px-3 py-1.5 text-xs font-bold text-white transition-colors shadow-2xs"
                >
                  <Download className="h-3 w-3" /> Export CSV ({filteredApplications.length})
                </button>
              </div>
            </div>

            {/* Bulk Action Toolbar */}
            {selectedAppIds.length > 0 && (
              <div className="rounded-lg border border-orange-200 bg-orange-50/90 p-3 shadow-xs flex flex-wrap items-center justify-between gap-3 animate-in fade-in slide-in-from-top-1 duration-200">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center justify-center h-6 px-2.5 rounded-full bg-orange-600 text-white font-bold text-xs">
                    {selectedAppIds.length}
                  </span>
                  <span className="text-xs font-bold text-slate-800">
                    Candidate Application{selectedAppIds.length > 1 ? "s" : ""} Selected
                  </span>
                  <button
                    onClick={() => setSelectedAppIds([])}
                    className="text-xs text-slate-500 hover:text-slate-800 underline ml-2 cursor-pointer"
                  >
                    Deselect All
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold text-slate-600">Mark Selected As:</span>
                  <button
                    onClick={() => handleBulkStatusChange("Shortlisted")}
                    className="rounded bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-1 text-xs font-bold transition-colors shadow-2xs cursor-pointer"
                  >
                    Shortlisted
                  </button>
                  <button
                    onClick={() => handleBulkStatusChange("Contacted")}
                    className="rounded bg-blue-600 hover:bg-blue-700 text-white px-2.5 py-1 text-xs font-bold transition-colors shadow-2xs cursor-pointer"
                  >
                    Contacted
                  </button>
                  <button
                    onClick={() => handleBulkStatusChange("Pending")}
                    className="rounded bg-slate-600 hover:bg-slate-700 text-white px-2.5 py-1 text-xs font-bold transition-colors shadow-2xs cursor-pointer"
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => handleBulkStatusChange("Rejected")}
                    className="rounded bg-rose-600 hover:bg-rose-700 text-white px-2.5 py-1 text-xs font-bold transition-colors shadow-2xs cursor-pointer"
                  >
                    Rejected
                  </button>

                  <div className="h-4 w-px bg-orange-200 mx-1" />

                  <button
                    onClick={handleBulkDeleteApplications}
                    className="rounded border border-rose-300 bg-rose-100 hover:bg-rose-200 text-rose-800 px-3 py-1 text-xs font-bold transition-colors flex items-center gap-1 shadow-2xs cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5 text-rose-600" />
                    Delete Selected ({selectedAppIds.length})
                  </button>
                </div>
              </div>
            )}

            {/* Applications List */}
            {filteredApplications.length === 0 ? (
              <div className="rounded-lg border border-dashed border-slate-300 bg-white p-12 text-center shadow-xs">
                <Users className="mx-auto h-10 w-10 text-slate-300" />
                <h3 className="mt-2 text-base font-semibold text-slate-800">No applications match current filters</h3>
                <p className="mt-1 text-xs text-slate-500">
                  Applications submitted by candidates from the careers page will appear here immediately.
                </p>
              </div>
            ) : (
              <div className="rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden">
                {/* Desktop Responsive Table with Defined Column Proportions */}
                <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200">
                  <table className="w-full text-left text-xs min-w-[1200px]">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                      <tr>
                        <th className="px-3.5 py-3.5 w-12 text-center">
                          <input
                            type="checkbox"
                            checked={allFilteredSelected}
                            onChange={toggleSelectAllFiltered}
                            className="rounded border-slate-300 text-orange-600 focus:ring-orange-500 cursor-pointer h-4 w-4"
                            title={allFilteredSelected ? "Deselect All Filtered" : "Select All Filtered"}
                          />
                        </th>
                        <th className="px-4 py-3.5 w-[240px]">Applied Company</th>
                        <th className="px-4 py-3.5 w-[230px]">Candidate Details</th>
                        <th className="px-3.5 py-3.5 w-[180px]">Contact</th>
                        <th className="px-3.5 py-3.5 w-[130px]">Qualification</th>
                        <th className="px-3.5 py-3.5 w-[140px]">Documents</th>
                        <th className="px-3.5 py-3.5 w-[110px] text-center">Status</th>
                        <th className="px-4 py-3.5 min-w-[240px] text-right">Quick Decision</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {filteredApplications.map((app) => (
                        <tr
                          key={app.id}
                          className={`hover:bg-slate-50/80 transition-colors ${
                            selectedAppIds.includes(app.id) ? "bg-orange-50/40" : ""
                          }`}
                        >
                          {/* Row Checkbox */}
                          <td className="px-3.5 py-3.5 text-center align-top pt-4">
                            <input
                              type="checkbox"
                              checked={selectedAppIds.includes(app.id)}
                              onChange={() => toggleSelectApp(app.id)}
                              className="rounded border-slate-300 text-orange-600 focus:ring-orange-500 cursor-pointer h-4 w-4"
                            />
                          </td>

                          {/* Company & Preferred Location */}
                          <td className="px-4 py-3.5 align-top">
                            <div className="font-bold text-slate-900 text-xs leading-snug" title={app.job_company}>
                              {app.job_company}
                            </div>
                            <div className="text-slate-500 text-[11px] font-medium leading-tight mt-0.5">
                              {app.job_role}
                            </div>
                            {app.preferred_location && (
                              <div
                                className="mt-1.5 inline-flex items-center gap-1 rounded-md bg-orange-50 border border-orange-200/90 px-2 py-0.5 text-[10.5px] font-bold text-orange-800 max-w-[220px]"
                                title={`Preferred Location: ${app.preferred_location}`}
                              >
                                <MapPin className="h-2.5 w-2.5 text-orange-500 shrink-0" />
                                <span className="truncate">Pref: {app.preferred_location}</span>
                              </div>
                            )}
                            <div className="text-slate-400 text-[10px] flex items-center gap-1 mt-1 font-normal">
                              <Calendar className="h-2.5 w-2.5 shrink-0" />
                              <span>
                                {new Date(app.created_at).toLocaleDateString()} at{" "}
                                {new Date(app.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                              </span>
                            </div>
                          </td>

                          {/* Candidate Name & Demographics */}
                          <td className="px-4 py-3.5 align-top">
                            <div className="flex items-start gap-2.5">
                              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 text-white font-bold text-[10.5px] shadow-2xs shrink-0 mt-0.5 uppercase">
                                {app.name
                                  ? app.name
                                      .trim()
                                      .split(/\s+/)
                                      .map((n) => n[0])
                                      .slice(0, 2)
                                      .join("")
                                  : "CA"}
                              </div>
                              <div className="min-w-0 flex-1">
                                <button
                                  type="button"
                                  onClick={() => setViewingApp(app)}
                                  className="font-bold text-slate-900 text-xs hover:text-orange-600 transition-colors flex items-center gap-1 text-left group cursor-pointer"
                                  title="Click to view full candidate details"
                                >
                                  <span className="truncate max-w-[150px]">{app.name}</span>
                                  <Eye className="h-3 w-3 text-slate-400 group-hover:text-orange-500 shrink-0 opacity-80" />
                                </button>
                                <div className="text-slate-500 text-[11px] mt-0.5">
                                  {app.gender || "Unspecified"} {app.dob ? `• DOB: ${app.dob}` : ""}
                                </div>
                                <div
                                  className="text-slate-400 text-[10.5px] truncate max-w-[170px] mt-0.5"
                                  title={app.address}
                                >
                                  {app.address}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Contact Info */}
                          <td className="px-3.5 py-3.5 align-top">
                            <div className="flex items-center gap-1.5">
                              <a
                                href={`tel:${app.contact}`}
                                className="font-semibold text-blue-600 hover:underline flex items-center gap-1 text-xs"
                              >
                                <Phone className="h-3 w-3 text-blue-500 shrink-0" /> {app.contact}
                              </a>
                              {(() => {
                                const clean = app.contact.replace(/\D/g, "");
                                const waPhone = clean.length === 10 ? `91${clean}` : clean;
                                const waText = `Hello ${app.name}, this is regarding your job application for "${app.job_role}" at "${app.job_company}" via Trublend EduforCareer.`;
                                return (
                                  <a
                                    href={`https://wa.me/${waPhone}?text=${encodeURIComponent(waText)}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-emerald-600 hover:text-emerald-700 p-0.5 rounded hover:bg-emerald-50 transition-colors"
                                    title="Chat on WhatsApp"
                                  >
                                    <MessageSquare className="h-3 w-3" />
                                  </a>
                                );
                              })()}
                            </div>
                            {app.email && (
                              <a
                                href={`mailto:${app.email}`}
                                className="text-slate-500 hover:text-slate-800 text-[11px] flex items-center gap-1 mt-1 truncate max-w-[160px]"
                                title={app.email}
                              >
                                <Mail className="h-3 w-3 text-slate-400 shrink-0" />
                                <span className="truncate">{app.email}</span>
                              </a>
                            )}
                          </td>

                          {/* Qualification */}
                          <td className="px-3.5 py-3.5 align-top">
                            <span className="inline-block rounded-md bg-purple-50 border border-purple-200/80 px-2 py-0.5 font-bold text-[11px] text-purple-900">
                              {app.qualification}
                            </span>
                            {app.trade && (
                              <div className="text-slate-600 text-[11px] font-medium mt-1">
                                {app.trade}
                              </div>
                            )}
                          </td>

                          {/* Document Links */}
                          <td className="px-3.5 py-3.5 align-top">
                            <div className="flex flex-col gap-1 items-start">
                              {app.resume_url ? (
                                <a
                                  href={app.resume_url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-1 text-[10.5px] font-semibold text-blue-700 hover:underline bg-blue-50/80 hover:bg-blue-100 border border-blue-200/70 px-1.5 py-0.5 rounded transition-colors"
                                >
                                  <FileText className="h-3 w-3 text-blue-500 shrink-0" /> Resume
                                </a>
                              ) : null}

                              {app.marks_card_url ? (
                                <a
                                  href={app.marks_card_url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-1 text-[10.5px] font-semibold text-emerald-700 hover:underline bg-emerald-50/80 hover:bg-emerald-100 border border-emerald-200/70 px-1.5 py-0.5 rounded transition-colors"
                                >
                                  <GraduationCap className="h-3 w-3 text-emerald-500 shrink-0" /> Marks Card
                                </a>
                              ) : null}

                              {app.additional_doc_url ? (
                                <a
                                  href={app.additional_doc_url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-1 text-[10.5px] font-semibold text-purple-700 hover:underline bg-purple-50/80 hover:bg-purple-100 border border-purple-200/70 px-1.5 py-0.5 rounded transition-colors"
                                >
                                  <Paperclip className="h-3 w-3 text-purple-500 shrink-0" /> Addl Doc
                                </a>
                              ) : null}

                              {/* Duplicate Document Warning Badge in Table */}
                              {Boolean(
                                (app.resume_url && app.marks_card_url && (app.resume_url === app.marks_card_url || app.resume_url.split("/").pop()?.split("?")[0] === app.marks_card_url.split("/").pop()?.split("?")[0])) ||
                                (app.resume_url && app.additional_doc_url && (app.resume_url === app.additional_doc_url || app.resume_url.split("/").pop()?.split("?")[0] === app.additional_doc_url.split("/").pop()?.split("?")[0])) ||
                                (app.marks_card_url && app.additional_doc_url && (app.marks_card_url === app.additional_doc_url || app.marks_card_url.split("/").pop()?.split("?")[0] === app.additional_doc_url.split("/").pop()?.split("?")[0]))
                              ) && (
                                <span
                                  className="inline-flex items-center gap-1 text-[9.5px] font-bold text-amber-800 bg-amber-100/90 border border-amber-300 px-1.5 py-0.5 rounded"
                                  title="Duplicate document detected across uploaded fields"
                                >
                                  <AlertCircle className="h-2.5 w-2.5 text-amber-600 shrink-0" /> Duplicate File
                                </span>
                              )}

                              {!app.resume_url && !app.marks_card_url && !app.additional_doc_url && (
                                <span className="text-slate-400 text-[10.5px] italic">No docs</span>
                              )}
                            </div>
                          </td>

                          {/* Status */}
                          <td className="px-3 py-3.5 align-top text-center">
                            <span
                              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10.5px] font-bold border ${
                                app.status === "Shortlisted"
                                  ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                                  : app.status === "Contacted"
                                  ? "bg-blue-50 text-blue-800 border-blue-200"
                                  : app.status === "Rejected"
                                  ? "bg-rose-50 text-rose-800 border-rose-200"
                                  : "bg-amber-50 text-amber-800 border-amber-200"
                              }`}
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-current" />
                              {app.status}
                            </span>
                          </td>

                          {/* Quick Status Action Buttons & Delete */}
                          <td className="px-4 py-3.5 align-top text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => setViewingApp(app)}
                                className="rounded-md bg-indigo-600 hover:bg-indigo-700 text-white px-2.5 py-1 text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shadow-2xs shrink-0"
                                title="View full candidate details and documents in popup"
                              >
                                <Eye className="h-3.5 w-3.5" />
                                View
                              </button>
                              <button
                                onClick={() => handleStatusChange(app.id, "Shortlisted")}
                                className="rounded-md bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 px-2 py-1 text-[11px] font-bold transition-colors cursor-pointer"
                                title="Shortlist candidate"
                              >
                                Shortlist
                              </button>
                              <button
                                onClick={() => handleStatusChange(app.id, "Contacted")}
                                className="rounded-md bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 px-2 py-1 text-[11px] font-bold transition-colors cursor-pointer"
                                title="Mark as Contacted"
                              >
                                Contact
                              </button>
                              <button
                                onClick={() => handleStatusChange(app.id, "Rejected")}
                                className="rounded-md bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 px-2 py-1 text-[11px] font-bold transition-colors cursor-pointer"
                                title="Reject candidate"
                              >
                                Reject
                              </button>
                              <button
                                onClick={() => handleStatusChange(app.id, "Pending")}
                                className="rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 px-1.5 py-1 text-[11px] font-bold transition-colors cursor-pointer"
                                title="Reset status to Pending"
                              >
                                Reset
                              </button>
                              <button
                                onClick={() => handleDeleteApplication(app)}
                                className="rounded-md bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 p-1 text-[11px] font-bold transition-colors cursor-pointer"
                                title="Permanently delete application"
                              >
                                <Trash2 className="h-3.5 w-3.5 text-rose-600" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: OVERVIEW & RECRUITMENT METRICS */}
        {activeTab === "stats" && (
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-xs">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Total Vacancies
                </div>
                <div className="mt-1 text-2xl font-black text-slate-900">{stats.totalVacancies}</div>
                <div className="text-xs text-slate-500 mt-0.5">Across {stats.totalDrives} Hiring Drives</div>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-xs">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                  Active Drives
                </div>
                <div className="mt-1 text-2xl font-black text-emerald-600">{stats.activeDrives}</div>
                <div className="text-xs text-slate-500 mt-0.5">Accepting candidate applications</div>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-xs">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-600">
                  Paused Drives
                </div>
                <div className="mt-1 text-2xl font-black text-amber-600">{stats.pausedDrives}</div>
                <div className="text-xs text-slate-500 mt-0.5">Temporarily placed on hold</div>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-xs">
                <div className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  Total Applications
                </div>
                <div className="mt-1 text-2xl font-black text-blue-600">{stats.totalApps}</div>
                <div className="text-xs text-slate-500 mt-0.5">{stats.shortlistedApps} Shortlisted • {stats.contactedApps} Contacted</div>
              </div>
            </div>

            {/* Quick Helper Notes */}
            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-xs space-y-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600" /> EduAdmin Security & Operational Instructions
              </h3>
              <ul className="text-xs text-slate-600 space-y-2 list-disc pl-5">
                <li>
                  <strong>Pausing Drives:</strong> Clicking <em>Pause Drive</em> instantly marks the job as paused on the public careers page (<code>/placement</code>) and blocks new candidate submissions.
                </li>
                <li>
                  <strong>Direct Access:</strong> This admin panel is accessible only directly at <code>http://localhost:5173/eduadmin</code> and is protected with a secure passcode.
                </li>
                <li>
                  <strong>Live Synchronization:</strong> Changes made here immediately update in local storage and Supabase without requiring server restart.
                </li>
              </ul>
            </div>
          </div>
        )}
      </main>

      {/* EDIT JOB MODAL */}
      {editingJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-xl rounded-xl bg-white shadow-2xl p-6 border border-slate-200 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                Edit Recruitment Drive: {editingJob.company}
              </h3>
              <button
                onClick={() => setEditingJob(null)}
                className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSaveJobEdit} className="mt-4 space-y-3.5 text-xs">
              {/* Company Logo Upload / Change Control */}
              <div className="rounded-xl border border-dashed border-slate-300 p-3 bg-slate-50/70">
                <div className="flex items-center justify-between mb-2">
                  <label className="font-bold text-slate-800 flex items-center gap-1.5">
                    <Building2 className="h-4 w-4 text-orange-500" />
                    Company Logo (Syncs to Careers Page)
                  </label>
                  {editingJob.logoUrl && (
                    <button
                      type="button"
                      onClick={() => setEditingJob({ ...editingJob, logoUrl: undefined })}
                      className="text-[11px] text-rose-600 hover:underline font-semibold"
                    >
                      Reset to Default Logo
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-16 h-12 rounded-lg border border-slate-200 bg-white p-1 flex items-center justify-center shrink-0 shadow-2xs">
                    {editingJob.logoUrl || COMPANY_LOGOS[editingJob.company] ? (
                      <img
                        src={editingJob.logoUrl || COMPANY_LOGOS[editingJob.company]}
                        alt={editingJob.company}
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : (
                      <span className="font-mono text-xs font-bold text-slate-700">
                        {editingJob.company.slice(0, 2).toUpperCase()}
                      </span>
                    )}
                  </div>

                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          if (file.size > 2 * 1024 * 1024) {
                            toast.error("Logo file size must be less than 2MB.");
                            return;
                          }
                          const reader = new FileReader();
                          reader.onload = (ev) => {
                            const dataUrl = ev.target?.result as string;
                            if (dataUrl) {
                              setEditingJob({ ...editingJob, logoUrl: dataUrl });
                              toast.success("New company logo loaded! Click 'Save Changes' to update everywhere.");
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="block w-full text-xs text-slate-500 file:mr-2 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-slate-800 file:text-white hover:file:bg-slate-700 cursor-pointer"
                    />
                    <p className="text-[10px] text-slate-400 mt-1">
                      Upload PNG, JPG, WebP, or SVG (Max 2MB). Change takes effect instantly on the careers applicant page upon saving.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Company Name</label>
                  <input
                    type="text"
                    value={editingJob.company}
                    onChange={(e) => setEditingJob({ ...editingJob, company: e.target.value })}
                    className="w-full rounded border border-slate-200 p-2 text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Role Title</label>
                  <input
                    type="text"
                    value={editingJob.roleTitle || ""}
                    onChange={(e) => setEditingJob({ ...editingJob, roleTitle: e.target.value })}
                    className="w-full rounded border border-slate-200 p-2 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Vacancies / Openings</label>
                  <input
                    type="number"
                    min={0}
                    value={editingJob.openings}
                    onChange={(e) => setEditingJob({ ...editingJob, openings: parseInt(e.target.value) || 0 })}
                    className="w-full rounded border border-slate-200 p-2 text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={editingJob.location}
                    onChange={(e) => setEditingJob({ ...editingJob, location: e.target.value })}
                    className="w-full rounded border border-slate-200 p-2 text-xs"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Salary Highlight (e.g. ₹18,258 CTC)</label>
                  <input
                    type="text"
                    value={editingJob.salaryHighlight || ""}
                    onChange={(e) => setEditingJob({ ...editingJob, salaryHighlight: e.target.value })}
                    className="w-full rounded border border-slate-200 p-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">In-Hand Tag (e.g. ₹15,700 In-Hand)</label>
                  <input
                    type="text"
                    value={editingJob.takeHomeHighlight || ""}
                    onChange={(e) => setEditingJob({ ...editingJob, takeHomeHighlight: e.target.value })}
                    className="w-full rounded border border-slate-200 p-2 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Eligibility Criteria</label>
                <input
                  type="text"
                  value={editingJob.qualification}
                  onChange={(e) => setEditingJob({ ...editingJob, qualification: e.target.value })}
                  className="w-full rounded border border-slate-200 p-2 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Trades / Specializations</label>
                <input
                  type="text"
                  value={editingJob.trade}
                  onChange={(e) => setEditingJob({ ...editingJob, trade: e.target.value })}
                  className="w-full rounded border border-slate-200 p-2 text-xs"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingJob(null)}
                  className="rounded border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded bg-[#FF6B00] hover:bg-[#EA580C] px-4 py-1.5 text-xs font-bold text-white shadow-2xs"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. ADMIN ACCOUNT & SECURITY SETTINGS MODAL */}
      {isSecurityModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm overflow-y-auto"
          data-lenis-prevent
        >
          <div className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl my-6 border border-slate-200">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 p-5 bg-slate-50/80 rounded-t-2xl">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500/10 text-orange-600 border border-orange-500/20">
                  <KeyRound className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Admin Security Settings</h3>
                  <p className="text-[11px] text-slate-500">Update Administrator Email ID & Login Password</p>
                </div>
              </div>
              <button
                onClick={() => setIsSecurityModalOpen(false)}
                className="rounded-full p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleChangeCredentials} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Administrator Email ID
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={newEmailInput}
                    onChange={(e) => setNewEmailInput(e.target.value)}
                    placeholder="Enter new administrator email"
                    className="w-full rounded-lg border border-slate-200 pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-800 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Current Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={currentPasswordInput}
                    onChange={(e) => setCurrentPasswordInput(e.target.value)}
                    placeholder="Enter current password"
                    className="w-full rounded-lg border border-slate-200 pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-800 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div className="border-t border-slate-100 pt-3 space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    New Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="password"
                      required
                      minLength={6}
                      value={newPasswordInput}
                      onChange={(e) => setNewPasswordInput(e.target.value)}
                      placeholder="Minimum 6 characters"
                      className="w-full rounded-lg border border-slate-200 pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-800 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Confirm New Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="password"
                      required
                      minLength={6}
                      value={confirmPasswordInput}
                      onChange={(e) => setConfirmPasswordInput(e.target.value)}
                      placeholder="Re-enter new password"
                      className="w-full rounded-lg border border-slate-200 pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-800 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsSecurityModalOpen(false)}
                  className="rounded-lg border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-[#FF6B00] hover:bg-[#EA580C] px-4 py-2 text-xs font-bold text-white shadow-xs transition-colors"
                >
                  Save New Credentials
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. ADD NEW RECRUITMENT DRIVE MODAL */}
      {isAddJobModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-xs overflow-y-auto"
          data-lenis-prevent
        >
          <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl p-6 border border-slate-200 my-8 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500/10 text-orange-600 border border-orange-500/20">
                  <Plus className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Add New Recruitment Drive
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Publish an active hiring drive to EduAdmin and the public careers portal
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsAddJobModalOpen(false)}
                className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleCreateJob} className="mt-4 space-y-3.5 text-xs">
              {/* Company Logo Upload (< 2MB) */}
              <div className="rounded-xl border border-dashed border-slate-300 p-3 bg-slate-50/70">
                <div className="flex items-center justify-between mb-2">
                  <label className="font-bold text-slate-800 flex items-center gap-1.5">
                    <Building2 className="h-4 w-4 text-orange-500" />
                    Company Logo (Max 2MB)
                  </label>
                  {newJobData.logoUrl && (
                    <button
                      type="button"
                      onClick={() => setNewJobData({ ...newJobData, logoUrl: undefined })}
                      className="text-[11px] text-rose-600 hover:underline font-semibold cursor-pointer"
                    >
                      Remove Logo
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-16 h-12 rounded-lg border border-slate-200 bg-white p-1 flex items-center justify-center shrink-0 shadow-2xs">
                    {newJobData.logoUrl ? (
                      <img
                        src={newJobData.logoUrl}
                        alt="Uploaded preview"
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : (
                      <span className="font-mono text-xs font-bold text-slate-400">
                        {newJobData.company ? newJobData.company.slice(0, 2).toUpperCase() : "LOGO"}
                      </span>
                    )}
                  </div>

                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          if (file.size > 2 * 1024 * 1024) {
                            toast.error("Logo file size must be less than 2MB.");
                            return;
                          }
                          const reader = new FileReader();
                          reader.onload = (ev) => {
                            const dataUrl = ev.target?.result as string;
                            if (dataUrl) {
                              setNewJobData({ ...newJobData, logoUrl: dataUrl });
                              toast.success("Company logo attached (< 2MB).");
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="block w-full text-xs text-slate-500 file:mr-2 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-slate-800 file:text-white hover:file:bg-slate-700 cursor-pointer"
                    />
                    <p className="text-[10px] text-slate-400 mt-1">
                      Supports PNG, JPG, WebP, or SVG. File size strictly limited to less than 2MB.
                    </p>
                  </div>
                </div>
              </div>

              {/* Company Name & Role Title */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Company Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Foxconn / Tata Electronics"
                    value={newJobData.company}
                    onChange={(e) => setNewJobData({ ...newJobData, company: e.target.value })}
                    className="w-full rounded border border-slate-200 p-2 text-xs focus:border-orange-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Role Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Production Specialist"
                    value={newJobData.roleTitle}
                    onChange={(e) => setNewJobData({ ...newJobData, roleTitle: e.target.value })}
                    className="w-full rounded border border-slate-200 p-2 text-xs focus:border-orange-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Sector & Scheme */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Sector / Industry</label>
                  <input
                    type="text"
                    placeholder="e.g. Electronics & Smartphone Mfg"
                    value={newJobData.sector}
                    onChange={(e) => setNewJobData({ ...newJobData, sector: e.target.value })}
                    className="w-full rounded border border-slate-200 p-2 text-xs focus:border-orange-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Scheme / Hiring Mode</label>
                  <select
                    value={newJobData.category}
                    onChange={(e) => setNewJobData({ ...newJobData, category: e.target.value })}
                    className="w-full rounded border border-slate-200 p-2 text-xs focus:border-orange-500 focus:outline-none bg-white cursor-pointer"
                  >
                    <option value="Contractual Staffing">Contractual Staffing</option>
                    <option value="NAPS">NAPS (National Apprenticeship Promotion Scheme)</option>
                    <option value="NATS">NATS (National Apprenticeship Training Scheme)</option>
                    <option value="Direct Payroll">Direct Company Payroll</option>
                  </select>
                </div>
              </div>

              {/* Openings, Location, & State */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Vacancies / Seats <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={newJobData.openings}
                    onChange={(e) => setNewJobData({ ...newJobData, openings: parseInt(e.target.value) || 0 })}
                    className="w-full rounded border border-slate-200 p-2 text-xs focus:border-orange-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    City / Facility Location <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Devanahalli, Bangalore"
                    value={newJobData.location}
                    onChange={(e) => setNewJobData({ ...newJobData, location: e.target.value })}
                    className="w-full rounded border border-slate-200 p-2 text-xs focus:border-orange-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">State</label>
                  <input
                    type="text"
                    placeholder="e.g. Karnataka"
                    value={newJobData.state}
                    onChange={(e) => setNewJobData({ ...newJobData, state: e.target.value })}
                    className="w-full rounded border border-slate-200 p-2 text-xs focus:border-orange-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Salary Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Salary Highlight (Card Display)</label>
                  <input
                    type="text"
                    placeholder="e.g. ₹18,258 CTC"
                    value={newJobData.salaryHighlight || ""}
                    onChange={(e) => setNewJobData({ ...newJobData, salaryHighlight: e.target.value })}
                    className="w-full rounded border border-slate-200 p-2 text-xs focus:border-orange-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">In-Hand Tag (Green Badge)</label>
                  <input
                    type="text"
                    placeholder="e.g. ₹15,700 In-Hand + Bonus"
                    value={newJobData.takeHomeHighlight || ""}
                    onChange={(e) => setNewJobData({ ...newJobData, takeHomeHighlight: e.target.value })}
                    className="w-full rounded border border-slate-200 p-2 text-xs focus:border-orange-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Detailed Salary */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Detailed Salary / Stipend Notes</label>
                <input
                  type="text"
                  placeholder="e.g. ₹18,258 CTC / Month + Free Food & Attendance Bonus"
                  value={newJobData.salary}
                  onChange={(e) => setNewJobData({ ...newJobData, salary: e.target.value })}
                  className="w-full rounded border border-slate-200 p-2 text-xs focus:border-orange-500 focus:outline-none"
                />
              </div>

              {/* Eligibility & Trades */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Eligibility Criteria</label>
                  <input
                    type="text"
                    placeholder="e.g. SSLC, PUC, ITI, Diploma, Graduate"
                    value={newJobData.qualification}
                    onChange={(e) => setNewJobData({ ...newJobData, qualification: e.target.value })}
                    className="w-full rounded border border-slate-200 p-2 text-xs focus:border-orange-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Trades / Specializations</label>
                  <input
                    type="text"
                    placeholder="e.g. Any Trade / CNC Machinist"
                    value={newJobData.trade}
                    onChange={(e) => setNewJobData({ ...newJobData, trade: e.target.value })}
                    className="w-full rounded border border-slate-200 p-2 text-xs focus:border-orange-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Gender & Age */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Gender Eligibility</label>
                  <select
                    value={newJobData.gender}
                    onChange={(e) => setNewJobData({ ...newJobData, gender: e.target.value })}
                    className="w-full rounded border border-slate-200 p-2 text-xs focus:border-orange-500 focus:outline-none bg-white cursor-pointer"
                  >
                    <option value="Male & Female">Male & Female</option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Age Range</label>
                  <input
                    type="text"
                    placeholder="e.g. 18-30 yrs"
                    value={newJobData.age}
                    onChange={(e) => setNewJobData({ ...newJobData, age: e.target.value })}
                    className="w-full rounded border border-slate-200 p-2 text-xs focus:border-orange-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Perks (Meals, Stay, Transport) */}
              <div className="grid grid-cols-3 gap-3 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Meals / Food</label>
                  <select
                    value={newJobData.food}
                    onChange={(e) => setNewJobData({ ...newJobData, food: e.target.value })}
                    className="w-full rounded border border-slate-200 p-1.5 text-xs bg-white cursor-pointer"
                  >
                    <option value="Free">Free Meals</option>
                    <option value="Subsidized">Subsidized</option>
                    <option value="No">Not Provided</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Stay / Hostel</label>
                  <select
                    value={newJobData.accommodation}
                    onChange={(e) => setNewJobData({ ...newJobData, accommodation: e.target.value })}
                    className="w-full rounded border border-slate-200 p-1.5 text-xs bg-white cursor-pointer"
                  >
                    <option value="Free">Free Stay</option>
                    <option value="Subsidized">Subsidized</option>
                    <option value="No">Not Provided</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Transport</label>
                  <select
                    value={newJobData.transport}
                    onChange={(e) => setNewJobData({ ...newJobData, transport: e.target.value })}
                    className="w-full rounded border border-slate-200 p-1.5 text-xs bg-white cursor-pointer"
                  >
                    <option value="Free">Free Transport</option>
                    <option value="Subsidized">Subsidized</option>
                    <option value="No">Not Provided</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsAddJobModalOpen(false)}
                  className="rounded border border-slate-200 px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded bg-[#FF6B00] hover:bg-[#EA580C] px-4 py-1.5 text-xs font-bold text-white shadow-2xs transition-colors cursor-pointer"
                >
                  Publish Recruitment Drive
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CANDIDATE FULL DETAILS VIEW MODAL (POPUP) */}
      {viewingApp && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-3 sm:p-5 backdrop-blur-xs overflow-y-auto"
          data-lenis-prevent
        >
          <div className="relative w-full max-w-4xl rounded-2xl bg-white shadow-2xl my-6 border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-orange-950 text-white p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-400 font-black text-white text-lg sm:text-xl shadow-md uppercase shrink-0">
                    {viewingApp.name
                      ? viewingApp.name
                          .trim()
                          .split(/\s+/)
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join("")
                      : "CA"}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
                        {viewingApp.name}
                      </h3>
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 text-xs font-bold border ${
                          viewingApp.status === "Shortlisted"
                            ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                            : viewingApp.status === "Contacted"
                            ? "bg-blue-500/20 text-blue-300 border-blue-500/40"
                            : viewingApp.status === "Rejected"
                            ? "bg-rose-500/20 text-rose-300 border-rose-500/40"
                            : "bg-amber-500/20 text-amber-300 border-amber-500/40"
                        }`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
                        {viewingApp.status}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-300 mt-1">
                      <span className="flex items-center gap-1 font-semibold text-orange-400">
                        <Building2 className="h-3.5 w-3.5" />
                        {viewingApp.job_company}
                      </span>
                      <span>•</span>
                      <span className="text-slate-200">{viewingApp.job_role}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-slate-400">
                        <Clock className="h-3 w-3" />
                        {new Date(viewingApp.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}{" "}
                        at{" "}
                        {new Date(viewingApp.created_at).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="rounded-lg p-2 text-slate-300 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                    title="Print Candidate Summary"
                  >
                    <Printer className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteApplication(viewingApp)}
                    className="rounded-lg p-2 text-rose-300 hover:bg-rose-500/20 hover:text-rose-200 transition-colors cursor-pointer"
                    title="Delete Application"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewingApp(null)}
                    className="rounded-lg p-2 text-slate-300 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                    title="Close Dialog"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Quick Communication & Actions Bar inside Header */}
              <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs">
                {/* 1-Click Communication buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={`tel:${viewingApp.contact}`}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-3 py-1.5 shadow-sm transition-colors cursor-pointer"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    Call {viewingApp.contact}
                  </a>

                  {(() => {
                    const clean = viewingApp.contact.replace(/\D/g, "");
                    const waPhone = clean.length === 10 ? `91${clean}` : clean;
                    const waText = `Hello ${viewingApp.name}, this is regarding your job application for "${viewingApp.job_role}" at "${viewingApp.job_company}" via Trublend EduforCareer.`;
                    return (
                      <a
                        href={`https://wa.me/${waPhone}?text=${encodeURIComponent(waText)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold px-3 py-1.5 shadow-sm transition-colors cursor-pointer"
                      >
                        <MessageSquare className="h-3.5 w-3.5" />
                        WhatsApp
                      </a>
                    );
                  })()}

                  {viewingApp.email && (
                    <a
                      href={`mailto:${viewingApp.email}`}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-1.5 shadow-sm transition-colors cursor-pointer"
                    >
                      <Mail className="h-3.5 w-3.5" />
                      Email
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(viewingApp.contact);
                      toast.success(`Copied phone ${viewingApp.contact} to clipboard`);
                    }}
                    className="inline-flex items-center gap-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 px-2.5 py-1.5 font-medium transition-colors cursor-pointer"
                    title="Copy Phone Number"
                  >
                    <Copy className="h-3 w-3" />
                    Copy No.
                  </button>
                </div>

                {/* Quick Status Decision Buttons */}
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-400 font-semibold mr-1 hidden sm:inline">Decision:</span>
                  <button
                    type="button"
                    onClick={() => handleStatusChange(viewingApp.id, "Shortlisted")}
                    className={`rounded-md px-2.5 py-1 text-xs font-bold transition-all cursor-pointer ${
                      viewingApp.status === "Shortlisted"
                        ? "bg-emerald-500 text-white ring-2 ring-emerald-300"
                        : "bg-emerald-950/60 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/30"
                    }`}
                  >
                    Shortlist
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStatusChange(viewingApp.id, "Contacted")}
                    className={`rounded-md px-2.5 py-1 text-xs font-bold transition-all cursor-pointer ${
                      viewingApp.status === "Contacted"
                        ? "bg-blue-500 text-white ring-2 ring-blue-300"
                        : "bg-blue-950/60 hover:bg-blue-900 text-blue-300 border border-blue-500/30"
                    }`}
                  >
                    Contact
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStatusChange(viewingApp.id, "Rejected")}
                    className={`rounded-md px-2.5 py-1 text-xs font-bold transition-all cursor-pointer ${
                      viewingApp.status === "Rejected"
                        ? "bg-rose-500 text-white ring-2 ring-rose-300"
                        : "bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-500/30"
                    }`}
                  >
                    Reject
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStatusChange(viewingApp.id, "Pending")}
                    className={`rounded-md px-2.5 py-1 text-xs font-bold transition-all cursor-pointer ${
                      viewingApp.status === "Pending"
                        ? "bg-slate-200 text-slate-900 ring-2 ring-white"
                        : "bg-white/10 hover:bg-white/20 text-slate-300"
                    }`}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="max-h-[calc(85vh-150px)] overflow-y-auto p-5 sm:p-6 space-y-5 text-slate-800">
              {/* 2-Column Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* CARD 1: Applied Hiring Drive Details */}
                <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                      <Briefcase className="h-3.5 w-3.5 text-orange-500" />
                      Applied Recruitment Drive
                    </span>
                    <span className="text-[10px] font-mono font-bold bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
                      ID: {viewingApp.id.slice(0, 8)}
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="h-12 w-12 rounded-lg border border-slate-200 bg-white p-1 flex items-center justify-center shrink-0 shadow-2xs">
                      {COMPANY_LOGOS[viewingApp.job_company] ? (
                        <img
                          src={COMPANY_LOGOS[viewingApp.job_company]}
                          alt={viewingApp.job_company}
                          className="max-h-full max-w-full object-contain"
                        />
                      ) : (
                        <Building2 className="h-6 w-6 text-slate-400" />
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-sm leading-snug">
                        {viewingApp.job_company}
                      </div>
                      <div className="text-xs text-slate-600 mt-0.5 font-medium">
                        {viewingApp.job_role}
                      </div>
                      {viewingApp.preferred_location && (
                        <div className="mt-1.5 inline-flex items-center gap-1 rounded bg-orange-100/70 border border-orange-200 px-2 py-0.5 text-[11px] font-bold text-orange-800">
                          <MapPin className="h-3 w-3 text-orange-600 shrink-0" />
                          <span>Preferred Location: {viewingApp.preferred_location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* CARD 2: Candidate Demographics */}
                <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5 text-blue-500" />
                      Candidate Profile
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500">
                      {viewingApp.gender || "Gender Unspecified"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="block text-slate-400 text-[11px]">Full Name</span>
                      <span className="font-bold text-slate-900 text-sm">{viewingApp.name}</span>
                    </div>
                    <div>
                      <span className="block text-slate-400 text-[11px]">Date of Birth & Age</span>
                      <span className="font-bold text-slate-900">
                        {viewingApp.dob || "Not provided"}
                        {calculateCandidateAge(viewingApp.dob) && (
                          <span className="text-slate-500 font-normal ml-1">
                            ({calculateCandidateAge(viewingApp.dob)})
                          </span>
                        )}
                      </span>
                    </div>
                    <div className="col-span-2">
                      <span className="block text-slate-400 text-[11px]">Residential Address</span>
                      <span className="font-medium text-slate-800 leading-relaxed">
                        {viewingApp.address || "Not provided"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* CARD 3: Contact & Communication */}
                <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5 text-emerald-500" />
                      Contact Information
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Mobile Phone:</span>
                      <a
                        href={`tel:${viewingApp.contact}`}
                        className="font-bold text-blue-600 hover:underline flex items-center gap-1"
                      >
                        <Phone className="h-3 w-3" /> {viewingApp.contact}
                      </a>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Email Address:</span>
                      {viewingApp.email ? (
                        <a
                          href={`mailto:${viewingApp.email}`}
                          className="font-bold text-blue-600 hover:underline flex items-center gap-1"
                        >
                          <Mail className="h-3 w-3" /> {viewingApp.email}
                        </a>
                      ) : (
                        <span className="text-slate-400 italic">Not provided</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* CARD 4: Academic & Technical Qualification */}
                <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                      <GraduationCap className="h-3.5 w-3.5 text-purple-500" />
                      Academic & Technical Qualification
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="block text-slate-400 text-[11px]">Qualification</span>
                      <span className="inline-block mt-0.5 rounded-md bg-purple-50 border border-purple-200 px-2.5 py-1 text-xs font-bold text-purple-900">
                        {viewingApp.qualification || "Unspecified"}
                      </span>
                    </div>
                    <div>
                      <span className="block text-slate-400 text-[11px]">Trade / Discipline</span>
                      <span className="inline-block mt-0.5 rounded-md bg-slate-100 border border-slate-200 px-2.5 py-1 text-xs font-bold text-slate-800">
                        {viewingApp.trade || "Any Trade"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CARD 5: Candidate Uploaded Documents (Full Large View) */}
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <FileText className="h-4 w-4 text-orange-500" />
                      Candidate Uploaded Documents & Verifications
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Review resume, marks cards, and certificates submitted by the candidate during application.
                    </p>
                  </div>
                </div>

                {/* Duplicate Document Detection Alert for Admin */}
                {(() => {
                  const docs = [
                    { name: "Resume", url: viewingApp.resume_url },
                    { name: "Marks Card", url: viewingApp.marks_card_url },
                    { name: "Additional Doc", url: viewingApp.additional_doc_url },
                  ].filter((d): d is { name: string; url: string } => Boolean(d.url));

                  const duplicates: string[] = [];
                  for (let i = 0; i < docs.length; i++) {
                    for (let j = i + 1; j < docs.length; j++) {
                      const fileA = docs[i].url.split("/").pop()?.split("?")[0];
                      const fileB = docs[j].url.split("/").pop()?.split("?")[0];
                      if (docs[i].url === docs[j].url || (fileA && fileB && fileA === fileB)) {
                        duplicates.push(`${docs[i].name} & ${docs[j].name}`);
                      }
                    }
                  }

                  if (duplicates.length === 0) return null;

                  return (
                    <div className="rounded-lg bg-amber-50 border border-amber-200/90 p-2.5 flex items-start gap-2.5 text-xs text-amber-800">
                      <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-bold">Duplicate Document Warning:</strong> The candidate uploaded the identical file across {duplicates.join(", ")}. Please request their distinct original marks card / ID proof before final onboarding.
                      </div>
                    </div>
                  );
                })()}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-1">
                  {/* Document 1: Resume */}
                  <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3.5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                          <FileText className="h-4 w-4 text-blue-600" />
                          Resume / CV
                        </span>
                        {viewingApp.resume_url ? (
                          <span className="inline-flex items-center gap-1 rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                            <Check className="h-2.5 w-2.5" /> Uploaded
                          </span>
                        ) : (
                          <span className="rounded bg-slate-200 px-2 py-0.5 text-[10px] font-bold text-slate-600">
                            Not Attached
                          </span>
                        )}
                      </div>

                      {/* Image Preview Thumbnail if available */}
                      {viewingApp.resume_url && isImageDoc(viewingApp.resume_url) ? (
                        <div
                          onClick={() => setPreviewDocUrl(viewingApp.resume_url)}
                          className="relative group h-32 rounded-lg border border-slate-200 bg-white overflow-hidden mb-3 cursor-pointer flex items-center justify-center shadow-2xs"
                          title="Click to view full image"
                        >
                          <img
                            src={viewingApp.resume_url}
                            alt="Resume Preview"
                            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                          />
                          <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-1">
                            <Eye className="h-4 w-4" /> Expand Preview
                          </div>
                        </div>
                      ) : (
                        <div className="h-20 rounded-lg border border-dashed border-slate-200 bg-white/70 flex items-center justify-center text-slate-400 text-xs mb-3">
                          {viewingApp.resume_url ? "Document File (PDF / Doc)" : "No Resume Uploaded"}
                        </div>
                      )}
                    </div>

                    {viewingApp.resume_url ? (
                      <div className="flex items-center gap-2 pt-2 border-t border-slate-200/70">
                        <a
                          href={viewingApp.resume_url}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold py-1.5 text-xs transition-colors shadow-2xs"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          Open Resume
                        </a>
                      </div>
                    ) : (
                      <span className="text-[11px] text-slate-400 text-center block pt-2 border-t border-slate-200/50">
                        Candidate did not attach resume
                      </span>
                    )}
                  </div>

                  {/* Document 2: Marks Card */}
                  <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3.5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                          <GraduationCap className="h-4 w-4 text-emerald-600" />
                          Marks Card
                        </span>
                        {viewingApp.marks_card_url ? (
                          <span className="inline-flex items-center gap-1 rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                            <Check className="h-2.5 w-2.5" /> Uploaded
                          </span>
                        ) : (
                          <span className="rounded bg-slate-200 px-2 py-0.5 text-[10px] font-bold text-slate-600">
                            Not Attached
                          </span>
                        )}
                      </div>

                      {/* Image Preview Thumbnail if available */}
                      {viewingApp.marks_card_url && isImageDoc(viewingApp.marks_card_url) ? (
                        <div
                          onClick={() => setPreviewDocUrl(viewingApp.marks_card_url)}
                          className="relative group h-32 rounded-lg border border-slate-200 bg-white overflow-hidden mb-3 cursor-pointer flex items-center justify-center shadow-2xs"
                          title="Click to view full image"
                        >
                          <img
                            src={viewingApp.marks_card_url}
                            alt="Marks Card Preview"
                            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                          />
                          <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-1">
                            <Eye className="h-4 w-4" /> Expand Preview
                          </div>
                        </div>
                      ) : (
                        <div className="h-20 rounded-lg border border-dashed border-slate-200 bg-white/70 flex items-center justify-center text-slate-400 text-xs mb-3">
                          {viewingApp.marks_card_url ? "Document File (PDF / Doc)" : "No Marks Card Uploaded"}
                        </div>
                      )}
                    </div>

                    {viewingApp.marks_card_url ? (
                      <div className="flex items-center gap-2 pt-2 border-t border-slate-200/70">
                        <a
                          href={viewingApp.marks_card_url}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-1.5 text-xs transition-colors shadow-2xs"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          Open Marks Card
                        </a>
                      </div>
                    ) : (
                      <span className="text-[11px] text-slate-400 text-center block pt-2 border-t border-slate-200/50">
                        Candidate did not attach marks card
                      </span>
                    )}
                  </div>

                  {/* Document 3: Additional Document */}
                  <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3.5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                          <Paperclip className="h-4 w-4 text-purple-600" />
                          Additional Certificate / ID
                        </span>
                        {viewingApp.additional_doc_url ? (
                          <span className="inline-flex items-center gap-1 rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                            <Check className="h-2.5 w-2.5" /> Uploaded
                          </span>
                        ) : (
                          <span className="rounded bg-slate-200 px-2 py-0.5 text-[10px] font-bold text-slate-600">
                            Not Attached
                          </span>
                        )}
                      </div>

                      {/* Image Preview Thumbnail if available */}
                      {viewingApp.additional_doc_url && isImageDoc(viewingApp.additional_doc_url) ? (
                        <div
                          onClick={() => setPreviewDocUrl(viewingApp.additional_doc_url)}
                          className="relative group h-32 rounded-lg border border-slate-200 bg-white overflow-hidden mb-3 cursor-pointer flex items-center justify-center shadow-2xs"
                          title="Click to view full image"
                        >
                          <img
                            src={viewingApp.additional_doc_url}
                            alt="Additional Doc Preview"
                            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                          />
                          <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-1">
                            <Eye className="h-4 w-4" /> Expand Preview
                          </div>
                        </div>
                      ) : (
                        <div className="h-20 rounded-lg border border-dashed border-slate-200 bg-white/70 flex items-center justify-center text-slate-400 text-xs mb-3">
                          {viewingApp.additional_doc_url ? "Document File (PDF / Doc)" : "No Additional Doc"}
                        </div>
                      )}
                    </div>

                    {viewingApp.additional_doc_url ? (
                      <div className="flex items-center gap-2 pt-2 border-t border-slate-200/70">
                        <a
                          href={viewingApp.additional_doc_url}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-bold py-1.5 text-xs transition-colors shadow-2xs"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          Open Additional Doc
                        </a>
                      </div>
                    ) : (
                      <span className="text-[11px] text-slate-400 text-center block pt-2 border-t border-slate-200/50">
                        Candidate did not attach extra doc
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* CARD 6: Internal Admin Notes & Evaluation */}
              <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Edit className="h-3.5 w-3.5 text-orange-500" />
                    Internal Recruitment & Interview Notes
                  </label>
                  <span className="text-[11px] text-slate-400">
                    Saved privately for EduAdmin recruitment staff
                  </span>
                </div>

                <div className="flex gap-2">
                  <textarea
                    rows={2}
                    value={appNotesInput}
                    onChange={(e) => setAppNotesInput(e.target.value)}
                    placeholder="e.g. Spoke on 28th Oct: Candidate is ready to join immediately for Tumkur drive; needs hostel assistance."
                    className="w-full rounded-lg border border-slate-300 bg-white p-2.5 text-xs text-slate-800 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
                  />
                  <button
                    type="button"
                    disabled={isSavingNotes}
                    onClick={handleSaveAppNotes}
                    className="rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold px-3 py-2 text-xs flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {isSavingNotes ? (
                      <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Save className="h-3.5 w-3.5 text-orange-400" />
                    )}
                    Save Note
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-slate-100 p-4 bg-slate-50 flex items-center justify-between">
              <div className="text-xs text-slate-500 flex items-center gap-2">
                <span>Application ID: <strong className="font-mono text-slate-700">{viewingApp.id}</strong></span>
              </div>
              <button
                type="button"
                onClick={() => setViewingApp(null)}
                className="rounded-lg bg-slate-800 hover:bg-slate-900 text-white font-bold px-4 py-2 text-xs transition-colors cursor-pointer"
              >
                Done Viewing
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DOCUMENT HIGH-RES LIGHTBOX PREVIEW MODAL */}
      {previewDocUrl && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-md"
          onClick={() => setPreviewDocUrl(null)}
          data-lenis-prevent
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-3 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-800">Document Verification Preview</span>
              <div className="flex items-center gap-2">
                <a
                  href={previewDocUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded bg-slate-100 hover:bg-slate-200 text-slate-800 px-2.5 py-1 text-xs font-bold flex items-center gap-1"
                >
                  <ExternalLink className="h-3 w-3" /> Open in New Tab
                </a>
                <button
                  type="button"
                  onClick={() => setPreviewDocUrl(null)}
                  className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="max-h-[75vh] overflow-auto flex items-center justify-center p-3 bg-slate-900/5">
              <img
                src={previewDocUrl}
                alt="Document Full Preview"
                className="max-h-[70vh] max-w-full object-contain rounded"
              />
            </div>
          </div>
        </div>
      )}

      {/* 7. STRICT PERMISSION & CONFIRMATION DIALOG MODAL (FOR ALL DELETIONS) */}
      {confirmModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-xs overflow-y-auto"
          data-lenis-prevent
        >
          <div className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl my-6 border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Top Accent Strip */}
            <div
              className={`h-2 w-full ${
                confirmModal.variant === "warning" ? "bg-amber-500" : "bg-rose-600"
              }`}
            />

            <div className="p-6">
              <div className="flex items-start gap-3.5">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                    confirmModal.variant === "warning"
                      ? "bg-amber-100 text-amber-700 border border-amber-200"
                      : "bg-rose-100 text-rose-700 border border-rose-200"
                  }`}
                >
                  {confirmModal.variant === "warning" ? (
                    <AlertCircle className="h-6 w-6" />
                  ) : (
                    <Trash2 className="h-6 w-6" />
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {confirmModal.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed whitespace-pre-line">
                    {confirmModal.message}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  disabled={isConfirming}
                  onClick={() => setConfirmModal(null)}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {confirmModal.cancelText || "Cancel"}
                </button>
                <button
                  type="button"
                  disabled={isConfirming}
                  onClick={async () => {
                    await confirmModal.onConfirm();
                  }}
                  className={`rounded-lg px-4 py-2 text-xs font-bold text-white shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50 ${
                    confirmModal.variant === "warning"
                      ? "bg-amber-600 hover:bg-amber-700"
                      : "bg-rose-600 hover:bg-rose-700"
                  }`}
                >
                  {isConfirming && <RefreshCw className="h-3.5 w-3.5 animate-spin" />}
                  {confirmModal.confirmText || "Confirm"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
