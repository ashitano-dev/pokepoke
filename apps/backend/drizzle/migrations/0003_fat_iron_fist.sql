CREATE TABLE "cards" (
	"id" varchar PRIMARY KEY NOT NULL,
	"pack_id" varchar NOT NULL,
	"title" varchar NOT NULL,
	"location" varchar,
	"shooting_date" timestamp,
	"background_color" varchar NOT NULL,
	"is_ex" boolean NOT NULL,
	"num_dia" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "packs" (
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"created_user_id" varchar NOT NULL,
	"target_user_id" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "unq_packs__created_user_id_target_user_id" UNIQUE("created_user_id","target_user_id")
);
--> statement-breakpoint
ALTER TABLE "cards" ADD CONSTRAINT "cards_pack_id_packs_id_fk" FOREIGN KEY ("pack_id") REFERENCES "public"."packs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "packs" ADD CONSTRAINT "packs_created_user_id_users_id_fk" FOREIGN KEY ("created_user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "packs" ADD CONSTRAINT "packs_target_user_id_users_id_fk" FOREIGN KEY ("target_user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;