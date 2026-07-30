import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import type { Product } from '../data/products'
import { useLanguage } from '../i18n/LanguageContext'

const ProductCard = forwardRef<HTMLDivElement, { product: Product }>(function ProductCard({ product }, ref) {
  const { locale, t } = useLanguage()

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
      <div className="relative aspect-[4/5] overflow-hidden border border-bone/10 bg-ink-raised">
        <img
          src={product.image}
          alt={product.name[locale]}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {product.price && (
          <span className="absolute left-0 top-4 bg-accent px-3 py-1.5 font-mono text-xs font-medium tracking-wider text-ink">
            {product.price} {t.shop.currency}
          </span>
        )}
      </div>
      <div className="mt-3">
        <h3 className="font-display text-lg font-semibold uppercase leading-tight tracking-wide text-bone">
          {product.name[locale]}
        </h3>
        <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-muted">
          {t.shop.sizesLabel}: {product.sizes}
          {product.approxSizes && ` (≈ ${t.shop.approxNote})`}
        </p>
        <p className="mt-1.5 text-sm text-bone/60">{product.note[locale]}</p>
      </div>
    </motion.div>
  )
})

export default ProductCard
