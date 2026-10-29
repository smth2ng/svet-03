import { login } from "../actions";
export default async function Login({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <>
      <h1 className="page-title">Вход администратора</h1>
      {error && (
        <p role="alert">
          Вход недоступен. Проверьте данные и настройку Supabase.
        </p>
      )}
      <form action={login}>
        <label>
          Email
          <input
            name="email"
            type="email"
            required
            autoComplete="username"
            maxLength={254}
          />
        </label>
        <label>
          Пароль
          <input
            name="password"
            type="password"
            required
            autoComplete="current-password"
            maxLength={256}
          />
        </label>
        <button className="button">Войти</button>
      </form>
    </>
  );
}
