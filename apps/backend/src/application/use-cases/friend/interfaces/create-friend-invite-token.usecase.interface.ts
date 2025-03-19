import type { Result } from "../../../../common/utils";
import type { FriendInviteToken } from "../../../../domain/entities";
import type { UserId } from "../../../../domain/value-object";

export type CreateFriendInviteTokenUseCaseSuccessResult = {
	friendInviteToken: FriendInviteToken;
};

export type CreateFriendInviteTokenUseCaseErrorResult = never;

export type CreateFriendInviteTokenUseCaseResult = Result<
	CreateFriendInviteTokenUseCaseSuccessResult,
	CreateFriendInviteTokenUseCaseErrorResult
>;

export interface ICreateFriendInviteTokenUseCase {
	execute(userId: UserId): Promise<CreateFriendInviteTokenUseCaseResult>;
}
