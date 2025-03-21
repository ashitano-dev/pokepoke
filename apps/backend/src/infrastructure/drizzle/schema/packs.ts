import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { friendships } from "./friendships";
import { users } from "./users";

export const packs = pgTable("packs", {
	id: varchar("id").primaryKey().notNull(),
	title: varchar("title").notNull(),
	ownerId: varchar("owner_id")
		.notNull()
		.references(() => users.id, {
			onDelete: "cascade",
		}),
	friendshipId: varchar("friendship_id")
		.notNull()
		.references(() => friendships.id, {
			onDelete: "cascade",
		}),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
