import aboutUs2Img from "../assets/about-us-2.jpeg";

export default function AboutSection() {
  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-10 px-4 lg:flex-row lg:px-8">
        <div className="flex-1">
          <img
            src={aboutUs2Img}
            alt="About Trublend EduforCareer"
            className="rounded-xl shadow-lg"
            loading="lazy"
            width={712}
            height={534}
          />
        </div>
        <div className="flex-1">
          <span className="section-label text-sm tracking-widest">ABOUT COMPANY</span>
          <h2 className="mt-2 font-heading text-3xl font-bold text-foreground md:text-4xl">Trublend EduforCareer</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Trublend EduforCareer Technologies Pvt. Ltd. is a dynamic and emerging organization dedicated to bridging the gap between education and employability. Established in August 2025, Trublend is driven by a mission to empower individuals and organizations through innovative skill development, corporate training, and HR solutions.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            We collaborate with Educational Institutions, and Corporate Companies to design and deliver industry-relevant training programs on the latest technologies and workforce development initiatives.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Our team comprises experienced industry professionals, HR experts, and certified trainers with a proven track record of implementing effective learning and talent strategies across diverse sectors.
          </p>
        </div>
      </div>
    </section>
  );
}
