import { motion } from 'motion/react';
import { research } from '../data/profile';
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
  return (
    <section id="research" className="section s-dark">
      <div className="wrap">
        <SectionHead index="05" title={<>Research & <span className="serif">thesis</span></>} aside="Machine learning" />
        <div className="research__grid">
          <Reveal>
            <h3 className="research__name">{research.name}</h3>
            <p className="research__title">{research.title}</p>
            <div className="research__meta">
              <span className="chip">{research.meta}</span>
              {research.stack.map((s) => <span className="chip" key={s}>{s}</span>)}
            </div>
            <div className="grade"><b>{research.grade}</b><span>Thesis grade<br />BRAC University CSE400</span></div>
            <div className="thesis-quote">
              <q>{research.thesis}</q>
              The official thesis title, and the book in the photo at the top of this page.
            </div>
          </Reveal>

          <Reveal delay={0.1}>
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
              <b>Paper:</b> {research.authors.split('A. Habib')[0]}<b>A. Habib</b>{research.authors.split('A. Habib')[1]},{' '}
              “{research.paper}”. {research.paperStatus}.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
