import { index, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { packs } from "./packs";
import { users } from "./users";

export const trades = pgTable(
	"trades",
	{
		id: varchar("id").primaryKey().notNull(),
		requestUserId: varchar("request_user_id")
			.notNull()
			.references(() => users.id, {
				onDelete: "cascade",
			}),
		requestUserCreatedPackId: varchar("request_user_created_pack_id").references(() => packs.id, {
			onDelete: "cascade",
		}),
		confirmUserId: varchar("confirm_user_id").references(() => users.id, {
			onDelete: "cascade",
		}),
		confirmUserCreatedPackId: varchar("confirm_user_created_pack_id").references(() => packs.id, {
			onDelete: "cascade",
		}),
		createdAt: timestamp("created_at").notNull().defaultNow(),
		updatedAt: timestamp("updated_at").notNull().defaultNow(),
	},
	table => [
		index("idx_trades__request_user_id").on(table.requestUserId),
		index("idx_trades__confirm_user_id").on(table.confirmUserId),
	],
);
