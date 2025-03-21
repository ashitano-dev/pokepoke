import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { cards } from "./cards";
import { trades } from "./trades";
import { users } from "./users";

export const tradesCards = pgTable("trades_cards", {
	id: varchar("id").primaryKey().notNull(),
	tradeId: varchar("trade_id")
		.notNull()
		.references(() => trades.id, {
			onDelete: "cascade",
		}),
	userId: varchar("user_id")
		.notNull()
		.references(() => users.id, {
			onDelete: "cascade",
		}),
	cardId: varchar("card_id")
		.notNull()
		.references(() => cards.id, {
			onDelete: "cascade",
		}),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
