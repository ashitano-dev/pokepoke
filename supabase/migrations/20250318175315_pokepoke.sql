create table "public"."oauth_accounts" (
    "provider" character varying not null,
    "provider_id" character varying not null,
    "user_id" character varying not null,
    "created_at" timestamp without time zone not null default now(),
    "updated_at" timestamp without time zone not null default now()
);


create table "public"."sessions" (
    "id" character varying not null,
    "user_id" character varying not null,
    "expires_at" timestamp without time zone not null
);


alter table "public"."users" add column "created_at" timestamp without time zone not null default now();

alter table "public"."users" add column "email" character varying not null;

alter table "public"."users" add column "email_verified" boolean not null default false;

alter table "public"."users" add column "icon_url" character varying;

alter table "public"."users" add column "name" character varying not null;

alter table "public"."users" add column "updated_at" timestamp without time zone not null default now();

CREATE UNIQUE INDEX idx_oauth_accounts__provider_provider_id ON public.oauth_accounts USING btree (provider, provider_id);

CREATE INDEX idx_oauth_accounts__user_id ON public.oauth_accounts USING btree (user_id);

CREATE INDEX idx_sessions__user_id ON public.sessions USING btree (user_id);

CREATE INDEX idx_users__email ON public.users USING btree (email);

CREATE UNIQUE INDEX oauth_accounts_provider_id_unique ON public.oauth_accounts USING btree (provider_id);

CREATE UNIQUE INDEX sessions_pkey ON public.sessions USING btree (id);

CREATE UNIQUE INDEX unq_oauth_accounts__provider_user ON public.oauth_accounts USING btree (provider, user_id);

CREATE UNIQUE INDEX users_email_unique ON public.users USING btree (email);

alter table "public"."sessions" add constraint "sessions_pkey" PRIMARY KEY using index "sessions_pkey";

alter table "public"."oauth_accounts" add constraint "idx_oauth_accounts__provider_provider_id" UNIQUE using index "idx_oauth_accounts__provider_provider_id";

alter table "public"."oauth_accounts" add constraint "oauth_accounts_provider_id_unique" UNIQUE using index "oauth_accounts_provider_id_unique";

alter table "public"."oauth_accounts" add constraint "oauth_accounts_user_id_users_id_fk" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."oauth_accounts" validate constraint "oauth_accounts_user_id_users_id_fk";

alter table "public"."oauth_accounts" add constraint "unq_oauth_accounts__provider_user" UNIQUE using index "unq_oauth_accounts__provider_user";

alter table "public"."sessions" add constraint "sessions_user_id_users_id_fk" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."sessions" validate constraint "sessions_user_id_users_id_fk";

alter table "public"."users" add constraint "users_email_unique" UNIQUE using index "users_email_unique";

grant delete on table "public"."oauth_accounts" to "anon";

grant insert on table "public"."oauth_accounts" to "anon";

grant references on table "public"."oauth_accounts" to "anon";

grant select on table "public"."oauth_accounts" to "anon";

grant trigger on table "public"."oauth_accounts" to "anon";

grant truncate on table "public"."oauth_accounts" to "anon";

grant update on table "public"."oauth_accounts" to "anon";

grant delete on table "public"."oauth_accounts" to "authenticated";

grant insert on table "public"."oauth_accounts" to "authenticated";

grant references on table "public"."oauth_accounts" to "authenticated";

grant select on table "public"."oauth_accounts" to "authenticated";

grant trigger on table "public"."oauth_accounts" to "authenticated";

grant truncate on table "public"."oauth_accounts" to "authenticated";

grant update on table "public"."oauth_accounts" to "authenticated";

grant delete on table "public"."oauth_accounts" to "service_role";

grant insert on table "public"."oauth_accounts" to "service_role";

grant references on table "public"."oauth_accounts" to "service_role";

grant select on table "public"."oauth_accounts" to "service_role";

grant trigger on table "public"."oauth_accounts" to "service_role";

grant truncate on table "public"."oauth_accounts" to "service_role";

grant update on table "public"."oauth_accounts" to "service_role";

grant delete on table "public"."sessions" to "anon";

grant insert on table "public"."sessions" to "anon";

grant references on table "public"."sessions" to "anon";

grant select on table "public"."sessions" to "anon";

grant trigger on table "public"."sessions" to "anon";

grant truncate on table "public"."sessions" to "anon";

grant update on table "public"."sessions" to "anon";

grant delete on table "public"."sessions" to "authenticated";

grant insert on table "public"."sessions" to "authenticated";

grant references on table "public"."sessions" to "authenticated";

grant select on table "public"."sessions" to "authenticated";

grant trigger on table "public"."sessions" to "authenticated";

grant truncate on table "public"."sessions" to "authenticated";

grant update on table "public"."sessions" to "authenticated";

grant delete on table "public"."sessions" to "service_role";

grant insert on table "public"."sessions" to "service_role";

grant references on table "public"."sessions" to "service_role";

grant select on table "public"."sessions" to "service_role";

grant trigger on table "public"."sessions" to "service_role";

grant truncate on table "public"."sessions" to "service_role";

grant update on table "public"."sessions" to "service_role";


