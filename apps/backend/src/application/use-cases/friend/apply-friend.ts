import { ulid } from "ulid";
import { err } from "../../../common/utils";
import { type User, isExpiredFriendInviteToken } from "../../../domain/entities";
import { newFriendInviteTokenId } from "../../../domain/value-object";
import type { IFriendInviteTokenRepository } from "../../../interface-adapter/repositories/friend-invite-token";
import type { IUserRepository } from "../../../interface-adapter/repositories/user";
import type { ApplyFriendUseCaseResult, IApplyFriendUseCase } from "./interfaces/apply-friend.interface";

export class ApplyFriendUseCase implements IApplyFriendUseCase {
	constructor(
		private readonly friendInviteTokenRepository: IFriendInviteTokenRepository,
		private readonly userRepository: IUserRepository,
	) {}

	public async execute(token: string, me: User): Promise<ApplyFriendUseCaseResult> {
		const [{ user, friendInviteToken }, myFriends] = await Promise.all([
			this.friendInviteTokenRepository.findFriendInviteTokenAndUserByToken(token),
			this.userRepository.findFriendsByUserId(me.id),
		]);

		if (!user || !friendInviteToken) {
			return err("INVALID_TOKEN");
		}

		if (myFriends.some(friend => friend.id === user.id)) {
			return err("ALREADY_FRIENDED");
		}

		await this.friendInviteTokenRepository.deleteByUserId(user.id);

		if (isExpiredFriendInviteToken(friendInviteToken)) {
			return err("TOKEN_IS_EXPIRED");
		}

		await this.userRepository.addFriend({
			id: newFriendInviteTokenId(ulid()),
			userId: me.id,
			friendId: user.id,
		});
	}
}
