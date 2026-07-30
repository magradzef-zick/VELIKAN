import { useLanguage } from '../i18n/LanguageContext'
import CareLabel from './CareLabel'

const PHONES = ['+998977479776', '+998974544898', '+998983659299']
const MAP_QUERY = encodeURIComponent('Tashkent, Yunusabad, Osiyo street 85')

export default function Contact() {
  const { t } = useLanguage()

  return (
    <section id="contact" className="border-t border-bone/10">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-5xl font-semibold uppercase leading-none text-bone sm:text-7xl">
            {t.contact.title}
          </h2>
          <p className="mb-1 max-w-xs text-sm text-muted">{t.contact.subtitle}</p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <div className="space-y-10">
            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-muted">{t.contact.phonesLabel}</h3>
              <ul className="mt-4 space-y-1">
                {PHONES.map((phone) => (
                  <li key={phone}>
                    <a
                      href={`tel:${phone}`}
                      className="font-display text-3xl font-semibold tracking-wide text-bone transition-colors hover:text-accent sm:text-5xl"
                    >
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
              className="inline-block bg-accent px-8 py-4 font-mono text-sm font-medium uppercase tracking-wider text-ink transition-colors hover:bg-bone"
            >
              {t.contact.telegramCta}
            </a>

            <dl className="grid gap-4 sm:grid-cols-2">
              <CareLabel label={t.contact.hoursLabel} value={t.contact.hours} />
              <CareLabel label={t.contact.addressLabel} value={t.contact.address} />
            </dl>
          </div>

          <iframe
            title="VELIKAN — map"
            src={`https://maps.google.com/maps?q=${MAP_QUERY}&output=embed`}
            className="map-dark h-80 w-full border border-bone/10 lg:h-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  )
}
