const paths = {
  arrow: "M5 12h14M13 6l6 6-6 6",
  diagonal: "M6 18 18 6M6 6h12v12",
  book: "M12 5C8 2 4 3 2 4v15c4-1 7 0 10 2 3-2 6-3 10-2V4c-2-1-6-2-10 1v16M5 8l4 1M5 12l4 1M15 9l4-1M15 13l4-1",
  star: "m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2Z",
  heart: "M12 21C8 17 2 13 2 8a5 5 0 0 1 10-2 5 5 0 0 1 10 2c0 5-6 9-10 13Z",
  pencil: "m4 15 12-12 5 5L9 20l-7 2 2-7ZM13 6l5 5M4 15l5 5M17 14l4 7",
  clock: "M12 6v6l4 2",
  grid: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
  flower: "M12 7C8-5-1 5 7 12c-12 4-2 13 5 5 4 12 13 2 5-5 12-4 2-13-5-5Z",
  globe: "M2 12h20M4 6h16M4 18h16",
  person: "M3 22c0-6 4-9 9-9s9 3 9 9",
  pin: "M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z",
  phone: "m4 3 4-1 3 6-3 2a15 15 0 0 0 6 6l2-3 6 3-1 4c-1 4-8 1-12-3S0 4 4 3Z",
};
export type HomeIconName = keyof typeof paths;
export function HomeIcon({ name, className = "icon" }: { name: HomeIconName; className?: string }) {
  return <svg aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24">
    <path d={paths[name]} />
    {name === "clock" && <circle cx="12" cy="12" r="9" />}
    {name === "globe" && <><circle cx="12" cy="12" r="10" /><ellipse cx="12" cy="12" rx="4.5" ry="10" /></>}
    {name === "person" && <circle cx="12" cy="8" r="4" />}
    {name === "pin" && <circle cx="12" cy="10" r="2.5" />}
  </svg>;
}
