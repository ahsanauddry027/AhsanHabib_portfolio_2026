import { motion } from 'motion/react';
import { research } from '../data/profile';
import { asset } from '../lib/asset';
import { Reveal, SectionHead, ease } from './Reveal';

function Bar({ label, value, after }: { label: string; value: number; after?: boolean }) {
  return (
    <div className={`bar${after ? ' bar--after' : ''}`}>
      <span>{label}</span>
      <div className="bar__track">
        <motion.div className="bar__fill" initial={{ scaleX: 0 }} whileInView={{ scaleX: value / 100 }} viewport={{ once: true }} transition={{ duration: 1.2, ease, delay: after ? 0.35 : 0.1 }} style={{ width: '100%' }} />
      </div>
      <span>{value}%</span>
    </div>
  );
}

export function Research() {
  const [authorsBefore, authorsAfter] = research.authors.split('A. Habib');
  return (
    <section id="research" className="section s-dark">
      <div className="wrap">
        <SectionHead index="05" title={<>Research & <span className="serif">thesis</span></>} aside="Machine learning" />
        <div className="research__grid">
          <Reveal className="research__media">
            <figure className="thesis-photo">
              <div className="thesis-photo__frame">
                <picture>
                  <source type="image/webp" srcSet={`${asset('ahsan-thesis-600.webp')} 600w, ${asset('ahsan-thesis.webp')} 900w`} sizes="(min-width: 1080px) 460px, 92vw" />
                  <img src={asset('ahsan-thesis.jpg')} width={900} height={1200} loading="lazy" alt="Ahsan Habib at BRAC University, smiling down at his bound undergraduate thesis" />
                </picture>
                <span className="thesis-photo__tag">BRAC University · 2026</span>
              </div>
              <figcaption>
                <q>{research.thesis}</q>
                The official thesis title, bound and submitted.
              </figcaption>
            </figure>
          </Reveal>

          <div>
            <Reveal>
              <h3 className="research__name">{research.name}</h3>
              <p className="research__title">{research.title}</p>
              <div className="research__meta">
                <span className="chip">{research.meta}</span>
                {research.stack.map((s) => <span className="chip" key={s}>{s}</span>)}
              </div>
              <div className="grade"><b>{research.grade}</b><span>Thesis grade<br />BRAC University CSE400</span></div>
            </Reveal>

            <Reveal delay={0.1} className="research__results">
              {research.results.map((r) => (
                <div className="result" key={r.label}>
                  <div className="result__label">{r.label}</div>
                  <p className="result__how">{r.how}</p>
                  <div className="result__nums">
                    <span className="from">{r.from}%</span>
                    <span className="to">{r.to}%</span>
                    <span className="note">{r.better} is better</span>
                  </div>
                  <div className="bars">
                    <Bar label="before" value={r.from} />
                    <Bar label="after" value={r.to} after />
                  </div>
                </div>
              ))}
              <p className="paper-ref">
                <b>Paper:</b> {authorsBefore}<b>A. Habib</b>{authorsAfter}, “{research.paper}”. {research.paperStatus}.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
