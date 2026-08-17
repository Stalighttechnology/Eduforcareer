import { createFileRoute } from "@tanstack/react-router";
import HeroSection from "@/components/HeroSection";
import FeaturesBar from "@/components/FeaturesBar";
import CoursesOffered from "@/components/CoursesOffered";
import RecentCourses from "@/components/RecentCourses";
import AboutSection from "@/components/AboutSection";
import Testimonials from "@/components/Testimonials";
import HiringPartners from "@/components/HiringPartners";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Trublend EduforCareer – Building Skills. Creating Careers." },
      { name: "description", content: "Trublend EduforCareer is a leading training and career development institute dedicated to preparing individuals for the fast-growing IT and corporate workforce." },
      { property: "og:title", content: "Trublend EduforCareer – Building Skills. Creating Careers." },
      { property: "og:description", content: "Leading training and career development institute in Bangalore." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <HeroSection />
      <FeaturesBar />
      <CoursesOffered />
      <RecentCourses />
      <AboutSection />
      <Testimonials />
      <HiringPartners />
    </>
  );
}
