import Link from "next/link";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Администратор — СВЕТ / 03",
  robots: { index: false, follow: false },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main id="main" className="shell section">
      <Link href="/">СВЕТ / 03</Link>
      {children}
    </main>
  );
}
