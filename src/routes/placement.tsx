import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Briefcase, Users, CheckCircle, FileText, MapPin } from "lucide-react";
import { submitApplication } from "@/lib/applicationService";
import { toast } from "sonner";

export const Route = createFileRoute("/placement")({
  head: () => ({
    meta: [
      { title: "Careers – Trublend EduforCareer" },
      { name: "description", content: "Careers at Trublend EduforCareer — internal roles and industry placement opportunities." },
      { property: "og:title", content: "Careers – Trublend EduforCareer" },
    ],
  }),
  component: PlacementPage,
});

const internalImage = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=1f8b6c9f57f6f6b8b9d5b7c8a2b1a2b3";
const industryImage = "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=0f9a9e7b2f6a4e3d2c1b0a9f8e7d6c5b";

function PlacementPage() {
  return (
    <div className="space-y-20">
      <section className="page-header-banner py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
          <p className="section-label text-sm">CAREERS</p>
          <h1 className="mt-2 font-heading text-4xl font-bold text-foreground md:text-5xl">Careers at Trublend EduforCareer</h1>
          <p className="mt-3 text-muted-foreground">Explore internal roles or get placed with our industry partners.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 lg:px-8 grid gap-12 lg:grid-cols-3 items-stretch">
        <div className="col-span-1 flex items-center">
          <img src={internalImage} alt="Internal Careers" className="rounded-2xl shadow-lg w-full object-cover h-64 md:h-80 lg:h-[420px]" />
        </div>

        <div className="col-span-1 flex flex-col justify-center">
          <h2 className="text-2xl font-bold flex items-center gap-3"><Briefcase /> Internal Career Opportunities</h2>
          <p className="mt-4 text-slate-700">We continually hire from within and support career growth through mentorship, upskilling, and rotational programs. Browse our current openings, apply to specific roles, or register your interest for future internal positions.</p>

          <ul className="mt-6 space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle className="text-green-500" />
              <div>
                <b>Mentorship Programs</b>
                <div className="text-sm text-slate-600">One-on-one mentoring to help you transition into new internal roles.</div>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Users className="text-orange-500" />
              <div>
                <b>Rotational Tracks</b>
                <div className="text-sm text-slate-600">Short rotations across teams to build cross-functional experience.</div>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <FileText className="text-sky-500" />
              <div>
                <b>Skill Workshops</b>
                <div className="text-sm text-slate-600">Hands-on workshops focused on role-relevant technical and soft skills.</div>
              </div>
            </li>
          </ul>
        </div>

        <div className="col-span-1 flex items-center">
          <div className="w-full">
            <div className="h-full flex items-center">
              <InternalForm />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 grid gap-12 lg:grid-cols-3 items-stretch">
          <div className="col-span-1 flex flex-col justify-center">
            <h2 className="text-2xl font-bold flex items-center gap-3"><MapPin /> Industry Placement Opportunities</h2>
            <p className="mt-4 text-slate-700">We partner with leading companies to place our learners. Our placement team facilitates resume reviews, mock interviews, and referrals to hiring partners.</p>

            <ul className="mt-6 space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="text-green-500" />
                <div>
                  <b>Interview Prep</b>
                  <div className="text-sm text-slate-600">Mock interviews with industry mentors and targeted feedback.</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Users className="text-orange-500" />
                <div>
                  <b>Hiring Network</b>
                  <div className="text-sm text-slate-600">Access to vetted hiring partners across domains and geographies.</div>
                </div>
              </li>
            </ul>
          </div>

          <div className="col-span-1 flex items-center">
            <div className="w-full">
              <div className="h-full flex items-center">
                <IndustryForm />
              </div>
            </div>
          </div>

          <div className="col-span-1 flex items-center">
            <img src={industryImage} alt="Industry Placement" className="rounded-2xl shadow-lg w-full object-cover h-64 md:h-80 lg:h-[420px]" />
          </div>
        </div>
      </section>
    </div>
  );
}

function InternalForm() {
  const [formData, setFormData] = useState({ name: "", email: "", contact: "", currentRole: "", preferredRole: "", address: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitApplication({ ...formData, type: 'internal' });
      toast.success('Internal application submitted — our team will reach out.');
      setFormData({ name: "", email: "", contact: "", currentRole: "", preferredRole: "", address: "" });
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || 'Submission failed');
    } finally { setLoading(false); }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4 bg-white p-6 rounded-xl border shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Full name" className="w-full px-4 py-3 border rounded-lg" />
        <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full px-4 py-3 border rounded-lg" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="contact" value={formData.contact} onChange={handleChange} placeholder="Contact" className="w-full px-4 py-3 border rounded-lg" />
        <input name="currentRole" value={formData.currentRole} onChange={handleChange} placeholder="Current role" className="w-full px-4 py-3 border rounded-lg" />
      </div>
      <input name="preferredRole" value={formData.preferredRole} onChange={handleChange} placeholder="Preferred role" className="w-full px-4 py-3 border rounded-lg" />
      <textarea name="address" value={formData.address} onChange={handleChange} rows={3} placeholder="Address" className="w-full px-4 py-3 border rounded-lg" />

      <div className="flex items-center justify-end">
        <button type="submit" disabled={loading} className={`px-6 py-3 rounded-lg bg-orange-500 text-white font-semibold ${loading ? 'opacity-60 cursor-not-allowed' : 'hover:bg-orange-600'}`}>
          {loading ? 'Submitting...' : 'Apply for Internal Role'}
        </button>
      </div>
    </form>
  );
}

function IndustryForm() {
  const [formData, setFormData] = useState({ name: "", email: "", contact: "", qualification: "", location: "", address: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitApplication({ ...formData, type: 'industry' });
      toast.success('Industry placement application submitted — we will contact you soon.');
      setFormData({ name: "", email: "", contact: "", qualification: "", location: "", address: "" });
      
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || 'Submission failed');
    } finally { setLoading(false); }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4 bg-white p-6 rounded-xl border shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Full name" className="w-full px-4 py-3 border rounded-lg" />
        <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full px-4 py-3 border rounded-lg" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="contact" value={formData.contact} onChange={handleChange} placeholder="Contact" className="w-full px-4 py-3 border rounded-lg" />
        <input name="qualification" value={formData.qualification} onChange={handleChange} placeholder="Qualification" className="w-full px-4 py-3 border rounded-lg" />
      </div>
      <input name="location" value={formData.location} onChange={handleChange} placeholder="Preferred location" className="w-full px-4 py-3 border rounded-lg" />
      <textarea name="address" value={formData.address} onChange={handleChange} rows={3} placeholder="Address" className="w-full px-4 py-3 border rounded-lg" />

      {/* Resume removed as requested */}

      <div className="flex items-center justify-end">
        <button type="submit" disabled={loading} className={`px-6 py-3 rounded-lg bg-orange-500 text-white font-semibold ${loading ? 'opacity-60 cursor-not-allowed' : 'hover:bg-orange-600'}`}>
          {loading ? 'Submitting...' : 'Apply for Industry Placement'}
        </button>
      </div>
    </form>
  );
}

export default PlacementPage;
