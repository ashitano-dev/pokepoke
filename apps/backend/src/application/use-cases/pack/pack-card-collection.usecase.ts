import { err } from "../../../common/utils";
import type { UserId } from "../../../domain/value-object";
import type { IPackRepository } from "../../../interface-adapter/repositories/pack";
import type { IUserRepository } from "../../../interface-adapter/repositories/user";
import type {
	IPackCardCollectionUseCase,
	PackCardCollectionResponse,
} from "./interfaces/pack-card-collection.usecase.interface";

export class PackCardCollectionUseCase implements IPackCardCollectionUseCase {
	constructor(
		private readonly packRepository: IPackRepository,
		private readonly userRepository: IUserRepository,
	) {}

	public async execute(ownerUserId: UserId, friendUserId: UserId): Promise<PackCardCollectionResponse> {
		const friendship = await this.userRepository.findFriendshipByUserIds(ownerUserId, friendUserId);

		if (!friendship) {
			return err("NOT_FRIEND");
		}

		const collection = await this.packRepository.findPackCardCollectionByOwnerIdAndFriendshipId(
			friendUserId,
			friendship.id,
		);

		return { collection };
	}
}
