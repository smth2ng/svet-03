import { NextRequest, NextResponse } from "next/server";
import { configured, database } from "@/lib/supabase";
import { validateBooking } from "@/lib/booking";
export async function GET(req: NextRequest) {
  if (!configured())
    return NextResponse.json(
      { error: "Расписание пока не подключено." },
      { status: 503 },
    );
  const date = req.nextUrl.searchParams.get("date") || "";
  const slug = req.nextUrl.searchParams.get("hall") || "";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date))
    return NextResponse.json({ error: "Некорректная дата." }, { status: 400 });
  const db = await database();
  const { data, error } = await db.rpc("availability", {
    hall_slug: slug,
    day: date,
  });
  return error
    ? NextResponse.json(
        { error: "Не удалось загрузить расписание." },
        { status: 503 },
      )
    : NextResponse.json(data, { headers: { "Cache-Control": "no-store" } });
}
export async function POST(req: NextRequest) {
  if (req.headers.get("origin") !== req.nextUrl.origin)
    return NextResponse.json(
      { error: "Недопустимый запрос." },
      { status: 403 },
    );
  if (!configured())
    return NextResponse.json(
      { error: "Бронирование пока не подключено." },
      { status: 503 },
    );
  try {
    if (Number(req.headers.get("content-length")) > 2048) throw new Error();
    const input = await req.json();
    validateBooking(input);
    const db = await database();
    const { data, error } = await db.rpc("create_demo_booking", {
      hall_slug: input.hall,
      day: input.date,
      start_hour: input.start,
      hours: input.duration,
    });
    if (error)
      return NextResponse.json(
        {
          error:
            error.code === "23P01"
              ? "Этот интервал уже занят. Выберите другое время."
              : error.code === "P0001"
                ? "Слишком много заявок или недопустимый интервал. Повторите позже."
                : "Не удалось создать заявку.",
          conflict: error.code === "23P01",
        },
        { status: error.code === "23P01" ? 409 : 400 },
      );
    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json(
      {
        error:
          "Проверьте дату и интервал: от 2 часов, 10:00–22:00, только будущее время.",
      },
      { status: 400 },
    );
  }
}
