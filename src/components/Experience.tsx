import { education, experience } from '../data/profile';
import { Reveal, SectionHead } from './Reveal';

export function Experience() {
  const [uni, school] = education;
  return (
    <section id="experience" className="section s-paper">
      <div className="wrap">
        <SectionHead index="04" title="Experience" aside="Work & education" />

        <div className="timeline">
          {experience.map((j, i) => (
            <Reveal key={j.org} delay={i * 0.08} className="job">
              <div className="job__when"><b>{j.when}</b><span>{j.where}</span></div>
              <div className="job__rail" aria-hidden="true"><span className="job__dot" /></div>
              <article className="job__card">
                <h3 className="job__title">{j.title}</h3>
                <p className="job__org">{j.orgHref ? <a href={j.orgHref} target="_blank" rel="noreferrer">{j.org}</a> : j.org}</p>
                <p className="job__summary">{j.summary}</p>
                <ul className="job__bullets">{j.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
                <div className="stackline">{j.stack.map((s) => <span className="chip" key={s}>{s}</span>)}</div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="edu">
          <Reveal className="edu__cell edu__cell--wide">
            <article className="edu__card edu__card--feature">
              <span className="edu__watermark" aria-hidden="true">CSE</span>
              <small>Education · {uni.when}</small>
              <h3>{uni.school}</h3>
              <p className="deg">{uni.degree}</p>
              <div className="edu__big"><b>3.76</b><span>CGPA / 4.00<br />3.95 in 300–400 level CSE</span></div>
              <ul>{uni.points.slice(1).map((p) => <li key={p}>{p}</li>)}</ul>
            </article>
          </Reveal>
          <Reveal className="edu__cell" delay={0.08}>
            <article className="edu__card edu__card--hsc">
              <span className="edu__watermark" aria-hidden="true">HSC</span>
              <small>Higher secondary · {school.where}</small>
              <h3>{school.school}</h3>
              <p className="deg">{school.degree}</p>
              <div className="edu__big"><b>{school.gpa}</b><span>GPA / 5.00<br />Perfect score</span></div>
              <div className="edu__ticket">
                <div><span>Roll no.</span><b>{school.roll}</b></div>
                <div className="edu__ticket-year"><span>Year</span><b>{school.when}</b></div>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
