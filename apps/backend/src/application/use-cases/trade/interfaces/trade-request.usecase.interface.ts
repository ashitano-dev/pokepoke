import type { Err, Result } from "../../../../common/utils";
import type { Trade } from "../../../../domain/entities";
import type { UserId } from "../../../../domain/value-object";

export type TradeRequestUseCaseSuccessResult = {
	trade: Trade;
};

export type TradeRequestUseCaseErrorResult = Err<"NOT_FRIEND">;

export type TradeRequestUseCaseResult = Result<TradeRequestUseCaseSuccessResult, TradeRequestUseCaseErrorResult>;

export interface ITradeRequestUseCase {
	execute(userId: UserId, friendUserId: UserId): Promise<TradeRequestUseCaseResult>;
}
