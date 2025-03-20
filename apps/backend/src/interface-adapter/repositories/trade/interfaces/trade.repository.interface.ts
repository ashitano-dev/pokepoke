import type { Card, Trade } from "../../../../domain/entities";
import type { CardId, FriendshipId, TradeId, UserId } from "../../../../domain/value-object";

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
	findManyByFriendshipId(friendshipId: FriendshipId): Promise<Trade[]>;
	save(trade: Trade): Promise<void>;
	deletePendingTradeByRequestUserIdAndFriendshipId(requestUserId: UserId, friendshipId: FriendshipId): Promise<void>;

	findCardsByTradeIdAndUserId(tradeId: TradeId, userId: UserId): Promise<Card[]>;
	addCards(tradeCardDtoList: CreateTradeCardsDto[]): Promise<void>;
}
