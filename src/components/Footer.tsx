import { useLanguage } from '../i18n/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-white/5 px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-white/50 sm:flex-row">
        <span className="font-[var(--font-display)] font-bold text-white">{t.footer.tagline}</span>
        <a href="https://t.me/velikan_kiyim" target="_blank" rel="noopener noreferrer" className="transition hover:text-white">
          Telegram
        </a>
        <span>{t.footer.copyright}</span>
      </div>
    </footer>
  )
}
