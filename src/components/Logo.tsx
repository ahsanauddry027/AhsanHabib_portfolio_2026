// The "AH." monogram: the A and the H share one stem, one lime crossbar runs through both,
// and the lime full stop matches the wordmark. Letters use currentColor so the mark follows
// the header theme; the accent comes from --logo-accent.
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 10 102 80" aria-hidden="true" focusable="false">
      <rect className="logo__bar" x="20" y="53" width="63" height="11" fill="var(--logo-accent, #C6F135)" />
      <path d="M2 88 L15 88 L50 12 L37 12 Z" fill="currentColor" />
      <rect x="37" y="12" width="13" height="76" fill="currentColor" />
      <rect x="70" y="12" width="13" height="76" fill="currentColor" />
      <circle className="logo__dot" cx="94" cy="81.5" r="6.5" fill="var(--logo-accent, #C6F135)" />
    </svg>
  );
}
