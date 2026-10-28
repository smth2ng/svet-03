import { ArrowUpRight, Menu } from 'lucide-react';
const links = [['Залы', '#rooms'], ['О студии', '#about'], ['Как забронировать', '#booking'], ['Контакты', '#contacts']] as const;
export function Header() {
  return <header className="site-header shell">
    <a href="#top" className="logo" aria-label="СВЕТ / 03 — на главную">СВЕТ <span>/ 03</span></a>
    <nav className="desktop-nav" aria-label="Основная навигация">{links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
    <a className="header-cta" href="#rooms">Выбрать зал <ArrowUpRight size={16}/></a>
    <details className="mobile-nav"><summary aria-label="Открыть меню"><Menu size={22}/><span>Меню</span></summary><nav aria-label="Мобильная навигация">{links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav></details>
  </header>;
}
