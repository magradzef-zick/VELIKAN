import { Fragment } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'
import type { Locale } from '../i18n/types'

const LANGS: Locale[] = ['ru', 'uz']

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage()

  return (
    <div role="group" aria-label="Language" className="flex items-center font-mono text-sm uppercase tracking-wider">
      {LANGS.map((lang, i) => {
        const active = locale === lang
        return (
          <Fragment key={lang}>
            {i > 0 && <span className="px-1 text-muted/50">/</span>}
            <button
              type="button"
              onClick={() => setLocale(lang)}
              aria-pressed={active}
              className="relative px-1.5 py-1"
            >
              <span className={active ? 'text-accent' : 'text-muted transition-colors hover:text-bone'}>
                {lang.toUpperCase()}
              </span>
              {active && (
                <motion.span
                  layoutId="lang-underline"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  className="absolute inset-x-1 bottom-0 h-px bg-accent"
                />
              )}
            </button>
          </Fragment>
        )
      })}
    </div>
  )
}
