create table "public"."cards" (
    "id" character varying not null,
    "pack_id" character varying not null,
    "title" character varying not null,
    "location" character varying,
    "shooting_date" timestamp without time zone,
    "background_color" character varying not null,
    "is_ex" boolean not null,
    "num_dia" integer not null,
    "created_at" timestamp without time zone not null default now(),
    "updated_at" timestamp without time zone not null default now()
);


create table "public"."packs" (
    "id" character varying not null,
    "title" character varying not null,
    "created_user_id" character varying not null,
    "target_user_id" character varying not null,
    "created_at" timestamp without time zone not null default now(),
    "updated_at" timestamp without time zone not null default now()
);


CREATE UNIQUE INDEX cards_pkey ON public.cards USING btree (id);

CREATE UNIQUE INDEX packs_pkey ON public.packs USING btree (id);

CREATE UNIQUE INDEX unq_packs__created_user_id_target_user_id ON public.packs USING btree (created_user_id, target_user_id);

alter table "public"."cards" add constraint "cards_pkey" PRIMARY KEY using index "cards_pkey";

alter table "public"."packs" add constraint "packs_pkey" PRIMARY KEY using index "packs_pkey";

alter table "public"."cards" add constraint "cards_pack_id_packs_id_fk" FOREIGN KEY (pack_id) REFERENCES packs(id) ON DELETE CASCADE not valid;

alter table "public"."cards" validate constraint "cards_pack_id_packs_id_fk";

alter table "public"."packs" add constraint "packs_created_user_id_users_id_fk" FOREIGN KEY (created_user_id) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."packs" validate constraint "packs_created_user_id_users_id_fk";

alter table "public"."packs" add constraint "packs_target_user_id_users_id_fk" FOREIGN KEY (target_user_id) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."packs" validate constraint "packs_target_user_id_users_id_fk";

alter table "public"."packs" add constraint "unq_packs__created_user_id_target_user_id" UNIQUE using index "unq_packs__created_user_id_target_user_id";

grant delete on table "public"."cards" to "anon";

grant insert on table "public"."cards" to "anon";

grant references on table "public"."cards" to "anon";

grant select on table "public"."cards" to "anon";

grant trigger on table "public"."cards" to "anon";

grant truncate on table "public"."cards" to "anon";

grant update on table "public"."cards" to "anon";

grant delete on table "public"."cards" to "authenticated";

grant insert on table "public"."cards" to "authenticated";

grant references on table "public"."cards" to "authenticated";

grant select on table "public"."cards" to "authenticated";

grant trigger on table "public"."cards" to "authenticated";

grant truncate on table "public"."cards" to "authenticated";

grant update on table "public"."cards" to "authenticated";

grant delete on table "public"."cards" to "service_role";

grant insert on table "public"."cards" to "service_role";

grant references on table "public"."cards" to "service_role";

grant select on table "public"."cards" to "service_role";

grant trigger on table "public"."cards" to "service_role";

grant truncate on table "public"."cards" to "service_role";

grant update on table "public"."cards" to "service_role";

grant delete on table "public"."packs" to "anon";

grant insert on table "public"."packs" to "anon";

grant references on table "public"."packs" to "anon";

grant select on table "public"."packs" to "anon";

grant trigger on table "public"."packs" to "anon";

grant truncate on table "public"."packs" to "anon";

grant update on table "public"."packs" to "anon";

grant delete on table "public"."packs" to "authenticated";

grant insert on table "public"."packs" to "authenticated";

grant references on table "public"."packs" to "authenticated";

grant select on table "public"."packs" to "authenticated";

grant trigger on table "public"."packs" to "authenticated";

grant truncate on table "public"."packs" to "authenticated";

grant update on table "public"."packs" to "authenticated";

grant delete on table "public"."packs" to "service_role";

grant insert on table "public"."packs" to "service_role";

grant references on table "public"."packs" to "service_role";

grant select on table "public"."packs" to "service_role";

grant trigger on table "public"."packs" to "service_role";

grant truncate on table "public"."packs" to "service_role";

grant update on table "public"."packs" to "service_role";


