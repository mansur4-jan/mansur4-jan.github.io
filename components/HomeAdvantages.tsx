import Image from "next/image";

function Tags({ items }: { items: string[] }) {
  return <ul className="advantage-tags" aria-label="Ключевые навыки">{items.map(item => <li key={item}>{item}</li>)}</ul>;
}

export function HomeAdvantages() {
  return <section className="home-advantages" id="lasting-skills" aria-labelledby="advantages-title">
    <div className="section-inner">
      <div className="advantages-heading">
        <span className="eyebrow">Больше, чем знания</span>
        <h2 id="advantages-title">Не просто знания.<br /><span>Навыки на всю жизнь.</span></h2>
        <p>Мы учим ребёнка понимать информацию, работать с ней и применять полученное — в школе, дальнейшем обучении и жизни.</p>
      </div>
      <div className="advantages-mosaic">
        <article className="advantage-card advantage-lifelong">
          <span className="advantage-kicker">Сегодня и на всю жизнь</span>
          <h3>Навык учиться<br />остаётся на всю жизнь</h3>
          <p>Школьные темы будут меняться, а умение быстро освоить новое, разобраться и применить знания пригодится ребёнку в любом возрасте.</p>
          <picture className="advantage-photo">
            <source type="image/avif" srcSet="/assets/advantages/learning-560.avif 560w, /assets/advantages/learning-1000.avif 1000w" sizes="(max-width: 700px) calc(100vw - 104px), (max-width: 1100px) 44vw, 550px" />
            <source type="image/webp" srcSet="/assets/advantages/learning-560.webp 560w, /assets/advantages/learning-1000.webp 1000w" sizes="(max-width: 700px) calc(100vw - 104px), (max-width: 1100px) 44vw, 550px" />
            <Image src="/assets/advantages/learning-1000.webp" alt="Ребёнок самостоятельно выполняет задание с цветными деталями в школе «Интеллект»" width={1000} height={563} loading="lazy" unoptimized />
          </picture>
          <Tags items={["учиться новому", "самостоятельность", "навык на будущее"]} />
        </article>
        <article className="advantage-card advantage-understand">
          <svg className="advantage-connections" viewBox="0 0 60 130" fill="none" aria-hidden="true"><path d="m16 15 28 50-28 50" stroke="currentColor" strokeWidth="1" /><circle cx="16" cy="15" r="11" fill="var(--adv-lavender)" stroke="currentColor" /><circle cx="44" cy="65" r="13" fill="currentColor" /><circle cx="16" cy="115" r="11" fill="var(--adv-lavender)" stroke="currentColor" /></svg>
          <h3>Не запоминать —<br />а понимать</h3>
          <p>Ребёнок учится разбираться в информации, выделять главное, видеть связи и формулировать собственную мысль.</p>
          <Tags items={["понимать", "анализировать", "делать выводы"]} />
        </article>
        <article className="advantage-card advantage-apply">
          <h3>Знания должны<br />работать</h3>
          <p>Учим не просто воспроизводить выученное, а использовать информацию: сравнивать, объединять, классифицировать и находить решение.</p>
          <svg className="advantage-flow" viewBox="0 0 460 52" fill="none" aria-hidden="true"><path d="M4 14h230q14 0 14 14v5q0 10 14 10h188m-10-9 10 9-10 8M90 43h42q14 0 14-14v-1q0-14 14-14" stroke="currentColor" strokeWidth="1.5" /><circle cx="85" cy="14" r="6" fill="var(--adv-blue)" /><circle cx="90" cy="43" r="6" fill="var(--adv-coral)" /><circle cx="360" cy="43" r="6" fill="var(--adv-green)" /></svg>
          <Tags items={["сравнивать", "структурировать", "применять"]} />
        </article>
        <article id="skills-independence" className="advantage-card advantage-independent">
          <div className="advantage-independent-copy"><span className="advantage-kicker">Важный шаг для всей семьи</span><h3>Больше<br />само&shy;стоятельности</h3><p>Когда ребёнок понимает задание и умеет работать с информацией, ему всё реже требуется постоянная помощь взрослого.</p></div>
          <div className="advantage-own-choice"><span>Меньше подсказок —</span><strong>больше <br />собственных <br />решений.</strong></div>
          <Tags items={["сам справляется", "ответственность", "уверенность"]} />
        </article>
        <article className="advantage-card advantage-future">
          <h3>Готовим<br />не только к школе</h3>
          <p>Наша задача шире хороших оценок — дать ребёнку способы мышления и работы с информацией, которые пригодятся в дальнейшем обучении и взрослой жизни.</p>
          <div className="advantage-horizon" aria-hidden="true"><span /><span /><span /><i>↗</i></div>
          <Tags items={["школа", "обучение", "будущее"]} />
        </article>
        <article id="school-method" className="advantage-card advantage-method">
          <div className="advantage-method-mark" aria-hidden="true"><span>Л. Л.</span><i>Васильева</i></div>
          <div className="advantage-method-copy"><span className="advantage-kicker">Основа нашего подхода</span><h3>Авторская методика<br />Васильевой Л. Л.</h3><p>Системный подход к развитию навыков работы с информацией, на котором построено обучение в сети школ.</p></div>
          <Tags items={["авторская система", "методика Васильевой"]} />
        </article>
      </div>
    </div>
  </section>;
}
