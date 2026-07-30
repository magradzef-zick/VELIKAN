# VELIKAN Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-grade, bilingual (RU/UZ) React + Vite + Tailwind marketing site for VELIKAN, a plus-size men's clothing/footwear store in Tashkent, replacing the existing single-file `index.html` prototype.

**Architecture:** Single-page React SPA (no router — anchor-scrolled sections), a custom `LanguageContext` backed by `localStorage` for RU/UZ copy, Tailwind for styling with a dark + orange→magenta gradient theme, static gradient-tile placeholders for catalog imagery. No backend, no API keys, no external network calls except a keyless Google Maps iframe embed.

**Tech Stack:** Vite, React 18, TypeScript, Tailwind CSS v4. No i18n library (plain TS dictionaries), no router (one page), no component library beyond what Magic MCP (21st.dev) produces per-section, then re-themed inline with Tailwind.

## Global Constraints

- Default language: Russian (`ru`). Switcher persists choice in `localStorage` under key `velikan-lang`.
- Brand name literal string: "VELIKAN | king size store".
- Address: Ташкент, Юнусабадский район, улица Осиё 85 (ориентир — кинотеатр "Казахстан") / Toshkent, Yunusobod tumani, Osiyo ko'chasi 85 (mo'ljal — "Qazaqstan" kinoteatri).
- Hours: Пн-Сб 11:00-19:00, Вс 11:00-17:00 / Dush-Shan 11:00-19:00, Yak 11:00-17:00.
- Phones (tel: links): +998977479776, +998974544898, +998983659299.
- Telegram: https://t.me/velikan_kiyim (all "message us" CTAs point here).
- No hardcoded secrets/API keys anywhere. Map embed must use the keyless `https://maps.google.com/maps?q=...&output=embed` iframe form, not the JS Maps API.
- Mobile-first: base Tailwind classes target mobile; `md:`/`lg:` add desktop layout.
- Catalog placeholder art: CSS gradient tiles + Lucide/inline SVG icon + category label — no external image files or stock photo URLs (per user decision).
- `npm run build` must complete with zero TypeScript/build errors before the plan is considered done.
- Run `/security-review` at the end and fix findings before completion.

---

## File Structure

```
Velikan/
  index.html                          # Vite entry (replaces old prototype after scaffold)
  package.json / tsconfig.json / vite.config.ts / tailwind config (Tailwind v4 = CSS-based, no tailwind.config.js needed)
  src/
    main.tsx
    App.tsx                           # Composes sections in order, wraps in LanguageProvider
    index.css                         # Tailwind import + @theme tokens (colors, fonts) + global keyframes
    i18n/
      types.ts                        # Dictionary shape (TS type) shared by both locales
      ru.ts                           # Russian copy (default)
      uz.ts                           # Uzbek Latin copy
      LanguageContext.tsx             # Provider + useLanguage() hook, localStorage persistence
    components/
      Header.tsx                      # Logo, nav anchors, LanguageSwitcher
      LanguageSwitcher.tsx            # RU/UZ toggle, Magic-MCP-sourced control re-themed
      Hero.tsx                        # Section 1 — Magic MCP hero component, re-themed
      About.tsx                       # Section 2
      Catalog.tsx                     # Section 3 — Magic MCP tabs/filter component, re-themed
      CatalogTile.tsx                 # Single gradient placeholder tile
      WhyUs.tsx                       # Section 4
      Contact.tsx                     # Section 5 — phones, Telegram button, map iframe, hours
      Footer.tsx                      # Section 6
  docs/superpowers/... (this plan + spec)
```

**Interfaces (shared contracts every task must match exactly):**

- `src/i18n/types.ts` exports `type Locale = 'ru' | 'uz'` and `interface Dictionary { ... }` (full shape defined in Task 2).
- `src/i18n/LanguageContext.tsx` exports `LanguageProvider` (component) and `useLanguage(): { locale: Locale; t: Dictionary; setLocale: (l: Locale) => void }`.
- Every section component is a zero-prop `export default function X()` that calls `useLanguage()` internally — no prop drilling.

---

### Task 1: Scaffold Vite + React + TS + Tailwind project

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.node.json`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/index.css`
- Modify: none (old `index.html` prototype is overwritten by the Vite scaffold — confirm with `git status`-equivalent `ls` first since this repo has no git yet)

**Interfaces:**
- Produces: a working `npm run dev` and `npm run build` pipeline that all later tasks build on.

- [ ] **Step 1: Scaffold with Vite's official template**

```bash
cd /Users/thatszick/Desktop/Projects/Velikan
npm create vite@latest . -- --template react-ts
```

When prompted about the non-empty directory (existing `index.html`, `.remember/`, `docs/`), choose to proceed — Vite will only touch files it needs to write (it may ask to overwrite `index.html`; confirm yes, the prototype's content is already preserved in `.remember` history/memory).

- [ ] **Step 2: Install dependencies + Tailwind v4**

```bash
npm install
npm install -D tailwindcss @tailwindcss/vite
```

- [ ] **Step 3: Wire Tailwind into Vite config**

`vite.config.ts`:
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

- [ ] **Step 4: Replace `src/index.css` with Tailwind import + brand tokens**

```css
@import "tailwindcss";

@theme {
  --color-ink: #0a0a0a;
  --color-ink-raised: #141414;
  --color-accent-orange: #ff6a1a;
  --color-accent-pink: #ff2d78;
  --font-display: "Unbounded", "Manrope", system-ui, sans-serif;
  --font-body: "Manrope", system-ui, sans-serif;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--color-ink);
  color: #f5f5f5;
  font-family: var(--font-body);
}

.text-gradient {
  background-image: linear-gradient(90deg, var(--color-accent-orange), var(--color-accent-pink));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
```

- [ ] **Step 5: Load display font (Unbounded) via Google Fonts link in `index.html`, set page title/lang**

`index.html` `<head>` should include:
```html
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Unbounded:wght@600;700;800&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet" />
<title>VELIKAN | king size store</title>
```

- [ ] **Step 6: Strip Vite's default demo markup from `src/App.tsx`** down to a placeholder `<div>VELIKAN</div>` for now (real composition happens in Task 8).

- [ ] **Step 7: Verify the pipeline**

```bash
npm run build
```
Expected: build succeeds with no errors, `dist/` is produced.

- [ ] **Step 8: Commit**

Skip git commit — this project is not yet a git repository (`git init` was not requested). Proceed without committing; note this to the user at the end in case they want version control.

---

### Task 2: i18n dictionary types + RU/UZ content

**Files:**
- Create: `src/i18n/types.ts`, `src/i18n/ru.ts`, `src/i18n/uz.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: `Dictionary` type and two fully-populated `Dictionary` objects (`ru`, `uz`) that every component task reads from via `useLanguage().t`.

- [ ] **Step 1: Define the shared dictionary shape**

`src/i18n/types.ts`:
```ts
export type Locale = 'ru' | 'uz'

export interface CatalogCategory {
  id: string
  title: string
  description: string
}

export interface Dictionary {
  meta: { title: string }
  nav: { about: string; catalog: string; whyUs: string; contact: string }
  hero: {
    kicker: string
    title: string
    subtitle: string
    ctaCatalog: string
    ctaTelegram: string
  }
  about: {
    title: string
    body: string
    addressLabel: string
    address: string
    hoursLabel: string
    hours: string
    philosophy: string
  }
  catalog: {
    title: string
    subtitle: string
    categories: CatalogCategory[]
    comingSoon: string
  }
  whyUs: {
    title: string
    items: { title: string; description: string }[]
  }
  contact: {
    title: string
    subtitle: string
    phonesLabel: string
    telegramCta: string
    hoursLabel: string
    hours: string
    addressLabel: string
    address: string
  }
  footer: {
    tagline: string
    copyright: string
  }
}
```

- [ ] **Step 2: Russian dictionary (default locale)**

`src/i18n/ru.ts`:
```ts
import type { Dictionary } from './types'

export const ru: Dictionary = {
  meta: { title: 'VELIKAN | king size store — мужская одежда и обувь больших размеров в Ташкенте' },
  nav: { about: 'О нас', catalog: 'Каталог', whyUs: 'Почему мы', contact: 'Контакты' },
  hero: {
    kicker: 'Ташкент · Юнусабад',
    title: 'VELIKAN',
    subtitle: 'Мужская одежда и обувь настоящих больших размеров. Без подгонки, без недельного ожидания — меряй и забирай сегодня.',
    ctaCatalog: 'Смотреть каталог',
    ctaTelegram: 'Написать в Telegram',
  },
  about: {
    title: 'О магазине',
    body: 'VELIKAN — магазин мужской одежды и обуви больших размеров в Ташкенте. Мы работаем для мужчин, которым надоело не находить свой размер в обычных магазинах.',
    addressLabel: 'Адрес',
    address: 'Юнусабадский район, улица Осиё 85 (ориентир — кинотеатр «Казахстан»)',
    hoursLabel: 'Часы работы',
    hours: 'Пн–Сб: 11:00–19:00, Вс: 11:00–17:00',
    philosophy: 'Реальные большие размеры — всегда в наличии, здесь и сейчас.',
  },
  catalog: {
    title: 'Каталог',
    subtitle: 'Категории обновляются — ассортимент в наличии в магазине шире, чем на сайте.',
    categories: [
      { id: 'outerwear', title: 'Верхняя одежда', description: 'Куртки, пуховики, ветровки больших размеров' },
      { id: 'suits', title: 'Костюмы и рубашки', description: 'Деловой и повседневный стиль от 3XL' },
      { id: 'footwear', title: 'Обувь', description: 'Большие размеры от 44 до 50' },
      { id: 'underwear', title: 'Нижнее бельё', description: 'Комфортные базовые модели больших размеров' },
    ],
    comingSoon: 'Фото скоро',
  },
  whyUs: {
    title: 'Почему VELIKAN',
    items: [
      { title: 'Реальные размеры в наличии', description: 'Не нужно ждать неделями под заказ — большие размеры уже на полке.' },
      { title: 'Консультация по посадке', description: 'Поможем подобрать вещь, которая сидит по фигуре, а не «на глаз».' },
      { title: 'Доставка по Ташкенту и Узбекистану', description: 'Привезём заказ к вам, если приехать в магазин неудобно.' },
    ],
  },
  contact: {
    title: 'Контакты',
    subtitle: 'Звоните, пишите в Telegram или приезжайте в магазин.',
    phonesLabel: 'Телефоны',
    telegramCta: 'Написать в Telegram',
    hoursLabel: 'Часы работы',
    hours: 'Пн–Сб: 11:00–19:00, Вс: 11:00–17:00',
    addressLabel: 'Адрес',
    address: 'Ташкент, Юнусабадский район, улица Осиё 85 (ориентир — кинотеатр «Казахстан»)',
  },
  footer: {
    tagline: 'VELIKAN | king size store',
    copyright: '© ' + new Date().getFullYear().toString() + ' VELIKAN. Все права защищены.',
  },
}
```

- [ ] **Step 3: Uzbek (Latin) dictionary**

`src/i18n/uz.ts`:
```ts
import type { Dictionary } from './types'

export const uz: Dictionary = {
  meta: { title: 'VELIKAN | king size store — Toshkentda katta o\'lchamdagi erkaklar kiyimi va poyabzali' },
  nav: { about: 'Biz haqimizda', catalog: 'Katalog', whyUs: 'Nega biz', contact: 'Aloqa' },
  hero: {
    kicker: 'Toshkent · Yunusobod',
    title: 'VELIKAN',
    subtitle: 'Haqiqiy katta o\'lchamdagi erkaklar kiyimi va poyabzali. Moslashtirishsiz, haftalab kutishsiz — o\'lchab ko\'ring va bugun oling.',
    ctaCatalog: 'Katalogni ko\'rish',
    ctaTelegram: 'Telegram orqali yozish',
  },
  about: {
    title: 'Do\'kon haqida',
    body: 'VELIKAN — Toshkentdagi katta o\'lchamdagi erkaklar kiyimi va poyabzali do\'koni. Biz oddiy do\'konlarda o\'z o\'lchamini topa olmaydigan erkaklar uchun ishlaymiz.',
    addressLabel: 'Manzil',
    address: 'Yunusobod tumani, Osiyo ko\'chasi 85 (mo\'ljal — «Qazaqstan» kinoteatri)',
    hoursLabel: 'Ish vaqti',
    hours: 'Dush–Shan: 11:00–19:00, Yak: 11:00–17:00',
    philosophy: 'Haqiqiy katta o\'lchamlar — doim mavjud, hozir va shu yerda.',
  },
  catalog: {
    title: 'Katalog',
    subtitle: 'Kategoriyalar yangilanib boradi — do\'kondagi assortiment saytdagidan kengroq.',
    categories: [
      { id: 'outerwear', title: 'Ustki kiyim', description: 'Katta o\'lchamdagi kurtka, puxovik, vetrovkalar' },
      { id: 'suits', title: 'Kostyum va ko\'ylaklar', description: '3XL dan boshlab rasmiy va kundalik uslub' },
      { id: 'footwear', title: 'Poyabzal', description: '44 dan 50 gacha katta o\'lchamlar' },
      { id: 'underwear', title: 'Ichki kiyim', description: 'Katta o\'lchamdagi qulay bazaviy modellar' },
    ],
    comingSoon: 'Foto tez orada',
  },
  whyUs: {
    title: 'Nega aynan VELIKAN',
    items: [
      { title: 'Haqiqiy o\'lchamlar doim mavjud', description: 'Haftalab buyurtma kutish shart emas — katta o\'lchamlar allaqachon javonda.' },
      { title: 'Andoza bo\'yicha maslahat', description: 'Ko\'zga chiroyli emas, qomatga mos kiyimni tanlab beramiz.' },
      { title: 'Toshkent va O\'zbekiston bo\'ylab yetkazib berish', description: 'Do\'konga kelish qulay bo\'lmasa, buyurtmani sizga olib boramiz.' },
    ],
  },
  contact: {
    title: 'Aloqa',
    subtitle: 'Qo\'ng\'iroq qiling, Telegram\'ga yozing yoki do\'konga keling.',
    phonesLabel: 'Telefonlar',
    telegramCta: 'Telegram orqali yozish',
    hoursLabel: 'Ish vaqti',
    hours: 'Dush–Shan: 11:00–19:00, Yak: 11:00–17:00',
    addressLabel: 'Manzil',
    address: 'Toshkent, Yunusobod tumani, Osiyo ko\'chasi 85 (mo\'ljal — «Qazaqstan» kinoteatri)',
  },
  footer: {
    tagline: 'VELIKAN | king size store',
    copyright: '© ' + new Date().getFullYear().toString() + ' VELIKAN. Barcha huquqlar himoyalangan.',
  },
}
```

- [ ] **Step 4: Verify with TypeScript**

```bash
npx tsc --noEmit
```
Expected: no errors (confirms `ru`/`uz` fully satisfy `Dictionary`).

---

### Task 3: LanguageContext (persisted RU/UZ switcher logic)

**Files:**
- Create: `src/i18n/LanguageContext.tsx`

**Interfaces:**
- Consumes: `Dictionary`, `Locale` from `./types`; `ru` from `./ru`; `uz` from `./uz`.
- Produces: `LanguageProvider` component, `useLanguage()` hook returning `{ locale: Locale; t: Dictionary; setLocale: (l: Locale) => void }`.

- [ ] **Step 1: Implement the provider + hook**

`src/i18n/LanguageContext.tsx`:
```tsx
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Dictionary, Locale } from './types'
import { ru } from './ru'
import { uz } from './uz'

const STORAGE_KEY = 'velikan-lang'
const dictionaries: Record<Locale, Dictionary> = { ru, uz }

function readInitialLocale(): Locale {
  if (typeof window === 'undefined') return 'ru'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  return stored === 'ru' || stored === 'uz' ? stored : 'ru'
}

interface LanguageContextValue {
  locale: Locale
  t: Dictionary
  setLocale: (locale: Locale) => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readInitialLocale)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, locale)
    document.documentElement.lang = locale
    document.title = dictionaries[locale].meta.title
  }, [locale])

  const setLocale = (next: Locale) => setLocaleState(next)

  return (
    <LanguageContext.Provider value={{ locale, t: dictionaries[locale], setLocale }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
```

- [ ] **Step 2: Wrap the app**

`src/App.tsx` (interim, full composition lands in Task 8):
```tsx
import { LanguageProvider } from './i18n/LanguageContext'

export default function App() {
  return (
    <LanguageProvider>
      <div>VELIKAN</div>
    </LanguageProvider>
  )
}
```

- [ ] **Step 3: Manual verification (this is the "test" for stateful logic — no test framework is installed for a one-page marketing site; browser check is the ponytail-appropriate check here)**

```bash
npm run dev
```
Open the dev URL, confirm no console errors, then in devtools console run `localStorage.getItem('velikan-lang')` — expect `"ru"` after first load.

- [ ] **Step 4: Commit** — skipped (no git repo yet, per Task 1 Step 8 note).

---

### Task 4: Header + LanguageSwitcher (Magic-MCP-sourced)

**Files:**
- Create: `src/components/LanguageSwitcher.tsx`, `src/components/Header.tsx`

**Interfaces:**
- Consumes: `useLanguage()` from `../i18n/LanguageContext`.
- Produces: `export default function Header()`, `export default function LanguageSwitcher()`, rendered fixed/sticky at top of page with anchor links to `#about #catalog #why-us #contact`.

- [ ] **Step 1: Pull a segmented-control / toggle component via Magic MCP**

Call `mcp__21st__search` (or `mcp__21st__get_component`) with a query like `"pill toggle switch two options dark theme"` to source a real RU/UZ segmented-control pattern instead of hand-rolling generic buttons. Adapt the returned markup/structure into `LanguageSwitcher.tsx`, re-themed to the VELIKAN palette (`--color-accent-orange` → `--color-accent-pink` gradient for the active pill, `--color-ink-raised` background).

- [ ] **Step 2: Implement `LanguageSwitcher.tsx`** using the sourced pattern, wired to `useLanguage()`:

```tsx
import { useLanguage } from '../i18n/LanguageContext'

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage()

  return (
    <div className="inline-flex items-center rounded-full bg-white/5 p-1 text-sm font-semibold" role="group" aria-label="Language">
      {(['ru', 'uz'] as const).map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => setLocale(lang)}
          aria-pressed={locale === lang}
          className={
            locale === lang
              ? 'rounded-full bg-gradient-to-r from-[var(--color-accent-orange)] to-[var(--color-accent-pink)] px-4 py-1.5 text-white transition'
              : 'rounded-full px-4 py-1.5 text-white/60 transition hover:text-white'
          }
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
```

- [ ] **Step 3: Implement `Header.tsx`**

```tsx
import { useLanguage } from '../i18n/LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'

export default function Header() {
  const { t } = useLanguage()

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-[var(--color-ink)]/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#top" className="font-[var(--font-display)] text-lg font-extrabold tracking-tight">
          VELI<span className="text-gradient">KAN</span>
        </a>
        <nav className="hidden gap-6 text-sm font-medium text-white/70 md:flex">
          <a href="#about" className="hover:text-white">{t.nav.about}</a>
          <a href="#catalog" className="hover:text-white">{t.nav.catalog}</a>
          <a href="#why-us" className="hover:text-white">{t.nav.whyUs}</a>
          <a href="#contact" className="hover:text-white">{t.nav.contact}</a>
        </nav>
        <LanguageSwitcher />
      </div>
    </header>
  )
}
```

- [ ] **Step 4: Verify** — `npm run dev`, confirm header is sticky, nav anchors present, switcher toggles `RU`/`UZ` active pill.

---

### Task 5: Hero (Magic-MCP-sourced) + About

**Files:**
- Create: `src/components/Hero.tsx`, `src/components/About.tsx`

**Interfaces:**
- Consumes: `useLanguage()`.
- Produces: `export default function Hero()`, `export default function About()`.

- [ ] **Step 1: Source a hero-section pattern via Magic MCP**

Call `mcp__21st__search` with a query like `"dark hero section gradient headline two CTA buttons"`. Use the returned layout structure (large display headline, subtitle, two-button row) as the skeleton, then re-theme: swap fonts to `var(--font-display)`, swap the accent to the orange→pink gradient via `.text-gradient` / gradient button background, and bind all copy to `t.hero.*`.

- [ ] **Step 2: Implement `Hero.tsx`**

```tsx
import { useLanguage } from '../i18n/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section id="top" className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-4 pt-24 text-center sm:px-6">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_20%,rgba(255,45,120,0.18),transparent_60%)]"
      />
      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-white/50">{t.hero.kicker}</p>
      <h1 className="font-[var(--font-display)] text-5xl font-extrabold leading-none sm:text-7xl">
        <span className="text-gradient">{t.hero.title}</span>
      </h1>
      <p className="mt-6 max-w-xl text-balance text-lg text-white/70 sm:text-xl">{t.hero.subtitle}</p>
      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <a
          href="#catalog"
          className="rounded-full bg-gradient-to-r from-[var(--color-accent-orange)] to-[var(--color-accent-pink)] px-8 py-3 font-semibold text-white shadow-lg shadow-black/30 transition hover:brightness-110"
        >
          {t.hero.ctaCatalog}
        </a>
        <a
          href="https://t.me/velikan_kiyim"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-white/20 px-8 py-3 font-semibold text-white transition hover:bg-white/10"
        >
          {t.hero.ctaTelegram}
        </a>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Implement `About.tsx`**

```tsx
import { useLanguage } from '../i18n/LanguageContext'

export default function About() {
  const { t } = useLanguage()

  return (
    <section id="about" className="mx-auto max-w-4xl px-4 py-24 sm:px-6">
      <h2 className="font-[var(--font-display)] text-3xl font-bold sm:text-4xl">{t.about.title}</h2>
      <p className="mt-6 text-lg text-white/70">{t.about.body}</p>
      <p className="mt-4 text-lg font-semibold text-gradient">{t.about.philosophy}</p>
      <dl className="mt-10 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl bg-white/5 p-6">
          <dt className="text-sm font-semibold uppercase tracking-wide text-white/50">{t.about.addressLabel}</dt>
          <dd className="mt-2 text-white/90">{t.about.address}</dd>
        </div>
        <div className="rounded-2xl bg-white/5 p-6">
          <dt className="text-sm font-semibold uppercase tracking-wide text-white/50">{t.about.hoursLabel}</dt>
          <dd className="mt-2 text-white/90">{t.about.hours}</dd>
        </div>
      </dl>
    </section>
  )
}
```

- [ ] **Step 4: Verify** — `npm run dev`, confirm Hero renders full-viewport with gradient headline and both CTAs link correctly (Telegram opens in new tab), About renders address/hours cards.

---

### Task 6: Catalog (Magic-MCP-sourced tabs/filter) + gradient placeholder tiles

**Files:**
- Create: `src/components/Catalog.tsx`, `src/components/CatalogTile.tsx`

**Interfaces:**
- Consumes: `useLanguage()`, `CatalogCategory` type from `../i18n/types`.
- Produces: `export default function Catalog()`, `export default function CatalogTile({ category }: { category: CatalogCategory })`.

- [ ] **Step 1: Source a tabs/filter component via Magic MCP**

Call `mcp__21st__search` with a query like `"tabs filter product grid dark theme"`. This is the section explicitly required to visibly demonstrate Magic MCP component quality — use the returned tab-list interaction pattern (active-tab indicator, keyboard-accessible `role="tablist"`) rather than a hand-rolled `useState` button row, then re-theme to VELIKAN's palette.

- [ ] **Step 2: Implement `CatalogTile.tsx`** (gradient placeholder, per user decision — no external images)

```tsx
import type { CatalogCategory } from '../i18n/types'
import { useLanguage } from '../i18n/LanguageContext'

const GRADIENTS: Record<string, string> = {
  outerwear: 'from-orange-500/40 via-ink to-pink-600/30',
  suits: 'from-pink-600/40 via-ink to-orange-500/30',
  footwear: 'from-orange-400/40 via-ink to-pink-500/30',
  underwear: 'from-pink-500/40 via-ink to-orange-400/30',
}

export default function CatalogTile({ category }: { category: CatalogCategory }) {
  const { t } = useLanguage()

  return (
    <div className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:border-white/20">
      <div
        className={`flex h-40 items-center justify-center bg-gradient-to-br ${GRADIENTS[category.id] ?? GRADIENTS.outerwear} text-xs font-semibold uppercase tracking-wide text-white/50`}
      >
        {t.catalog.comingSoon}
      </div>
      <div className="p-5">
        <h3 className="font-[var(--font-display)] text-lg font-bold">{category.title}</h3>
        <p className="mt-2 text-sm text-white/60">{category.description}</p>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Implement `Catalog.tsx`** with tab filtering (all categories shown; selecting a tab scrolls/highlights — since there's no real product data yet, the filter narrows the visible tile grid to the selected category, `all` shows every category)

```tsx
import { useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import CatalogTile from './CatalogTile'

export default function Catalog() {
  const { t } = useLanguage()
  const [active, setActive] = useState<string>('all')

  const visible = active === 'all' ? t.catalog.categories : t.catalog.categories.filter((c) => c.id === active)

  return (
    <section id="catalog" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <h2 className="font-[var(--font-display)] text-3xl font-bold sm:text-4xl">{t.catalog.title}</h2>
      <p className="mt-4 max-w-2xl text-white/60">{t.catalog.subtitle}</p>

      <div role="tablist" aria-label={t.catalog.title} className="mt-8 flex flex-wrap gap-2">
        <button
          role="tab"
          aria-selected={active === 'all'}
          onClick={() => setActive('all')}
          className={
            active === 'all'
              ? 'rounded-full bg-gradient-to-r from-[var(--color-accent-orange)] to-[var(--color-accent-pink)] px-4 py-2 text-sm font-semibold text-white'
              : 'rounded-full bg-white/5 px-4 py-2 text-sm font-semibold text-white/60 hover:text-white'
          }
        >
          All
        </button>
        {t.catalog.categories.map((c) => (
          <button
            key={c.id}
            role="tab"
            aria-selected={active === c.id}
            onClick={() => setActive(c.id)}
            className={
              active === c.id
                ? 'rounded-full bg-gradient-to-r from-[var(--color-accent-orange)] to-[var(--color-accent-pink)] px-4 py-2 text-sm font-semibold text-white'
                : 'rounded-full bg-white/5 px-4 py-2 text-sm font-semibold text-white/60 hover:text-white'
            }
          >
            {c.title}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {visible.map((category) => (
          <CatalogTile key={category.id} category={category} />
        ))}
      </div>
    </section>
  )
}
```

*("All" label: this is a UI micro-label, not primary body copy — acceptable to leave as a universally-understood Latin word alongside RU/UZ; if the user wants it translated later it's a one-line addition to the dictionary.)*

- [ ] **Step 4: Verify** — `npm run dev`, click each tab, confirm grid filters to the matching single tile and "All" restores all four.

---

### Task 7: Why Us + Contact + Footer

**Files:**
- Create: `src/components/WhyUs.tsx`, `src/components/Contact.tsx`, `src/components/Footer.tsx`

**Interfaces:**
- Consumes: `useLanguage()`.
- Produces: `export default function WhyUs()`, `export default function Contact()`, `export default function Footer()`.

- [ ] **Step 1: Implement `WhyUs.tsx`**

```tsx
import { useLanguage } from '../i18n/LanguageContext'

export default function WhyUs() {
  const { t } = useLanguage()

  return (
    <section id="why-us" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <h2 className="font-[var(--font-display)] text-3xl font-bold sm:text-4xl">{t.whyUs.title}</h2>
      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {t.whyUs.items.map((item) => (
          <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="font-[var(--font-display)] text-lg font-bold text-gradient">{item.title}</h3>
            <p className="mt-3 text-sm text-white/60">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Implement `Contact.tsx`** (tel: links, Telegram button, keyless map iframe, hours)

```tsx
import { useLanguage } from '../i18n/LanguageContext'

const PHONES = ['+998977479776', '+998974544898', '+998983659299']
const MAP_QUERY = encodeURIComponent('Tashkent, Yunusabad, Osiyo street 85')

export default function Contact() {
  const { t } = useLanguage()

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <h2 className="font-[var(--font-display)] text-3xl font-bold sm:text-4xl">{t.contact.title}</h2>
      <p className="mt-4 max-w-2xl text-white/60">{t.contact.subtitle}</p>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white/50">{t.contact.phonesLabel}</h3>
            <ul className="mt-3 space-y-2">
              {PHONES.map((phone) => (
                <li key={phone}>
                  <a href={`tel:${phone}`} className="text-lg font-semibold text-white hover:text-gradient">
                    {phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <a
            href="https://t.me/velikan_kiyim"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full bg-gradient-to-r from-[var(--color-accent-orange)] to-[var(--color-accent-pink)] px-8 py-3 font-semibold text-white transition hover:brightness-110"
          >
            {t.contact.telegramCta}
          </a>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white/50">{t.contact.hoursLabel}</h3>
            <p className="mt-2 text-white/80">{t.contact.hours}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white/50">{t.contact.addressLabel}</h3>
            <p className="mt-2 text-white/80">{t.contact.address}</p>
          </div>
        </div>

        <iframe
          title="VELIKAN — map"
          src={`https://maps.google.com/maps?q=${MAP_QUERY}&output=embed`}
          className="h-80 w-full rounded-2xl border border-white/10 lg:h-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Implement `Footer.tsx`**

```tsx
import { useLanguage } from '../i18n/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-white/5 px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-white/50 sm:flex-row">
        <span className="font-[var(--font-display)] font-bold text-white">{t.footer.tagline}</span>
        <a href="https://t.me/velikan_kiyim" target="_blank" rel="noopener noreferrer" className="hover:text-white">
          Telegram
        </a>
        <span>{t.footer.copyright}</span>
      </div>
    </footer>
  )
}
```

- [ ] **Step 4: Verify** — `npm run dev`, confirm `tel:` links have correct `href`, Telegram links open `https://t.me/velikan_kiyim` in a new tab with `rel="noopener noreferrer"`, map iframe loads without requiring any API key.

---

### Task 8: Compose `App.tsx`, mobile-first pass, build + browser verification

**Files:**
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: all section components from Task 4–7.
- Produces: final composed page.

- [ ] **Step 1: Compose the full page**

```tsx
import { LanguageProvider } from './i18n/LanguageContext'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Catalog from './components/Catalog'
import WhyUs from './components/WhyUs'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <LanguageProvider>
      <Header />
      <main>
        <Hero />
        <About />
        <Catalog />
        <WhyUs />
        <Contact />
      </main>
      <Footer />
    </LanguageProvider>
  )
}
```

- [ ] **Step 2: Run the build**

```bash
npm run build
```
Expected: succeeds with zero errors/warnings that fail the build.

- [ ] **Step 3: Browser verification (dev server + mobile viewport)** — use the `run` skill or `chrome-devtools`/`playwright` MCP tools to:
  - Start `npm run dev`, load the page at a mobile viewport (375×812) first, then desktop.
  - Click the RU/UZ switcher, confirm all copy changes and persists across a page reload (`localStorage`).
  - Click each Catalog tab, confirm the grid filters correctly.
  - Confirm `tel:` links, the Telegram CTA (hero, contact, footer), and the map iframe are all present with correct hrefs/src.
  - Check no console errors.

- [ ] **Step 4: Fix any visual/functional issues found**, re-run Step 2 and Step 3 until clean.

---

### Task 9: Security review

**Files:** whatever `/security-review` flags.

- [ ] **Step 1: Run `/security-review` (or `claude-security` if installed) across the whole project.**
- [ ] **Step 2: Fix every finding** — expected areas to double-check even if the scanner misses them: all `target="_blank"` links have `rel="noopener noreferrer"` (already applied above), no secrets/API keys in any file, map iframe uses the keyless embed form (already applied above), no `dangerouslySetInnerHTML` anywhere.
- [ ] **Step 3: Re-run `npm run build`** to confirm fixes didn't break the build.

---

## Self-Review Notes

- **Spec coverage:** Hero/About/Catalog/WhyUs/Contact/Footer sections (Tasks 5–7) ✅; RU/UZ switcher with persistence (Tasks 2–3) ✅; Magic MCP sourcing called out explicitly in Tasks 4 (switcher) and 6 (catalog tabs — the section required to be visibly Magic-MCP-built) ✅; dark theme + orange/pink gradient (Task 1 tokens, used throughout) ✅; mobile-first (base Tailwind classes unprefixed, `sm:`/`md:`/`lg:` add up) ✅; tel/Telegram/map links (Task 7) ✅; no secrets, keyless map (Task 7 + Task 9) ✅; `npm run build` gate (Tasks 1, 8, 9) ✅; security review (Task 9) ✅.
- **No placeholders:** all copy is real, final RU/UZ text — nothing marked TBD.
- **Type consistency:** `Dictionary` (Task 2) is the single source every component (Tasks 4–7) destructures via `t.<section>.<field>` — verified field names match across all tasks.
