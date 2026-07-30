import { useLanguage } from '../i18n/LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'

export default function Header() {
  const { t } = useLanguage()

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-bone/10 bg-ink/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#top" className="flex items-baseline gap-2">
          <span aria-hidden className="inline-block h-2.5 w-2.5 self-center bg-accent" />
          <span className="font-display text-xl font-semibold uppercase leading-none tracking-wide text-bone">
            Velikan
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-muted sm:inline">
            king size store
          </span>
        </a>
        <nav className="hidden gap-6 font-mono text-xs uppercase tracking-widest text-muted md:flex">
          <a href="#about" className="transition-colors hover:text-bone">
            {t.nav.about}
          </a>
          <a href="#catalog" className="transition-colors hover:text-bone">
            {t.nav.catalog}
          </a>
          <a href="#why-us" className="transition-colors hover:text-bone">
            {t.nav.whyUs}
          </a>
          <a href="#contact" className="transition-colors hover:text-bone">
            {t.nav.contact}
          </a>
        </nav>
        <LanguageSwitcher />
      </div>
    </header>
  )
}
