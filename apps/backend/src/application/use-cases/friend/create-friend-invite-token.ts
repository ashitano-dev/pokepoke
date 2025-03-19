import { ulid } from "ulid";
import { generateRandomString } from "../../../common/utils";
import { createFriendInviteToken } from "../../../domain/entities";
import { type UserId, newFriendInviteTokenId } from "../../../domain/value-object";
import type { IFriendInviteTokenRepository } from "../../../interface-adapter/repositories/friend-invite-token";
import type { ICreateFriendInviteTokenUseCase } from "./interfaces/create-friend-invite-token.interface";

export class CreateFriendInviteTokenUseCase implements ICreateFriendInviteTokenUseCase {
	constructor(private readonly friendInviteTokenRepository: IFriendInviteTokenRepository) {}

	public async execute(userId: UserId) {
		await this.friendInviteTokenRepository.deleteByUserId(userId);

		const token = generateRandomString(32);

		const friendInviteToken = createFriendInviteToken({
			id: newFriendInviteTokenId(ulid()),
			userId,
			token,
		});

		await this.friendInviteTokenRepository.save(friendInviteToken);

		return { friendInviteToken };
	}
}
