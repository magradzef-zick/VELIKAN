import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Dictionary, Locale } from './types'
import { ru } from './ru'
import { uz } from './uz'

const STORAGE_KEY = 'velikan-lang'
const dictionaries: Record<Locale, Dictionary> = { ru, uz }

function readInitialLocale(): Locale {
  if (typeof window === 'undefined') return 'ru'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  return stored === 'ru' || stored === 'uz' ? stored : 'ru'
}

interface LanguageContextValue {
  locale: Locale
  t: Dictionary
  setLocale: (locale: Locale) => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readInitialLocale)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, locale)
    document.documentElement.lang = locale
    document.title = dictionaries[locale].meta.title
  }, [locale])

  return (
    <LanguageContext.Provider value={{ locale, t: dictionaries[locale], setLocale: setLocaleState }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
