import { MobileNav } from '@/components/mobile-nav';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
const links = [['Залы', '/halls'], ['О студии', '/#about'], ['Как забронировать', '/#booking'], ['Контакты', '/#contacts']] as const;
export function Header() {
  return <header className="site-header shell">
    <Link href="/" className="logo" aria-label="СВЕТ / 03 — на главную">СВЕТ <span>/ 03</span></Link>
    <nav className="desktop-nav" aria-label="Основная навигация">{links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</nav>
    <Link className="header-cta" href="/halls">Выбрать зал <ArrowUpRight size={16}/></Link>
    <MobileNav links={links} />
  </header>;
}
