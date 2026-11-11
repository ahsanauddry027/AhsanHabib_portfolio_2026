import { useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { useInView } from 'motion/react';
import { education, experience, profile, projects } from '../data/profile';
import { renderToks, tokenizeJson, tokLength } from '../lib/json';
import { useTyping } from '../hooks/useTyping';

interface Route {
  method: 'GET' | 'POST';
  path: string;
  status: number;
  statusText: string;
  reqBody?: object;
  body: unknown;
}

const routes: Route[] = [
  {
    method: 'GET', path: '/api/v1/me', status: 200, statusText: 'OK',
    body: {
      name: profile.name,
      role: profile.role,
      location: profile.location,
      status: 'open_to_work',
      graduating: 'Fall 2026',
      focus: ['REST APIs', 'data modelling', 'server-side rules', 'security'],
      languages: ['Java', 'PHP', 'JavaScript', 'SQL', 'Python', 'C/C++'],
      links: { github: profile.githubLabel, linkedin: profile.linkedinLabel },
    },
  },
  {
    method: 'GET', path: '/api/v1/projects?tag=backend', status: 200, statusText: 'OK',
    body: {
      count: projects.filter((p) => p.tags.includes('Backend')).length,
      data: projects.filter((p) => p.tags.includes('Backend')).map((p) => ({
        name: p.title,
        stack: p.stack.slice(0, 3),
        highlight: `${p.metrics[0].value} ${p.metrics[0].label}`,
        year: p.year,
      })),
    },
  },
  {
    method: 'GET', path: '/api/v1/experience', status: 200, statusText: 'OK',
    body: experience.map((j) => ({ title: j.title, org: j.org, when: j.when, stack: j.stack })),
  },
  {
    method: 'GET', path: '/api/v1/education', status: 200, statusText: 'OK',
    body: {
      degree: education[0].degree,
      school: education[0].school,
      cgpa: 3.76,
      cse300_400Gpa: 3.95,
      vcList: ['Summer 2024', 'Fall 2025', 'Spring 2026'],
      thesis: { name: 'InsightLens', grade: 'A', score: 95.5 },
      graduating: 'Fall 2026',
    },
  },
  {
    method: 'POST', path: '/api/v1/interviews', status: 201, statusText: 'Created',
    reqBody: { role: 'Backend Engineer', company: 'your-team' },
    body: { message: 'Thanks! Let’s talk.', email: profile.email, cv: 'Ahsan_Habib_CV.pdf' },
  },
  {
    method: 'GET', path: '/api/v1/excuses', status: 404, statusText: 'Not Found',
    body: { type: 'about:blank', title: 'Not Found', status: 404, detail: 'No excuses here. Bugs get fixed.', instance: '/api/v1/excuses' },
  },
];

export function ApiConsole() {
  const [idx, setIdx] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const r = routes[idx];

  const toks = useMemo(() => tokenizeJson(JSON.stringify(r.body, null, 2)), [r]);
  const total = tokLength(toks);
  const n = useTyping(total, inView, Math.min(900, 220 + total * 2), 120, idx);

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next = (idx + (e.key === 'ArrowRight' ? 1 : routes.length - 1)) % routes.length;
    setIdx(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="console" ref={ref}>
      <div className="console__bar" aria-hidden="true"><i /><i /><i /><span>ahsan-api · try an endpoint</span></div>
      <div className="console__tabs" role="tablist" aria-label="Endpoints" onKeyDown={onKey}>
        {routes.map((rt, i) => (
          <button
            key={rt.path}
            ref={(el) => { tabs.current[i] = el; }}
            role="tab"
            id={`ep-${i}`}
            aria-selected={i === idx}
            aria-controls="console-panel"
            tabIndex={i === idx ? 0 : -1}
            className="ep"
            onClick={() => setIdx(i)}
          >
            <span className={`method method--${rt.method}`}>{rt.method}</span>
            {rt.path.replace('/api/v1', '')}
          </button>
        ))}
      </div>
      <div id="console-panel" role="tabpanel" aria-labelledby={`ep-${idx}`}>
        <div className="console__req">
          <span className={`method method--${r.method}`}>{r.method}</span>
          <b>{r.path}</b>
          {r.reqBody && <span className="j-c">{JSON.stringify(r.reqBody)}</span>}
        </div>
        <div className="console__status">
          <span className={`code-badge code-badge--${String(r.status)[0]}`}>{r.status} {r.statusText}</span>
          <span className="j-c">{r.status === 404 ? 'application/problem+json' : 'application/json'}</span>
        </div>
        <pre className="console__body" aria-live="polite">
          <span className="sr-only">{JSON.stringify(r.body, null, 2)}</span>
          <span aria-hidden="true">{renderToks(toks, n)}{n < total && <span className="caret" />}</span>
        </pre>
      </div>
      <div className="console__foot"><span>simulated · built from this page’s data</span><span>← → to switch</span></div>
    </div>
  );
}
