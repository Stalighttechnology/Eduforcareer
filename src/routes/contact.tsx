import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Mail, Phone, Facebook, Youtube, Linkedin } from "lucide-react";
import { submitContactForm } from "@/lib/contactService";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us – Trublend EduforCareer" },
      { name: "description", content: "Get in touch with Trublend EduforCareer. Visit us at Rajajinagar, Bengaluru or send us a message." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  // ✅ Form state
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  // ✅ Loading state
  const [loading, setLoading] = useState(false);

  // ✅ Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await submitContactForm(form);

      toast.success("Message sent successfully 🚀");

      setForm({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
      });

    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Banner */}
      <section className="page-header-banner py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <p className="section-label text-sm">LEARN. GROW. SUCCEED.</p>
          <h1 className="mt-2 font-heading text-4xl font-bold text-foreground md:text-5xl">
            Contact Us
          </h1>
        </div>
      </section>

      {/* Contact form + info */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">

            {/* FORM */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-foreground">
                Contact Information
              </h2>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">

                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={form.firstName}
                    onChange={(e) =>
                      setForm({ ...form, firstName: e.target.value })
                    }
                    className="rounded-lg border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
                    required
                  />

                  <input
                    type="text"
                    placeholder="Last Name"
                    value={form.lastName}
                    onChange={(e) =>
                      setForm({ ...form, lastName: e.target.value })
                    }
                    className="rounded-lg border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <input
                  type="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  className="w-full rounded-lg border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
                  required
                />

                <textarea
                  placeholder="Your Message"
                  rows={5}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  className="w-full rounded-lg border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
                  required
                />

                {/* ✅ FIXED BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-lg bg-primary py-3 font-heading text-sm font-semibold text-primary-foreground transition hover:brightness-110 disabled:opacity-60"
                >
                  {loading ? "Sending..." : "Submit Message"}
                </button>
              </form>
            </div>

            {/* INFO */}
            <div>
              <h3 className="font-heading text-xl font-bold text-foreground">
                Headquarters
              </h3>

              <ul className="mt-4 space-y-4 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 text-primary" />
                  No. 130, 1st Block, Dr. Rajkumar Road, Rajajinagar, Bengaluru-560010
                </li>

                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <a href="mailto:info@eduforcareer.com">info@eduforcareer.com</a>
                </li>

                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <a href="tel:+917760826949">+91-77608 26949</a>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}