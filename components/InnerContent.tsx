import Link from "next/link";
import { BookingButton } from "@/components/BookingButton";
import { HomeIcon } from "@/components/HomeIcon";
import homeView from "@/content/home-view.json";
import animationData from "@/content/program-animations.json";
import innerData from "@/content/inner-pages.json";

type Asset = { still: string; avif?: string; width: number; height: number };
const assets: Record<string, Asset> = animationData;
const content: Record<string, { lead: string; html: string }> = innerData;
const courses = homeView.courses.filter((course) => !course.href.includes("prodlyonnogo"));
const aliases: Record<string, string> = {
  "programma-r-o-s-t": "podgotovka-k-shkole",
  "kurs-intel-english": "angliyskiy-yazyk",
  "skorochtenie-razvitie-pamyati": "skorochtenie",
  "gruppa-prodlyonnogo-dnya": "gruppy-prodlyonnogo-dnya",
};
function coursePath(path: string) {
  const slug = path.split("/").filter(Boolean).at(-1) || "";
  return `/kindergarten/${aliases[slug] || slug}/`;
}

function Cover({ path, eager = false }: { path: string; eager?: boolean }) {
  const asset = assets[coursePath(path)];
  if (!asset) return <div className="inner-cover-placeholder"><HomeIcon name="book" /></div>;
  return <picture className="inner-cover">
    {asset.avif && <source srcSet={asset.avif} type="image/avif" />}
    {/* Compressed local images; static export has no image optimisation server. */}
    <img src={asset.still} alt="" width={asset.width} height={asset.height} loading={eager ? "eager" : "lazy"} decoding="async" />
  </picture>;
}

export function Consultation() {
  return <section className="inner-consultation" id="trial">
    <div><span className="eyebrow">Поможем с выбором</span><h2>Какое направление<br />подойдёт ребёнку?</h2><p>Расскажите, что хочется улучшить. Обсудим задачи и подберём программу на консультации.</p></div>
    <BookingButton className="button button-primary">Получить консультацию <span aria-hidden="true">↗</span></BookingButton>
  </section>;
}

function Catalogue({ title, archive = false }: { title: string; archive?: boolean }) {
  return <>
    <header className="inner-heading"><span className="eyebrow">{archive ? "Материалы школы" : "Учимся с интересом"}</span><h1>{title}</h1><p>{archive ? "Выберите направление, чтобы узнать о программе и занятиях." : "Читать, писать, считать и уверенно учиться. Найдите направление для своего ребёнка — с выбором поможем."}</p></header>
    <section className="inner-catalog" aria-label="Направления обучения">{courses.map((course, index) => <Link className="inner-course-card" href={course.href} key={course.href}>
      <Cover path={course.href} eager={index < 2} /><div><span className="inner-card-number">{String(index + 1).padStart(2, "0")} / Программа</span><h2>{course.title}</h2><span className="inner-card-link">О программе <span aria-hidden="true">↗</span></span></div>
    </Link>)}</section>
    <Consultation />
  </>;
}

function Article({ path }: { path: string }) {
  return <article className="inner-prose" dangerouslySetInnerHTML={{ __html: content[path]?.html || "" }} />;
}

export function InnerContent({ path, title }: { path: string; title: string }) {
  const archive = path.startsWith("/tag/") || path.startsWith("/author/") || path.startsWith("/category/");
  if (path === "/our-courses/" || archive) return <Catalogue title={title} archive={archive} />;
  if (path === "/contact/") return <>
    <header className="inner-heading"><span className="eyebrow">ИНТЕЛЛЕКТ · БРАТСК</span><h1>Давайте знакомиться</h1><p>Позвоните, напишите или приходите в школу. Ответим на вопросы и поможем выбрать занятия.</p></header>
    <section className="inner-contacts" aria-label="Контакты школы">
      <div className="inner-contact-address"><HomeIcon name="pin" /><span className="eyebrow">Ждём в гости</span><h2>Братск,<br />проспект Ленина, 21</h2><p>Центральная часть · Пн–Пт: 8:00–17:00</p><a className="button button-secondary" href="https://yandex.ru/maps/org/shkola_skorochteniya_i_razvitiya_intellekta_iq007/30031925860/" target="_blank" rel="noreferrer">Открыть на карте ↗</a></div>
      <div className="inner-contact-links"><a href="tel:+73953283344"><HomeIcon name="phone" /><span><small>Позвонить в школу</small>+7 (3953) 28-33-44</span><span aria-hidden="true">↗</span></a><a href="mailto:school_bratsk@mail.ru"><HomeIcon name="globe" /><span><small>Написать нам</small>school_bratsk@mail.ru</span><span aria-hidden="true">↗</span></a><p>На бесплатном пробном занятии познакомимся с ребёнком и обсудим, какой формат ему подойдёт.</p><BookingButton className="button button-primary">Бесплатное пробное занятие <span aria-hidden="true">↗</span></BookingButton></div>
    </section><Consultation />
  </>;
  if (path === "/404-2/") return <section className="inner-heading inner-empty"><span className="eyebrow">404</span><h1>Эта страница<br />не нашлась</h1><p>Программы и контакты школы всегда под рукой.</p><Link href="/our-courses/" className="button button-primary">Посмотреть программы <span aria-hidden="true">↗</span></Link></section>;
  const isCourse = path.startsWith("/kindergarten/") || path.startsWith("/programms/");
  if (isCourse) return <>
    <header className="inner-course-hero"><div><Link className="eyebrow inner-back" href="/our-courses/">← Все программы</Link><h1>{title}</h1><p>{content[path]?.lead}</p><BookingButton className="button button-primary">Бесплатное пробное занятие <span aria-hidden="true">↗</span></BookingButton></div><Cover path={path} eager /></header>
    <div className="inner-detail"><Article path={path} /><aside className="inner-sidebar"><span className="eyebrow">Другие направления</span><nav aria-label="Другие программы">{courses.filter((course) => course.href !== coursePath(path)).map((course) => <Link href={course.href} key={course.href}>{course.title}<span aria-hidden="true">↗</span></Link>)}</nav><p>Поможем подобрать занятия под задачи ребёнка.</p><BookingButton className="button button-primary">Задать вопрос <span aria-hidden="true">↗</span></BookingButton></aside></div><Consultation />
  </>;
  const isEventArchive = path === "/online-programms/" || path.startsWith("/event/");
  const isAbout = path === "/about/";
  const isEmpty = path.includes("letniy-intensiv");
  return <>
    <header className={"inner-heading" + (isAbout ? " inner-about-heading" : "")}><div><span className="eyebrow">{isAbout ? "Знакомьтесь — Интеллект" : path.startsWith("/event/") ? "Архив события · 2020" : "Жизнь школы"}</span><h1>{title}</h1>{isAbout && <p>Место, где ребёнок учится с интересом и становится увереннее в своих силах.</p>}{isEmpty && <p>Подробности летней программы и расписание можно уточнить у администратора школы.</p>}</div>{isAbout && <div className="inner-about-art"><Cover path="/kindergarten/tehnika-chteniya-razvitie-pamyati/" eager /></div>}</header>
    {isEventArchive ? <><p className="inner-archive-note">В этом разделе сохранились демонстрационные события старого шаблона за 2020 год. Актуальные мероприятия школы уточняйте по телефону <a href="tel:+73953283344">+7 (3953) 28-33-44</a>.</p><details className="inner-archive-source"><summary>Посмотреть архивный материал</summary><div lang="en"><Article path={path} /></div></details></> : !isEmpty && <Article path={path} />}<Consultation />
  </>;
}
