import { useLanguage } from '../i18n/LanguageContext'

export default function WhyUs() {
  const { t } = useLanguage()

  return (
    <section id="why-us" className="border-t border-bone/10">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">{t.whyUs.title}</p>
        <div className="mt-10">
          {t.whyUs.items.map((item) => (
            <div
              key={item.title}
              className="group grid gap-3 border-t border-bone/10 py-8 last:border-b md:grid-cols-12 md:items-baseline"
            >
              <h3 className="font-display text-2xl font-semibold uppercase leading-tight text-bone transition-colors group-hover:text-accent sm:text-4xl md:col-span-7">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-bone/60 md:col-span-5">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
