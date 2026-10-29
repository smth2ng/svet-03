import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="shell not-found" aria-labelledby="not-found-title">
      <p className="eyebrow">СВЕТ / 03 — 404</p>
      <h1 id="not-found-title" className="page-title">Пространство не найдено</h1>
      <p className="page-description">Возможно, адрес изменился. Познакомьтесь с тремя залами в нашем каталоге.</p>
      <Link className="button" href="/halls">Перейти к залам ↗</Link>
    </section>
  );
}
