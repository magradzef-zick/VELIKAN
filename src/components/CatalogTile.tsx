import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import type { CatalogCategory } from '../i18n/types'
import { useLanguage } from '../i18n/LanguageContext'

const TILE_THEMES: Record<string, { block: string; ghost: string }> = {
  outerwear: { block: 'bg-bone text-ink', ghost: 'tile-ghost-on-bone' },
  suits: { block: 'border border-bone/10 bg-ink-raised text-bone', ghost: 'tile-ghost-on-ink' },
  footwear: { block: 'bg-bone text-ink', ghost: 'tile-ghost-on-bone' },
  underwear: { block: 'border border-bone/10 bg-ink-raised text-bone', ghost: 'tile-ghost-on-ink' },
}

const CatalogTile = forwardRef<HTMLDivElement, { category: CatalogCategory }>(function CatalogTile(
  { category },
  ref,
) {
  const { t } = useLanguage()
  const theme = TILE_THEMES[category.id] ?? TILE_THEMES.outerwear

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25 }}
      className="group"
    >
      {/* photo placeholder — replace this block's contents with
          <img className="absolute inset-0 h-full w-full object-cover" /> when real photos arrive */}
      <div className={`relative flex aspect-[4/5] flex-col justify-end overflow-hidden p-5 ${theme.block}`}>
        <span
          aria-hidden
          className={`tile-ghost ${theme.ghost} absolute left-4 top-4 whitespace-nowrap font-display text-8xl font-bold uppercase leading-[0.85] transition-transform duration-300 group-hover:translate-x-[-0.5rem]`}
        >
          {category.title}
        </span>
        <span className="self-start border border-dashed border-current px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest opacity-70">
          {t.catalog.comingSoon}
        </span>
      </div>
      <div className="mt-3">
        <h3 className="font-display text-xl font-semibold uppercase tracking-wide text-bone">{category.title}</h3>
        <p className="mt-1 text-sm text-muted">{category.description}</p>
      </div>
    </motion.div>
  )
})

export default CatalogTile
