import type { Card, Trade } from "../../../../domain/entities";
import type { CardId, TradeId, UserId } from "../../../../domain/value-object";

export interface CreateTradeCardsDto {
	id: string;
	tradeId: TradeId;
	userId: UserId;
	cardId: CardId;
	createdAt: Date;
	updatedAt: Date;
}

export interface ITradeRepository {
	findById(id: TradeId): Promise<Trade | null>;
	findManyByUserIdAndFriendUserId(userId: UserId, friendUserId: UserId): Promise<Trade[]>;
	save(trade: Trade): Promise<void>;
	deleteUnconfirmedTradeByRequestUserId(requestUserId: UserId): Promise<void>;

	findCardsByTradeIdAndUserId(tradeId: TradeId, userId: UserId): Promise<Card[]>;
	addCards(tradeCardDtoList: CreateTradeCardsDto[]): Promise<void>;
}
