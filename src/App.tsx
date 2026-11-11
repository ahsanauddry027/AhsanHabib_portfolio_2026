import { MotionConfig } from 'motion/react';
import { marquee, sections } from './data/profile';
import { useActiveSection } from './hooks/useActiveSection';
import { Header } from './components/Header';
import { Hero, Marquee } from './components/Hero';
import { About } from './components/About';
import { Work } from './components/Work';
import { KaajLab } from './components/KaajLab';
import { Experience } from './components/Experience';
import { Research } from './components/Research';
import { Contact, Footer, Principles, Stack } from './components/Sections';

const ids = sections.map((s) => s.id);

export default function App() {
  const active = useActiveSection(ids);
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip" href="#about">Skip to content</a>
      <Header active={active} />
      <main>
        <Hero />
        <Marquee items={marquee} />
        <About />
        <Work />
        <KaajLab />
        <Experience />
        <Research />
        <Principles />
        <Stack />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
