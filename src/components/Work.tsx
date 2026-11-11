import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { moreProjects, projects, type Project, type Tag, type Visual } from '../data/profile';
import { renderMarked } from '../lib/json';
import { ArrowDown, ArrowUpRight, Plus } from './icons';
import { Reveal, SectionHead, ease } from './Reveal';

const list = { hidden: {}, show: { transition: { staggerChildren: 0.045, delayChildren: 0.1 } } };
const item = { hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0, transition: { duration: 0.4, ease } } };

function ProjectVisual({ v }: { v: Visual }) {
  return (
    <motion.div className="vis" aria-hidden="true" initial="hidden" whileInView="show" viewport={{ once: true, margin: '0px 0px -10% 0px' }} variants={list}>
      <div className="vis__bar"><i /><i /><i /><span>{v.title}</span></div>
      <div className="vis__body">
        {v.kind === 'endpoints' && (
          <>
            {v.rows.map(([m, p]) => (
              <motion.div className="vis__ep" key={m + p} variants={item}>
                <span className={`method method--${m}`}>{m}</span><span>{p}</span>
              </motion.div>
            ))}
            {v.more && <motion.div className="vis__more" variants={item}>{v.more}</motion.div>}
          </>
        )}
        {v.kind === 'pipeline' && (
          <div className="pipe">
            {v.steps.map((s, i) => (
              <motion.div key={s} variants={item}>
                {i > 0 && <div className="pipe__arrow" />}
                <div className="pipe__step"><span className="pipe__idx">{String(i + 1).padStart(2, '0')}</span><span className="pipe__node">{s}</span></div>
              </motion.div>
            ))}
            {v.footer && <motion.div className="pipe__foot" variants={item}>{v.footer}</motion.div>}
          </div>
        )}
        {v.kind === 'code' && (
          <pre className="vis__code">
            {v.lines.map((l, i) => (
              <motion.div key={i} variants={item}>{l ? renderMarked(l) : ' '}</motion.div>
            ))}
          </pre>
        )}
      </div>
    </motion.div>
  );
}

function ProjectRow({ p, n, open, onToggle }: { p: Project; n: number; open: boolean; onToggle: () => void }) {
  return (
    <motion.article
      className="project"
      id={`p-${p.id}`}
      layout="position"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.5, ease }}
    >
      <div className="project__row">
        <div>
          <div className="project__num">
            <span>{String(n).padStart(2, '0')}</span>
            {p.tags.map((t) => <span className="chip" key={t}>{t}</span>)}
            <span>{p.context}</span>
          </div>
          <h3 className="project__title">{p.title}</h3>
          <p className="project__kicker">{p.kicker}</p>
          <p className="project__outcome">{p.outcome}</p>
          <div className="project__metrics">
            {p.metrics.map((m) => (
              <div className="project__metric" key={m.label}><b>{m.value}</b><span>{m.label}</span></div>
            ))}
          </div>
          <dl className="project__meta">
            {(p.facts ?? [
              { label: 'Role', value: p.role },
              { label: 'Year', value: p.year },
              { label: 'Stack', value: p.stack.slice(0, 3).join(' · ') },
            ]).map((f) => (
              <div key={f.label}><dt>{f.label}</dt><dd>{f.value}</dd></div>
            ))}
          </dl>
          <div className="project__actions">
            <button className="toggle" aria-expanded={open} aria-controls={`d-${p.id}`} onClick={onToggle}>
              {open ? 'Close case study' : 'Read case study'} <Plus />
            </button>
            {p.id === 'kaaj' && <a className="ext" href="#lab">Try its rules live <ArrowDown /></a>}
            {p.links.map((l) => (
              <a className="ext" key={l.href} href={l.href} target="_blank" rel="noreferrer">{l.label} <ArrowUpRight /></a>
            ))}
          </div>
        </div>
        <ProjectVisual v={p.visual} />
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`d-${p.id}`}
            className="details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.55, ease }}
          >
            {(p.goal || p.architecture) && (
              <div className="goal">
                {p.goal && (
                  <div className="goal__text">
                    <h4>{p.goal.title}</h4>
                    <p>{p.goal.body}</p>
                  </div>
                )}
                {p.architecture && (
                  <div className="arch">
                    <h4>Framework & database</h4>
                    <dl>
                      {p.architecture.map((a) => (
                        <div key={a.layer}><dt>{a.layer}</dt><dd>{a.tech}</dd></div>
                      ))}
                    </dl>
                  </div>
                )}
              </div>
            )}
            <div className="details__inner">
              <div>
                <h4>{p.next ? 'What I’ve built so far' : 'What I built'}</h4>
                <ul className="built">{p.built.map((b) => <li key={b}>{b}</li>)}</ul>
                <div className="stackline">{p.stack.map((s) => <span className="chip" key={s}>{s}</span>)}</div>
                {p.next && (
                  <>
                    <h4 className="next__title">Next on my list</h4>
                    <ul className="next">
                      {p.next.map((n) => (
                        <li key={n.title}><span className="next__badge">Next</span><b>{n.title}</b><p>{n.body}</p></li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
              <div>
                <h4>Engineering decisions</h4>
                <div className="decisions">
                  {p.decisions.map((d) => (
                    <div className="decision" key={d.title}><b>{d.title}</b><p>{d.body}</p></div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

const FILTERS: ('All' | Tag)[] = ['All', 'Backend', 'Systems', 'Embedded'];

export function Work() {
  const [filter, setFilter] = useState<'All' | Tag>('All');
  const [open, setOpen] = useState<string | null>('kaaj');
  const shown = projects.filter((p) => filter === 'All' || p.tags.includes(filter));
  const count = (f: 'All' | Tag) => (f === 'All' ? projects.length : projects.filter((p) => p.tags.includes(f)).length);

  return (
    <section id="work" className="section s-paper">
      <div className="wrap">
        <SectionHead
          index="02"
          title={<>Selected <span className="serif">work</span></>}
          aside="Case studies"
          lede="Backend first: two APIs and a production site, then the systems work underneath (concurrency, compilers, embedded)."
        />
        <Reveal className="filters" y={12}>
          {FILTERS.map((f) => (
            <button key={f} className="filter" aria-pressed={filter === f} onClick={() => setFilter(f)}>
              {f}<sup>{count(f)}</sup>
            </button>
          ))}
        </Reveal>

        <div>
          <AnimatePresence mode="popLayout" initial={false}>
            {shown.map((p) => (
              <ProjectRow key={p.id} p={p} n={projects.indexOf(p) + 1} open={open === p.id} onToggle={() => setOpen(open === p.id ? null : p.id)} />
            ))}
          </AnimatePresence>
        </div>

        <div className="more">
          <Reveal><h3 className="more__title">Also on GitHub</h3></Reveal>
          <div className="more__grid">
            {moreProjects.map((m, i) => (
              <Reveal key={m.title} delay={i * 0.05} y={18}>
                <a className="more__card" href={m.href} target="_blank" rel="noreferrer">
                  <b>{m.title} <ArrowUpRight /></b>
                  <small>{m.tech}</small>
                  <p>{m.body}</p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
