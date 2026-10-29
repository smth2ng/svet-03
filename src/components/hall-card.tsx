import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { formatPrice, type Hall } from '@/data/rooms';

export function HallCard({ hall }: { hall: Hall }) {
  const cover = hall.gallery[0];

  return (
    <article className="room">
      <Link className="hall-card-link" href={`/halls/${hall.slug}`}>
        <div className="room-image">
          <Image src={cover.src} alt={cover.alt} fill sizes="(max-width: 760px) 100vw, 33vw" />
        </div>
        <div className="room-title">
          <h3><span>{hall.number} /</span> {hall.name}</h3>
          <span className="room-price">{formatPrice(hall.hourlyRate)} ₽<small>/ час</small></span>
        </div>
        <p className="room-description">{hall.description}</p>
        <div className="room-specs">
          <span>{hall.area} м²</span>
          <span>До {hall.capacity} человек</span>
          <span>От 2 часов</span>
        </div>
        <span className="hall-card-action">Смотреть зал <ArrowUpRight size={18} aria-hidden="true" /></span>
      </Link>
    </article>
  );
}
