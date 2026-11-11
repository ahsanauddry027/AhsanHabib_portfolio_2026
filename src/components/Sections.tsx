import { useState } from 'react';
import { principles, profile, stack } from '../data/profile';
import { asset } from '../lib/asset';
import { LogoMark } from './Logo';
import { ArrowUpRight, Download, GitHub, LinkedIn } from './icons';
import { Reveal, SectionHead } from './Reveal';

export function Principles() {
  return (
    <section id="principles" className="section s-dark s-deep">
      <div className="wrap">
        <SectionHead index="06" title={<>How I <span className="serif">build</span></>} aside="Principles, with proof" />
        <div className="principles">
          {principles.map((p, i) => (
            <Reveal key={p.title} className="principle" delay={(i % 3) * 0.06}>
              <span className="principle__n">{String(i + 1).padStart(2, '0')}</span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
              <small>↳ {p.proof}</small>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Stack() {
  return (
    <section id="stack" className="section s-paper">
      <div className="wrap">
        <SectionHead index="07" title={<>Tech <span className="serif">stack</span></>} aside="What I use" />
        <div className="stack">
          {stack.map((g, i) => (
            <Reveal key={g.group} className="stack__row" delay={i * 0.04} y={16}>
              <div className="stack__group">{g.group}</div>
              <div className="stack__items">
                {g.items.map((s) => <span key={s} className={`chip${g.core?.includes(s) ? ' is-core' : ''}`}>{s}</span>)}
              </div>
            </Reveal>
          ))}
        </div>
        <div className="stack__legend">
          <span><i />Used in a backend project on this page</span>
          <span><i className="light" />Also used</span>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = profile.email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section id="contact" className="section s-dark contact">
      <div className="hero__bg" aria-hidden="true"><div className="hero__grid" /></div>
      <div className="wrap" style={{ position: 'relative' }}>
        <Reveal>
          <span className="contact__kicker">08 / Let’s talk</span>
          <h2 className="contact__title">Let’s build something <span className="serif">reliable.</span></h2>
        </Reveal>
        <div className="contact__grid">
          <Reveal delay={0.1}>
            <p className="contact__lede">
              I’m looking for backend and software engineering roles as I graduate in Fall 2026. The fastest way to reach me is email.
            </p>
            <div className="mail">
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <button className="copy" onClick={copy} aria-live="polite">{copied ? 'Copied ✓' : 'Copy'}</button>
            </div>
            <div className="contact__ctas">
              <a className="btn btn--primary btn--down" href={profile.cv} download="Ahsan_Habib_CV.pdf">Download CV <Download /></a>
              <a className="btn btn--ghost" href={profile.linkedin} target="_blank" rel="noreferrer"><LinkedIn /> LinkedIn</a>
              <a className="btn btn--ghost" href={profile.github} target="_blank" rel="noreferrer"><GitHub /> GitHub</a>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="me">
              <picture>
                <source type="image/webp" srcSet={asset('ahsan-avatar.webp')} />
                <img src={asset('ahsan-avatar.jpg')} alt="" width={64} height={64} loading="lazy" />
              </picture>
              <div>
                <b>{profile.name}</b>
                <span>{profile.role} · {profile.location} (GMT+6)</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__top">
        <span className="footer__brand"><LogoMark className="footer__mark" />© 2026 {profile.name} · Built with React, TypeScript and Vite</span>
        <nav className="footer__links" aria-label="Elsewhere">
          <a href={profile.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight width={12} height={12} /></a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight width={12} height={12} /></a>
          <a href={`mailto:${profile.email}`}>Email</a>
          <a href="#top">Back to top ↑</a>
        </nav>
      </div>
      <div className="footer__big" aria-hidden="true">Ahsan Habib<i>.</i></div>
    </footer>
  );
}
