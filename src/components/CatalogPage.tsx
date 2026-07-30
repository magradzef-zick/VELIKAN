import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'
import { PRODUCTS } from '../data/products'
import ProductCard from './ProductCard'
import CatalogTile from './CatalogTile'

export default function CatalogPage() {
  const { t } = useLanguage()
  const [active, setActive] = useState<string>('all')

  const products = active === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.category === active)
  /* categories with no photographed products yet keep the ghost placeholder tile */
  const emptyCategories = t.catalog.categories.filter(
    (c) => (active === 'all' || active === c.id) && !PRODUCTS.some((p) => p.category === c.id),
  )
  const tabs = [{ id: 'all', title: t.catalog.allLabel }, ...t.catalog.categories]

  return (
    <main className="min-h-svh pt-16">
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h1 className="font-display text-5xl font-semibold uppercase leading-none text-bone sm:text-7xl">
            {t.catalog.title}
          </h1>
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

        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            {emptyCategories.map((category) => (
              <CatalogTile key={category.id} category={category} />
            ))}
          </AnimatePresence>
        </div>
      </section>
    </main>
  )
}
