import { useEffect, useState } from 'react'
import { LanguageProvider } from './i18n/LanguageContext'
import Header from './components/Header'
import Hero from './components/Hero'
import CatalogPreview from './components/CatalogPreview'
import CatalogPage from './components/CatalogPage'
import About from './components/About'
import WhyUs from './components/WhyUs'
import Contact from './components/Contact'
import Footer from './components/Footer'

/* ponytail: two views only — a hash mini-router beats a router dependency
   and keeps the static build host-agnostic (no rewrite rules needed) */
function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash)
  useEffect(() => {
    const onChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return hash
}

export default function App() {
  const hash = useHashRoute()
  const isCatalog = hash.startsWith('#/catalog')

  useEffect(() => {
    if (isCatalog) {
      window.scrollTo(0, 0)
      return
    }
    /* returning from the catalog page to an anchor (#about etc.): the target
       element only exists after home re-renders, so scroll manually */
    const id = hash.replace('#', '')
    if (id && !id.startsWith('/')) {
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView())
    } else {
      window.scrollTo(0, 0)
    }
  }, [hash, isCatalog])

  return (
    <LanguageProvider>
      <Header />
      {isCatalog ? (
        <CatalogPage />
      ) : (
        <main>
          <Hero />
          <CatalogPreview />
          <WhyUs />
          <About />
          <Contact />
        </main>
      )}
      <Footer />
    </LanguageProvider>
  )
}
