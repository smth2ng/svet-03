"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { configured, database, isAdmin } from "@/lib/supabase";
export async function login(form: FormData) {
  if (!configured()) redirect("/admin/login?error=config");
  const db = await database();
  const { error } = await db.auth.signInWithPassword({
    email: String(form.get("email")),
    password: String(form.get("password")),
  });
  if (error || !(await isAdmin())) {
    await db.auth.signOut();
    redirect("/admin/login?error=auth");
  }
  redirect("/admin");
}
export async function logout() {
  const db = await database();
  await db.auth.signOut();
  redirect("/admin/login");
}
export async function updateBooking(form: FormData) {
  if (!(await isAdmin())) redirect("/admin/login");
  const db = await database();
  const { error } = await db.rpc("change_booking", {
    booking_id: String(form.get("id")),
    new_status: String(form.get("status")),
  });
  if (error) redirect("/admin?error=update");
  revalidatePath("/admin");
}
export async function clearBookings(form: FormData) {
  if (!(await isAdmin())) redirect("/admin/login");
  if (form.get("confirm") !== "DELETE") redirect("/admin?error=confirm");
  const db = await database();
  const { error } = await db.rpc("clear_demo_bookings");
  if (error) redirect("/admin?error=clear");
  revalidatePath("/admin");
}
