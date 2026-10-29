create extension if not exists btree_gist;
create table public.halls(id uuid primary key default gen_random_uuid(),slug text unique not null,name text not null,hourly_price integer not null check(hourly_price>0),is_active boolean not null default true);
insert into public.halls(slug,name,hourly_price) values ('daylight','DAYLIGHT',2200),('blank','BLANK',2800),('form','FORM',3200);
create table public.admins(user_id uuid primary key references auth.users(id) on delete cascade);
create function public.is_admin() returns boolean language sql stable security definer set search_path=public as $$ select exists(select 1 from admins where user_id=auth.uid()) $$;
create table public.bookings(
 id uuid primary key default gen_random_uuid(),hall_id uuid not null references public.halls(id),start_at timestamptz not null,end_at timestamptz not null,total_price integer not null check(total_price>0),status text not null default 'pending' check(status in ('pending','confirmed','rejected')),demo_client_name text not null default 'Тестовый гость' check(demo_client_name='Тестовый гость'),created_at timestamptz not null default now(),
 check(end_at>=start_at+interval '2 hours'),
 exclude using gist(hall_id with =,tstzrange(start_at,end_at,'[)') with &&) where(status in ('pending','confirmed'))
);
alter table public.halls enable row level security;
alter table public.bookings enable row level security;
alter table public.admins enable row level security;
create policy hall_read on public.halls for select using(is_active);
create policy admin_read on public.bookings for select to authenticated using(public.is_admin());
revoke all on public.bookings from anon,authenticated;
grant select on public.bookings to authenticated;
create function public.availability(hall_slug text,day date) returns table(start_at timestamptz,end_at timestamptz) language sql security definer set search_path=public as $$
 select b.start_at,b.end_at from bookings b join halls h on h.id=b.hall_id where h.slug=hall_slug and h.is_active and b.status in ('pending','confirmed') and b.start_at >= day::timestamp at time zone 'Europe/Moscow' and b.start_at < (day+1)::timestamp at time zone 'Europe/Moscow';
$$;
create table public.demo_quota(bucket timestamptz primary key,n integer not null);
alter table public.demo_quota enable row level security;
create function public.create_demo_booking(hall_slug text,day date,start_hour integer,hours integer) returns jsonb language plpgsql security definer set search_path=public as $$
declare h halls; b bookings; s timestamptz; count_now integer;
begin
 if start_hour<10 or hours<2 or start_hour+hours>22 then raise exception 'Invalid interval'; end if;
 s := (day+make_time(start_hour,0,0)) at time zone 'Europe/Moscow';
 if s<=now() or day > (now() at time zone 'Europe/Moscow')::date+180 then raise exception 'Invalid date'; end if;
 select * into strict h from halls where slug=hall_slug and is_active;
 -- Atomic global quota also applies to direct RPC calls. No IP or personal data is stored.
 insert into demo_quota values(date_trunc('hour',now()),1) on conflict(bucket) do update set n=demo_quota.n+1 returning n into count_now;
 if count_now>20 then raise exception 'Demo hourly quota exceeded'; end if;
 if (select count(*) from bookings where created_at>now()-interval '24 hours')>=100 then raise exception 'Demo daily quota exceeded'; end if;
 insert into bookings(hall_id,start_at,end_at,total_price) values(h.id,s,s+make_interval(hours=>hours),hours*h.hourly_price) returning * into b;
 return jsonb_build_object('id',b.id,'status',b.status,'start_at',b.start_at,'end_at',b.end_at,'total_price',b.total_price);
end $$;
create function public.change_booking(booking_id uuid,new_status text) returns void language plpgsql security definer set search_path=public as $$
begin
 if not is_admin() then raise insufficient_privilege; end if;
 if new_status not in ('confirmed','rejected') then raise exception 'Invalid status'; end if;
 update bookings set status=new_status where id=booking_id and status='pending';
 if not found then raise exception 'Booking already processed'; end if;
end $$;
create function public.clear_demo_bookings() returns void language plpgsql security definer set search_path=public as $$
begin
 if not is_admin() then raise insufficient_privilege; end if;
 delete from bookings;
end $$;
revoke all on function public.change_booking(uuid,text),public.clear_demo_bookings() from public,anon;
grant execute on function public.change_booking(uuid,text),public.clear_demo_bookings() to authenticated;
