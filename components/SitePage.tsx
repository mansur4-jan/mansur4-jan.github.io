import { SchoolPlatforms } from "@/components/SchoolPlatforms";
import { InnerContent } from "@/components/InnerContent";
import pages from "@/content/pages.json";
import Link from "next/link";
import { HomeContent } from "@/components/HomeContent";
import { SiteHeader } from "@/components/SiteHeader";

type SourcePage = { path: string; title: string; html: string; displayHtml?: string; links: string[]; sourceStatus: string };
const allPages = pages as SourcePage[];
const byPath = new Map(allPages.map((page) => [page.path, page]));
export function getPage(path: string) { return byPath.get(path); }
export function getPaths() { return allPages.map((page) => page.path); }

const routeGroups = [
  { label: "Основные страницы", paths: ["/", "/about/", "/contact/", "/our-courses/", "/online-programms/", "/letniy-intensiv-v-shkole-skorochteniya-i-razvitiya-intellekt/", "/404-2/"] },
  { label: "Направления", paths: allPages.filter((p) => p.path.startsWith("/kindergarten/")).map((p) => p.path) },
  { label: "Программы", paths: allPages.filter((p) => p.path.startsWith("/programms/")).map((p) => p.path) },
  { label: "События", paths: allPages.filter((p) => p.path.startsWith("/event/")).map((p) => p.path) },
  { label: "Архивы", paths: allPages.filter((p) => p.path.startsWith("/category/") || p.path.startsWith("/tag/") || p.path.startsWith("/author/")).map((p) => p.path) },
];

const routeLabels: Record<string, string> = {
  "/": "Главная",
  "/about/": "О школе",
  "/contact/": "Контакты",
  "/our-courses/": "Наши программы",
  "/online-programms/": "События школы",
  "/404-2/": "Страница не найдена",
  "/letniy-intensiv-v-shkole-skorochteniya-i-razvitiya-intellekt/": "Летний интенсив",
  "/kindergarten/gruppy-prodlyonnogo-dnya/": "Группы продлённого дня",
  "/kindergarten/podgotovka-k-shkole/": "Программа Р.О.С.Т. — подготовка к школе",
  "/kindergarten/skorochtenie/": "Скорочтение. Развитие памяти",
  "/category/programms/": "Архив программ",
  "/tag/kalligrafiya/": "Каллиграфия",
  "/tag/gramotnoe-pismo/": "Грамотное письмо",
  "/tag/mladshiy-shkolnik/": "Младший школьник",
  "/tag/rol-kalligrafii-v-obuchenii/": "Роль каллиграфии в обучении",
  "/tag/deti-mladshego-shkolnogo-vozrasta/": "Дети младшего школьного возраста",
  "/tag/programmy-obucheniya-kalligrafii/": "Программы обучения каллиграфии",
  "/tag/angliyskiy-yazyk-v-bratske/": "Английский язык в Братске",
  "/tag/angliyskiy-yazyk-v-obuchenii/": "Английский язык в обучении",
  "/tag/programmy-obucheniya-angliyskomu-yazyku/": "Программы обучения английскому языку",
  "/tag/podgotovka-k-shkole-programma-r-o-s-t/": "Подготовка к школе: Р.О.С.Т.",
  "/author/admin-anna/": "Материалы автора Анны",
};

export function labelFor(path: string) {
  if (routeLabels[path]) return routeLabels[path];
  const title = byPath.get(path)?.title;
  if (title && title !== "ИНТЕЛЛЕКТ школа развития") return title;
  return decodeURIComponent(path.split("/").filter(Boolean).at(-1) || path).replaceAll("-", " ");
}

export function SitePage({ path }: { path: string }) {
  const page = getPage(path);
  if (!page) return null;
  return <div id={path === "/" ? "intellect-home" : "intellect-site"}>
    <a className="skip-link" href="#content">Перейти к содержимому</a>
    <SiteHeader homeDesign />
    <main className={"page-shell " + (path === "/" ? "home-shell" : "inner-shell")} id="content" tabIndex={-1}>
      {path !== "/" && <nav className="breadcrumbs" aria-label="Хлебные крошки"><Link href="/">Главная</Link><span aria-hidden="true"> / </span><span aria-current="page">{labelFor(path)}</span></nav>}
      {path === "/" ? <HomeContent /> : <InnerContent path={path} title={labelFor(path)} />}
    </main>
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-identity"><strong>ИНТЕЛЛЕКТ</strong><p>Школа скорочтения и развития интеллекта в Братске</p><p>Братск, проспект Ленина, 21</p><a href="tel:+73953283344">+7 (3953) 28-33-44</a><a href="mailto:school_bratsk@mail.ru">school_bratsk@mail.ru</a></div>
        <div className="footer-links"><h2>Разделы</h2><ul>{["/", "/about/", "/our-courses/", "/online-programms/", "/contact/"].map((route) => <li key={route}><Link href={route}>{labelFor(route)}</Link></li>)}</ul></div>
        <div className="footer-links"><h2>Направления</h2><ul>{routeGroups[1].paths.map((route) => <li key={route}><Link href={route}>{labelFor(route)}</Link></li>)}</ul></div>
      </div>
      <SchoolPlatforms footer />
      <details className="footer-sitemap"><summary>Полная карта сайта — {allPages.length} страниц</summary>
        <div className="sitemap-grid">{routeGroups.map((group) => <section key={group.label}><h2>{group.label}</h2><ul>{group.paths.map((route) => <li key={route}><Link href={route}>{labelFor(route)}</Link></li>)}</ul></section>)}</div>
      </details>
      <div className="footer-bottom"><span>ИНТЕЛЛЕКТ · Школа развития в Братске</span><a className="back-to-top" href="#content">Наверх ↑</a></div>
    </footer>
  </div>;
}
