"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export function MobileTeamSlider({ children }: { children: ReactNode }) {
  const track = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ current: 1, total: 3 });
  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const update = () => {
      const cards = Array.from(element.children) as HTMLElement[];
      const left = element.getBoundingClientRect().left;
      const nearest = cards.reduce((best, card, index) => Math.abs(card.getBoundingClientRect().left - left) < Math.abs(cards[best].getBoundingClientRect().left - left) ? index : best, 0);
      setPosition({ current: nearest + 1, total: cards.length });
    };
    const observer = new ResizeObserver(update);
    observer.observe(element);
    element.addEventListener("scroll", update, { passive: true });
    update();
    return () => { observer.disconnect(); element.removeEventListener("scroll", update); };
  }, []);
  function move(direction: number) {
    const element = track.current;
    const card = element?.firstElementChild;
    if (!element || !card) return;
    element.scrollBy({ left: direction * (card.getBoundingClientRect().width + parseFloat(getComputedStyle(element).columnGap)), behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }
  return <div className="team-slider">
    <div ref={track} id="team-cards" className="team-grid" role="region" aria-label="Преподаватели школы" tabIndex={0}>{children}</div>
    <div className="team-slider-controls"><span>Листайте <span aria-live="polite">{position.current} / {position.total}</span></span><div><button type="button" aria-label="Предыдущий преподаватель" aria-controls="team-cards" disabled={position.current === 1} onClick={() => move(-1)}>←</button><button type="button" aria-label="Следующий преподаватель" aria-controls="team-cards" disabled={position.current === position.total} onClick={() => move(1)}>→</button></div></div>
  </div>;
}
