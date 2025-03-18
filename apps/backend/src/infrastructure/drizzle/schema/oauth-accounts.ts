import { index, pgTable, timestamp, unique, varchar } from "drizzle-orm/pg-core";
import { users } from "./users";

export const oauthAccounts = pgTable(
	"oauth_accounts",
	{
		provider: varchar("provider", {
			enum: ["discord"],
		}).notNull(),
		providerId: varchar("provider_id").notNull().unique(),
		userId: varchar("user_id")
			.notNull()
			.references(() => users.id, {
				onDelete: "cascade",
			}),
		createdAt: timestamp("created_at").notNull().defaultNow(),
		updatedAt: timestamp("updated_at").notNull().defaultNow(),
	},
	table => [
		unique("idx_oauth_accounts__provider_provider_id").on(table.provider, table.providerId),
		unique("unq_oauth_accounts__provider_user").on(table.provider, table.userId),
		index("idx_oauth_accounts__user_id").on(table.userId),
	],
);
