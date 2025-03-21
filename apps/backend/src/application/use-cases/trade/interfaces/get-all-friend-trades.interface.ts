import type { Err, Result } from "../../../../common/utils";
import type { Card, Pack, Trade } from "../../../../domain/entities";
import type { UserId } from "../../../../domain/value-object";

export type GetAllFriendTradesUseCaseSuccessResult = {
	pack: Pack;
	trades: {
		trade: Trade;
		cards: Card[];
	}[];
};

export type GetAllFriendTradesUseCaseErrorResult = Err<"NOT_FRIEND" | "PACK_NOT_FOUND">;

export type GetAllFriendTradesUseCaseResult = Result<
	GetAllFriendTradesUseCaseSuccessResult,
	GetAllFriendTradesUseCaseErrorResult
>;

export interface IGetAllFriendTradesUseCase {
	execute(userId: UserId, friendUserId: UserId): Promise<GetAllFriendTradesUseCaseResult>;
}
