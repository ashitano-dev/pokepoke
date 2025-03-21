import type { Err, Result } from "../../../../common/utils";
import type { Pack } from "../../../../domain/entities";
import type { UserId } from "../../../../domain/value-object";

export type GetFriendPackUseCaseSuccessResult = {
	pack: Pack;
};

export type GetFriendPackUseCaseErrorResult = Err<"NOT_FRIEND">;

export type GetFriendPackUseCaseResult = Result<GetFriendPackUseCaseSuccessResult, GetFriendPackUseCaseErrorResult>;

export interface IGetFriendPackUseCase {
	execute(userId: UserId, friendId: UserId): Promise<GetFriendPackUseCaseResult>;
}
