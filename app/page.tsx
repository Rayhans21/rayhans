import Hero from '@/components/hero';
import About from '@/components/about';
import Skills from '@/components/skills';
import Projects from '@/components/projects';
import Experiences from '@/components/experiences';
import ContactSection from '@/components/contacts';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      {/* <Experiences /> */}
      <ContactSection />
      <Footer />
    </>
  );
}
