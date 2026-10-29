export function validateBooking(
  input: { date: string; start: number; duration: number },
  now = Date.now(),
) {
  const { date, start, duration } = input;
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
    !Number.isInteger(start) ||
    !Number.isInteger(duration) ||
    duration < 2 ||
    start < 10 ||
    start + duration > 22
  )
    throw new Error("Выберите интервал от 2 часов в пределах 10:00–22:00.");
  const begin = new Date(
    `${date}T${String(start).padStart(2, "0")}:00:00+03:00`,
  );
  if (
    !Number.isFinite(+begin) ||
    begin.toISOString().slice(0, 10) !== date ||
    +begin <= now
  )
    throw new Error("Нельзя бронировать в прошлом.");
  return {
    start_at: begin.toISOString(),
    end_at: new Date(+begin + duration * 3600000).toISOString(),
  };
}
export function overlaps(a: number, b: number, c: number, d: number) {
  return a < d && c < b;
}
