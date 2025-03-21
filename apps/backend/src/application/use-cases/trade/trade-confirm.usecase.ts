import { ulid } from "ulid";
import { err } from "../../../common/utils";
import { type Card, updateTrade } from "../../../domain/entities";
import type { TradeId, UserId } from "../../../domain/value-object";
import type { IPackRepository } from "../../../interface-adapter/repositories/pack";
import type { ITradeRepository } from "../../../interface-adapter/repositories/trade";
import type { CreateTradeCardsDto } from "../../../interface-adapter/repositories/trade/";
import type { IUserRepository } from "../../../interface-adapter/repositories/user";
import type { ITradeConfirmUseCase, TradeConfirmUseCaseResult } from "./interfaces/trade-confirm.usecase.interface";

export class TradeConfirmUseCase implements ITradeConfirmUseCase {
	constructor(
		private readonly tradeRepository: ITradeRepository,
		private readonly userRepository: IUserRepository,
		private readonly packRepository: IPackRepository,
	) {}

	public async execute(tradeId: TradeId, confirmUserId: UserId): Promise<TradeConfirmUseCaseResult> {
		const trade = await this.tradeRepository.findById(tradeId);
		if (!trade) {
			return err("NOT_REQUESTED");
		}

		if (trade.requestUserId === confirmUserId) {
			return err("REQUESTER_IS_YOU");
		}

		const [friendship, requestUser] = await Promise.all([
			this.userRepository.findFriendShipByUserIdAndFriendId(confirmUserId, trade.requestUserId),
			this.userRepository.findById(trade.requestUserId),
		]);

		if (!friendship) {
			return err("NOT_FRIEND");
		}

		if (!requestUser) {
			return err("REQUEST_USER_NOT_FOUND");
		}

		if (trade.confirmUserId !== null) {
			return err("ALREADY_CONFIRMED");
		}

		const [requestUserCreatedPack, confirmUserCreatedPack] = await Promise.all([
			this.packRepository.findByCreateUserIdAndTargetUserId(trade.requestUserId, confirmUserId),
			this.packRepository.findByCreateUserIdAndTargetUserId(confirmUserId, trade.requestUserId),
		]);

		if (!requestUserCreatedPack || !confirmUserCreatedPack) {
			return err("PACK_NOT_FOUND");
		}

		if (requestUserCreatedPack.cards.length === 0 || confirmUserCreatedPack.cards.length === 0) {
			return err("CARD_COUNT_TOO_LOW");
		}

		// お互いのパックからランダムに5枚ずつカードを選ぶ 故に逆になっている
		const requestUserTradeCards = this.randomCardChoice(confirmUserCreatedPack.cards, 5);
		const confirmUserTradeCards = this.randomCardChoice(requestUserCreatedPack.cards, 5);

		const updatedTrade = updateTrade(trade, {
			requestUserCreatedPackId: requestUserCreatedPack.id,
			confirmUserCreatedPackId: confirmUserCreatedPack.id,
			confirmUserId: confirmUserId,
		});

		await Promise.all([
			this.tradeRepository.save(updatedTrade),
			this.tradeRepository.addCards(this.convertToTradeCadeDto(tradeId, trade.requestUserId, requestUserTradeCards)),
			this.tradeRepository.addCards(this.convertToTradeCadeDto(tradeId, confirmUserId, confirmUserTradeCards)),
		]);

		return {
			trade: updatedTrade,
			friendUser: requestUser,
			pack: requestUserCreatedPack,
			cards: confirmUserTradeCards,
		};
	}

	private convertToTradeCadeDto(tradeId: TradeId, userId: UserId, cards: Card[]): CreateTradeCardsDto[] {
		const now = new Date();

		return cards.map(card => {
			return {
				id: ulid(),
				tradeId,
				userId,
				cardId: card.id,
				createdAt: now,
				updatedAt: now,
			};
		});
	}

	private randomCardChoice(arr: Card[], count: number): Card[] {
		const result: Card[] = [];
		for (let i = 0; i < count; i++) {
			const randomIndex = Math.floor(Math.random() * arr.length);
			result.push(arr[randomIndex]!);
		}
		return result;
	}
}
