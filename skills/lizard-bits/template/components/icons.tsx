type P = { className?: string };

export const WhatsAppIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.76-1.66-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.07-.13-.27-.2-.57-.35zM12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.56.94.95-3.47-.22-.36a9.39 9.39 0 0 1-1.44-5.01c0-5.2 4.23-9.43 9.44-9.43 2.52 0 4.89.99 6.67 2.77a9.37 9.37 0 0 1 2.76 6.67c0 5.2-4.24 9.42-9.45 9.42zm8.03-17.46A11.3 11.3 0 0 0 12.05.7C5.8.7.7 5.8.7 12.04c0 2 .52 3.95 1.52 5.66L.6 23.6l6.05-1.59a11.3 11.3 0 0 0 5.4 1.38h.01c6.25 0 11.34-5.09 11.35-11.34 0-3.03-1.18-5.88-3.33-8.02z" />
  </svg>
);

export const InstagramIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className} aria-hidden>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

export const TikTokIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.6 2.6 0 0 1-2.6-2.6 2.6 2.6 0 0 1 3.4-2.47V9.67a5.73 5.73 0 0 0-.8-.06A5.7 5.7 0 0 0 4.17 15.3 5.7 5.7 0 0 0 9.86 21a5.7 5.7 0 0 0 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.25-1.48z" />
  </svg>
);

export const PinIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
    <path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);

export const SearchIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className={className} aria-hidden>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

/* Iconos "dibujados a mano", al estilo de la carta de bebidas */
const doodle = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const BurgerDoodle = ({ className }: P) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden {...doodle}>
    <path d="M10 27c1-10 10-16 22-16s21 6 22 16c.2 1.4-.8 2-2 2H12c-1.2 0-2.2-.7-2-2z" />
    <path d="M22 19l1-1M31 16l1-1M40 19l1-1" />
    <path d="M8 35c4-3 7 2 12-1s7 2 12-1 8 2 12-1 7 2 12-1" />
    <path d="M11 41h42" />
    <path d="M12 46c0 4 4 7 8 7h24c4 0 8-3 8-7z" />
  </svg>
);

export const PizzaDoodle = ({ className }: P) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden {...doodle}>
    <path d="M8 14c15-6 33-6 48 0L33 58c-.5 1-1.5 1-2 0z" />
    <path d="M12 21c13-5 27-5 40 0" />
    <circle cx="26" cy="29" r="3" />
    <circle cx="38" cy="31" r="2.5" />
    <circle cx="31" cy="42" r="2.5" />
  </svg>
);

export const DrinkDoodle = ({ className }: P) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden {...doodle}>
    <path d="M17 20h30l-4 36c-.1 1.2-1 2-2.2 2H23.2c-1.2 0-2.1-.8-2.2-2z" />
    <path d="M15 20h34" />
    <path d="M34 20l6-14h8" />
    <path d="M20 34c5 2 9-2 12 0s8 2 12 0" />
  </svg>
);

export const FriesDoodle = ({ className }: P) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden {...doodle}>
    <path d="M22 28l-3-18M29 28l-1-21M36 28l1-19M43 28l3-16" />
    <path d="M14 26c6 4 30 4 36 0l-5 30c-.2 1.2-1.2 2-2.4 2H21.4c-1.2 0-2.2-.8-2.4-2z" />
    <path d="M26 42c2 3 10 3 12 0" />
  </svg>
);
