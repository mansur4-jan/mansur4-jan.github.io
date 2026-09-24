# ИНТЕЛЛЕКТ — школа развития в Братске

Сайт: https://mansur4-jan.github.io/

## Разработка

```sh
npm ci
npm run dev
```

## Проверка и публикация

```sh
npm run typecheck
npm run build:pages
```

`build:pages` экспортирует сайт в `.next-export/`. GitHub Actions собирает и публикует эту папку в GitHub Pages при push в `main`. Изображения и шрифты хранятся локально; сервер Next.js для публичной версии не нужен.

Для обычного серверного размещения остаются `npm run build` и `npm start`.

Форма записи открывает почтовую программу пользователя (mailto); серверная доставка заявок не подключена. Конфигурация: `content/booking-form.json`.

Контент страниц: `content/`; главная: `components/HomeContent.tsx`; стили главной: `app/home-design.css`. Подробности реализации и источников — в `SITE.md`.
