import { ArrowUpRight } from 'lucide-react';
export function Footer() {
  return <footer id="contacts" className="footer"><div className="shell">
    <div className="footer-top"><div><p className="eyebrow">04 / НА СВЯЗИ</p><h2>Место для вашей<br/>следующей идеи.</h2></div><a className="button button-light" href="#rooms">Посмотреть залы <ArrowUpRight size={18}/></a></div>
    <div className="footer-details"><a className="logo" href="#top">СВЕТ <span>/ 03</span></a><p>Москва · вымышленная фотостудия<br/><span>10:00–22:00 / московское время</span></p><p>Портфолио-проект<br/><span>Реальные услуги не оказываются</span></p></div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} СВЕТ / 03</span><span>ПРОСТРАНСТВО ДЛЯ ТВОРЧЕСТВА</span><a href="#top">Наверх ↑</a></div>
  </div></footer>;
}
