import Link from "next/link";

const formats = [
  { title: "Мини-группы", text: "Педагог видит, где ребёнку нужна помощь, и может уделить ему внимание." },
  { title: "Игровые задания", text: "Чередуем упражнения и активности, чтобы сохранять интерес к занятию." },
  { title: "Без спешки", text: "Ребёнку дают время разобраться в задании, а не просто успеть за группой." },
  { title: "Родители видят прогресс", text: "Понимаете, что получается и над чем стоит поработать дальше." },
];

export function HomeEnvironment() {
  return <section id="environment" className="home-comfort" aria-labelledby="environment-title">
    <div className="section-inner">
      <div className="comfort-intro">
        <span className="eyebrow">Как проходят занятия</span>
        <h2 id="environment-title">Среда, в которой ребёнку легче учиться</h2>
        <p>Небольшие группы, игровые задания и понятная поддержка педагога помогают ребёнку включаться в работу без лишнего напряжения.</p>
        <Link className="button button-secondary" href="/about/">Подробнее о школе</Link>
      </div>
      <div className="comfort-formats">
        {formats.map(format => <article className="comfort-format" key={format.title}>
          <h3>{format.title}</h3>
          <p>{format.text}</p>
        </article>)}
      </div>
    </div>
  </section>;
}
