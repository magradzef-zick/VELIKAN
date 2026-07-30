import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import type { CatalogCategory } from '../i18n/types'
import { useLanguage } from '../i18n/LanguageContext'

const GRADIENTS: Record<string, string> = {
  outerwear: 'from-orange-500/40 via-[var(--color-ink)] to-pink-600/30',
  suits: 'from-pink-600/40 via-[var(--color-ink)] to-orange-500/30',
  footwear: 'from-orange-400/40 via-[var(--color-ink)] to-pink-500/30',
  underwear: 'from-pink-500/40 via-[var(--color-ink)] to-orange-400/30',
}

const CatalogTile = forwardRef<HTMLDivElement, { category: CatalogCategory }>(function CatalogTile(
  { category },
  ref,
) {
  const { t } = useLanguage()

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25 }}
      className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:border-white/20"
    >
      <div
        className={`flex h-40 items-center justify-center bg-gradient-to-br ${GRADIENTS[category.id] ?? GRADIENTS.outerwear} text-xs font-semibold uppercase tracking-wide text-white/50`}
      >
        {t.catalog.comingSoon}
      </div>
      <div className="p-5">
        <h3 className="font-[var(--font-display)] text-lg font-bold">{category.title}</h3>
        <p className="mt-2 text-sm text-white/60">{category.description}</p>
      </div>
    </motion.div>
  )
})

export default CatalogTile
