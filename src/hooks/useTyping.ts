import { useEffect, useState } from 'react';

const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Counts from 0 to `total` characters over `duration` ms once `start` is true.
export function useTyping(total: number, start: boolean, duration = 700, delay = 0, resetKey: unknown = null) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!start) return;
    if (reduced()) { setN(total); return; }
    setN(0);
    let raf = 0;
    let t0 = 0;
    const timer = window.setTimeout(() => {
      const tick = (t: number) => {
        if (!t0) t0 = t;
        const p = Math.min(1, (t - t0) / duration);
        setN(Math.round(total * p));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => { window.clearTimeout(timer); cancelAnimationFrame(raf); };
  }, [total, start, duration, delay, resetKey]);

  return n;
}

// Eases a number from 0 to `target` once `start` is true.
export function useCountUp(target: number, decimals: number, start: boolean, duration = 1400) {
  const [v, setV] = useState(0);

  useEffect(() => {
    if (!start) return;
    if (reduced()) { setV(target); return; }
    let raf = 0;
    let t0 = 0;
    const tick = (t: number) => {
      if (!t0) t0 = t;
      const p = Math.min(1, (t - t0) / duration);
      setV(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration]);

  return v.toFixed(decimals);
}
