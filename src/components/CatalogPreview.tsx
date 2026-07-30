import { useLanguage } from '../i18n/LanguageContext'
import { PRODUCTS } from '../data/products'
import ProductCard from './ProductCard'

export default function CatalogPreview() {
  const { t } = useLanguage()
  const featured = PRODUCTS.filter((p) => p.featured)

  return (
    <section id="catalog" className="border-t border-bone/10">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-5xl font-semibold uppercase leading-none text-bone sm:text-7xl">
            {t.shop.previewTitle}
          </h2>
          <a
            href="#/catalog"
            className="mb-1 bg-accent px-6 py-3 font-mono text-sm font-medium uppercase tracking-wider text-ink transition-colors hover:bg-bone"
          >
            {t.shop.viewAll} →
          </a>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
