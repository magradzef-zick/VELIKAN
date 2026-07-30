import { useLanguage } from '../i18n/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-bone/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 font-mono text-xs uppercase tracking-wider text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <span className="flex items-center gap-2 text-bone">
          <img src="/logo-mark.jpg" alt="" aria-hidden className="h-5 w-5 object-cover" />
          {t.footer.tagline}
        </span>
        <a
          href="https://t.me/velikan_kiyim"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-bone"
        >
          Telegram
        </a>
        <span>{t.footer.copyright}</span>
      </div>
      {/* bookend: the giant word again, cropped at the page's bottom edge */}
      <div aria-hidden className="h-[13vw] select-none overflow-hidden">
        <p className="text-ghost whitespace-nowrap text-center font-display text-[24vw] font-bold uppercase leading-[0.8]">
          VELIKAN
        </p>
      </div>
    </footer>
  )
}
