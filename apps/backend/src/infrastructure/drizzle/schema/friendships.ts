import { pgTable, unique, varchar } from "drizzle-orm/pg-core";
import { users } from "./users";

export const friendships = pgTable(
	"friendships",
	{
		id: varchar("id").primaryKey().notNull(),
		firstUserId: varchar("first_user_id")
			.notNull()
			.references(() => users.id, {
				onDelete: "cascade",
			}),
		secondUserId: varchar("second_user_id")
			.notNull()
			.references(() => users.id, {
				onDelete: "cascade",
			}),
	},
	table => [unique("unq_friendships__first_user_id_second_user_id").on(table.firstUserId, table.secondUserId)],
);
