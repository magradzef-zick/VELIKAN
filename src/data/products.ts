import type { Locale } from '../i18n/types'

type Localized = Record<Locale, string>

export interface Product {
  id: string
  category: string
  image: string
  name: Localized
  note: Localized
  sizes: string
  /* sizes inferred from photos, no size chart provided — shown with an "approx" marker */
  approxSizes?: boolean
  price?: string
  featured?: boolean
}

export const PRODUCTS: Product[] = [
  // — костюмы и рубашки
  {
    id: 'linen-suit',
    category: 'suits',
    image: '/products/linen-suit.jpg',
    name: { ru: 'Костюм из итальянского льна', uz: "Italyan zig'iridan kostyum" },
    note: { ru: '100% лён — дышит и держит форму. Три цвета.', uz: "100% zig'ir — nafas oladi, shaklini saqlaydi. Uch rang." },
    sizes: '58–66',
    featured: true,
  },
  {
    id: 'blazer',
    category: 'suits',
    image: '/products/blazer.jpg',
    name: { ru: 'Пиджак casual', uz: 'Casual pidjak' },
    note: { ru: 'Стрейч-материал, для веса 140 кг и выше. Три цвета.', uz: 'Streych mato, 140 kg va undan yuqori vazn uchun. Uch rang.' },
    sizes: '64–72',
  },
  // — верхняя одежда
  {
    id: 'lp-set',
    category: 'outerwear',
    image: '/products/lp-set.jpg',
    name: { ru: 'Комплект Loro Piana', uz: "Loro Piana to'plami" },
    note: { ru: 'Оригинал, Италия. Всего четыре комплекта.', uz: "Original, Italiya. Bor-yo'g'i to'rtta to'plam." },
    sizes: '120–170 kg',
    price: '4 950 000',
    featured: true,
  },
  {
    id: 'bomber',
    category: 'outerwear',
    image: '/products/bomber.jpg',
    name: { ru: 'Стёганый бомбер', uz: 'Qavima bomber' },
    note: { ru: 'Плотный трикотаж, фактурная стёжка.', uz: 'Qalin trikotaj, relyefli qaviq.' },
    sizes: '3XL–7XL',
    approxSizes: true,
  },
  {
    id: 'track-jacket',
    category: 'outerwear',
    image: '/products/track-jacket.jpg',
    name: { ru: 'Олимпийка на молнии', uz: 'Molniyali olimpiyka' },
    note: { ru: 'Мягкий футер, контрастные вставки.', uz: 'Yumshoq futer, kontrast qismlar.' },
    sizes: '3XL–7XL',
    approxSizes: true,
  },
  // — футболки и комплекты
  {
    id: 'tee-terracotta',
    category: 'tshirts',
    image: '/products/tee-terracotta.jpg',
    name: { ru: 'Футболка с контрастной отделкой', uz: 'Kontrast bezakli futbolka' },
    note: { ru: 'Дышащая ткань на каждый день.', uz: 'Har kun uchun nafas oluvchi mato.' },
    sizes: '3XL–7XL',
    featured: true,
  },
  {
    id: 'summer-set',
    category: 'tshirts',
    image: '/products/summer-set.jpg',
    name: { ru: 'Комплект: футболка и шорты', uz: "To'plam: futbolka va shortik" },
    note: { ru: 'Хлопок, быстро сохнет — для моря и жары.', uz: 'Paxta, tez quriydi — dengiz va issiq uchun.' },
    sizes: '4XL–7XL',
  },
  {
    id: 'print-tees',
    category: 'tshirts',
    image: '/products/print-tees.jpg',
    name: { ru: 'Футболки с принтом', uz: 'Printli futbolkalar' },
    note: { ru: 'Четыре цвета, свободный крой.', uz: "To'rt rang, erkin bichim." },
    sizes: '4XL–8XL',
    approxSizes: true,
  },
  {
    id: 'sport-set',
    category: 'tshirts',
    image: '/products/sport-set.jpg',
    name: { ru: 'Спортивный костюм-тройка', uz: 'Sport kostyum-uchlik' },
    note: { ru: 'Жилет на молнии, футболка и брюки. Четыре цвета.', uz: "Molniyali nimcha, futbolka va shim. To'rt rang." },
    sizes: '3XL–7XL',
    approxSizes: true,
  },
  {
    id: 'summer-look',
    category: 'tshirts',
    image: '/products/summer-look.jpg',
    name: { ru: 'Летний образ: футболка и джоггеры', uz: 'Yozgi obraz: futbolka va joggerlar' },
    note: { ru: 'Футболка 3XL–6XL, джоггеры 40–50, обувь 44–46.', uz: 'Futbolka 3XL–6XL, joggerlar 40–50, poyabzal 44–46.' },
    sizes: '3XL–6XL',
  },
  // — брюки и джинсы
  {
    id: 'chinos',
    category: 'trousers',
    image: '/products/chinos.jpg',
    name: { ru: 'Брюки чинос', uz: 'Chinos shimlar' },
    note: { ru: 'Лёгкая дышащая ткань, шнурок на поясе.', uz: "Yengil mato, belida bog'ich." },
    sizes: '58–62',
  },
  {
    id: 'trousers',
    category: 'trousers',
    image: '/products/trousers.jpg',
    name: { ru: 'Брюки casual', uz: 'Casual shimlar' },
    note: { ru: 'Четыре цвета на каждый день.', uz: "Har kunga to'rt xil rang." },
    sizes: '58–66',
    approxSizes: true,
  },
  {
    id: 'jeans',
    category: 'trousers',
    image: '/products/jeans.jpg',
    name: { ru: 'Джинсы — распродажа', uz: 'Jinsilar — chegirma' },
    note: { ru: 'Последние размеры, только в магазине.', uz: "Oxirgi o'lchamlar, faqat do'konda." },
    sizes: '36–44',
    price: '250 000',
  },
  {
    id: 'plaid-shorts',
    category: 'trousers',
    image: '/products/plaid-shorts.jpg',
    name: { ru: 'Шорты в клетку', uz: 'Katak shortiklar' },
    note: { ru: 'Последние в наличии.', uz: 'Oxirgi dona.' },
    sizes: '58–60',
    price: '150 000',
  },
  // — обувь
  {
    id: 'loafers-suede',
    category: 'footwear',
    image: '/products/loafers-suede.jpg',
    name: { ru: 'Замшевые лоферы', uz: 'Zamsha loferlar' },
    note: { ru: 'Тёмно-зелёная замша, кожаная стелька.', uz: "To'q yashil zamsha, teri patak." },
    sizes: '44–46',
    featured: true,
  },
  {
    id: 'loafers-leather',
    category: 'footwear',
    image: '/products/loafers-leather.jpg',
    name: { ru: 'Кожаные лоферы', uz: 'Teri loferlar' },
    note: { ru: 'Шесть цветов в наличии.', uz: 'Oltita rang mavjud.' },
    sizes: '45–46',
    price: '1 350 000',
  },
  {
    id: 'slip-ins',
    category: 'footwear',
    image: '/products/slip-ins.jpg',
    name: { ru: 'Skechers Slip-ins', uz: 'Skechers Slip-ins' },
    note: { ru: 'Оригинал. Надеваются без рук.', uz: "Original. Qo'lsiz kiyiladi." },
    sizes: '45–48',
    price: '1 250 000',
  },
  {
    id: 'delux-walker',
    category: 'footwear',
    image: '/products/delux-walker.jpg',
    name: { ru: 'Skechers Delux Walker', uz: 'Skechers Delux Walker' },
    note: { ru: 'Оригинал, серый цвет.', uz: 'Original, kulrang.' },
    sizes: '45–47',
  },
  {
    id: 'sandals',
    category: 'footwear',
    image: '/products/sandals.jpg',
    name: { ru: 'Сандалии и шлёпанцы Skechers', uz: 'Skechers sandal va shippaklar' },
    note: { ru: 'Редкие большие размеры.', uz: "Kam uchraydigan katta o'lchamlar." },
    sizes: '46–47',
  },
]
