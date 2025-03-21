import { pgTable, timestamp, unique, varchar } from "drizzle-orm/pg-core";
import { users } from "./users";

export const friendInviteTokens = pgTable(
	"friend_invite_tokens",
	{
		id: varchar("id").primaryKey().notNull(),
		token: varchar("token").notNull(),
		userId: varchar("user_id")
			.notNull()
			.references(() => users.id, {
				onDelete: "cascade",
			}),
		createdAt: timestamp("created_at").notNull().defaultNow(),
		expiresAt: timestamp("expires_at").notNull(),
	},
	table => [unique("unq_friend_invite_tokens__token").on(table.token)],
);
