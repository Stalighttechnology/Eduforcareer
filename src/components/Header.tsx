import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "../assets/trublendeduforcarrier.png";

const programmes = [
  { name: "Job Guaranteed Courses", href: "/RecentCourses" },
  { name: "Govt Sponsored Courses", href: "/skills" },
  { name: "Corporate Training", href: "/corporate-training" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [progOpen, setProgOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        <Link to="/" className="flex-shrink-0">
          <img src={logo} alt="Trublend EduforCareer" className="h-14 w-auto max-w-[290px]" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          <Link to="/" className="text-sm font-medium text-foreground hover:text-primary" activeProps={{ className: "text-primary" }}>
            Home
          </Link>
          <Link to="/about" className="text-sm font-medium text-foreground hover:text-primary" activeProps={{ className: "text-primary" }}>
            About Us
          </Link>
          <div className="relative group">
            <button className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary">
              Programmes <ChevronDown className="h-4 w-4" />
            </button>
            <div className="invisible absolute left-0 top-full z-50 min-w-[220px] rounded-lg bg-background py-2 opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100">
              {programmes.map((p) => (
                <Link
                  key={p.name}
                  to={p.href}
                  className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground"
                  activeProps={{ className: "bg-accent text-accent-foreground" }}
                >
                  {p.name}
                </Link>
              ))}
            </div>
          </div>
          <Link to="/placement" className="text-sm font-medium text-foreground hover:text-primary" activeProps={{ className: "text-primary" }}>
            Careers
          </Link>
          <Link to="/contact" className="text-sm font-medium text-foreground hover:text-primary" activeProps={{ className: "text-primary" }}>
            Contact Us
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t bg-background px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-3">
            <Link to="/" className="text-sm font-medium" onClick={() => setMobileOpen(false)}>Home</Link>
            <Link to="/about" className="text-sm font-medium" onClick={() => setMobileOpen(false)}>About Us</Link>
            <button className="flex items-center gap-1 text-sm font-medium text-left" onClick={() => setProgOpen(!progOpen)}>
              Programmes <ChevronDown className={`h-4 w-4 transition-transform ${progOpen ? "rotate-180" : ""}`} />
            </button>
            {progOpen && programmes.map((p) => (
              <Link
                key={p.name}
                to={p.href}
                className="pl-4 text-sm text-muted-foreground hover:text-primary"
                onClick={() => setMobileOpen(false)}
              >
                {p.name}
              </Link>
            ))}
            <Link to="/placement" className="text-sm font-medium" onClick={() => setMobileOpen(false)}>Careers & Openings</Link>
            <Link to="/contact" className="text-sm font-medium" onClick={() => setMobileOpen(false)}>Contact Us</Link>
          </div>
        </div>
      )}
    </header>
  );
}
