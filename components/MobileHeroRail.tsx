"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { VisibleAnimation } from "@/components/VisibleAnimation";
import { HomeIcon } from "@/components/HomeIcon";
import platforms from "@/content/school-platforms.json";

export function MobileHeroRail() {
  const viewport = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const element = viewport.current;
    if (!element || paused) return;
    const mobile = matchMedia("(max-width:700px)");
    const reduced = matchMedia("(prefers-reduced-motion:reduce)");
    let frame = 0, last = 0, direction = 1, position = element.scrollLeft, limit = 0, pauseUntil = 0;
    let visible = false;
    const measure = () => { limit = Math.max(0, element.scrollWidth - element.clientWidth); position = Math.min(position, limit); };
    const tick = (now: number) => {
      if (!last) last = now;
      const delta = Math.min(now - last, 50);
      last = now;
      if (now >= pauseUntil && limit > 0) {
        position += direction * delta * .018;
        if (position >= limit || position <= 0) { position = Math.max(0, Math.min(limit, position)); direction *= -1; pauseUntil = now + 650; }
        element.scrollLeft = position;
      }
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame); last = 0;
      if (visible && mobile.matches && !reduced.matches && !document.hidden) { measure(); position = element.scrollLeft; if (limit > 0) frame = requestAnimationFrame(tick); }
    };
    const resize = new ResizeObserver(sync);
    resize.observe(element);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    observer.observe(element);
    mobile.addEventListener("change", sync); reduced.addEventListener("change", sync); document.addEventListener("visibilitychange", sync);
    return () => { cancelAnimationFrame(frame); resize.disconnect(); observer.disconnect(); mobile.removeEventListener("change", sync); reduced.removeEventListener("change", sync); document.removeEventListener("visibilitychange", sync); };
  }, [paused]);
  return <div className="mobile-hero-rail">
    <div ref={viewport} className="hero-rail-viewport" aria-label="Направления и маршрут до школы" onPointerDown={() => setPaused(true)} onFocusCapture={() => setPaused(true)}>
      <div className="hero-rail-track">
        <Link className="hero-rail-tile hero-rail-directions" href="/our-courses/"><HomeIcon name="book" /><strong>Все<br />направления</strong><span>Выбрать программу ↗</span></Link>
        <VisibleAnimation className="hero-rail-tile hero-rail-media" src="/assets/hero/classroom.mp4" poster="/assets/hero/classroom-still.webp" width={518} height={518} />
        <a className="hero-rail-tile hero-rail-map" href={platforms[0].href} target="_blank" rel="noreferrer"><HomeIcon name="pin" /><strong>Как<br />проехать</strong><span>Яндекс Карты ↗</span></a>
        <VisibleAnimation className="hero-rail-tile hero-rail-media" src="/assets/hero/boy.mp4" poster="/assets/hero/boy-still.webp" width={518} height={518} />
      </div>
    </div>
    <button type="button" className="hero-rail-control" aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? "Продолжить движение →" : "Приостановить движение Ⅱ"}</button>
  </div>;
}
