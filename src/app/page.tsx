import Image from 'next/image';
import { ArrowDown, ArrowUpRight, Sun, Scan, MoveUpRight, Clock3 } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { rooms } from '@/data/rooms';
import { assetPath } from '@/data/asset-path';
const benefits = [
  { Icon: Sun, title: 'Свет как инструмент', text: 'Большие окна и разные световые сценарии. Вы выбираете настроение кадра.' },
  { Icon: Scan, title: 'Ничего лишнего', text: 'Чистые линии и спокойная палитра. Пространство, которое оставляет место вашей идее.' },
  { Icon: MoveUpRight, title: 'Свобода масштаба', text: 'От камерного портрета до съёмки коллекции — три зала для разных задач.' },
  { Icon: Clock3, title: 'В вашем ритме', text: 'Почасовая аренда от двух часов. Время на подготовку — часть вашего бронирования.' },
];
export default function Home() {
  return <><Header/><main id="main">
    <section id="top" className="hero shell" aria-labelledby="hero-title">
      <div className="hero-copy"><p className="eyebrow"><span className="status-dot"/> ФОТОСТУДИЯ / МОСКВА</p>
        <h1 id="hero-title"><span>СВЕТ.</span><span>ФОРМА.</span><span>ПРОСТРАНСТВО.</span></h1>
        <p className="hero-description">Три зала для съёмок, творчества<br className="desktop-break"/> и экспериментов со светом</p>
        <a className="button" href="#rooms">Выбрать зал <ArrowUpRight size={18}/></a>
        <div className="hero-note"><span>03 ЗАЛА / БЕЗГРАНИЧНОСТЬ ИДЕЙ</span><ArrowDown size={17} aria-hidden="true"/></div>
      </div>
      <figure className="hero-visual"><div className="hero-image"><Image src={assetPath('/placeholders/daylight.svg')} alt="Архитектурная иллюстрация светлой студии: высокие окна, тёплый пол и геометричные объекты" fill priority sizes="(max-width: 760px) 100vw, 52vw"/></div><figcaption><span>01 / DAYLIGHT</span><span>ВИЗУАЛИЗАЦИЯ ПРОСТРАНСТВА</span></figcaption></figure>
    </section>
    <div className="intro-strip shell"><p>Меньше отвлекающего.<br/>Больше пространства для вашего взгляда.</p><span className="eyebrow">СВЕТ — НАЧАЛО КАЖДОЙ ИСТОРИИ</span></div>
    <section id="rooms" className="section shell" aria-labelledby="rooms-title"><div className="section-heading"><div><p className="eyebrow">01 / ПРОСТРАНСТВА</p><h2 id="rooms-title">Три характера.<br/>Одна свобода.</h2></div><p>Выберите пространство под свою идею.<br/>Всё остальное начинается со света.</p></div>
      <div className="room-grid">{rooms.map(room => <article className="room" key={room.number}><div className="room-image"><Image src={assetPath(room.image)} alt={room.alt} fill sizes="(max-width: 760px) 100vw, (max-width: 1000px) 50vw, 33vw"/><span className="image-label">ВИЗУАЛИЗАЦИЯ</span></div><div className="room-title"><h3><span>{room.number} /</span> {room.name}</h3><span className="room-price">{room.price} ₽<small>/ час</small></span></div><p className="room-description">{room.description}</p><div className="room-specs"><span>{room.area} м²</span><span>До {room.capacity} человек</span><span>От 2 часов</span></div></article>)}</div>
      <p className="availability-note">Страницы залов и бронирование появятся на следующих этапах. Сейчас можно познакомиться с концепцией студии.</p>
    </section>
    <section id="about" className="about-section"><div className="shell about-grid"><div><p className="eyebrow">02 / О СТУДИИ</p><div className="about-mark" aria-hidden="true">с / 03</div></div><div><h2>Хороший кадр начинается<br/>с ощущения пространства.</h2><div className="about-text"><p>СВЕТ / 03 — идея студии, в которой архитектура не спорит с человеком в кадре. Естественный свет, тактильные фактуры и простые формы становятся основой для ваших историй.</p><p>Три разных зала объединяет один подход: оставить только необходимое, чтобы вы могли сосредоточиться на главном.</p></div><p className="demo-note">Это вымышленная студия и демонстрационный проект. Изображения — авторские схематичные иллюстрации, а не фотографии реального места.</p></div></div></section>
    <section className="benefits shell" aria-label="Преимущества">{benefits.map(({Icon,title,text},i) => <article key={title}><div className="benefit-top"><Icon size={23} strokeWidth={1.3}/><span>0{i+1}</span></div><h3>{title}</h3><p>{text}</p></article>)}</section>
    <section id="booking" className="section shell booking-section" aria-labelledby="booking-title"><div className="section-heading"><div><p className="eyebrow">03 / КАК ЭТО БУДЕТ РАБОТАТЬ</p><h2 id="booking-title">От идеи —<br/>к съёмке.</h2></div><p>Простой сценарий бронирования.<br/>Без регистрации и лишних шагов.</p></div><ol className="steps">{[['Выберите зал','Посмотрите пространство и найдите подходящий свет для своей съёмки.'],['Выберите время','С 10:00 до 22:00 по Москве. Минимальная аренда — два часа.'],['Отправьте заявку','Администратор проверит детали и подтвердит выбранный интервал.']].map(([title,text],i) => <li key={title}><span className="step-number">0{i+1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol><div className="demo-banner"><span className="eyebrow">ДЕМО / ЭТАП 01</span><p>Бронирование пока недоступно. В публичной демоверсии все заявки будут тестовыми — настоящие персональные данные вводить не нужно.</p></div></section>
  </main><Footer/></>;
}
