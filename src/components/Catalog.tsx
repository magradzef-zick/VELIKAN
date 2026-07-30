import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'
import CatalogTile from './CatalogTile'

export default function Catalog() {
  const { t } = useLanguage()
  const [active, setActive] = useState<string>('all')

  const visible = active === 'all' ? t.catalog.categories : t.catalog.categories.filter((c) => c.id === active)
  const tabs = [{ id: 'all', title: t.catalog.allLabel }, ...t.catalog.categories]

  return (
    <section id="catalog" className="border-t border-bone/10">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-5xl font-semibold uppercase leading-none text-bone sm:text-7xl">
            {t.catalog.title}
          </h2>
          <p className="mb-1 max-w-xs text-sm text-muted">{t.catalog.subtitle}</p>
        </div>

        <div role="tablist" aria-label={t.catalog.title} className="mt-10 flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const isActive = active === tab.id
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(tab.id)}
                className="isolate relative px-4 py-2 font-mono text-xs uppercase tracking-wider transition active:scale-95"
              >
                {isActive && (
                  <motion.span
                    layoutId="catalog-tab-block"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    className="absolute inset-0 -z-10 bg-accent"
                  />
                )}
                <span className={isActive ? 'text-ink' : 'text-muted hover:text-bone'}>{tab.title}</span>
              </button>
            )
          })}
        </div>

        <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {visible.map((category) => (
              <CatalogTile key={category.id} category={category} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
