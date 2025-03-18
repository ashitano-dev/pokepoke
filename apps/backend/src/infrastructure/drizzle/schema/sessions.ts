import { index, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { users } from "./users";

export const sessions = pgTable(
	"sessions",
	{
		id: varchar("id").primaryKey().notNull(),
		userId: varchar("user_id")
			.notNull()
			.references(() => users.id, {
				onDelete: "cascade",
			}),
		expiresAt: timestamp("expires_at").notNull(),
	},
	table => [index("idx_sessions__user_id").on(table.userId)],
);
