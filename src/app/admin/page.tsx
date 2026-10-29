export const dynamic = "force-dynamic";
import { redirect } from "next/navigation";
import { database, isAdmin } from "@/lib/supabase";
import { logout, updateBooking, clearBookings } from "./actions";
import { formatPrice } from "@/data/rooms";
export default async function Admin({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; error?: string }>;
}) {
  if (!(await isAdmin())) redirect("/admin/login");
  const params = await searchParams;
  const db = await database();
  let query = db
    .from("bookings")
    .select("*,halls(name)")
    .order("created_at", { ascending: false })
    .limit(100);
  if (["pending", "confirmed", "rejected"].includes(params.status || ""))
    query = query.eq("status", params.status!);
  const { data, error } = await query;
  const time = (s: string) =>
    new Intl.DateTimeFormat("ru-RU", {
      timeZone: "Europe/Moscow",
      dateStyle: "short",
      timeStyle: "short",
    }).format(new Date(s));
  return (
    <>
      <h1 className="page-title">Заявки</h1>
      <form action={logout}>
        <button className="button">Выйти</button>
      </form>
      <nav className="admin-filters">
        {["all", "pending", "confirmed", "rejected"].map((s) => (
          <a key={s} href={`/admin?status=${s}`}>
            {s === "all" ? "Все" : s}
          </a>
        ))}
      </nav>
      {(error || params.error) && (
        <p role="alert">Операция не выполнена. Обновите список и повторите.</p>
      )}
      {!error && !data?.length && <p>Заявок нет.</p>}
      <div className="admin-list">
        {data?.map((b) => (
          <article key={b.id}>
            <h2>{b.halls?.name}</h2>
            <p>№ {b.id}</p>
            <p>
              {time(b.start_at)} — {time(b.end_at)} (Москва)
            </p>
            <p>
              {(+new Date(b.end_at) - +new Date(b.start_at)) / 3600000} ч ·{" "}
              {formatPrice(b.total_price)} ₽ · {b.status}
            </p>
            <details>
              <summary>Подробности</summary>
              <p>
                {b.demo_client_name} · Создана {time(b.created_at)}
              </p>
            </details>
            {b.status === "pending" && (
              <form action={updateBooking}>
                <input type="hidden" name="id" value={b.id} />
                <button name="status" value="confirmed">
                  Подтвердить
                </button>
                <button name="status" value="rejected">
                  Отклонить
                </button>
              </form>
            )}
          </article>
        ))}
      </div>
      <form action={clearBookings}>
        <h2>Сброс деморасписания</h2>
        <p>Все тестовые заявки будут удалены без возможности восстановления.</p>
        <label>
          Для подтверждения введите DELETE
          <input name="confirm" required pattern="DELETE" autoComplete="off" />
        </label>
        <button className="button">Удалить все тестовые заявки</button>
      </form>
    </>
  );
}
