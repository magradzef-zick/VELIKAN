import { useLanguage } from '../i18n/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section
      id="top"
      className="relative flex min-h-[90vh] flex-col items-center justify-center gap-8 overflow-hidden px-4 pt-24 text-center sm:px-6"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_20%,rgba(255,45,120,0.18),transparent_60%)]"
      />

      <span className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
        {t.hero.kicker}
      </span>

      <div className="flex max-w-2xl flex-col gap-6">
        <h1 className="font-[var(--font-display)] text-6xl font-extrabold leading-none tracking-tight sm:text-8xl">
          <span className="text-gradient">{t.hero.title}</span>
        </h1>
        <p className="text-balance text-lg leading-relaxed text-white/70 sm:text-xl">{t.hero.subtitle}</p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <a
          href="#catalog"
          className="rounded-full bg-gradient-to-r from-[var(--color-accent-orange)] to-[var(--color-accent-pink)] px-8 py-3 font-semibold text-white shadow-lg shadow-black/30 transition hover:brightness-110 active:scale-95"
        >
          {t.hero.ctaCatalog}
        </a>
        <a
          href="https://t.me/velikan_kiyim"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-white/20 px-8 py-3 font-semibold text-white transition hover:bg-white/10 active:scale-95"
        >
          {t.hero.ctaTelegram}
        </a>
      </div>
    </section>
  )
}
