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
                  <a href={`tel:${phone}`} className="text-lg font-semibold text-white transition hover:text-gradient">
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
            className="inline-block rounded-full bg-gradient-to-r from-[var(--color-accent-orange)] to-[var(--color-accent-pink)] px-8 py-3 font-semibold text-white transition hover:brightness-110 active:scale-95"
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
