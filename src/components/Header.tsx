import { useLanguage } from '../i18n/LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'

export default function Header() {
  const { t } = useLanguage()

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-[var(--color-ink)]/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#top" className="font-[var(--font-display)] text-lg font-extrabold tracking-tight">
          VELI<span className="text-gradient">KAN</span>
        </a>
        <nav className="hidden gap-6 text-sm font-medium text-white/70 md:flex">
          <a href="#about" className="transition hover:text-white">
            {t.nav.about}
          </a>
          <a href="#catalog" className="transition hover:text-white">
            {t.nav.catalog}
          </a>
          <a href="#why-us" className="transition hover:text-white">
            {t.nav.whyUs}
          </a>
          <a href="#contact" className="transition hover:text-white">
            {t.nav.contact}
          </a>
        </nav>
        <LanguageSwitcher />
      </div>
    </header>
  )
}
