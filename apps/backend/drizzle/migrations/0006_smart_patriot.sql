ALTER TABLE "friendships" DROP CONSTRAINT "unq_friendships__first_user_id_second_user_id";--> statement-breakpoint
ALTER TABLE "packs" DROP CONSTRAINT "unq_packs__created_user_id_target_user_id";--> statement-breakpoint
ALTER TABLE "friendships" DROP CONSTRAINT "friendships_first_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "friendships" DROP CONSTRAINT "friendships_second_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "packs" DROP CONSTRAINT "packs_created_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "packs" DROP CONSTRAINT "packs_target_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "trades" DROP CONSTRAINT "trades_request_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "trades" DROP CONSTRAINT "trades_request_user_created_pack_id_packs_id_fk";
--> statement-breakpoint
ALTER TABLE "trades" DROP CONSTRAINT "trades_confirm_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "trades" DROP CONSTRAINT "trades_confirm_user_created_pack_id_packs_id_fk";
--> statement-breakpoint
DROP INDEX "idx_trades_cards__trade_id";--> statement-breakpoint
DROP INDEX "idx_trades_cards__user_id";--> statement-breakpoint
DROP INDEX "idx_trades_cards__card_id";--> statement-breakpoint
DROP INDEX "idx_trades__request_user_id";--> statement-breakpoint
DROP INDEX "idx_trades__confirm_user_id";--> statement-breakpoint
ALTER TABLE "friendships" ADD COLUMN "user_id_1" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "friendships" ADD COLUMN "user_id_2" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "packs" ADD COLUMN "owner_id" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "packs" ADD COLUMN "friendship_id" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "trades" ADD COLUMN "friendship_id" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "trades" ADD COLUMN "requester_user_id" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "trades" ADD COLUMN "status" varchar DEFAULT 'PENDING' NOT NULL;--> statement-breakpoint
ALTER TABLE "friendships" ADD CONSTRAINT "friendships_user_id_1_users_id_fk" FOREIGN KEY ("user_id_1") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "friendships" ADD CONSTRAINT "friendships_user_id_2_users_id_fk" FOREIGN KEY ("user_id_2") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "packs" ADD CONSTRAINT "packs_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "packs" ADD CONSTRAINT "packs_friendship_id_friendships_id_fk" FOREIGN KEY ("friendship_id") REFERENCES "public"."friendships"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "trades" ADD CONSTRAINT "trades_friendship_id_friendships_id_fk" FOREIGN KEY ("friendship_id") REFERENCES "public"."friendships"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "friendships" DROP COLUMN "first_user_id";--> statement-breakpoint
ALTER TABLE "friendships" DROP COLUMN "second_user_id";--> statement-breakpoint
ALTER TABLE "packs" DROP COLUMN "created_user_id";--> statement-breakpoint
ALTER TABLE "packs" DROP COLUMN "target_user_id";--> statement-breakpoint
ALTER TABLE "trades" DROP COLUMN "request_user_id";--> statement-breakpoint
ALTER TABLE "trades" DROP COLUMN "request_user_created_pack_id";--> statement-breakpoint
ALTER TABLE "trades" DROP COLUMN "confirm_user_id";--> statement-breakpoint
ALTER TABLE "trades" DROP COLUMN "confirm_user_created_pack_id";--> statement-breakpoint
ALTER TABLE "friendships" ADD CONSTRAINT "unq_friendship__user_id1_user_id2" UNIQUE("user_id_1","user_id_2");--> statement-breakpoint
ALTER TABLE "friendships" ADD CONSTRAINT "user_id_order_check" CHECK ("friendships"."user_id_1" < "friendships"."user_id_2");