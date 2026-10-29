import type { Metadata } from 'next';
import { HallCard } from '@/components/hall-card';
import { rooms } from '@/data/rooms';

export const metadata: Metadata = {
  title: 'Наши пространства — СВЕТ / 03',
  description: 'Три характера для вашей съёмки: DAYLIGHT, BLANK и FORM. Площадь, оборудование и стоимость аренды в демонстрационной фотостудии СВЕТ / 03.',
};

export default function HallsPage() {
  return (
    <div className="shell halls-catalog">
      <header className="catalog-heading">
        <p className="eyebrow">СВЕТ / 03 — ПРОСТРАНСТВА</p>
        <h1 className="page-title">Наши пространства</h1>
        <p className="page-description">Три зала, три разных настроения. Дневной свет, белая циклорама и интерьерные формы — найдите пространство для вашей истории.</p>
      </header>
      <section aria-label="Каталог залов">
        <div className="room-grid">{rooms.map((hall) => <HallCard key={hall.slug} hall={hall} />)}</div>
      </section>
      <p className="catalog-note">СВЕТ / 03 — вымышленная московская фотостудия. Изображения — временные авторские иллюстрации. Реальные услуги не оказываются; бронирование пока недоступно.</p>
    </div>
  );
}
