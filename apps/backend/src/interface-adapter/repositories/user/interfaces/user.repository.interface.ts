import type { User } from "../../../../domain/entities";
import type { SessionId, UserId } from "../../../../domain/value-object";

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
}
