import type { UserId } from "../value-object/ids";

export interface User {
	id: UserId;
	email: string;
	emailVerified: boolean;
	name: string;
	iconUrl: string | null;
	createdAt: Date;
	updatedAt: Date;
}

export const createUser = (arg: {
	id: UserId;
	email: string;
	emailVerified: boolean;
	name: string;
	iconUrl: string | null;
}): User => {
	const now = new Date();

	return {
		id: arg.id,
		email: arg.email,
		emailVerified: arg.emailVerified,
		name: arg.name,
		iconUrl: arg.iconUrl,
		createdAt: now,
		updatedAt: now,
	};
};

export const updateUser = (
	user: User,
	arg: {
		email?: string;
		emailVerified?: boolean;
		name?: string;
		iconUrl?: string | null;
	},
): User => {
	const now = new Date();

	return {
		...user,
		email: arg.email ?? user.email,
		emailVerified: arg.emailVerified !== undefined ? arg.emailVerified : user.emailVerified,
		name: arg.name ?? user.name,
		iconUrl: arg.iconUrl ?? user.iconUrl,
		updatedAt: now,
	};
};
