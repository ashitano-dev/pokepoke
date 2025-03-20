import type { Err, Result } from "../../../../common/utils";
import type { Card, Pack, Trade, User } from "../../../../domain/entities";
import type { TradeId, UserId } from "../../../../domain/value-object";

export type GetTradeUseCaseSuccessResult = {
	friendUser: User;
	trade: Trade;
	pack: Pack;
	cards: Card[];
};

export type GetTradeUseCaseErrorResult = Err<"TRADE_NOT_FOUND" | "PACK_NOT_FOUND" | "FRIEND_USER_NOT_FOUND">;

export type GetTradeUseCaseResult = Result<GetTradeUseCaseSuccessResult, GetTradeUseCaseErrorResult>;

export interface IGetTradeUseCase {
	execute(tradeId: TradeId, userId: UserId): Promise<GetTradeUseCaseResult>;
}
