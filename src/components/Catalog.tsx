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
    <section id="catalog" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <h2 className="font-[var(--font-display)] text-3xl font-bold sm:text-4xl">{t.catalog.title}</h2>
      <p className="mt-4 max-w-2xl text-white/60">{t.catalog.subtitle}</p>

      <div role="tablist" aria-label={t.catalog.title} className="mt-8 flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const isActive = active === tab.id
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(tab.id)}
              className="relative rounded-full px-4 py-2 text-sm font-semibold transition active:scale-95"
            >
              {isActive && (
                <motion.span
                  layoutId="catalog-tab-pill"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-[var(--color-accent-orange)] to-[var(--color-accent-pink)]"
                />
              )}
              <span className={isActive ? 'text-white' : 'text-white/60 hover:text-white'}>{tab.title}</span>
            </button>
          )
        })}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {visible.map((category) => (
            <CatalogTile key={category.id} category={category} />
          ))}
        </AnimatePresence>
      </div>
    </section>
  )
}
