import { useMemo } from 'react';
import { motion } from 'motion/react';
import { profile } from '../data/profile';
import { renderToks, tokenizeJson, tokLength, type Tok } from '../lib/json';
import { asset } from '../lib/asset';
import { useTyping } from '../hooks/useTyping';
import { ArrowDown, ArrowRight, GitHub, LinkedIn, Mail } from './icons';
import { ease } from './Reveal';

function HeroTerminal() {
  const toks = useMemo<Tok[]>(() => {
    const json = JSON.stringify({ status: 'open_to_work', role: 'backend', graduating: 'Fall 2026' }, null, 2);
    return [
      { t: '$ ', c: 'j-c' },
      { t: 'curl localhost:1027/api/v1/status', c: 'j-cmd' },
      { t: '\n', c: '' },
      ...tokenizeJson(json),
    ];
  }, []);
  const total = tokLength(toks);
  const n = useTyping(total, true, 1500, 1100);

  return (
    <motion.div className="term-float" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.8, ease }}>
      <div className="term-float__bar" aria-hidden="true"><i /><i /><i /><span>kaaj · port 1027</span></div>
      <pre aria-label="Terminal: curl localhost:1027/api/v1/status returns status open_to_work, role backend, graduating Fall 2026">
        <span aria-hidden="true">{renderToks(toks, n)}<span className="caret" /></span>
      </pre>
    </motion.div>
  );
}

export function Hero() {
  const line = (delay: number) => ({ initial: { y: '108%' }, animate: { y: 0 }, transition: { duration: 1.05, ease, delay } });
  const fade = (delay: number) => ({ initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, ease, delay } });

  return (
    <section id="top" className="section s-dark hero">
      <div className="hero__bg" aria-hidden="true"><div className="hero__grid" /><div className="hero__glow" /></div>
      <div className="wrap hero__inner">
        <div>
          <motion.div className="status" {...fade(0.05)}>
            <span className="pulse" aria-hidden="true" />
            {profile.status} <em>· {profile.statusDetail}</em>
          </motion.div>

          <h1 className="hero__name">
            <span className="line"><motion.span {...line(0.12)}>{profile.first}</motion.span></span>
            <span className="line"><motion.span {...line(0.22)}>{profile.last}<span className="dot">.</span></motion.span></span>
          </h1>

          <motion.p className="hero__role" {...fade(0.5)}>
            Backend developer building REST APIs that enforce their own <span className="serif">rules.</span>
          </motion.p>
          <motion.p className="hero__intro" {...fade(0.6)}>{profile.intro}</motion.p>

          <motion.div className="hero__ctas" {...fade(0.7)}>
            <a className="btn btn--primary" href="#work">See my work <ArrowRight /></a>
            <a className="btn btn--ghost btn--down" href={profile.cv} download="Ahsan_Habib_CV.pdf">Download CV <ArrowDown /></a>
          </motion.div>
          <motion.div className="hero__socials" {...fade(0.8)}>
            <a href={profile.github} target="_blank" rel="noreferrer"><GitHub /> GitHub</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer"><LinkedIn /> LinkedIn</a>
            <a href={`mailto:${profile.email}`}><Mail /> Email</a>
          </motion.div>
        </div>

        <motion.div className="portrait" initial={{ opacity: 0, y: 50, rotate: 3 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ duration: 1.1, ease, delay: 0.3 }}>
          <div className="portrait__back" aria-hidden="true" />
          <div className="portrait__frame">
            <picture>
              <source type="image/webp" srcSet={`${asset('ahsan-hero-500.webp')} 500w, ${asset('ahsan-hero.webp')} 1000w`} sizes="(min-width: 1080px) 420px, 90vw" />
              <img src={asset('ahsan-hero.jpg')} width={1000} height={1250} fetchPriority="high" alt="Ahsan Habib smiling at BRAC University, holding his bound undergraduate thesis" />
            </picture>
            <div className="portrait__caption" aria-hidden="true"><span>BRAC University · 2026</span><span>Thesis: A (95.5)</span></div>
          </div>
          <HeroTerminal />
        </motion.div>
      </div>
      <a href="#about" className="scroll-cue" aria-label="Scroll to About"><i aria-hidden="true" />Scroll</a>
    </section>
  );
}

export function Marquee({ items }: { items: string[] }) {
  const group = (hidden: boolean) => (
    <div className="marquee__group" aria-hidden={hidden || undefined}>
      {items.map((t) => (
        <span className="marquee__item" key={t}>{t}<SparkIcon /></span>
      ))}
    </div>
  );
  return (
    <div className="marquee" role="region" aria-label="Technologies I work with">
      <div className="marquee__track">{group(false)}{group(true)}</div>
    </div>
  );
}

function SparkIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2c.6 4.8 2.2 7.4 10 10-7.8 2.6-9.4 5.2-10 10-.6-4.8-2.2-7.4-10-10 7.8-2.6 9.4-5.2 10-10Z" /></svg>;
}
