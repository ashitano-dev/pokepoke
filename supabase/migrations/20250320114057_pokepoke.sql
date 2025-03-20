create table "public"."trades" (
    "id" character varying not null,
    "request_user_id" character varying not null,
    "request_user_created_pack_id" character varying,
    "confirm_user_id" character varying,
    "confirm_user_created_pack_id" character varying,
    "created_at" timestamp without time zone not null default now(),
    "updated_at" timestamp without time zone not null default now()
);


create table "public"."trades_cards" (
    "id" character varying not null,
    "trade_id" character varying not null,
    "user_id" character varying not null,
    "card_id" character varying not null,
    "created_at" timestamp without time zone not null default now(),
    "updated_at" timestamp without time zone not null default now()
);


CREATE INDEX idx_trades__confirm_user_id ON public.trades USING btree (confirm_user_id);

CREATE INDEX idx_trades__request_user_id ON public.trades USING btree (request_user_id);

CREATE INDEX idx_trades_cards__card_id ON public.trades_cards USING btree (card_id);

CREATE INDEX idx_trades_cards__trade_id ON public.trades_cards USING btree (trade_id);

CREATE INDEX idx_trades_cards__user_id ON public.trades_cards USING btree (user_id);

CREATE UNIQUE INDEX trades_cards_pkey ON public.trades_cards USING btree (id);

CREATE UNIQUE INDEX trades_pkey ON public.trades USING btree (id);

alter table "public"."trades" add constraint "trades_pkey" PRIMARY KEY using index "trades_pkey";

alter table "public"."trades_cards" add constraint "trades_cards_pkey" PRIMARY KEY using index "trades_cards_pkey";

alter table "public"."trades" add constraint "trades_confirm_user_created_pack_id_packs_id_fk" FOREIGN KEY (confirm_user_created_pack_id) REFERENCES packs(id) ON DELETE CASCADE not valid;

alter table "public"."trades" validate constraint "trades_confirm_user_created_pack_id_packs_id_fk";

alter table "public"."trades" add constraint "trades_confirm_user_id_users_id_fk" FOREIGN KEY (confirm_user_id) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."trades" validate constraint "trades_confirm_user_id_users_id_fk";

alter table "public"."trades" add constraint "trades_request_user_created_pack_id_packs_id_fk" FOREIGN KEY (request_user_created_pack_id) REFERENCES packs(id) ON DELETE CASCADE not valid;

alter table "public"."trades" validate constraint "trades_request_user_created_pack_id_packs_id_fk";

alter table "public"."trades" add constraint "trades_request_user_id_users_id_fk" FOREIGN KEY (request_user_id) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."trades" validate constraint "trades_request_user_id_users_id_fk";

alter table "public"."trades_cards" add constraint "trades_cards_card_id_cards_id_fk" FOREIGN KEY (card_id) REFERENCES cards(id) ON DELETE CASCADE not valid;

alter table "public"."trades_cards" validate constraint "trades_cards_card_id_cards_id_fk";

alter table "public"."trades_cards" add constraint "trades_cards_trade_id_trades_id_fk" FOREIGN KEY (trade_id) REFERENCES trades(id) ON DELETE CASCADE not valid;

alter table "public"."trades_cards" validate constraint "trades_cards_trade_id_trades_id_fk";

alter table "public"."trades_cards" add constraint "trades_cards_user_id_users_id_fk" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."trades_cards" validate constraint "trades_cards_user_id_users_id_fk";

grant delete on table "public"."trades" to "anon";

grant insert on table "public"."trades" to "anon";

grant references on table "public"."trades" to "anon";

grant select on table "public"."trades" to "anon";

grant trigger on table "public"."trades" to "anon";

grant truncate on table "public"."trades" to "anon";

grant update on table "public"."trades" to "anon";

grant delete on table "public"."trades" to "authenticated";

grant insert on table "public"."trades" to "authenticated";

grant references on table "public"."trades" to "authenticated";

grant select on table "public"."trades" to "authenticated";

grant trigger on table "public"."trades" to "authenticated";

grant truncate on table "public"."trades" to "authenticated";

grant update on table "public"."trades" to "authenticated";

grant delete on table "public"."trades" to "service_role";

grant insert on table "public"."trades" to "service_role";

grant references on table "public"."trades" to "service_role";

grant select on table "public"."trades" to "service_role";

grant trigger on table "public"."trades" to "service_role";

grant truncate on table "public"."trades" to "service_role";

grant update on table "public"."trades" to "service_role";

grant delete on table "public"."trades_cards" to "anon";

grant insert on table "public"."trades_cards" to "anon";

grant references on table "public"."trades_cards" to "anon";

grant select on table "public"."trades_cards" to "anon";

grant trigger on table "public"."trades_cards" to "anon";

grant truncate on table "public"."trades_cards" to "anon";

grant update on table "public"."trades_cards" to "anon";

grant delete on table "public"."trades_cards" to "authenticated";

grant insert on table "public"."trades_cards" to "authenticated";

grant references on table "public"."trades_cards" to "authenticated";

grant select on table "public"."trades_cards" to "authenticated";

grant trigger on table "public"."trades_cards" to "authenticated";

grant truncate on table "public"."trades_cards" to "authenticated";

grant update on table "public"."trades_cards" to "authenticated";

grant delete on table "public"."trades_cards" to "service_role";

grant insert on table "public"."trades_cards" to "service_role";

grant references on table "public"."trades_cards" to "service_role";

grant select on table "public"."trades_cards" to "service_role";

grant trigger on table "public"."trades_cards" to "service_role";

grant truncate on table "public"."trades_cards" to "service_role";

grant update on table "public"."trades_cards" to "service_role";


