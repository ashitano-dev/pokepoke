import { friendInviteTokenExpiresSpan } from "../../common/constants";
import type { FriendInviteTokenId, UserId } from "../value-object";

export interface FriendInviteToken {
	id: FriendInviteTokenId;
	userId: UserId;
	token: string;
	createdAt: Date;
	expiresAt: Date;
}

export const createFriendInviteToken = (arg: {
	id: FriendInviteTokenId;
	userId: UserId;
	token: string;
}) => {
	const now = new Date();

	return {
		id: arg.id,
		userId: arg.userId,
		token: arg.token,
		createdAt: now,
		expiresAt: new Date(friendInviteTokenExpiresSpan.milliseconds() + now.getTime()),
	};
};

export const isExpiredFriendInviteToken = (token: FriendInviteToken): boolean => {
	return token.expiresAt.getTime() < Date.now();
};
