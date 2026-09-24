import Link from "next/link";

const directions = [
  { href: "/kindergarten/gruppy-prodlyonnogo-dnya/", title: "Группы продлённого дня", note: "Поддержка после школы", color: "sand" },
  { href: "/kindergarten/podgotovka-k-shkole/", title: "Подготовка к школе", note: "Уверенный старт · 5–7 лет", color: "mint" },
  { href: "/programms/mentalnaya-arifmetika/", title: "Ментальная арифметика", note: "Счёт, внимание и логика", color: "lavender" },
  { href: "/programms/vunderkind-1-2-3-stupen/", title: "Вундеркинг", note: "Развитие интеллекта по возрасту", color: "blue" },
  { href: "/programms/gramotnoe-pismo-i-kalligrafiya/", title: "Грамотное письмо и каллиграфия", note: "Красивый почерк и грамотная речь", color: "peach" },
  { href: "/programms/sekretnaya-tablitsa-umnozheniya-za-21-zanyatie/", title: "Таблица умножения", note: "Запоминание без зубрёжки", color: "yellow" },
];

export function OtherDirections() {
  return <section id="other-directions" className="other-directions"><div className="other-directions-heading"><div><span className="eyebrow">Ещё в школе «Интеллект»</span><h2>Выберите следующее направление</h2></div><p>Собрали программы, которые помогают ребёнку развиваться в своём темпе — от подготовки к школе до уверенной учёбы.</p></div><div className="direction-grid">{directions.map((item, index) => <Link className={`direction-card direction-${item.color}`} href={item.href} key={item.href}><span className="direction-number">{String(index + 1).padStart(2, "0")}</span><span className="direction-arrow">↗</span><strong>{item.title}</strong><small>{item.note}</small><span className="direction-more">Подробнее</span></Link>)}</div></section>;
}
