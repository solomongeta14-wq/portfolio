import Navbar from "@/components/Navbar";
import ScrollSpyRail from "@/components/ScrollSpyRail";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export default function Home() {
  return (
    <>
      <Navbar />
      <ScrollSpyRail />
      <main className="min-h-[calc(100vh-60px)] pt-[60px] lg:min-h-[calc(100vh-68px)] lg:pt-[68px]">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
