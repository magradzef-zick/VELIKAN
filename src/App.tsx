import { LanguageProvider } from './i18n/LanguageContext'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Catalog from './components/Catalog'
import WhyUs from './components/WhyUs'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <LanguageProvider>
      <Header />
      <main>
        <Hero />
        <About />
        <Catalog />
        <WhyUs />
        <Contact />
      </main>
      <Footer />
    </LanguageProvider>
  )
}
