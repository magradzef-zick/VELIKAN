import { useLanguage } from '../i18n/LanguageContext'

const SIZE_RUN = ['3XL', '4XL', '5XL', '6XL', '44—50']

export default function Hero() {
  const { t } = useLanguage()
  const marqueeItems = [...SIZE_RUN, t.hero.title.toUpperCase()]

  return (
    <section id="top" className="flex min-h-svh flex-col justify-between overflow-hidden pt-16">
      <div className="mx-auto flex w-full max-w-6xl items-start justify-between gap-4 px-4 pt-8 font-mono text-xs uppercase tracking-widest text-muted sm:px-6">
        <span>{t.hero.kicker}</span>
        <span className="text-right">{SIZE_RUN.join(' · ')}</span>
      </div>

      {/* the word is set too big for the viewport on purpose — the brand is the size */}
      <h1
        className="-ml-[0.04em] select-none whitespace-nowrap font-display text-[34vw] font-bold uppercase leading-[0.9] text-bone"
      >
        {t.hero.title}
      </h1>

      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 pb-12 sm:px-6 md:grid-cols-[1fr_auto] md:items-end">
        <p className="max-w-md text-base leading-relaxed text-bone/70 sm:text-lg">{t.hero.subtitle}</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href="#catalog"
            className="bg-accent px-8 py-4 text-center font-mono text-sm font-medium uppercase tracking-wider text-ink transition-colors hover:bg-bone"
          >
            {t.hero.ctaCatalog}
          </a>
          <a
            href="https://t.me/velikan_kiyim"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-bone/25 px-8 py-4 text-center font-mono text-sm font-medium uppercase tracking-wider text-bone transition-colors hover:border-bone hover:bg-bone/5"
          >
            {t.hero.ctaTelegram}
          </a>
        </div>
      </div>

      <div aria-hidden className="overflow-hidden bg-accent py-2.5 text-ink">
        <div className="marquee-track flex w-max whitespace-nowrap font-mono text-sm font-medium uppercase tracking-widest">
          {[0, 1].map((copy) => (
            <span key={copy} className="flex">
              {Array.from({ length: 4 }, () => marqueeItems).flat().map((item, i) => (
                <span key={i} className="px-4">
                  {item} ·
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
