// Run only against a disposable Supabase project with the migration applied.
import assert from "node:assert/strict";
import { createClient } from "@supabase/supabase-js";
const url = process.env.NEXT_PUBLIC_SUPABASE_URL,
  key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
if (
  !url ||
  !key ||
  !process.env.TEST_ADMIN_EMAIL ||
  !process.env.TEST_ADMIN_PASSWORD
)
  throw Error(
    "Integration tests require Supabase and disposable test administrator credentials.",
  );
const client = createClient(url, key),
  admin = createClient(url, key);
const auth = await admin.auth.signInWithPassword({
  email: process.env.TEST_ADMIN_EMAIL,
  password: process.env.TEST_ADMIN_PASSWORD,
});
assert.ifError(auth.error);
assert.equal((await admin.rpc("is_admin")).data, true);
assert.ifError((await admin.rpc("clear_demo_bookings")).error);
try {
  const day = new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10),
    args = { hall_slug: "daylight", day, start_hour: 10, hours: 2 };
  const results = await Promise.all([
    client.rpc("create_demo_booking", args),
    client.rpc("create_demo_booking", args),
  ]);
  assert.equal(results.filter((r) => !r.error).length, 1);
  assert.equal(results.find((r) => r.error).error.code, "23P01");
  const receipt = results.find((r) => !r.error).data;
  assert.equal(receipt.total_price, 4400);
  assert.equal(receipt.status, "pending");
  const read = await client.from("bookings").select("*");
  assert(read.error || read.data.length === 0);
  assert(
    (
      await client.rpc("change_booking", {
        booking_id: receipt.id,
        new_status: "confirmed",
      })
    ).error,
  );
  assert.ifError(
    (
      await admin.rpc("change_booking", {
        booking_id: receipt.id,
        new_status: "confirmed",
      })
    ).error,
  );
  assert(
    (
      await admin.rpc("change_booking", {
        booking_id: receipt.id,
        new_status: "rejected",
      })
    ).error,
  );
  const adjacent = await client.rpc("create_demo_booking", {
    ...args,
    start_hour: 12,
  });
  assert.ifError(adjacent.error);
  assert.ifError(
    (
      await admin.rpc("change_booking", {
        booking_id: adjacent.data.id,
        new_status: "rejected",
      })
    ).error,
  );
  assert.ifError(
    (await client.rpc("create_demo_booking", { ...args, start_hour: 12 }))
      .error,
  );
  console.log(
    "PASS: concurrency, database price, pending, RLS, authorization, confirmation, repeated status rejection, adjacency and released interval",
  );
} finally {
  assert.ifError((await admin.rpc("clear_demo_bookings")).error);
  await admin.auth.signOut();
}
