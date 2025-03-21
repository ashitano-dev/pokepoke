CREATE TABLE "trades_cards" (
	"id" varchar PRIMARY KEY NOT NULL,
	"trade_id" varchar NOT NULL,
	"user_id" varchar NOT NULL,
	"card_id" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "trades" (
	"id" varchar PRIMARY KEY NOT NULL,
	"request_user_id" varchar NOT NULL,
	"request_user_created_pack_id" varchar,
	"confirm_user_id" varchar,
	"confirm_user_created_pack_id" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "trades_cards" ADD CONSTRAINT "trades_cards_trade_id_trades_id_fk" FOREIGN KEY ("trade_id") REFERENCES "public"."trades"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "trades_cards" ADD CONSTRAINT "trades_cards_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "trades_cards" ADD CONSTRAINT "trades_cards_card_id_cards_id_fk" FOREIGN KEY ("card_id") REFERENCES "public"."cards"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "trades" ADD CONSTRAINT "trades_request_user_id_users_id_fk" FOREIGN KEY ("request_user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "trades" ADD CONSTRAINT "trades_request_user_created_pack_id_packs_id_fk" FOREIGN KEY ("request_user_created_pack_id") REFERENCES "public"."packs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "trades" ADD CONSTRAINT "trades_confirm_user_id_users_id_fk" FOREIGN KEY ("confirm_user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "trades" ADD CONSTRAINT "trades_confirm_user_created_pack_id_packs_id_fk" FOREIGN KEY ("confirm_user_created_pack_id") REFERENCES "public"."packs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_trades_cards__trade_id" ON "trades_cards" USING btree ("trade_id");--> statement-breakpoint
CREATE INDEX "idx_trades_cards__user_id" ON "trades_cards" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_trades_cards__card_id" ON "trades_cards" USING btree ("card_id");--> statement-breakpoint
CREATE INDEX "idx_trades__request_user_id" ON "trades" USING btree ("request_user_id");--> statement-breakpoint
CREATE INDEX "idx_trades__confirm_user_id" ON "trades" USING btree ("confirm_user_id");