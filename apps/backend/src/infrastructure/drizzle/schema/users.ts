import { boolean, index, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const users = pgTable(
	"users",
	{
		id: varchar("id").primaryKey().notNull(),
		name: varchar("name").notNull(),
		email: varchar("email").notNull().unique(),
		emailVerified: boolean("email_verified").notNull().default(false),
		iconUrl: varchar("icon_url"),
		createdAt: timestamp("created_at").notNull().defaultNow(),
		updatedAt: timestamp("updated_at").notNull().defaultNow(),
	},
	table => [index("idx_users__email").on(table.email)],
);
