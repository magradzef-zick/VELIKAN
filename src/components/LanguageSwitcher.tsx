import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'
import type { Locale } from '../i18n/types'

const LANGS: Locale[] = ['ru', 'uz']

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage()

  return (
    <div
      role="group"
      aria-label="Language"
      className="relative inline-flex items-center rounded-full border border-white/10 bg-white/5 p-1 text-sm font-semibold"
    >
      {LANGS.map((lang) => {
        const active = locale === lang
        return (
          <button
            key={lang}
            type="button"
            onClick={() => setLocale(lang)}
            aria-pressed={active}
            className="relative z-10 rounded-full px-4 py-1.5 transition-colors active:scale-95"
          >
            {active && (
              <motion.span
                layoutId="lang-pill"
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-[var(--color-accent-orange)] to-[var(--color-accent-pink)]"
              />
            )}
            <span className={active ? 'text-white' : 'text-white/60'}>{lang.toUpperCase()}</span>
          </button>
        )
      })}
    </div>
  )
}
