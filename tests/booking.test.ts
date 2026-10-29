import { test } from "node:test";
import assert from "node:assert/strict";
import { validateBooking, overlaps } from "../src/lib/booking.ts";
const valid = { date: "2030-01-02", start: 10, duration: 2 };
test("minimum two hours", () =>
  assert.throws(() => validateBooking({ ...valid, duration: 1 })));
test("Moscow conversion and duration", () =>
  assert.deepEqual(validateBooking(valid), {
    start_at: "2030-01-02T07:00:00.000Z",
    end_at: "2030-01-02T09:00:00.000Z",
  }));
test("working hours and integer slots", () => {
  for (const input of [
    { ...valid, start: 9 },
    { ...valid, start: 21 },
    { ...valid, duration: 2.5 },
  ])
    assert.throws(() => validateBooking(input));
});
test("past prohibited", () =>
  assert.throws(() => validateBooking({ ...valid, date: "2020-01-01" })));
test("overlap and adjacency", () => {
  assert(overlaps(10, 12, 11, 13));
  assert(!overlaps(10, 12, 12, 14));
});
test("invalid calendar date", () =>
  assert.throws(() => validateBooking({ ...valid, date: "2030-02-30" })));
