# Катя Fit

Одностраничный лендинг + личный кабинет ученика (Next.js).

## Локальная разработка

Приложение Next.js в папке `my-fit-platform`. Из **корня репозитория** (`Катя фит`):

```bash
npm run install:app
npm run dev
```

Или из этой папки:

```bash
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

Главная страница собирается из Next.js (`app/page.tsx`) и публикуется на GitHub Pages через `npm run export`.

## GitHub

Репозиторий: [gvbaydaeva-lang/katya-fit](https://github.com/gvbaydaeva-lang/katya-fit)

### Пуш из Cursor

1. Source Control → **Commit** (опишите изменения).
2. **Sync / Push** — отправка в `origin/main`.
3. GitHub Actions автоматически соберёт сайт и опубликует на **GitHub Pages**.

### Первый запуск GitHub Pages

В репозитории на GitHub:

1. **Settings** → **Pages**
2. **Build and deployment** → Source: **GitHub Actions**
3. После первого push в `main` сайт будет доступен по адресу:  
   **https://gvbaydaeva-lang.github.io/katya-fit/**

### Ограничения GitHub Pages

На Pages работает статическая версия: лендинг, демо-оплата и кабинет через `localStorage`.  
Полный серверный режим (Stripe webhook, cookie-сессии) — при `npm run dev` или деплое на Vercel.

## Переменные окружения

Скопируйте `.env.example` в `.env.local` для Stripe (опционально).
