import type { User } from "../../domain/entities";

type UserResponse = {
	id: string;
	name: string;
	email: string;
	emailVerified: boolean;
	iconUrl: string | null;
	createdAt: string;
	updatedAt: string;
};

export const UserPresenter = (user: User): UserResponse => {
	return {
		id: user.id,
		name: user.name,
		email: user.email,
		emailVerified: user.emailVerified,
		iconUrl: user.iconUrl,
		createdAt: user.createdAt.toISOString(),
		updatedAt: user.updatedAt.toISOString(),
	};
};
