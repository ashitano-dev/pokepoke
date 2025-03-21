import type { UserId } from "../../../domain/value-object";
import type { IUserRepository } from "../../../interface-adapter/repositories/user";
import type {
	GetUserFriendsUseCaseResult,
	IGetUserFriendsUseCase,
} from "./interfaces/get-user-friends.usecase.interface";

export class GetUserFriendsUseCase implements IGetUserFriendsUseCase {
	constructor(private readonly userRepository: IUserRepository) {}

	public async execute(userId: UserId): Promise<GetUserFriendsUseCaseResult> {
		const friends = await this.userRepository.findFriendsByUserId(userId);

		return { friends };
	}
}
