import type { User } from "../../../../domain/entities";
import type { FriendshipId, SessionId, UserId } from "../../../../domain/value-object";

export type createFriendshipDto = { id: FriendshipId; user1: UserId; user2: UserId };

export interface IUserRepository {
	// search for a user by id
	findById(id: UserId): Promise<User | null>;

	// search for a user by email
	findByEmail(email: string): Promise<User | null>;

	// search for a user by session id
	findBySessionId(sessionId: SessionId): Promise<User | null>;

	// create or update a user
	save(user: User): Promise<void>;

	// delete a user
	delete(id: UserId): Promise<void>;

	findFriendshipByUserIds(
		user1: UserId,
		user2: UserId,
	): Promise<{
		id: FriendshipId;
	} | null>;

	findFriendsByUserId(userId: UserId): Promise<User[]>;

	addFriend(dto: createFriendshipDto): Promise<void>;
}
