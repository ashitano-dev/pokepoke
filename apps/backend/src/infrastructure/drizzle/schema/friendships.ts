import { sql } from "drizzle-orm";
import { check, pgTable, unique, varchar } from "drizzle-orm/pg-core";
import { users } from "./users";

export const friendships = pgTable(
	"friendships",
	{
		id: varchar("id").primaryKey().notNull(),
		userId1: varchar("user_id_1")
			.notNull()
			.references(() => users.id, {
				onDelete: "cascade",
			}),
		userId2: varchar("user_id_2")
			.notNull()
			.references(() => users.id, {
				onDelete: "cascade",
			}),
	},
	table => [
		unique("unq_friendship__user_id1_user_id2").on(table.userId1, table.userId2),
		check("user_id_order_check", sql`${table.userId1} < ${table.userId2}`),
	],
);
