import { type Static, Type } from "@sinclair/typebox";
import type { User } from "../../domain/entities";

export const UserResponseSchema = Type.Object({
	id: Type.String(),
	name: Type.String(),
	email: Type.String(),
	emailVerified: Type.Boolean(),
	iconUrl: Type.Union([Type.String(), Type.Null()]),
	createdAt: Type.String({ format: "date-time" }),
	updatedAt: Type.String({ format: "date-time" }),
});

export type UserResponse = Static<typeof UserResponseSchema>;

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
