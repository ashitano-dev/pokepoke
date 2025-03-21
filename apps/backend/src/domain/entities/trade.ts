import {
	type CardId,
	type FriendshipId,
	type TradeCardId,
	type TradeId,
	type TradeStatus,
	type UserId,
	newTradeStatus,
} from "../value-object";

export interface Trade {
	id: TradeId;
	friendshipId: FriendshipId;
	requestUserId: UserId;
	status: TradeStatus;
	createdAt: Date;
	updatedAt: Date;
}

export const createTrade = (arg: {
	id: TradeId;
	friendshipId: FriendshipId;
	requestUserId: UserId;
}): Trade => {
	const now = new Date();
	return {
		id: arg.id,
		friendshipId: arg.friendshipId,
		requestUserId: arg.requestUserId,
		status: newTradeStatus("PENDING"),
		createdAt: now,
		updatedAt: now,
	};
};

export const updateTrade = (
	trade: Trade,
	arg: {
		status: TradeStatus;
	},
): Trade => {
	const now = new Date();

	return {
		...trade,
		status: arg.status,
		updatedAt: now,
	};
};

export interface TradeCard {
	id: TradeCardId;
	tradeId: TradeId;
	userId: UserId;
	cardId: CardId;
	createdAt: Date;
	updatedAt: Date;
}

export const createTradeCard = (arg: {
	id: TradeCardId;
	tradeId: TradeId;
	userId: UserId;
	cardId: CardId;
}): TradeCard => {
	const now = new Date();

	return {
		id: arg.id,
		tradeId: arg.tradeId,
		userId: arg.userId,
		cardId: arg.cardId,
		createdAt: now,
		updatedAt: now,
	};
};
