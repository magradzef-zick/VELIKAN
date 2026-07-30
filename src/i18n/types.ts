export type Locale = 'ru' | 'uz'

export interface CatalogCategory {
  id: string
  title: string
  description: string
}

export interface Dictionary {
  meta: { title: string }
  nav: { about: string; catalog: string; whyUs: string; contact: string }
  hero: {
    kicker: string
    title: string
    subtitle: string
    ctaCatalog: string
    ctaTelegram: string
  }
  about: {
    title: string
    body: string
    addressLabel: string
    address: string
    hoursLabel: string
    hours: string
    philosophy: string
  }
  catalog: {
    title: string
    subtitle: string
    categories: CatalogCategory[]
    comingSoon: string
    allLabel: string
  }
  whyUs: {
    title: string
    items: { title: string; description: string }[]
  }
  contact: {
    title: string
    subtitle: string
    phonesLabel: string
    telegramCta: string
    hoursLabel: string
    hours: string
    addressLabel: string
    address: string
  }
  footer: {
    tagline: string
    copyright: string
  }
}
