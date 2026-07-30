import { useLanguage } from '../i18n/LanguageContext'

export default function About() {
  const { t } = useLanguage()

  return (
    <section id="about" className="mx-auto max-w-4xl px-4 py-24 sm:px-6">
      <h2 className="font-[var(--font-display)] text-3xl font-bold sm:text-4xl">{t.about.title}</h2>
      <p className="mt-6 text-lg text-white/70">{t.about.body}</p>
      <p className="mt-4 text-lg font-semibold text-gradient">{t.about.philosophy}</p>
      <dl className="mt-10 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <dt className="text-sm font-semibold uppercase tracking-wide text-white/50">{t.about.addressLabel}</dt>
          <dd className="mt-2 text-white/90">{t.about.address}</dd>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <dt className="text-sm font-semibold uppercase tracking-wide text-white/50">{t.about.hoursLabel}</dt>
          <dd className="mt-2 text-white/90">{t.about.hours}</dd>
        </div>
      </dl>
    </section>
  )
}
