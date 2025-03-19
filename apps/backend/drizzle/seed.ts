import { exit } from "node:process";
import { SessionTokenService } from "../src/application/services/session-token";
import { createOAuthAccount, createSession, createUser } from "../src/domain/entities";
import { newOAuthProvider, newOAuthProviderId, newSessionId, newUserId } from "../src/domain/value-object";
import { DrizzleService } from "../src/infrastructure/drizzle";
import { ENV } from "../src/modules/env";

const drizzleService = new DrizzleService(ENV.DATABASE_URL);

const sessionTokenService = new SessionTokenService(ENV.SESSION_PEPPER);

const user = createUser({
	id: newUserId("1"),
	name: "foo",
	email: "foo@example.com",
	emailVerified: true,
	iconUrl: null,
});

const oauthAccount = createOAuthAccount({
	userId: user.id,
	provider: newOAuthProvider("discord"),
	providerId: newOAuthProviderId("1234567890"),
});

const sessionToken = "dummy-session-token";
const sessionId = newSessionId(sessionTokenService.hashSessionToken(sessionToken));

const session = createSession({
	id: sessionId,
	userId: user.id,
});

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log("Seeding...");

await drizzleService.db
	.insert(drizzleService.schema.users)
	.values(user)
	.onConflictDoUpdate({
		target: drizzleService.schema.users.id,
		set: {
			email: user.email,
			emailVerified: user.emailVerified,
			name: user.name,
			iconUrl: user.iconUrl,
			updatedAt: user.updatedAt,
		},
	});

await drizzleService.db
	.insert(drizzleService.schema.oauthAccounts)
	.values(oauthAccount)
	.onConflictDoUpdate({
		target: [drizzleService.schema.oauthAccounts.userId, drizzleService.schema.oauthAccounts.provider],
		set: {
			providerId: oauthAccount.providerId,
			updatedAt: oauthAccount.updatedAt,
		},
	});

await drizzleService.db
	.insert(drizzleService.schema.sessions)
	.values(session)
	.onConflictDoUpdate({
		target: drizzleService.schema.sessions.id,
		set: {
			expiresAt: session.expiresAt,
		},
	});

exit(0);
