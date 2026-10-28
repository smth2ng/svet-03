import type { Metadata } from 'next';
import '@fontsource-variable/onest';
import '@fontsource/ibm-plex-mono/400.css';
import './globals.css';
export const metadata: Metadata = {
  title: 'СВЕТ / 03 — пространство для съёмок',
  description: 'Демонстрационный сайт фотостудии: три пространства для съёмок, творчества и экспериментов со светом. Портфолио-проект, реальные услуги не оказываются.',
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body><a className="skip-link" href="#main">Перейти к содержимому</a>{children}</body></html>;
}
