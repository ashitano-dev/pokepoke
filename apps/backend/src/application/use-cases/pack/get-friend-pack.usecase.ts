import { err } from "../../../common/utils";
import type { UserId } from "../../../domain/value-object";
import type { IPackRepository } from "../../../interface-adapter/repositories/pack";
import type { IUserRepository } from "../../../interface-adapter/repositories/user";
import type { GetFriendPackUseCaseResult, IGetFriendPackUseCase } from "./interfaces/get-friend-pack.usecase.interface";

export class GetFriendPackUseCase implements IGetFriendPackUseCase {
	constructor(
		private readonly packRepository: IPackRepository,
		private readonly userRepository: IUserRepository,
	) {}

	public async execute(userId: UserId, friendId: UserId): Promise<GetFriendPackUseCaseResult> {
		const friendship = await this.userRepository.findFriendshipByUserIds(userId, friendId);

		if (!friendship) {
			return err("NOT_FRIEND");
		}

		const pack = await this.packRepository.findByOwnerIdAndFriendshipId(userId, friendship.id);
		if (pack === null) {
			return err("NOT_FRIEND");
		}
		return { pack };
	}
}
