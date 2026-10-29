import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
export function Footer() {
  return <footer id="contacts" className="footer"><div className="shell">
    <div className="footer-top"><div><p className="eyebrow">04 / НА СВЯЗИ</p><h2>Место для вашей<br/>следующей идеи.</h2></div><Link className="button button-light" href="/halls">Посмотреть залы <ArrowUpRight size={18}/></Link></div>
    <div className="footer-details"><Link className="logo" href="/">СВЕТ <span>/ 03</span></Link><p>Москва · вымышленная фотостудия<br/><span>10:00–22:00 / московское время</span></p><p>Портфолио-проект<br/><span>Реальные услуги не оказываются</span></p></div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} СВЕТ / 03</span><span>ПРОСТРАНСТВО ДЛЯ ТВОРЧЕСТВА</span><Link href="#main">Наверх ↑</Link></div>
  </div></footer>;
}
