export type HallImage = {
  src: string;
  alt: string;
  caption: string;
};

export type Hall = {
  slug: string;
  number: string;
  name: string;
  description: string;
  introduction: string;
  area: number;
  capacity: number;
  hourlyRate: number;
  equipment: readonly string[];
  gallery: readonly HallImage[];
};

export const rooms: readonly Hall[] = [
  {
    slug: 'daylight', number: '01', name: 'DAYLIGHT',
    description: 'Естественный свет', area: 65, capacity: 8, hourlyRate: 2200,
    introduction: 'Большие окна, мягкий дневной свет и спокойная тёплая палитра. Пространство для портретов, предметных съёмок и небольших творческих команд.',
    equipment: ['Отражатель и флаг', 'Стойки для света — 2 шт.', 'Светлый тканевый фон', 'Кубы и подиумы для композиции'],
    gallery: [
      { src: '/placeholders/daylight.svg', alt: 'Иллюстрация DAYLIGHT: высокие окна, тёплый пол и геометричные объекты', caption: 'Общий вид / дневной свет' },
      { src: '/placeholders/daylight-detail.svg', alt: 'Иллюстрация DAYLIGHT: окно и подиумы в светлой зоне', caption: 'Деталь / зона у окна' },
    ],
  },
  {
    slug: 'blank', number: '02', name: 'BLANK',
    description: 'Белая циклорама', area: 70, capacity: 10, hourlyRate: 2800,
    introduction: 'Чистое пространство, в котором главным становится ваш объект. Белая циклорама подойдёт для каталогов, модных съёмок и экспериментов с искусственным светом.',
    equipment: ['Импульсные источники света — 2 шт.', 'Софтбокс и стандартный рефлектор', 'Стойки для света — 2 шт.', 'Белые предметные подиумы'],
    gallery: [
      { src: '/placeholders/blank.svg', alt: 'Иллюстрация BLANK: белая циклорама, свет и предметные подиумы', caption: 'Общий вид / белая циклорама' },
      { src: '/placeholders/blank-detail.svg', alt: 'Иллюстрация BLANK: бесшовный белый фон и подиумы', caption: 'Деталь / предметная композиция' },
    ],
  },
  {
    slug: 'form', number: '03', name: 'FORM',
    description: 'Интерьерный зал', area: 60, capacity: 8, hourlyRate: 3200,
    introduction: 'Архитектурные формы, природные оттенки и выразительные фактуры. Камерный интерьер для портретов, съёмок коллекций и визуальных историй.',
    equipment: ['Постоянный LED-свет — 2 шт.', 'Стойки для света — 2 шт.', 'Интерьерные кубы и скамья', 'Декоративные панели и текстиль'],
    gallery: [
      { src: '/placeholders/form.svg', alt: 'Иллюстрация FORM: арочная ниша и геометричная интерьерная мебель', caption: 'Общий вид / архитектурные формы' },
      { src: '/placeholders/form-detail.svg', alt: 'Иллюстрация FORM: арочная ниша и скамья в природных оттенках', caption: 'Деталь / фактуры и объекты' },
    ],
  },
];

export function getHall(slug: string): Hall | undefined {
  return rooms.find((room) => room.slug === slug);
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat('ru-RU').format(value);
}
