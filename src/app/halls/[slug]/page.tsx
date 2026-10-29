import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HallPage } from '@/components/hall-page';
import { getHall, rooms } from '@/data/rooms';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return rooms.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const hall = getHall((await params).slug);
  if (!hall) notFound();
  return {
    title: `${hall.name} — зал ${hall.area} м² — СВЕТ / 03`,
    description: `${hall.description}. ${hall.introduction} Демонстрационный проект, реальные услуги не оказываются.`,
  };
}

export default async function HallRoute({ params }: Props) {
  const hall = getHall((await params).slug);
  if (!hall) notFound();
  return <HallPage hall={hall} />;
}
