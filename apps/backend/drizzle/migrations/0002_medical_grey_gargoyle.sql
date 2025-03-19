CREATE TABLE "friend_invite_tokens" (
	"id" varchar PRIMARY KEY NOT NULL,
	"token" varchar NOT NULL,
	"user_id" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"expires_at" timestamp NOT NULL,
	CONSTRAINT "unq_friend_invite_tokens__token" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "friendships" (
	"id" varchar PRIMARY KEY NOT NULL,
	"first_user_id" varchar NOT NULL,
	"second_user_id" varchar NOT NULL,
	CONSTRAINT "unq_friendships__first_user_id_second_user_id" UNIQUE("first_user_id","second_user_id")
);
--> statement-breakpoint
ALTER TABLE "friend_invite_tokens" ADD CONSTRAINT "friend_invite_tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "friendships" ADD CONSTRAINT "friendships_first_user_id_users_id_fk" FOREIGN KEY ("first_user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "friendships" ADD CONSTRAINT "friendships_second_user_id_users_id_fk" FOREIGN KEY ("second_user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;