import { err } from "../../../common/utils";
import type { UserId } from "../../../domain/value-object";
import type { IPackRepository } from "../../../interface-adapter/repositories/pack";
import type { GetFriendPackUseCaseResult, IGetFriendPackUseCase } from "./interfaces/get-friend-pack.usecase.interface";

export class GetFriendPackUseCase implements IGetFriendPackUseCase {
	constructor(private readonly packRepository: IPackRepository) {}

	public async execute(userId: UserId, friendId: UserId): Promise<GetFriendPackUseCaseResult> {
		const pack = await this.packRepository.findByCreateUserIdAndTargetUserId(userId, friendId);
		if (pack === null) {
			return err("NOT_FRIEND");
		}
		return { pack };
	}
}
