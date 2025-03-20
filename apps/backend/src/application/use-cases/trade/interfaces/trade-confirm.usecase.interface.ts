import type { Err, Result } from "../../../../common/utils";
import type { Card, Pack, Trade } from "../../../../domain/entities";
import type { TradeId, UserId } from "../../../../domain/value-object";

export type TradeConfirmUseCaseSuccessResult = {
	trade: Trade;
	pack: Pack;
	cards: Card[];
};

export type TradeConfirmUseCaseErrorResult = Err<
	| "NOT_FRIEND"
	| "ALREADY_CONFIRMED"
	| "NOT_REQUESTED"
	| "REQUESTER_IS_YOU"
	| "CARD_COUNT_TOO_LOW"
	| "PACK_NOT_FOUND"
	| "REQUEST_USER_NOT_FOUND"
	| "CONFIRM_USER_NOT_FOUND"
>;

export type TradeConfirmUseCaseResult = Result<TradeConfirmUseCaseSuccessResult, TradeConfirmUseCaseErrorResult>;

export interface ITradeConfirmUseCase {
	execute(tradeId: TradeId, confirmUserId: UserId, requestUserId: UserId): Promise<TradeConfirmUseCaseResult>;
}
