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
		// firstUserCreatedPackId: varchar("first_user_created_pack_id").notNull(),
		secondUserId: varchar("second_user_id")
			.notNull()
			.references(() => users.id, {
				onDelete: "cascade",
			}),
		// secondUserCreatedPackId: varchar("second_user_created_pack_id").notNull(),
	},
	table => [
		unique("unq_friendships__first_user_id_second_user_id").on(table.firstUserId, table.secondUserId),
		// index("idx_friendships__first_user_id").on(table.firstUserId),
		// index("idx_friendships__second_user_id").on(table.secondUserId),
	],
);
