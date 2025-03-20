import { exit } from "node:process";
import { SessionTokenService } from "../src/application/services/session-token";
import { createOAuthAccount, createSession, createUser } from "../src/domain/entities";
import { newOAuthProvider, newOAuthProviderId, newSessionId, newUserId } from "../src/domain/value-object";
import { DrizzleService } from "../src/infrastructure/drizzle";
import { ENV } from "../src/modules/env";

const drizzleService = new DrizzleService(ENV.DATABASE_URL);

const sessionTokenService = new SessionTokenService(ENV.SESSION_PEPPER);

// === Seed User ===
const seedUserId = newUserId("01JPTAGKFDB3206TW5TJC5DVP4");

const seedUser = createUser({
	id: seedUserId,
	name: "seed",
	email: "seed@example.com",
	emailVerified: true,
	iconUrl: null,
});

const seedOAuthAccount = createOAuthAccount({
	userId: seedUser.id,
	provider: newOAuthProvider("discord"),
	providerId: newOAuthProviderId("1234567890"),
});

const seedSessionToken = "dummy-seed-session-token";
const seedSessionId = newSessionId(sessionTokenService.hashSessionToken(seedSessionToken));

const seedSession = createSession({
	id: seedSessionId,
	userId: seedUser.id,
});

await drizzleService.db.insert(drizzleService.schema.users).values(seedUser).onConflictDoNothing();

await drizzleService.db.insert(drizzleService.schema.oauthAccounts).values(seedOAuthAccount).onConflictDoNothing();

await drizzleService.db
	.insert(drizzleService.schema.sessions)
	.values(seedSession)
	.onConflictDoUpdate({
		target: drizzleService.schema.sessions.id,
		set: {
			expiresAt: seedSession.expiresAt,
		},
	});

// === My User ===
const myUserId = newUserId("01JPNB963G26R7Q9QTCC80ZB07");

const myUser = createUser({
	id: myUserId,
	name: "bar",
	email: "iMyMeMine@example.com",
	emailVerified: true,
	iconUrl: null,
});

const myOAuthAccount = createOAuthAccount({
	userId: myUser.id,
	provider: newOAuthProvider("discord"),
	providerId: newOAuthProviderId("0987654321"),
});

const mySessionToken = "dummy-my-session-token";
const mySessionId = newSessionId(sessionTokenService.hashSessionToken(mySessionToken));

const mySession = createSession({
	id: mySessionId,
	userId: myUser.id,
});

await drizzleService.db.insert(drizzleService.schema.users).values(myUser).onConflictDoNothing();

await drizzleService.db.insert(drizzleService.schema.oauthAccounts).values(myOAuthAccount).onConflictDoNothing();

await drizzleService.db
	.insert(drizzleService.schema.sessions)
	.values(mySession)
	.onConflictDoUpdate({
		target: drizzleService.schema.sessions.id,
		set: {
			expiresAt: mySession.expiresAt,
		},
	});

// === Friendship ===

const friendshipId = "01JPTATRE01MCD87GG6B3JT6QN";

await drizzleService.db
	.insert(drizzleService.schema.friendships)
	.values({ id: friendshipId, userId1: myUser.id, userId2: seedUser.id })
	.onConflictDoNothing();

// === Packs ===

await drizzleService.db
	.insert(drizzleService.schema.packs)
	.values({
		id: "01JPTATRE846M3XN914J9RREFY",
		title: "seed",
		ownerId: myUserId,
		friendshipId: friendshipId,
		createdAt: new Date(),
		updatedAt: new Date(),
	})
	.onConflictDoNothing();

await drizzleService.db
	.insert(drizzleService.schema.packs)
	.values({
		id: "01JPTATRE8Y9D9Q1WXD130SWT2",
		title: "my",
		ownerId: seedUserId,
		friendshipId: friendshipId,
		createdAt: new Date(),
		updatedAt: new Date(),
	})
	.onConflictDoNothing();

exit(0);
