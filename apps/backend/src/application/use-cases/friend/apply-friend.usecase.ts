import { ulid } from "ulid";
import { err } from "../../../common/utils";
import { type User, isExpiredFriendInviteToken } from "../../../domain/entities";
import { createPack } from "../../../domain/entities";
import { newFriendshipId, newPackId } from "../../../domain/value-object";
import type { IFriendInviteTokenRepository } from "../../../interface-adapter/repositories/friend-invite-token";
import type { IPackRepository } from "../../../interface-adapter/repositories/pack";
import type { IUserRepository } from "../../../interface-adapter/repositories/user";
import type { ApplyFriendUseCaseResult, IApplyFriendUseCase } from "./interfaces/apply-friend.usecase.interface";

export class ApplyFriendUseCase implements IApplyFriendUseCase {
	constructor(
		private readonly friendInviteTokenRepository: IFriendInviteTokenRepository,
		private readonly userRepository: IUserRepository,
		private readonly packRepository: IPackRepository,
	) {}

	public async execute(token: string, user: User): Promise<ApplyFriendUseCaseResult> {
		const { user: friendUser, friendInviteToken } =
			await this.friendInviteTokenRepository.findFriendInviteTokenAndUserByToken(token);

		if (!friendUser || !friendInviteToken) {
			return err("INVALID_TOKEN");
		}

		const friendship = await this.userRepository.findFriendshipByUserIds(user.id, friendUser.id);

		if (friendship) {
			return err("ALREADY_FRIENDED");
		}

		await this.friendInviteTokenRepository.deleteByUserId(friendUser.id);

		if (isExpiredFriendInviteToken(friendInviteToken)) {
			return err("TOKEN_IS_EXPIRED");
		}

		const friendshipId = newFriendshipId(ulid());

		await this.userRepository.addFriend({
			id: friendshipId,
			user1: user.id,
			user2: friendUser.id,
		});

		const userCreatedPack = createPack({
			id: newPackId(ulid()),
			title: `${friendUser.name} Pack`,
			ownerId: user.id,
			friendshipId,
			cards: [],
		});

		const friendCreatedPack = createPack({
			id: newPackId(ulid()),
			title: `${user.name} Pack`,
			ownerId: friendUser.id,
			friendshipId,
			cards: [],
		});

		await Promise.all([this.packRepository.save(userCreatedPack), this.packRepository.save(friendCreatedPack)]);
	}
}
