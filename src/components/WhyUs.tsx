import { useLanguage } from '../i18n/LanguageContext'

export default function WhyUs() {
  const { t } = useLanguage()

  return (
    <section id="why-us" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <h2 className="font-[var(--font-display)] text-3xl font-bold sm:text-4xl">{t.whyUs.title}</h2>
      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {t.whyUs.items.map((item) => (
          <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-white/20">
            <h3 className="font-[var(--font-display)] text-lg font-bold text-gradient">{item.title}</h3>
            <p className="mt-3 text-sm text-white/60">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
