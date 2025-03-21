import { ulid } from "ulid";
import { createTrade } from "../../../domain/entities";
import { type UserId, newTradeId } from "../../../domain/value-object";
import type { ITradeRepository } from "../../../interface-adapter/repositories/trade";
import type { ITradeRequestUseCase, TradeRequestUseCaseResult } from "./interfaces/trade-request.usecase.interface";

export class TradeRequestUseCase implements ITradeRequestUseCase {
	constructor(private readonly tradeRepository: ITradeRepository) {}

	public async execute(userId: UserId): Promise<TradeRequestUseCaseResult> {
		const trade = createTrade({
			id: newTradeId(ulid()),
			requestUserId: userId,
			requestUserCreatedPackId: null,
			confirmUserId: null,
			confirmUserCreatedPackId: null,
		});

		await Promise.all([
			this.tradeRepository.deleteUnconfirmedTradeByRequestUserId(userId),
			this.tradeRepository.save(trade),
		]);

		return {
			trade: trade,
		};
	}
}
