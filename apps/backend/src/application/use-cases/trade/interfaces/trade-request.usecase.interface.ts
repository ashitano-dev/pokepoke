import type { Result } from "../../../../common/utils";
import type { Trade } from "../../../../domain/entities";
import type { UserId } from "../../../../domain/value-object";

export type TradeRequestUseCaseSuccessResult = {
	trade: Trade;
};

export type TradeRequestUseCaseErrorResult = never;

export type TradeRequestUseCaseResult = Result<TradeRequestUseCaseSuccessResult, TradeRequestUseCaseErrorResult>;

export interface ITradeRequestUseCase {
	execute(userId: UserId): Promise<TradeRequestUseCaseResult>;
}
