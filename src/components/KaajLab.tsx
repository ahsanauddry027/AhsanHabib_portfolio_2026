import { Fragment, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight } from './icons';
import { Reveal, SectionHead, ease } from './Reveal';

// A browser-side re-creation of the rules documented in the Kaaj README
// (JobService + EmployerService): job status transitions, verification, and the 400/409 responses.

type Emp = 'UNVERIFIED' | 'PENDING' | 'VERIFIED' | 'REJECTED';
type Job = 'DRAFT' | 'PUBLISHED' | 'PAUSED' | 'CLOSED';
type Action = 'PAUSE' | 'RESUME' | 'CLOSE' | 'REPOST';

interface Entry { id: number; method: string; path: string; body?: string; code: number; note: string }

const TEXT: Record<number, string> = { 200: 'OK', 201: 'Created', 400: 'Bad Request', 409: 'Conflict' };
const JOB_PATH = '/api/v1/employer/jobs/7f3a';
const ADMIN_PATH = '/api/v1/admin/employers/e21/verification';

const NEXT: Record<Action, (j: Job, verified: boolean) => Job | null> = {
  PAUSE: (j) => (j === 'PUBLISHED' ? 'PAUSED' : null),
  RESUME: (j) => (j === 'PAUSED' ? 'PUBLISHED' : null),
  CLOSE: (j) => (j === 'CLOSED' ? null : 'CLOSED'),
  REPOST: (j, v) => (j === 'CLOSED' ? (v ? 'PUBLISHED' : 'DRAFT') : null),
};

const first: Entry = {
  id: 0, method: 'POST', path: '/api/v1/employer/jobs',
  body: '{"titleEn":"Pickup Driver","wageMin":16000,"wageMax":20000,"wagePeriod":"MONTH"}',
  code: 201, note: 'status: DRAFT. The employer isn’t verified yet, so the post waits.',
};

function States<T extends string>({ all, current }: { all: T[]; current: T }) {
  return (
    <div className="states">
      {all.map((s, i) => (
        <Fragment key={s}>
          {i > 0 && <span className="states__arrow" aria-hidden="true">→</span>}
          <span className={`state${s === current ? ' is-on' : ''}`} aria-current={s === current ? 'true' : undefined}>{s}</span>
        </Fragment>
      ))}
    </div>
  );
}

export function KaajLab() {
  const [emp, setEmp] = useState<Emp>('UNVERIFIED');
  const [job, setJob] = useState<Job>('DRAFT');
  const [log, setLog] = useState<Entry[]>([first]);
  const seq = useRef(1);

  const push = (e: Omit<Entry, 'id'>) => setLog((l) => [{ ...e, id: seq.current++ }, ...l].slice(0, 40));
  const verified = emp === 'VERIFIED';

  const upload = () => {
    setEmp('PENDING');
    push({ method: 'POST', path: '/api/v1/employer/profile/document', body: 'form-data: file=trade-licence.png (JPEG, PNG or PDF ≤ 3 MB)', code: 200, note: `verificationStatus: ${emp} → PENDING` });
  };

  const decide = (decision: 'APPROVE' | 'REJECT') => {
    const body = decision === 'APPROVE' ? '{"decision":"APPROVE"}' : '{"decision":"REJECT","reason":"The trade licence is not readable"}';
    if (emp !== 'PENDING') {
      push({ method: 'POST', path: ADMIN_PATH, body, code: 409, note: `Only a PENDING employer can be ${decision === 'APPROVE' ? 'approved' : 'rejected'} (currently ${emp}).` });
      return;
    }
    if (decision === 'REJECT') {
      setEmp('REJECTED');
      push({ method: 'POST', path: ADMIN_PATH, body, code: 200, note: 'verificationStatus → REJECTED. The reason is shown on the employer’s profile.' });
      return;
    }
    setEmp('VERIFIED');
    const autoPublish = job === 'DRAFT';
    if (autoPublish) setJob('PUBLISHED');
    push({ method: 'POST', path: ADMIN_PATH, body, code: 200, note: `verificationStatus → VERIFIED${autoPublish ? '. The draft job published itself, "verifiedEmployer": true.' : '.'}` });
  };

  const changeStatus = (action: Action) => {
    const body = `{"action":"${action}"}`;
    const next = NEXT[action](job, verified);
    if (!next) {
      push({ method: 'PATCH', path: `${JOB_PATH}/status`, body, code: 409, note: `${action} isn’t allowed from ${job}.` });
      return;
    }
    setJob(next);
    const extra = action === 'REPOST' && !verified ? ' The employer isn’t verified, so it waits as a draft.' : '';
    push({ method: 'PATCH', path: `${JOB_PATH}/status`, body, code: 200, note: `status: ${job} → ${next}.${extra}` });
  };

  const edit = () => {
    const body = '{"openings":3}';
    if (job === 'CLOSED') push({ method: 'PATCH', path: JOB_PATH, body, code: 409, note: 'A closed job must be reposted before it can be edited.' });
    else push({ method: 'PATCH', path: JOB_PATH, body, code: 200, note: 'openings → 3. Only the fields sent were changed.' });
  };

  const noWage = () => push({
    method: 'POST', path: '/api/v1/employer/jobs', body: '{"titleEn":"Helper","wageMin":null}', code: 400,
    note: 'A job needs a wage or wage range, with its period. Wages are always shown up front.',
  });

  const reset = () => { setEmp('UNVERIFIED'); setJob('DRAFT'); setLog([first]); };

  return (
    <section id="lab" className="section s-dark">
      <div className="wrap">
        <SectionHead
          index="03"
          title={<>The API <span className="serif">lab</span></>}
          aside="Try it"
          lede="Kaaj’s business rules, running in your browser. Verify the employer, move the job through its states, or try something the API forbids and watch it answer."
        />

        <Reveal className="lab__grid">
          <div className="panel machine">
            <div>
              <div className="machine__head"><h3>Employer verification</h3><span>EmployerService</span></div>
              <div style={{ marginTop: 14 }}><States all={['UNVERIFIED', 'PENDING', 'VERIFIED', 'REJECTED'] as Emp[]} current={emp} /></div>
              <div className="actions" style={{ marginTop: 14 }}>
                <button className="act" onClick={upload} disabled={emp === 'PENDING' || emp === 'VERIFIED'}>Upload trade licence</button>
                <button className="act" onClick={() => decide('APPROVE')}>Admin: APPROVE</button>
                <button className="act act--danger" onClick={() => decide('REJECT')}>Admin: REJECT</button>
              </div>
            </div>

            <div>
              <div className="machine__head"><h3>Job post #7f3a</h3><span>JobService</span></div>
              <div style={{ marginTop: 14 }}><States all={['DRAFT', 'PUBLISHED', 'PAUSED', 'CLOSED'] as Job[]} current={job} /></div>
              <div className="actions" style={{ marginTop: 14 }}>
                {(['PAUSE', 'RESUME', 'CLOSE', 'REPOST'] as Action[]).map((a) => (
                  <button key={a} className="act" onClick={() => changeStatus(a)}>{a}</button>
                ))}
                <button className="act" onClick={edit}>Edit openings</button>
                <button className="act act--danger" onClick={noWage}>Post job without a wage</button>
              </div>
            </div>

            <div>
              <div className="machine__sub">Response flags</div>
              <div className="machine__flags">
                <span className="flag">verifiedEmployer: <b className={verified ? 'true' : ''}>{String(verified)}</b></span>
                <span className="flag">· publicly listed: <b className={job === 'PUBLISHED' ? 'true' : ''}>{String(job === 'PUBLISHED')}</b></span>
              </div>
            </div>
          </div>

          <div className="panel log">
            <div className="log__head"><span>request log</span><button onClick={reset}>reset</button></div>
            <div className="log__list" aria-live="polite">
              <AnimatePresence initial={false}>
                {log.map((e) => (
                  <motion.div
                    key={e.id}
                    className="log__item"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.35, ease }}
                  >
                    <div className="log__req"><span className={`method method--${e.method}`}>{e.method}</span><span>{e.path}</span></div>
                    {e.body && <div className="log__body">{e.body}</div>}
                    <div className="log__res">
                      <span className={`code-badge code-badge--${String(e.code)[0]}`}>{e.code} {TEXT[e.code]}</span>
                      <span>{e.note}</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
        <p className="lab__note">
          A simulation of the rules documented in the Kaaj repository, not a live server. The real thing is Spring Boot 4.1 on PostgreSQL:{' '}
          <a href="https://github.com/ahsanauddry027/SpringBoot_PostgreSQL_Api" target="_blank" rel="noreferrer">read the code <ArrowUpRight width={12} height={12} style={{ verticalAlign: '-1px' }} /></a>
        </p>
      </div>
    </section>
  );
}
