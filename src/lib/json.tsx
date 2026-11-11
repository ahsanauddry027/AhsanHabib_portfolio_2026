import type { ReactNode } from 'react';

export interface Tok { t: string; c: string }

// Splits pretty-printed JSON into coloured tokens (keys, strings, numbers, booleans, punctuation).
export function tokenizeJson(src: string): Tok[] {
  const re = /("(?:\\.|[^"\\])*")(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?|[{}[\],]/g;
  const out: Tok[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src))) {
    if (m.index > last) out.push({ t: src.slice(last, m.index), c: '' });
    if (m[1]) {
      out.push({ t: m[1], c: m[2] ? 'j-k' : 'j-s' });
      if (m[2]) out.push({ t: m[2], c: 'j-p' });
    } else if (m[3]) out.push({ t: m[0], c: 'j-b' });
    else if (/^[{}[\],]$/.test(m[0])) out.push({ t: m[0], c: 'j-p' });
    else out.push({ t: m[0], c: 'j-n' });
    last = re.lastIndex;
  }
  if (last < src.length) out.push({ t: src.slice(last), c: '' });
  return out;
}

export const tokLength = (toks: Tok[]) => toks.reduce((n, k) => n + k.t.length, 0);

// Renders the first `budget` characters of the tokens (used for the typing effect).
export function renderToks(toks: Tok[], budget = Infinity): ReactNode[] {
  const nodes: ReactNode[] = [];
  let left = budget;
  for (let i = 0; i < toks.length && left > 0; i++) {
    const s = toks[i].t.slice(0, left);
    left -= s.length;
    nodes.push(<span key={i} className={toks[i].c || undefined}>{s}</span>);
  }
  return nodes;
}

// "<k>kw</k> plain <c>// comment</c> <s>string</s>" -> spans (no innerHTML)
export function renderMarked(line: string): ReactNode[] {
  return line.split(/(<[kcs]>.*?<\/[kcs]>)/g).filter(Boolean).map((part, i) => {
    const m = /^<([kcs])>(.*)<\/\1>$/.exec(part);
    return m ? <span key={i} className={m[1]}>{m[2]}</span> : <span key={i}>{part}</span>;
  });
}
