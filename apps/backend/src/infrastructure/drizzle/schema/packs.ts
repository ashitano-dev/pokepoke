import { pgTable, timestamp, unique, varchar } from "drizzle-orm/pg-core";
import { users } from "./users";

export const packs = pgTable(
	"packs",
	{
		id: varchar("id").primaryKey().notNull(),
		title: varchar("title").notNull(),
		createUserId: varchar("created_user_id")
			.notNull()
			.references(() => users.id, {
				onDelete: "cascade",
			}),
		targetUserId: varchar("target_user_id")
			.notNull()
			.references(() => users.id, {
				onDelete: "cascade",
			}),
		createdAt: timestamp("created_at").notNull().defaultNow(),
		updatedAt: timestamp("updated_at").notNull().defaultNow(),
	},
	table => [unique("unq_packs__created_user_id_target_user_id").on(table.createUserId, table.targetUserId)],
);
