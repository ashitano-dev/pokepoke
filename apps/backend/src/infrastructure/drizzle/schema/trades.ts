import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { friendships } from "./friendships";

export const trades = pgTable("trades", {
	id: varchar("id").primaryKey().notNull(),
	friendshipId: varchar("friendship_id")
		.notNull()
		.references(() => friendships.id, {
			onDelete: "cascade",
		}),
	requestUserId: varchar("requester_user_id").notNull(),
	status: varchar("status", { enum: ["PENDING", "CONFIRMED"] })
		.notNull()
		.default("PENDING"),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
