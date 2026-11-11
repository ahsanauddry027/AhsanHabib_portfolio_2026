import { useRef } from 'react';
import { useInView } from 'motion/react';
import { stats } from '../data/profile';
import { useCountUp } from '../hooks/useTyping';
import { ApiConsole } from './ApiConsole';
import { Reveal, SectionHead } from './Reveal';

function Stat({ value, decimals, suffix, label }: (typeof stats)[number]) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const shown = useCountUp(value, decimals, inView);
  return (
    <div className="stat" ref={ref}>
      <div className="stat__v" aria-hidden="true">{shown}{suffix}</div>
      <div className="stat__l"><span className="sr-only">{value.toFixed(decimals)}{suffix} </span>{label}</div>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="section s-dark">
      <div className="wrap">
        <SectionHead index="01" title="About" aside="For recruiters" />
        <div className="about__grid">
          <div>
            <Reveal>
              <p className="about__text">
                I’m Ahsan, a backend developer finishing my CSE degree at BRAC University.{' '}
                <span className="muted">
                  I built an NGO’s production backend on my own, a Spring Boot API whose job posts run on a state machine,
                  and a Node.js API that refuses clashing classes.
                </span>{' '}
                I like systems that are <span className="serif">boringly reliable.</span>
              </p>
            </Reveal>
            <div className="stats">
              {stats.map((s) => <Stat key={s.label} {...s} />)}
            </div>
          </div>
          <Reveal delay={0.1} className="console-wrap">
            <ApiConsole />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
