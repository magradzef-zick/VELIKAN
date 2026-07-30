import type { Dictionary } from './types'

export const uz: Dictionary = {
  meta: { title: "VELIKAN | king size store — Toshkentda katta o'lchamdagi erkaklar kiyimi va poyabzali" },
  nav: { about: 'Biz haqimizda', catalog: 'Katalog', whyUs: 'Nega biz', contact: 'Aloqa' },
  hero: {
    kicker: 'Toshkent · Yunusobod',
    title: 'VELIKAN',
    subtitle:
      "Haqiqiy katta o'lchamdagi erkaklar kiyimi va poyabzali. Moslashtirishsiz, haftalab kutishsiz — o'lchab ko'ring va bugun oling.",
    ctaCatalog: "Katalogni ko'rish",
    ctaTelegram: 'Telegram orqali yozish',
  },
  about: {
    title: "Do'kon haqida",
    body: "VELIKAN — Toshkentdagi katta o'lchamdagi erkaklar kiyimi va poyabzali do'koni. Biz oddiy do'konlarda o'z o'lchamini topa olmaydigan erkaklar uchun ishlaymiz.",
    addressLabel: 'Manzil',
    address: "Yunusobod tumani, Osiyo ko'chasi 85 (mo'ljal — «Qazaqstan» kinoteatri)",
    hoursLabel: 'Ish vaqti',
    hours: 'Dush–Shan: 11:00–19:00, Yak: 11:00–17:00',
    philosophy: "Haqiqiy katta o'lchamlar — doim mavjud, hozir va shu yerda.",
  },
  catalog: {
    title: 'Katalog',
    subtitle: "Kategoriyalar yangilanib boradi — do'kondagi assortiment saytdagidan kengroq.",
    allLabel: 'Barchasi',
    categories: [
      { id: 'outerwear', title: 'Ustki kiyim', description: "Katta o'lchamdagi kurtka, puxovik, vetrovkalar" },
      { id: 'suits', title: "Kostyum va ko'ylaklar", description: "3XL dan boshlab rasmiy va kundalik uslub" },
      { id: 'footwear', title: 'Poyabzal', description: "44 dan 50 gacha katta o'lchamlar" },
      { id: 'underwear', title: 'Ichki kiyim', description: "Katta o'lchamdagi qulay bazaviy modellar" },
    ],
    comingSoon: 'Foto tez orada',
  },
  whyUs: {
    title: 'Nega aynan VELIKAN',
    items: [
      { title: "Haqiqiy o'lchamlar doim mavjud", description: "Haftalab buyurtma kutish shart emas — katta o'lchamlar allaqachon javonda." },
      { title: "Andoza bo'yicha maslahat", description: "Ko'zga chiroyli emas, qomatga mos kiyimni tanlab beramiz." },
      { title: "Toshkent va O'zbekiston bo'ylab yetkazib berish", description: "Do'konga kelish qulay bo'lmasa, buyurtmani sizga olib boramiz." },
    ],
  },
  contact: {
    title: 'Aloqa',
    subtitle: "Qo'ng'iroq qiling, Telegram'ga yozing yoki do'konga keling.",
    phonesLabel: 'Telefonlar',
    telegramCta: 'Telegram orqali yozish',
    hoursLabel: 'Ish vaqti',
    hours: 'Dush–Shan: 11:00–19:00, Yak: 11:00–17:00',
    addressLabel: 'Manzil',
    address: "Toshkent, Yunusobod tumani, Osiyo ko'chasi 85 (mo'ljal — «Qazaqstan» kinoteatri)",
  },
  footer: {
    tagline: 'VELIKAN | king size store',
    copyright: '© ' + new Date().getFullYear().toString() + ' VELIKAN. Barcha huquqlar himoyalangan.',
  },
}
