import type { ReactNode } from 'react';
import { motion } from 'motion/react';

export const ease = [0.2, 0.7, 0.1, 1] as const;

export function Reveal({ children, delay = 0, y = 28, className }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHead({ index, title, aside, lede }: { index: string; title: ReactNode; aside: string; lede?: ReactNode }) {
  return (
    <Reveal className="shead">
      <div>
        <span className="shead__index">{index} /</span>
        <h2 className="shead__title">{title}</h2>
      </div>
      <span className="shead__aside">({aside})</span>
      {lede && <p className="shead__lede">{lede}</p>}
    </Reveal>
  );
}
