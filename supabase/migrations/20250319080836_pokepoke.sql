create table "public"."friend_invite_tokens" (
    "id" character varying not null,
    "token" character varying not null,
    "user_id" character varying not null,
    "created_at" timestamp without time zone not null default now(),
    "expires_at" timestamp without time zone not null
);


create table "public"."friendships" (
    "id" character varying not null,
    "first_user_id" character varying not null,
    "second_user_id" character varying not null
);


CREATE UNIQUE INDEX friend_invite_tokens_pkey ON public.friend_invite_tokens USING btree (id);

CREATE UNIQUE INDEX friendships_pkey ON public.friendships USING btree (id);

CREATE UNIQUE INDEX unq_friend_invite_tokens__token ON public.friend_invite_tokens USING btree (token);

CREATE UNIQUE INDEX unq_friendships__first_user_id_second_user_id ON public.friendships USING btree (first_user_id, second_user_id);

alter table "public"."friend_invite_tokens" add constraint "friend_invite_tokens_pkey" PRIMARY KEY using index "friend_invite_tokens_pkey";

alter table "public"."friendships" add constraint "friendships_pkey" PRIMARY KEY using index "friendships_pkey";

alter table "public"."friend_invite_tokens" add constraint "friend_invite_tokens_user_id_users_id_fk" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."friend_invite_tokens" validate constraint "friend_invite_tokens_user_id_users_id_fk";

alter table "public"."friend_invite_tokens" add constraint "unq_friend_invite_tokens__token" UNIQUE using index "unq_friend_invite_tokens__token";

alter table "public"."friendships" add constraint "friendships_first_user_id_users_id_fk" FOREIGN KEY (first_user_id) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."friendships" validate constraint "friendships_first_user_id_users_id_fk";

alter table "public"."friendships" add constraint "friendships_second_user_id_users_id_fk" FOREIGN KEY (second_user_id) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."friendships" validate constraint "friendships_second_user_id_users_id_fk";

alter table "public"."friendships" add constraint "unq_friendships__first_user_id_second_user_id" UNIQUE using index "unq_friendships__first_user_id_second_user_id";

grant delete on table "public"."friend_invite_tokens" to "anon";

grant insert on table "public"."friend_invite_tokens" to "anon";

grant references on table "public"."friend_invite_tokens" to "anon";

grant select on table "public"."friend_invite_tokens" to "anon";

grant trigger on table "public"."friend_invite_tokens" to "anon";

grant truncate on table "public"."friend_invite_tokens" to "anon";

grant update on table "public"."friend_invite_tokens" to "anon";

grant delete on table "public"."friend_invite_tokens" to "authenticated";

grant insert on table "public"."friend_invite_tokens" to "authenticated";

grant references on table "public"."friend_invite_tokens" to "authenticated";

grant select on table "public"."friend_invite_tokens" to "authenticated";

grant trigger on table "public"."friend_invite_tokens" to "authenticated";

grant truncate on table "public"."friend_invite_tokens" to "authenticated";

grant update on table "public"."friend_invite_tokens" to "authenticated";

grant delete on table "public"."friend_invite_tokens" to "service_role";

grant insert on table "public"."friend_invite_tokens" to "service_role";

grant references on table "public"."friend_invite_tokens" to "service_role";

grant select on table "public"."friend_invite_tokens" to "service_role";

grant trigger on table "public"."friend_invite_tokens" to "service_role";

grant truncate on table "public"."friend_invite_tokens" to "service_role";

grant update on table "public"."friend_invite_tokens" to "service_role";

grant delete on table "public"."friendships" to "anon";

grant insert on table "public"."friendships" to "anon";

grant references on table "public"."friendships" to "anon";

grant select on table "public"."friendships" to "anon";

grant trigger on table "public"."friendships" to "anon";

grant truncate on table "public"."friendships" to "anon";

grant update on table "public"."friendships" to "anon";

grant delete on table "public"."friendships" to "authenticated";

grant insert on table "public"."friendships" to "authenticated";

grant references on table "public"."friendships" to "authenticated";

grant select on table "public"."friendships" to "authenticated";

grant trigger on table "public"."friendships" to "authenticated";

grant truncate on table "public"."friendships" to "authenticated";

grant update on table "public"."friendships" to "authenticated";

grant delete on table "public"."friendships" to "service_role";

grant insert on table "public"."friendships" to "service_role";

grant references on table "public"."friendships" to "service_role";

grant select on table "public"."friendships" to "service_role";

grant trigger on table "public"."friendships" to "service_role";

grant truncate on table "public"."friendships" to "service_role";

grant update on table "public"."friendships" to "service_role";


