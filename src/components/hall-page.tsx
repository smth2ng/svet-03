import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { HallCard } from '@/components/hall-card';
import { formatPrice, rooms, type Hall } from '@/data/rooms';

export function HallPage({ hall }: { hall: Hall }) {
  return (
    <>
      <div className="shell hall-intro">
        <Link className="text-link" href="/halls"><ArrowLeft size={18} aria-hidden="true" /> Все пространства</Link>
        <p className="eyebrow">ЗАЛ {hall.number} / {hall.description}</p>
        <h1 className="page-title">{hall.name}</h1>
        <p className="page-description">{hall.introduction}</p>
      </div>
      <div className="shell hall-layout">
        <section className="hall-gallery" aria-labelledby="gallery-title">
          <h2 id="gallery-title" className="visually-hidden">Галерея {hall.name}</h2>
          {hall.gallery.map((image, index) => (
            <figure key={image.src}>
              <div className="hall-gallery-image">
                <Image src={image.src} alt={image.alt} fill priority={index === 0} sizes="(max-width: 900px) 100vw, 65vw" />
              </div>
              <figcaption><span>0{index + 1} / {image.caption}</span><span>Авторская визуализация</span></figcaption>
            </figure>
          ))}
          <p className="gallery-note">Временные авторские иллюстрации. Они передают концепцию зала и не являются фотографиями реальной студии.</p>
        </section>
        <aside className="hall-panel" aria-labelledby="hall-info-title">
          <section>
            <p className="eyebrow">ПРОСТРАНСТВО / {hall.number}</p>
            <h2 id="hall-info-title">В деталях</h2>
            <dl className="hall-facts">
              <div><dt>Площадь</dt><dd>{hall.area} м²</dd></div>
              <div><dt>Команда</dt><dd>До {hall.capacity} человек</dd></div>
              <div><dt>Характер</dt><dd>{hall.description}</dd></div>
            </dl>
          </section>
          <section className="hall-equipment" aria-labelledby="equipment-title">
            <h3 id="equipment-title">Оборудование</h3>
            <ul>{hall.equipment.map((item) => <li key={item}>{item}</li>)}</ul>
            <p className="gallery-note">Концептуальная комплектация демонстрационного зала.</p>
          </section>
          <section className="booking-placeholder" aria-labelledby="booking-info-title">
            <p className="eyebrow">АРЕНДА / УСЛОВИЯ</p>
            <h3 id="booking-info-title">{formatPrice(hall.hourlyRate)} ₽ <span>/ час</span></h3>
            <p>Минимальная аренда — 2 часа.<br />От {formatPrice(hall.hourlyRate * 2)} ₽ за съёмку.</p>
            <p>10:00–22:00 по Москве.</p>
            <div className="booking-status">
              <strong>Бронирование появится позже</strong>
              <p>Сейчас можно изучить пространства. Это демонстрационный проект: реальные услуги не оказываются, заявки не принимаются.</p>
            </div>
          </section>
        </aside>
      </div>
      <section className="section shell" aria-labelledby="other-halls-title">
        <div className="section-heading"><div><p className="eyebrow">ПРОДОЛЖИТЬ ЗНАКОМСТВО</p><h2 id="other-halls-title">Другие залы</h2></div><Link className="text-link" href="/halls">Все пространства ↗</Link></div>
        <div className="room-grid other-halls">{rooms.filter((room) => room.slug !== hall.slug).map((room) => <HallCard key={room.slug} hall={room} />)}</div>
      </section>
    </>
  );
}
