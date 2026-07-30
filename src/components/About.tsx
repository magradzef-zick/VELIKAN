import { useLanguage } from '../i18n/LanguageContext'
import CareLabel from './CareLabel'

export default function About() {
  const { t } = useLanguage()

  return (
    <section id="about" className="border-t border-bone/10">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="font-mono text-xs uppercase tracking-widest text-muted">{t.about.title}</p>
          <p className="font-mono text-xs uppercase tracking-widest text-accent">{t.about.since}</p>
        </div>
        <div className="mt-8 grid gap-10 lg:grid-cols-12">
          <blockquote className="font-display text-3xl font-semibold uppercase leading-[1.05] text-bone sm:text-5xl lg:col-span-7">
            {t.about.philosophy}
          </blockquote>
          <div className="space-y-8 lg:col-span-5">
            <p className="leading-relaxed text-bone/70">{t.about.body}</p>
            <dl className="space-y-4">
              <CareLabel label={t.about.addressLabel} value={t.about.address} />
              <CareLabel label={t.about.hoursLabel} value={t.about.hours} />
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
