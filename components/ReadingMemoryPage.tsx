import { BookingButton } from "@/components/BookingButton";
import { OtherDirections } from "@/components/OtherDirections";

export function ReadingMemoryPage() {
  return <div className="reading-page">
    <section className="reading-hero">
      <div className="reading-hero-copy">
        <span className="eyebrow">Курс для школьников 10–14 лет</span>
        <h1>Техника чтения<br /><em>и развитие памяти</em></h1>
        <p className="reading-lead">Помогаем читать быстрее, понимать смысл текста и запоминать главное без перегрузки и бесконечной зубрёжки.</p>
        <div className="reading-actions"><BookingButton className="button button-primary">Записаться на пробное занятие</BookingButton><a className="reading-phone" href="tel:+73953283344">+7 (3953) 28-33-44</a></div>
        <div className="reading-meta"><span><strong>6 месяцев</strong> программа</span><span><strong>72 занятия</strong> по 90 минут</span><span><strong>2–4 ученика</strong> в группе</span></div>
      </div>
      <div className="reading-hero-art" aria-label="Иллюстрация курса"><div className="reading-orbit orbit-one" /><div className="reading-orbit orbit-two" /><div className="reading-book"><span>А</span><span>Б</span><span>В</span><i /></div><div className="reading-art-note">Читаю<br /><strong>с пониманием</strong></div></div>
    </section>

    <section className="reading-section reading-results"><div className="reading-section-intro"><span className="eyebrow">Что изменится</span><h2>Навык, который помогает учиться легче</h2><p>На занятиях ребёнок тренирует внимание, память и работу с текстом одновременно. Результат заметен в школе и домашних заданиях.</p></div><div className="reading-result-grid"><article><b>01</b><h3>Быстрее читает</h3><p>Осваивает разные виды чтения и убирает привычку перечитывать каждую строку.</p></article><article><b>02</b><h3>Понимает главное</h3><p>Учится выделять смысл, задавать вопросы к тексту и пересказывать своими словами.</p></article><article><b>03</b><h3>Запоминает надолго</h3><p>Использует ассоциации, схемы и упражнения для зрительной и смысловой памяти.</p></article></div></section>

    <section className="reading-section reading-method"><div><span className="eyebrow">Как проходит обучение</span><h2>Пять шагов к уверенному чтению</h2></div><ol className="reading-steps"><li><span>01</span><div><h3>Диагностика</h3><p>Определяем скорость чтения, понимание и сильные стороны ребёнка.</p></div></li><li><span>02</span><div><h3>Внимание</h3><p>Тренируем концентрацию, переключение и устойчивость внимания.</p></div></li><li><span>03</span><div><h3>Техника</h3><p>Работаем с темпом, полем зрения и движением глаз по строке.</p></div></li><li><span>04</span><div><h3>Память</h3><p>Закрепляем информацию через образы, ассоциации и смысловые опоры.</p></div></li><li><span>05</span><div><h3>Применение</h3><p>Переносим навык на школьные тексты, задания и самостоятельную работу.</p></div></li></ol></section>

    <section className="reading-quote"><div><span className="eyebrow">Для родителей</span><h2>Меньше времени на домашние задания — больше уверенности в своих силах</h2></div><p>Мы составляем индивидуальную программу и объединяем детей в небольшие группы по уровню подготовки. Ребёнок видит свой прогресс и учится пользоваться инструментами самостоятельно.</p></section>

    <section className="vasilieva-method"><div className="method-mark">ВЛ</div><div><span className="eyebrow">Основа курса</span><h2>Авторская методика Васильевой Л. Л.</h2><p>Сегодня мы живём в мире информации, где умение работать с печатным текстом становится частью ежедневной жизни. Методика Васильевой — это поурочная система работы над языком, ритмом мысли, структурой текста и скоростью мыслительных операций.</p><div className="method-points"><span>Оптимизирует интеллектуальные ресурсы</span><span>Развивает все виды памяти</span><span>Активизирует словарный запас</span><span>Ускоряет мыслительные операции</span></div><p className="method-note">По этой методике обучаются люди разных возрастов в пяти странах мира. Сегодня открыто 151 школа в 89 городах.</p></div></section>

    <OtherDirections />

    <section className="reading-bottom"><div><span className="eyebrow">Готовы попробовать?</span><h2>Начните с бесплатной диагностики</h2><p>Познакомимся с ребёнком, покажем упражнения и подскажем, какой формат подойдёт именно ему.</p></div><BookingButton className="button button-primary">Записаться на занятие <span>→</span></BookingButton></section>
  </div>;
}
