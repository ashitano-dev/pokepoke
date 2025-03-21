import type { Err, Result } from "../../../../common/utils";
import type { Card, Pack, Trade } from "../../../../domain/entities";
import type { UserId } from "../../../../domain/value-object";

export type GetFriendTradesUseCaseSuccessResult = {
	pack: Pack;
	trades: {
		trade: Trade;
		cards: Card[];
	}[];
};

export type GetFriendTradesUseCaseErrorResult = Err<"NOT_FRIEND" | "PACK_NOT_FOUND">;

export type GetAllFriendTradesUseCaseResult = Result<
	GetFriendTradesUseCaseSuccessResult,
	GetFriendTradesUseCaseErrorResult
>;

export interface IGetFriendTradesUseCase {
	execute(userId: UserId, friendUserId: UserId): Promise<GetAllFriendTradesUseCaseResult>;
}
