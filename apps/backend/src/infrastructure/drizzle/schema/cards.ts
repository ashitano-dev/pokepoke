import { boolean, integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { packs } from "./packs";

export const cards = pgTable(
	"cards",

	{
		id: varchar("id").primaryKey().notNull(),
		packId: varchar("pack_id")
			.notNull()
			.references(() => packs.id, {
				onDelete: "cascade",
			}),
		title: varchar("title").notNull(),
		location: varchar("location"),
		shootingDate: varchar("shooting_date"),
		backgroundColor: varchar("background_color").notNull(),
		isEx: boolean("is_ex").notNull(),
		numDia: integer("num_dia").notNull(),
		createdAt: timestamp("created_at").notNull().defaultNow(),
		updatedAt: timestamp("updated_at").notNull().defaultNow(),
	},
);
