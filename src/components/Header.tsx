import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import { profile, sections } from '../data/profile';
import { Download, GitHub, LinkedIn, Mail } from './icons';
import { ease } from './Reveal';
import { LogoMark } from './Logo';

export function Header({ active }: { active: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open]);

  const sec = sections.find((s) => s.id === active) ?? sections[0];
  const theme = open ? 'dark' : sec.theme;
  const label = sec.id === 'top' ? profile.role : sec.label;

  return (
    <>
      <motion.div className="progress" style={{ scaleX }} aria-hidden="true" />
      <header className={`header${scrolled || open ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`} data-theme={theme}>
        <div className="wrap header__inner">
          <div className="header__left">
            <a href="#top" className="logo" aria-label="Ahsan Habib, back to top" onClick={() => setOpen(false)}>
              <LogoMark className="logo__mark" />
              <span className="logo__text">Ahsan Habib</span>
            </a>
            <span className="header__sep" aria-hidden="true" />
            <div className="header__label" aria-hidden="true">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span key={label} initial={{ y: 22, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -22, opacity: 0 }} transition={{ duration: 0.35, ease }}>
                  {open ? 'Menu' : label}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
          <div className="header__right">
            <a className="header__cv" href={profile.cv} download="Ahsan_Habib_CV.pdf" aria-label="Download CV (PDF)">
              <Download /><span>Download CV</span>
            </a>
            <button className="menu-btn" aria-expanded={open} aria-controls="site-menu" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen((o) => !o)}>
              <span /><span />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="site-menu"
            className="menu"
            aria-label="Sections"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease }}
          >
            <div className="menu__grid">
              <ul className="menu__list">
                {sections.slice(1).map((s, i) => (
                  <motion.li key={s.id} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.04, duration: 0.5, ease }}>
                    <a href={`#${s.id}`} className={s.id === active ? 'is-active' : ''} onClick={() => setOpen(false)}>
                      <small>{String(i + 1).padStart(2, '0')}</small>{s.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <motion.div className="menu__side" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                <p>{profile.status} · {profile.statusDetail}. Backend developer in {profile.location}.</p>
                <div className="menu__links">
                  <a href={`mailto:${profile.email}`}><Mail width={16} height={16} />{profile.email}</a>
                  <a href={profile.linkedin} target="_blank" rel="noreferrer"><LinkedIn width={16} height={16} />LinkedIn</a>
                  <a href={profile.github} target="_blank" rel="noreferrer"><GitHub width={16} height={16} />GitHub</a>
                  <a href={profile.cv} download="Ahsan_Habib_CV.pdf"><Download width={16} height={16} />Download CV (PDF)</a>
                </div>
              </motion.div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
