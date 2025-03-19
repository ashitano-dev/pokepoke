import type { FriendInviteToken, User } from "../../../../domain/entities";
import type { UserId } from "../../../../domain/value-object";

export interface IFriendInviteTokenRepository {
	findFriendInviteTokenAndUserByToken(token: string): Promise<
		| {
				user: User;
				friendInviteToken: FriendInviteToken;
		  }
		| {
				user: null;
				friendInviteToken: null;
		  }
	>;
	save(token: FriendInviteToken): Promise<void>;
	deleteByUserId(userId: UserId): Promise<void>;
}
