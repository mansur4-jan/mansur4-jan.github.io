import { HomeEnvironment } from "@/components/HomeEnvironment";
import { HomeSkills } from "@/components/HomeSkills";
import { HomeAdvantages } from "@/components/HomeAdvantages";
import { BookingButton } from "@/components/BookingButton";
import Image from "next/image";
import { HomeIcon, type HomeIconName } from "@/components/HomeIcon";
import { HomeReviews } from "@/components/HomeReviews";
import Link from "next/link";
import durations from "@/content/program-durations.json";
import homeView from "@/content/home-view.json";

const programIcons: HomeIconName[] = ["book", "star", "grid", "pencil", "grid", "clock", "pencil", "flower", "globe"];

const team = [
  { name: "Преподаватель 1", role: "Педагог по развитию памяти и техники чтения", image: "/assets/teachers/kravtsova.jpg" },
  { name: "Преподаватель 2", role: "Педагог начального развития", image: "/assets/teachers/shilimovamyu.jpg" },
];
const faq = [
  [
    "Как понять, какая программа подойдёт ребёнку?",
    "Ориентируемся на возраст, текущие навыки и задачу: подготовка к школе, техника чтения, развитие памяти, внимания, мышления, грамотного письма или счёта. Если сложно выбрать самостоятельно, педагог поможет определить подходящее направление. На сайте школы представлено 9 программ для разных возрастов и задач."
  ],
  [
    "Поможет ли школа, если ребёнок медленно читает и плохо понимает текст?",
    "Да. В программах работа строится не только вокруг скорости чтения, но и вокруг понимания текста, смысловой памяти, внимания и умения выделять главное. В методике Васильевой скорочтение рассматривается как часть более широкой работы с информацией."
  ],
  [
    "Что делать, если ребёнок быстро отвлекается и ему сложно сосредоточиться?",
    "На занятиях используются упражнения на концентрацию, устойчивость и переключение внимания. Задача — постепенно научить ребёнка дольше удерживать внимание на задании и работать более собранно. Развитие внимания входит в содержание программ школы."
  ],
  [
    "Чем занятия в школе «Интеллект» отличаются от обычных дополнительных уроков?",
    "Мы не просто повторяем школьный материал. Ребёнок учится понимать информацию, выделять главное, сравнивать, классифицировать, структурировать и применять знания. Такой подход помогает не только выполнить конкретное задание, но и постепенно учиться более самостоятельно."
  ],
  [
    "В каком возрасте можно начинать занятия?",
    "В школе есть программы для разных возрастов. Например, программа Р.О.С.Т. рассчитана на детей 4–5 лет, «Вундеркинд» — на детей 5–10 лет, а программы по технике чтения и развитию памяти подходят более старшим детям."
  ],
  [
    "Сколько детей занимается в группе?",
    "Занятия проходят в небольших группах, чтобы педагог мог видеть, как ребёнок справляется с заданиями, и вовремя помочь. На текущей странице школы указан формат групп по 2–6 детей."
  ],
  [
    "Можно ли прийти на пробное занятие?",
    "Да. Можно познакомиться со школой, педагогом и форматом занятий перед началом обучения. Для этого достаточно оставить заявку и выбрать удобное время. На странице уже предусмотрена отдельная запись на пробное занятие."
  ],
  [
    "Есть ли занятия по скорочтению и развитию памяти для детей?",
    "Да. В школе есть отдельные программы «Техника чтения. Развитие памяти» и «Скорочтение. Развитие памяти». Конкретное направление выбирается с учётом возраста и текущего уровня ребёнка."
  ],
  [
    "Какие документы нужны для записи?",
    "Для первого обращения достаточно имени родителя, имени ребёнка, возраста и контактного телефона. Перечень документов для оформления обучения администратор сообщит перед началом занятий."
  ]
];

export function HomeContent() {
  return <>
    <section className="reference-services-hero"><div className="section-inner"><div className="reference-hero-contacts"><span>Занятия для детей от 4 лет</span><Link href="/contact/">Братск, проспект Ленина, 21</Link><a href="tel:+73953283344">+7 (3953) 28-33-44</a></div><div className="reference-hero-heading"><div><span className="eyebrow">Школа развития в Братске</span><h1>Больше, чем<br />просто <span className="hero-emphasis">занятия</span></h1></div><div className="reference-hero-action"><p>Помогаем детям читать, понимать, запоминать и учиться с интересом.</p><BookingButton className="button button-primary">Записаться на занятие <span aria-hidden="true"><HomeIcon name="arrow" /></span></BookingButton></div></div><div className="reference-service-mosaic reference-four-tiles"><div className="reference-service-tile reference-tile-all"><strong>Все<br />направления</strong><Link className="tile-button" href="/our-courses/">Выбрать программу</Link><HomeIcon name="book" className="tile-illustration" /></div><div className="reference-service-tile reference-tile-shape reference-shape-coral"><span className="tile-shape-word">Авторские<br />программы</span><span className="coral-orbit" aria-hidden="true" /><span className="tile-detail" aria-hidden="true">а → я</span></div><div className="reference-service-tile reference-tile-consult"><strong>Получите<br />консультацию</strong><BookingButton className="tile-button">Записаться на консультацию</BookingButton><HomeIcon name="heart" className="tile-illustration" /></div><div className="reference-service-tile reference-tile-shape reference-shape-blue"><span className="tile-shape-word"><span>Внимание</span> <span>Память</span> <span>Мышление</span></span><i className="tile-star"><HomeIcon name="star" /></i></div></div></div></section>
    <section id="about-school" className="home-about-statement" aria-label="Как мы помогаем детям учиться">
      <svg className="statement-doodle statement-pencil" viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m18 56 36-36 10 10-36 36-14 4 4-14Z M48 26l10 10 M18 56l10 10 M14 70l7-2" /></svg>
      <div className="statement-copy">
        <p>Ребёнок может быть <span className="statement-highlight">способным</span> — и всё равно часами сидеть над уроками.</p>
        <p>Часто дело не в знаниях, а в том, как он <span className="statement-underline">понимает и запоминает</span> информацию.</p>
        <p>Мы развиваем <span className="statement-highlight">внимание, память, мышление</span> и умение находить главное.</p>
        <p>Чтобы ребёнок быстрее понимал, легче учился и <span className="statement-underline">думал самостоятельно</span>.</p>
      </div>
      <svg className="statement-doodle statement-book" viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M40 22C29 14 17 15 10 18v42c10-4 20-3 30 4 10-7 20-8 30-4V18c-7-3-19-4-30 4v42 M18 27c5-1 10 0 15 3 M18 36c5-1 10 0 15 3 M47 30c5-3 10-4 15-3 M47 39c5-3 10-4 15-3" /></svg>
      <svg className="statement-doodle statement-spark" viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m40 8 8 24 24 8-24 8-8 24-8-24-24-8 24-8Z M65 8v12 M59 14h12" /></svg>
    </section>
    <section className="home-trial-photo" id="trial-lesson" aria-labelledby="trial-lesson-title">
      <picture className="trial-media">
        <Image src="/wp-content/uploads/2019/11/img_7813.jpg" alt="Педагог занимается с ребёнком в школе «Интеллект»" fill unoptimized sizes="100vw" />
      </picture>
      <div className="trial-photo-copy">
        <h2 id="trial-lesson-title">Бесплатное<br />пробное занятие</h2>
        <p>Чтобы <span>понять способности</span> ребёнка, запишитесь на занятие.</p>
        <BookingButton className="button button-primary">Записаться на занятие <span aria-hidden="true"><HomeIcon name="arrow" /></span></BookingButton>
      </div>
    </section>
    <section className="home-programs" id="programs"><div className="section-inner"><div className="section-heading"><div><span className="eyebrow">Выберите направление</span><h2>Наши программы</h2></div><p>Девять направлений для развития памяти, мышления, речи и самостоятельности.</p></div><div className="program-grid home-program-panels">{homeView.courses.map((course, index) => <Link className={`program-card program-panel program-panel-${index + 1}`} href={course.href} key={course.href}><div className="program-card-body"><span className="program-status">0{index + 1}</span><h3>{course.title}</h3>{durations.find(item => item.href === course.href)?.duration && <p className="program-duration">{durations.find(item => item.href === course.href)?.duration}</p>}<span className="program-more">Открыть направление <span><HomeIcon name="diagonal" /></span></span></div><HomeIcon name={programIcons[index]} className="program-art" /></Link>)}</div></div></section>
    <HomeAdvantages />
    <section id="team" className="home-team"><div className="section-inner"><div className="section-heading"><div><span className="eyebrow">Команда школы</span><h2>Люди, которым доверяют дети</h2></div><p>Педагоги помогают замечать сильные стороны ребёнка и превращать обучение в понятный маршрут.</p></div><div className="team-grid">{team.map((person, index) => <article className={`team-card team-card-${index + 1}`} key={person.name}><div className="team-photo"><Image src={person.image} alt={person.name} fill sizes="(max-width: 700px) 100vw, 33vw" /><span className="teacher-badge" aria-hidden="true">0{index + 1}</span></div><div className="team-info"><span>0{index + 1}</span><h3>{person.name}</h3><p>{person.role}</p></div></article>)}<article className="team-card team-card-3"><div className="team-photo"><div className="teacher-placeholder"><span className="teacher-outline"><HomeIcon name="person" /></span><span>Фото добавим позже</span></div><span className="teacher-badge">03</span></div><div className="team-info"><h3>Преподаватель 3</h3><p>Информация о преподавателе появится здесь.</p></div></article></div></div></section>
    <div className="home-benefits-screen" id="benefits">
    <HomeSkills />
    <HomeEnvironment />
    </div>
    <section id="first-step" className="home-promos"><div className="section-inner">
      <div className="section-heading"><div><span className="eyebrow">С чего начать</span><h2>Первый шаг — просто познакомиться</h2></div></div>
      <div className="promo-grid">
        <article><span>01</span><h3>Расскажите о ребёнке</h3><p>Что сейчас даётся сложно и чего хочется достичь.</p></article>
        <article><span>02</span><h3>Приходите на бесплатное первое занятие</h3><p>Педагог познакомится с ребёнком и посмотрит, как ему удобнее работать.</p></article>
        <article><span>03</span><h3>Получите рекомендацию</h3><p>Подскажем подходящую программу и формат занятий.</p></article>
      </div>
      <div className="first-step-action"><BookingButton className="button button-primary">Записаться на бесплатное занятие <span aria-hidden="true"><HomeIcon name="arrow" /></span></BookingButton></div>
    </div></section>
    <section id="approach" className="home-feature-split"><div className="section-inner">
      <div className="feature-blob"><strong>Учимся<br />понимать</strong><i>чтобы справляться самостоятельно</i></div>
      <div className="approach-copy"><span className="eyebrow">Главное о подходе</span>
        <h2>Больше <span className="approach-capsule">самостоятельности ребёнку.</span><br /><span className="approach-underline">Меньше контроля родителям.</span></h2>
        <p>Учим ребёнка понимать задачу, находить решение и доводить работу до конца — <span className="approach-underline">без постоянных подсказок</span> взрослых.</p>
        <BookingButton className="text-link">Поговорить с педагогом <span aria-hidden="true"><HomeIcon name="arrow" /></span></BookingButton>
      </div>
    </div></section>
    <section id="reviews" className="home-reviews"><div className="section-inner"><div className="section-heading"><div><span className="eyebrow">Отзывы родителей</span><h2>Нам <span className="reviews-title-accent">доверяют</span></h2></div></div><HomeReviews /></div></section>
    <section id="start" className="home-visit" aria-labelledby="school-visit-title">
      <div className="school-visit-copy">
        <span className="eyebrow">Приходите познакомиться</span>
        <h2 id="school-visit-title">Посмотрите,<br />как всё устроено</h2>
        <p>Покажем классы, познакомим с педагогом и расскажем, как проходят занятия.</p>
        <BookingButton className="button button-primary">Записаться на знакомство <span aria-hidden="true"><HomeIcon name="arrow" /></span></BookingButton>
        <BookingButton className="text-link">Поговорить с педагогом <span aria-hidden="true"><HomeIcon name="arrow" /></span></BookingButton>
      </div>
      <div className="school-visit-photo">
        <picture><source srcSet="/assets/school-visit.avif" type="image/avif" /><Image src="/assets/school-visit.webp" alt="Дети выполняют задания за партами в классе школы «Интеллект»" width={904} height={678} loading="lazy" unoptimized /></picture>
        <span className="school-visit-address">Братск, проспект Ленина, 21</span>
      </div>
    </section>
    <section id="faq" className="home-faq"><div className="section-inner"><div><span className="eyebrow">Ответы на вопросы</span><h2>Часто спрашивают</h2><p>Если не нашли ответ, позвоните нам — администратор подскажет удобный формат.</p><Link className="text-link" href="/contact/">Задать вопрос <span aria-hidden="true"><HomeIcon name="arrow" /></span></Link></div><div className="faq-list">{faq.map(([question, answer]) => <details key={question}><summary>{question}<span className="faq-plus" aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></div></section>

  </>;
}
