import { eq } from "drizzle-orm";
import type { FriendInviteToken, User } from "../../../domain/entities";
import { type UserId, newFriendInviteTokenId, newUserId } from "../../../domain/value-object";
import type { DrizzleService } from "../../../infrastructure/drizzle";
import type { IFriendInviteTokenRepository } from "./interfaces/friend-invite-token.repository.interface";

interface FoundUserDto {
	id: string;
	email: string;
	emailVerified: boolean;
	name: string;
	iconUrl: string | null;
	createdAt: Date;
	updatedAt: Date;
}

interface FoundFriendInviteTokenDto {
	id: string;
	token: string;
	userId: string;
	createdAt: Date;
	expiresAt: Date;
}

export class FriendInviteTokenRepository implements IFriendInviteTokenRepository {
	constructor(private readonly drizzleService: DrizzleService) {}

	public async findFriendInviteTokenAndUserByToken(
		token: string,
	): Promise<{ user: User; friendInviteToken: FriendInviteToken } | { user: null; friendInviteToken: null }> {
		const result = await this.drizzleService.db
			.select()
			.from(this.drizzleService.schema.friendInviteTokens)
			.innerJoin(
				this.drizzleService.schema.users,
				eq(this.drizzleService.schema.friendInviteTokens.userId, this.drizzleService.schema.users.id),
			)
			.where(eq(this.drizzleService.schema.friendInviteTokens.token, token));

		if (result.length > 1) {
			throw new Error("Multiple friend invite tokens found for the same token");
		}

		return result.length === 1
			? {
					user: this.convertToUser(result[0]!.users),
					friendInviteToken: this.convertToFriendInviteToken(result[0]!.friend_invite_tokens),
				}
			: { user: null, friendInviteToken: null };
	}

	public async save(token: FriendInviteToken): Promise<void> {
		await this.drizzleService.db.insert(this.drizzleService.schema.friendInviteTokens).values(token);
	}

	public async deleteByUserId(userId: UserId): Promise<void> {
		await this.drizzleService.db
			.delete(this.drizzleService.schema.friendInviteTokens)
			.where(eq(this.drizzleService.schema.friendInviteTokens.userId, userId));
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

	private convertToFriendInviteToken(dto: FoundFriendInviteTokenDto): FriendInviteToken {
		return {
			id: newFriendInviteTokenId(dto.id),
			token: dto.token,
			userId: newUserId(dto.userId),
			createdAt: new Date(dto.createdAt),
			expiresAt: new Date(dto.expiresAt),
		};
	}
}
