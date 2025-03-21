import { type Static, Type } from "@sinclair/typebox";
import type { User } from "../../domain/entities";

export const FriendUserResponseSchema = Type.Object({
	id: Type.String(),
	name: Type.String(),
	iconUrl: Type.Union([Type.String(), Type.Null()]),
});

export type FriendUserResponse = Static<typeof FriendUserResponseSchema>;

export const FriendUserPresenter = (friendUser: User): FriendUserResponse => {
	return {
		id: friendUser.id,
		name: friendUser.name,
		iconUrl: friendUser.iconUrl,
	};
};
