"use client";

import { BookingForm } from "@/components/BookingForm";
import { BookingButton } from "@/components/BookingButton";

import Link from "next/link";
import { HomeIcon } from "@/components/HomeIcon";
import platforms from "@/content/school-platforms.json";
import homeView from "@/content/home-view.json";
import { useEffect, useRef, useState } from "react";

const items = [["Направления", "/our-courses/"], ["О школе", "/about/"], ["Контакты", "/contact/"]];

export function SiteHeader({ homeDesign = false }: { homeDesign?: boolean }) {
  const [booking, setBooking] = useState(false);
  const returnFocus = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const request = (event: Event) => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
      const opener = (event as CustomEvent<HTMLElement>).detail;
      if (!dialog.current?.open) returnFocus.current = opener;
      setClosing(false);
      setBooking(true);
      setOpen(true);
    };
    window.addEventListener("school:booking", request);
    return () => window.removeEventListener("school:booking", request);
  }, []);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 80);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (!open) return;
    const modal = dialog.current;
    const menuTrigger = trigger.current;
    const bodyOverflow = document.body.style.overflow;
    const htmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    modal?.showModal();
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
      modal?.close();
      document.body.style.overflow = bodyOverflow;
      document.documentElement.style.overflow = htmlOverflow;
      (returnFocus.current || menuTrigger)?.focus({ preventScroll: true });
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    if (dialog.current) dialog.current.scrollTop = 0;
    dialog.current?.querySelector<HTMLButtonElement>(".site-menu-close")?.focus({ preventScroll: true });
  }, [open, booking]);

  function closeMenu() {
    if (closing) return;
    setClosing(true);
    closeTimer.current = setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 180);
  }

  return <>
    <header className={`site-header reference-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="reference-scroll-contacts" aria-hidden={!scrolled} inert={!scrolled}>
        <span>{homeDesign && <HomeIcon name="clock" />}Пн–Пт: 8:00–17:00</span><Link href="/contact/">{homeDesign && <HomeIcon name="pin" />}Братск, проспект Ленина, 21</Link><a href="tel:+73953283344">{homeDesign && <HomeIcon name="phone" />}+7 (3953) 28-33-44</a>
      </div>
      <div className="site-header-inner">
        <Link className="brand reference-brand" aria-label="Интеллект — главная" href="/"><span className="brand-mark">И</span><span className="brand-name"><strong>ИНТЕЛЛЕКТ</strong><small>школа развития · Братск</small></span></Link>
        <nav aria-label="Основная навигация" className="reference-desktop-nav">{items.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}</nav>
        <BookingButton className="reference-header-cta">Записаться</BookingButton>
        <button ref={trigger} className="reference-menu-button" onClick={() => { returnFocus.current = trigger.current; setBooking(false); setOpen(true); }} aria-expanded={open && !booking} aria-controls="site-menu" aria-haspopup="dialog">
          <span className="menu-label">Меню</span><span className="menu-bars" aria-hidden="true"><i /><i /><i /></span>
        </button>
      </div>
    </header>
    <dialog ref={dialog} id="site-menu" className={`site-menu-dialog${booking ? " booking-dialog" : ""}${closing ? " is-closing" : ""}`} aria-labelledby="site-menu-title" onCancel={(event) => { event.preventDefault(); closeMenu(); }} onClick={(event) => { if (event.target === event.currentTarget) closeMenu(); }}>
      <div className="site-menu-panel">
        <div className="site-menu-heading"><div>{homeDesign && <span className="eyebrow">ИНТЕЛЛЕКТ · БРАТСК</span>}<h2 id="site-menu-title">{booking ? "Записаться на занятие" : "Меню школы"}</h2></div><button className="site-menu-close" onClick={closeMenu} aria-label={booking ? "Закрыть форму" : "Закрыть меню"}>{homeDesign && <span className="menu-close-label">Закрыть</span>}<svg className="close-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="m6 6 12 12M18 6 6 18" /></svg></button></div>
        {booking ? <BookingForm /> : <>
        <div className="mobile-simple-menu">
          <nav aria-label="Разделы сайта"><Link href="/" onClick={closeMenu}>Главная ↗</Link>{items.map(([label, href]) => <Link href={href} onClick={closeMenu} key={href}>{label} ↗</Link>)}</nav>
          <div className="mobile-menu-contact"><a href="tel:+73953283344">Позвонить <span>+7 (3953) 28-33-44</span></a><a href="mailto:school_bratsk@mail.ru">Написать на почту ↗</a><a href={platforms[3].href} target="_blank" rel="noreferrer">ВКонтакте ↗</a><a href={platforms[0].href} target="_blank" rel="noreferrer">Как проехать ↗</a></div>
          <BookingButton className="button button-primary">Бесплатное пробное занятие <span aria-hidden="true">↗</span></BookingButton>
        </div>
        <nav className="site-menu-links site-menu-mosaic" aria-label="Меню школы">
          {items.map(([label, href]) => <Link className="menu-section-link" href={href} onClick={closeMenu} key={href}>{label}<span aria-hidden="true">↗</span>{homeDesign && <HomeIcon name={href === "/our-courses/" ? "grid" : href === "/about/" ? "book" : "pin"} className="menu-tile-icon" />}</Link>)}
          {homeView.courses.map((course, index) => <Link className={`menu-course-link menu-course-${index + 1}`} href={course.href} onClick={closeMenu} key={course.href}>{homeDesign && <small className="menu-number">{String(index + 1).padStart(2, "0")}</small>}{course.title}<span aria-hidden="true">↗</span></Link>)}
        </nav>
        <div className="site-menu-bottom">{homeDesign && <div><a href="tel:+73953283344">+7 (3953) 28-33-44</a><span>Братск, проспект Ленина, 21</span></div>}<BookingButton className="site-menu-cta">Записаться на пробное занятие <span aria-hidden="true">→</span></BookingButton></div>
        </>}
      </div>
    </dialog>
  </>;
}
