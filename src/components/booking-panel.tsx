"use client";
import { useEffect, useState } from "react";
import { formatPrice } from "@/data/rooms";

type Slot = { start_at: string; end_at: string };
type Receipt = Slot & { id: string; total_price: number; status: string };
export function BookingPanel({ slug, rate }: { slug: string; rate: number }) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(timer);
  }, []);
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Moscow",
  }).format(new Date());
  const [date, setDate] = useState(today),
    [start, setStart] = useState(10),
    [duration, setDuration] = useState(2),
    [slots, setSlots] = useState<Slot[]>([]),
    [ready, setReady] = useState(false),
    [error, setError] = useState(""),
    [review, setReview] = useState(false),
    [busy, setBusy] = useState(false),
    [receipt, setReceipt] = useState<Receipt | null>(null),
    [refresh, setRefresh] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/bookings?hall=${slug}&date=${date}`, {
      signal: controller.signal,
    })
      .then(async (r) => {
        const data = await r.json();
        if (!r.ok) throw new Error(data.error);
        setSlots(data);
        setReady(true);
      })
      .catch((e) => {
        if (e.name !== "AbortError") setError(e.message);
      });
    return () => controller.abort();
  }, [date, slug, refresh]);
  function available(hour: number, length: number) {
    const s = +new Date(`${date}T${String(hour).padStart(2, "0")}:00:00+03:00`),
      e = s + length * 3600000;
    return (
      s > now &&
      hour + length <= 22 &&
      !slots.some((b) => s < +new Date(b.end_at) && +new Date(b.start_at) < e)
    );
  }
  async function submit() {
    setBusy(true);
    setError("");
    try {
      const r = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hall: slug, date, start, duration }),
      });
      const data = await r.json();
      if (!r.ok) {
        setReady(false);
        setReview(false);
        setRefresh((x) => x + 1);
        throw new Error(data.error);
      }
      setReceipt(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Ошибка сети.");
    } finally {
      setBusy(false);
    }
  }
  if (receipt)
    return (
      <section className="booking-placeholder" aria-live="polite">
        <h3>Заявка создана</h3>
        <p>Номер: {receipt.id}</p>
        <p>
          {slug.toUpperCase()} · {date} · {start}:00–{start + duration}:00 ·{" "}
          {duration} ч
        </p>
        <p>{formatPrice(receipt.total_price)} ₽</p>
        <p>Ожидает подтверждения администратора. Это тестовая заявка.</p>
        <button
          className="button"
          onClick={() => {
            setReady(false);
            setReceipt(null);
            setRefresh((x) => x + 1);
          }}
        >
          Вернуться к расписанию
        </button>
      </section>
    );
  return (
    <section className="booking-placeholder">
      <h3>Выбрать время</h3>
      <p>Только тестовые заявки. Реальные услуги не оказываются.</p>
      <label>
        Дата съёмки
        <input
          type="date"
          min={today}
          value={date}
          onChange={(e) => {
            setReady(false);
            setError("");
            setReview(false);
            setDate(e.target.value);
          }}
        />
      </label>
      <p>Москва · 10:00–22:00 · от 2 часов</p>
      {!ready && !error && <p role="status">Загрузка расписания…</p>}
      <div className="hour-grid" aria-label="Расписание по часам">
        {Array.from({ length: 12 }, (_, i) => i + 10).map((h) => (
          <span key={h} className={ready && !available(h, 1) ? "occupied" : ready && h >= start && h < start + duration && available(start, duration) ? "selected" : ""}>
            {h}:00 {ready ? (available(h, 1) ? "свободно" : "недоступно") : "—"}
          </span>
        ))}
      </div>
      <label>
        Начало
        <select
          value={start}
          onChange={(e) => {
            setStart(+e.target.value);
            setReview(false);
          }}
        >
          {Array.from({ length: 11 }, (_, i) => i + 10).map((h) => (
            <option
              key={h}
              value={h}
              disabled={!ready || !available(h, duration)}
            >
              {h}:00
            </option>
          ))}
        </select>
      </label>
      <label>
        Длительность
        <select
          value={duration}
          onChange={(e) => {
            setDuration(+e.target.value);
            setReview(false);
          }}
        >
          {Array.from({ length: 11 }, (_, i) => i + 2).map((h) => (
            <option key={h} value={h}>
              {h} ч
            </option>
          ))}
        </select>
      </label>
      <p>
        Расчёт: {formatPrice(rate * duration)} ₽. Итог проверяется сервером.
      </p>
      {error && <p role="alert">{error}</p>}
      {ready && !available(start, duration) && (
        <p>Выберите свободный интервал от двух часов.</p>
      )}
      {review ? (
        <div>
          <h3>Тестовая заявка</h3>
          <p>
            {slug.toUpperCase()} · {date} · {start}:00–{start + duration}:00 ·{" "}
            {duration} ч · {formatPrice(rate * duration)} ₽
          </p>
          <p>
            Имя: Тестовый гость
            <br />
            Телефон: +7 (000) 000-00-00 — не сохраняется.
          </p>
          <p>Не вводите настоящие персональные данные.</p>
          <button
            className="button"
            disabled={busy || !ready || !available(start, duration)}
            onClick={submit}
          >
            {busy ? "Отправка…" : "Отправить тестовую заявку"}
          </button>
        </div>
      ) : (
        <button
          className="button"
          disabled={!ready || !available(start, duration)}
          onClick={() => setReview(true)}
        >
          К заявке
        </button>
      )}
    </section>
  );
}
