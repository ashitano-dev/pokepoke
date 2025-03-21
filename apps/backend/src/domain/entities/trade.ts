import type { CardId, PackId, TradCardId, TradeId, UserId } from "../value-object";

export interface Trade {
	id: TradeId;
	requestUserId: UserId;
	requestUserCreatedPackId: PackId | null;
	confirmUserId: UserId | null;
	confirmUserCreatedPackId: PackId | null;
	createdAt: Date;
	updatedAt: Date;
}

export const createTrade = (arg: {
	id: TradeId;
	requestUserId: UserId;
	requestUserCreatedPackId: PackId | null;
	confirmUserId: UserId | null;
	confirmUserCreatedPackId: PackId | null;
}): Trade => {
	const now = new Date();
	return {
		id: arg.id,
		requestUserId: arg.requestUserId,
		requestUserCreatedPackId: arg.requestUserCreatedPackId,
		confirmUserId: arg.confirmUserId,
		confirmUserCreatedPackId: arg.confirmUserCreatedPackId,
		createdAt: now,
		updatedAt: now,
	};
};

export const updateTrade = (
	trade: Trade,
	arg: {
		requestUserCreatedPackId?: PackId | null;
		confirmUserId?: UserId | null;
		confirmUserCreatedPackId?: PackId | null;
	},
): Trade => {
	const now = new Date();

	return {
		...trade,
		...arg,
		updatedAt: now,
	};
};

export interface TradCard {
	id: TradCardId;
	tradeId: TradeId;
	userId: UserId;
	cardId: CardId;
	createdAt: Date;
	updatedAt: Date;
}

export const createTradCard = (arg: {
	id: TradCardId;
	tradeId: TradeId;
	userId: UserId;
	cardId: CardId;
}): TradCard => {
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
