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
		const { user: friend, friendInviteToken } =
			await this.friendInviteTokenRepository.findFriendInviteTokenAndUserByToken(token);

		if (!friend || !friendInviteToken) {
			return err("INVALID_TOKEN");
		}

		const friendship = await this.userRepository.findFriendShipByUserIdAndFriendId(user.id, friend.id);

		if (friendship) {
			return err("ALREADY_FRIENDED");
		}

		await this.friendInviteTokenRepository.deleteByUserId(friend.id);

		if (isExpiredFriendInviteToken(friendInviteToken)) {
			return err("TOKEN_IS_EXPIRED");
		}

		await this.userRepository.addFriend({
			id: newFriendshipId(ulid()),
			userId: user.id,
			friendId: friend.id,
		});

		const userCreatedPack = createPack({
			id: newPackId(ulid()),
			title: `${friend.name} Pack`,
			createUserId: user.id,
			targetUserId: friend.id,
			cards: [],
		});

		const friendCreatedPack = createPack({
			id: newPackId(ulid()),
			title: `${user.name} Pack`,
			createUserId: friend.id,
			targetUserId: user.id,
			cards: [],
		});

		await Promise.all([this.packRepository.save(userCreatedPack), this.packRepository.save(friendCreatedPack)]);
	}
}
