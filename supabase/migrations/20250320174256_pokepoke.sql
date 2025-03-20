alter table "public"."friendships" drop constraint "friendships_first_user_id_users_id_fk";

alter table "public"."friendships" drop constraint "friendships_second_user_id_users_id_fk";

alter table "public"."friendships" drop constraint "unq_friendships__first_user_id_second_user_id";

alter table "public"."packs" drop constraint "packs_created_user_id_users_id_fk";

alter table "public"."packs" drop constraint "packs_target_user_id_users_id_fk";

alter table "public"."packs" drop constraint "unq_packs__created_user_id_target_user_id";

alter table "public"."trades" drop constraint "trades_confirm_user_created_pack_id_packs_id_fk";

alter table "public"."trades" drop constraint "trades_confirm_user_id_users_id_fk";

alter table "public"."trades" drop constraint "trades_request_user_created_pack_id_packs_id_fk";

alter table "public"."trades" drop constraint "trades_request_user_id_users_id_fk";

drop index if exists "public"."idx_trades__confirm_user_id";

drop index if exists "public"."idx_trades__request_user_id";

drop index if exists "public"."idx_trades_cards__card_id";

drop index if exists "public"."idx_trades_cards__trade_id";

drop index if exists "public"."idx_trades_cards__user_id";

drop index if exists "public"."unq_friendships__first_user_id_second_user_id";

drop index if exists "public"."unq_packs__created_user_id_target_user_id";

alter table "public"."friendships" drop column "first_user_id";

alter table "public"."friendships" drop column "second_user_id";

alter table "public"."friendships" add column "user_id_1" character varying not null;

alter table "public"."friendships" add column "user_id_2" character varying not null;

alter table "public"."packs" drop column "created_user_id";

alter table "public"."packs" drop column "target_user_id";

alter table "public"."packs" add column "friendship_id" character varying not null;

alter table "public"."packs" add column "owner_id" character varying not null;

alter table "public"."trades" drop column "confirm_user_created_pack_id";

alter table "public"."trades" drop column "confirm_user_id";

alter table "public"."trades" drop column "request_user_created_pack_id";

alter table "public"."trades" drop column "request_user_id";

alter table "public"."trades" add column "friendship_id" character varying not null;

alter table "public"."trades" add column "requester_user_id" character varying not null;

alter table "public"."trades" add column "status" character varying not null default 'PENDING'::character varying;

CREATE UNIQUE INDEX unq_friendship__user_id1_user_id2 ON public.friendships USING btree (user_id_1, user_id_2);

alter table "public"."friendships" add constraint "friendships_user_id_1_users_id_fk" FOREIGN KEY (user_id_1) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."friendships" validate constraint "friendships_user_id_1_users_id_fk";

alter table "public"."friendships" add constraint "friendships_user_id_2_users_id_fk" FOREIGN KEY (user_id_2) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."friendships" validate constraint "friendships_user_id_2_users_id_fk";

alter table "public"."friendships" add constraint "unq_friendship__user_id1_user_id2" UNIQUE using index "unq_friendship__user_id1_user_id2";

alter table "public"."friendships" add constraint "user_id_order_check" CHECK (((user_id_1)::text < (user_id_2)::text)) not valid;

alter table "public"."friendships" validate constraint "user_id_order_check";

alter table "public"."packs" add constraint "packs_friendship_id_friendships_id_fk" FOREIGN KEY (friendship_id) REFERENCES friendships(id) ON DELETE CASCADE not valid;

alter table "public"."packs" validate constraint "packs_friendship_id_friendships_id_fk";

alter table "public"."packs" add constraint "packs_owner_id_users_id_fk" FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."packs" validate constraint "packs_owner_id_users_id_fk";

alter table "public"."trades" add constraint "trades_friendship_id_friendships_id_fk" FOREIGN KEY (friendship_id) REFERENCES friendships(id) ON DELETE CASCADE not valid;

alter table "public"."trades" validate constraint "trades_friendship_id_friendships_id_fk";


