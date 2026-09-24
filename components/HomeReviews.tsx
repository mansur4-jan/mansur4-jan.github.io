"use client";
import { useEffect, useRef, useState } from "react";
import platforms from "@/content/school-platforms.json";
import externalReviews from "@/content/external-reviews.json";
import { HomeIcon } from "@/components/HomeIcon";
import ratingData from "@/content/review-ratings.json";
import Image from "next/image";
import homeView from "@/content/home-view.json";

const reviews = [...homeView.reviews.map(review => ({ ...review, quote: review.quote.replace(/^[“”]|[“”]$/g, ""), source: "Сайт школы", href: "https://school-bratsk.ru/", date: "", rating: 0, excerpt: false })), ...externalReviews.map(review => ({ ...review, excerpt: review.excerpt === true }))].sort((a, b) => Number(b.source === "Яндекс Карты") - Number(a.source === "Яндекс Карты"));

export function HomeReviews() {
  const [overflowing, setOverflowing] = useState<boolean[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (selected === null || !dialog.current) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current.showModal();
    return () => { dialog.current?.close(); document.body.style.overflow = previous; };
  }, [selected]);
  const [position, setPosition] = useState({ first: 0, count: 3, atStart: true, atEnd: false });
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const update = () => {
      const card = element.firstElementChild as HTMLElement | null;
      if (!card) return;
      const step = card.getBoundingClientRect().width + parseFloat(getComputedStyle(element).columnGap);
      const count = Math.max(1, Math.round(element.clientWidth / step));
      const first = Math.min(reviews.length - count, Math.max(0, Math.round(element.scrollLeft / step)));
      setPosition({ first, count, atStart: element.scrollLeft < 2, atEnd: element.scrollLeft + element.clientWidth >= element.scrollWidth - 2 });
    };
    const measure = () => setOverflowing(Array.from(element.querySelectorAll<HTMLElement>(".review-body")).map(body => body.scrollHeight > body.clientHeight + 1));
    update();
    measure();
    let disposed = false;
    document.fonts.ready.then(() => { if (!disposed) measure(); });
    const textObserver = new ResizeObserver(measure);
    element.querySelectorAll(".review-body").forEach(body => textObserver.observe(body));
    const observer = new ResizeObserver(update);
    observer.observe(element);
    element.addEventListener("scroll", update, { passive: true });
    return () => { disposed = true; textObserver.disconnect(); observer.disconnect(); element.removeEventListener("scroll", update); };
  }, []);

  function move(direction: number) {
    const element = track.current;
    if (!element) return;
    const gap = parseFloat(getComputedStyle(element).columnGap);
    element.scrollBy({ left: direction * (element.clientWidth + gap), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }

  return <div className="reviews-slider" role="region" aria-roledescription="карусель" aria-label="Отзывы о школе">
    <nav className="review-ratings" aria-label="Отзывы на площадках">
      {platforms.map(platform => { const rating = ratingData.ratings.find(item => item.name === platform.name); return <a key={platform.name} href={platform.href} target="_blank" rel="noopener noreferrer" title={rating ? `Проверено ${ratingData.checkedAt}` : undefined}><Image src={platform.icon} alt="" width={22} height={22} /><span>{platform.name}</span>{platform.name === "Яндекс Карты" && <small>1 отзыв</small>}{rating && <><strong>{rating.value} <span className="rating-star" aria-hidden="true">★</span></strong><small>{rating.count}</small></>}</a>; })}
    </nav>
    <div ref={track} id="reviews-track" className="review-grid reviews-track" tabIndex={0} aria-label="Отзывы: листайте стрелками или свайпом" onKeyDown={(event) => {
      if (event.target !== event.currentTarget) return;
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1); }
    }}>
      {reviews.map((review, index) => <article className="review-slide" key={review.name} role="group" aria-roledescription="слайд" aria-label={`${index + 1} из ${reviews.length}`}>
        <blockquote>
          <header className="review-author"><span className="review-avatar" aria-hidden="true">{review.name.split(" ").map(word => word[0]).join("")}</span><div><strong>{review.name}</strong><a href={review.href} target="_blank" rel="noopener noreferrer">{review.source}{review.date && ` · ${review.date.split("-").reverse().join(".")}`} ↗</a></div></header>
          <div className="review-body">{review.rating > 0 && <span className="review-stars" aria-label={`${review.rating} из 5`}>{"★".repeat(review.rating)}</span>}<p className="review-text">{review.quote}{review.excerpt && " …"}</p></div>
          <div className="review-read-action">{review.excerpt ? <a className="review-original-link" href={review.href} target="_blank" rel="noopener noreferrer">Полный отзыв на Яндексе ↗</a> : overflowing[index] && <button className="review-toggle" aria-haspopup="dialog" aria-controls="full-review" onClick={() => setSelected(index)}>Читать полностью</button>}</div>
        </blockquote>
      </article>)}
    </div>
    <div className="reviews-bottom">
    <div className="reviews-sources"><a className="leave-review" href="https://yandex.com/maps/org/intellekt/104722408925/reviews/" target="_blank" rel="noopener noreferrer">Оставить отзыв на Яндексе →</a></div>
    <div className="reviews-controls">
      <span className="reviews-count">{position.first + 1}{position.count > 1 ? `–${Math.min(reviews.length, position.first + position.count)}` : ""} из {reviews.length}</span>
      <button type="button" className="reviews-arrow" aria-label="Предыдущие отзывы" aria-controls="reviews-track" disabled={position.atStart} onClick={() => move(-1)}><HomeIcon name="arrow" /></button>
      <button type="button" className="reviews-arrow" aria-label="Следующие отзывы" aria-controls="reviews-track" disabled={position.atEnd} onClick={() => move(1)}><HomeIcon name="arrow" /></button>
    </div>
    </div>
    <dialog ref={dialog} id="full-review" className="full-review-dialog" aria-labelledby="full-review-author" onClose={() => setSelected(null)} onClick={event => { const r = event.currentTarget.getBoundingClientRect(); if (event.target === event.currentTarget && (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom)) setSelected(null); }}>
      <button className="full-review-close" aria-label="Закрыть отзыв" onClick={() => setSelected(null)}><span aria-hidden="true">×</span></button>
      {selected !== null && <><h2 id="full-review-author">{reviews[selected].name}</h2><a className="full-review-source" href={reviews[selected].href} target="_blank" rel="noopener noreferrer">{reviews[selected].source} ↗</a><p>{reviews[selected].quote}</p></>}
    </dialog>
  </div>;
}
