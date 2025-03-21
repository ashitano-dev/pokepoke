import { ulid } from "ulid";
import { err } from "../../../common/utils";
import { createTrade } from "../../../domain/entities";
import { type UserId, newTradeId } from "../../../domain/value-object";
import type { ITradeRepository } from "../../../interface-adapter/repositories/trade";
import type { IUserRepository } from "../../../interface-adapter/repositories/user";
import type { ITradeRequestUseCase, TradeRequestUseCaseResult } from "./interfaces/trade-request.usecase.interface";

export class TradeRequestUseCase implements ITradeRequestUseCase {
	constructor(
		private readonly tradeRepository: ITradeRepository,
		private readonly userRepository: IUserRepository,
	) {}

	public async execute(userId: UserId, friendUserId: UserId): Promise<TradeRequestUseCaseResult> {
		const friendship = await this.userRepository.findFriendshipByUserIds(userId, friendUserId);

		if (!friendship) {
			return err("NOT_FRIEND");
		}

		const trade = createTrade({
			id: newTradeId(ulid()),
			friendshipId: friendship.id,
			requestUserId: userId,
		});

		await Promise.all([
			this.tradeRepository.deletePendingTradeByRequestUserIdAndFriendshipId(userId, friendship.id),
			this.tradeRepository.save(trade),
		]);

		return {
			trade: trade,
		};
	}
}
