import { Link } from "@tanstack/react-router";
import { Facebook, Youtube, Linkedin, MapPin, Mail, Phone, ArrowRight, Instagram } from "lucide-react";
import logo from "../assets/TruBlend EduforCareer white without bg.png";

const whatWeOffer = [
  { label: "About Us", to: "/about" },
  { label: "IT Training", to: "/" },
  { label: "Corporate Training", to: "/" },
  { label: "Careers", to: "/careers" },
  { label: "Contact Us", to: "/contact" },
];

const popularCourses = [
  { name: "Aviation", to: "/aviation" },
  { name: "Python Full Stack Development", to: "/#recent-courses" },
  { name: "Java full Stack Development", to: "/#recent-courses" },
  { name: "Artificial Intelligence", to: "/#recent-courses" },
  { name: "Cyber Security", to: "/#recent-courses" },
];

export default function Footer() {
  return (
    <footer className="bg-footer-bg text-footer-foreground">
      <div className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <img src={logo} alt="Trublend EduforCareer" className="mb-7 h-[78px] w-auto max-w-[290px] sm:h-[84px]" />
            <p className="text-sm leading-relaxed text-white/80 sm:text-[15px]">
              Empowering learners with quality online courses and skill-building programs.
            </p>
            <p className="mt-4 text-sm font-semibold text-white/90 sm:text-[15px]">
              2025 © All Rights Reserved
            </p>
          </div>

          {/* What we offer */}
          <div>
            <h4 className="mb-5 font-heading text-lg font-semibold">What we offer</h4>
            <ul className="space-y-3">
              {whatWeOffer.map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="flex items-center gap-2 text-sm opacity-80 transition hover:opacity-100">
                    <ArrowRight className="h-3.5 w-3.5 text-primary" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Courses */}
          <div>
            <h4 className="mb-5 font-heading text-lg font-semibold">Popular Courses</h4>
            <ul className="space-y-3">
              {popularCourses.map((course) => (
                <li key={course.name}>
                  <Link to={course.to} className="flex items-center gap-2 text-sm opacity-80 transition hover:opacity-100">
                    <ArrowRight className="h-3.5 w-3.5 text-primary" />
                    {course.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="mb-5 font-heading text-lg font-semibold">Connect</h4>
            <ul className="space-y-4 text-sm text-white/80 sm:text-[15px]">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <span className="leading-relaxed">No. 130, 1st Block, Dr. Rajkumar Road Rajajinagar, Bengaluru-560010</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 flex-shrink-0 text-primary" />
                <a href="mailto:info@eduforcareer.com" className="font-medium hover:opacity-100">info@eduforcareer.com</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 flex-shrink-0 text-primary" />
                <a href="tel:+917760826949" className="text-base font-semibold text-white hover:opacity-100">+91-77608 26949</a>
              </li>
            </ul>
            <div className="mt-6 flex gap-3">
              <a href="https://www.facebook.com/profile.php?id=61563178045998" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm transition hover:scale-105 hover:opacity-90">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm transition hover:scale-105 hover:opacity-90">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="https://www.instagram.com/trublendeduforcareer?igsh=MWc0YjJsbmMwYmg2" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm transition hover:scale-105 hover:opacity-90">
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-5">
          <p className="text-center text-sm text-footer-foreground/80">
            Designed &amp; Developed by{' '}
            <a
              href="https://www.stalight.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white transition hover:text-primary underline-offset-4 hover:underline"
            >
              Stalight Technologies
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}