# Supabase — настройка

## 1. Ключи в `.env.local`

Скопируйте `.env.example` → `.env.local` и заполните:

| Переменная | Где взять |
|------------|-----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Project Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | API → `anon` `public` |
| `SUPABASE_SERVICE_ROLE_KEY` | API → `service_role` (только сервер, не публикуйте) |

## 2. Таблицы в базе

В **SQL Editor** выполните файлы по порядку:

1. `supabase/migrations/001_profiles_and_subscriptions.sql`
2. `supabase/migrations/002_grants.sql` (если есть)
3. `supabase/migrations/003_workouts.sql` — таблица уроков
4. `supabase/migrations/004_workouts_multitariff_and_assets.sql` — колонки `materials`, `tariffs`, `video_type` и bucket `workout-assets`

Если уже есть ошибки **«Could not find the materials column»** или **«Bucket not found»**, выполните один раз:

`supabase/setup-workouts-content.sql`

### Таблицы

**`profiles`** — профиль ученика (связан с `auth.users`)

| Поле | Описание |
|------|----------|
| `id` | UUID = id пользователя из Auth |
| `email` | Email |
| `full_name` | Имя |

**`subscriptions`** — подписка / доступ по тарифу

| Поле | Описание |
|------|----------|
| `user_id` | Кому принадлежит |
| `plan_id` | `self` \| `coached` \| `platform` |
| `status` | `active`, `trialing`, `canceled`, … |
| `stripe_*` | Связь со Stripe |
| `current_period_end` | До какой даты доступ |

## 3. Auth (email)

В Supabase → **Authentication** → **Providers** → Email: включите Email.

Для локальной разработки в **URL Configuration** добавьте:

- Site URL: `http://localhost:3000`
- Redirect URLs: `http://localhost:3000/auth/callback`

## 4. Поток для пользователя

1. **Регистрация** `/register` — email + пароль → письмо с подтверждением (если включено в Supabase).
2. **Вход** `/login` — email + пароль.
3. **Оплата тарифа** — после входа демо-оплата создаёт запись в `subscriptions`.
4. **Кабинет** `/app` — доступ только при активной подписке.

## 5. Уроки: Storage и миграции

| Что | Как |
|-----|-----|
| Колонка `materials` | Только через SQL (миграция 004). Server Action **не** создаёт колонки в БД. |
| Bucket `workout-assets` | Создаётся миграцией 004 **или** автоматически при первой загрузке файла через `/api/admin/storage/upload` (service role). |
| Загрузка файлов в админке | `POST /api/admin/storage/upload` → `lib/admin/storage.ts` (не напрямую из браузера в Storage). |

Переменная (опционально): `NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET=workout-assets`

## 6. Библиотеки

- `@supabase/supabase-js`
- `@supabase/ssr`

Клиенты: `lib/supabase/client.ts`, `server.ts`, `admin.ts`.
