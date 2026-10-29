'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';
import { useRef } from 'react';

type Props = { links: readonly (readonly [string, string])[] };

export function MobileNav({ links }: Props) {
  const menu = useRef<HTMLDetailsElement>(null);

  return (
    <details className="mobile-nav" ref={menu}>
      <summary aria-label="Меню навигации"><Menu size={22} aria-hidden="true" /><span>Меню</span></summary>
      <nav aria-label="Мобильная навигация">
        {links.map(([label, href]) => (
          <Link key={href} href={href} onClick={() => { if (menu.current) menu.current.open = false; }}>{label}</Link>
        ))}
      </nav>
    </details>
  );
}
