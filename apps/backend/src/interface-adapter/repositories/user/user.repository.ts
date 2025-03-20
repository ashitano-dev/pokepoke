import { and, eq, or, sql } from "drizzle-orm";
import type { User } from "../../../domain/entities";
import {
	type FriendshipId,
	type SessionId,
	type UserId,
	newFriendshipId,
	newUserId,
} from "../../../domain/value-object";
import type { DrizzleService } from "../../../infrastructure/drizzle";
import type { IUserRepository, createFriendshipDto } from "./interfaces/user.repository.interface";

interface FoundUserDto {
	id: string;
	email: string;
	emailVerified: boolean;
	name: string;
	iconUrl: string | null;
	createdAt: Date;
	updatedAt: Date;
}

export class UserRepository implements IUserRepository {
	constructor(private readonly drizzleService: DrizzleService) {}

	public async findById(id: UserId): Promise<User | null> {
		const users = await this.drizzleService.db
			.select()
			.from(this.drizzleService.schema.users)
			.where(eq(this.drizzleService.schema.users.id, id));

		if (users.length > 1) {
			throw new Error("Multiple users found for the same id");
		}

		return users.length === 1 ? this.convertToUser(users[0]!) : null;
	}

	public async findByEmail(email: string): Promise<User | null> {
		const users = await this.drizzleService.db
			.select()
			.from(this.drizzleService.schema.users)
			.where(eq(this.drizzleService.schema.users.email, email));

		if (users.length > 1) {
			throw new Error("Multiple users found for the same email");
		}
		return users.length === 1 ? this.convertToUser(users[0]!) : null;
	}

	public async findBySessionId(sessionId: SessionId): Promise<User | null> {
		const result = await this.drizzleService.db
			.select()
			.from(this.drizzleService.schema.users)
			.innerJoin(
				this.drizzleService.schema.sessions,
				eq(this.drizzleService.schema.sessions.userId, this.drizzleService.schema.users.id),
			)
			.where(eq(this.drizzleService.schema.sessions.id, sessionId));

		if (result.length > 1) {
			throw new Error("Multiple users found for the same session");
		}

		return result.length === 1 ? this.convertToUser(result[0]!.users) : null;
	}

	public async save(user: User): Promise<void> {
		await this.drizzleService.db
			.insert(this.drizzleService.schema.users)
			.values(user)
			.onConflictDoUpdate({
				target: this.drizzleService.schema.users.id,
				set: {
					email: user.email,
					emailVerified: user.emailVerified,
					name: user.name,
					iconUrl: user.iconUrl,
					updatedAt: user.updatedAt,
				},
			});
	}

	public async delete(id: UserId): Promise<void> {
		await this.drizzleService.db
			.delete(this.drizzleService.schema.users)
			.where(eq(this.drizzleService.schema.users.id, id));
	}

	public async findFriendshipByUserIds(
		_user1: UserId,
		_user2: UserId,
	): Promise<{
		id: FriendshipId;
	} | null> {
		let user1 = _user1;
		let user2 = _user2;

		if (user1 > user2) {
			[user1, user2] = [user2, user1];
		}

		const friendship = await this.drizzleService.db
			.select()
			.from(this.drizzleService.schema.friendships)
			.where(
				and(
					eq(this.drizzleService.schema.friendships.userId1, user1),
					eq(this.drizzleService.schema.friendships.userId2, user2),
				),
			);

		if (friendship.length > 1) {
			throw new Error("Multiple friendships found for the same user and friend");
		}

		return friendship.length === 1 ? { id: newFriendshipId(friendship[0]!.id) } : null;
	}

	public async findFriendsByUserId(userId: UserId): Promise<User[]> {
		// const results = await this.drizzleService.db
		// 	.select()
		// 	.from(this.drizzleService.schema.friendships)
		// 	.innerJoin(
		// 		this.drizzleService.schema.users,
		// 		or(
		// 			eq(this.drizzleService.schema.friendships.firstUserId, this.drizzleService.schema.users.id),
		// 			eq(this.drizzleService.schema.friendships.secondUserId, this.drizzleService.schema.users.id),
		// 		),
		// 	)
		// 	.where(
		// 		and(
		// 			or(
		// 				eq(this.drizzleService.schema.friendships.firstUserId, userId),
		// 				eq(this.drizzleService.schema.friendships.secondUserId, userId),
		// 			),
		// 			not(eq(this.drizzleService.schema.users.id, userId)),
		// 		),
		// 	);

		const friendsQuery = this.drizzleService.db
			.select({
				friendId: sql<string>`
        CASE 
            WHEN ${this.drizzleService.schema.friendships.userId1} = ${userId} THEN ${this.drizzleService.schema.friendships.userId2} 
            WHEN ${this.drizzleService.schema.friendships.userId2} = ${userId} THEN ${this.drizzleService.schema.friendships.userId1} 
        END`.as("friendId"),
			})
			.from(this.drizzleService.schema.friendships)
			.where(
				or(
					eq(this.drizzleService.schema.friendships.userId1, userId),
					eq(this.drizzleService.schema.friendships.userId2, userId),
				),
			)
			.as("friends");

		const results = await this.drizzleService.db
			.select()
			.from(friendsQuery)
			.innerJoin(this.drizzleService.schema.users, eq(friendsQuery.friendId, this.drizzleService.schema.users.id));

		return results.map(r => this.convertToUser(r.users));
	}

	public async addFriend(dto: createFriendshipDto): Promise<void> {
		let { user1, user2 } = dto;
		if (user1 > user2) {
			[user1, user2] = [user2, user1];
		}
		await this.drizzleService.db.insert(this.drizzleService.schema.friendships).values({
			id: dto.id,
			userId1: user1,
			userId2: user2,
		});
	}

	private convertToUser(dto: FoundUserDto): User {
		return {
			id: newUserId(dto.id),
			email: dto.email,
			name: dto.name,
			emailVerified: dto.emailVerified,
			iconUrl: dto.iconUrl,
			createdAt: new Date(dto.createdAt),
			updatedAt: new Date(dto.updatedAt),
		};
	}
}
