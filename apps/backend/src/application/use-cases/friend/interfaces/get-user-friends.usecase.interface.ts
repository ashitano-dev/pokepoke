import type { Result } from "../../../../common/utils";
import type { User } from "../../../../domain/entities";
import type { UserId } from "../../../../domain/value-object";

export type GetUserFriendsUseCaseSuccessResult = {
	friends: User[];
};

export type GetUserFriendsUseCaseErrorResult = never;

export type GetUserFriendsUseCaseResult = Result<GetUserFriendsUseCaseSuccessResult, GetUserFriendsUseCaseErrorResult>;

export interface IGetUserFriendsUseCase {
	execute(userId: UserId): Promise<GetUserFriendsUseCaseResult>;
}
