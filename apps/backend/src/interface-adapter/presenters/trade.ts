import { type Static, Type } from "@sinclair/typebox";
import { type Card, type Pack, type Trade, generateCardImageUrl, generatePackImageUrl } from "../../domain/entities";

export const TradeResponseSchema = Type.Object({
	id: Type.String(),
	status: Type.String(),
	pack: Type.Object({
		id: Type.String(),
		title: Type.String(),
		imageUrl: Type.String(),
		createdAt: Type.String(),
		updatedAt: Type.String(),
	}),
	cards: Type.Array(
		Type.Object({
			id: Type.String(),
			title: Type.String(),
			location: Type.Union([Type.String(), Type.Null()]),
			shootingDate: Type.Union([Type.String(), Type.Null()]),
			backgroundColor: Type.String(),
			isEx: Type.Boolean(),
			numDia: Type.Number(),
			imageUrl: Type.String(),
			createdAt: Type.String(),
			updatedAt: Type.String(),
		}),
	),
	createdAt: Type.String(),
	updatedAt: Type.String(),
});

export type TradeResponse = Static<typeof TradeResponseSchema>;

export const TradePresenter = (trade: Trade, pack: Pack, cards: Card[]): TradeResponse => {
	return {
		id: trade.id,
		status: trade.status,
		pack: {
			id: pack.id,
			title: pack.title,
			imageUrl: generatePackImageUrl(pack.id),
			createdAt: pack.createdAt.toISOString(),
			updatedAt: pack.updatedAt.toISOString(),
		},
		cards: cards.map(card => ({
			id: card.id,
			title: card.title,
			location: card.location,
			shootingDate: card.shootingDate,
			backgroundColor: card.backgroundColor,
			isEx: card.isEx,
			numDia: card.numDia,
			imageUrl: generateCardImageUrl(card.id),
			createdAt: card.createdAt.toISOString(),
			updatedAt: card.updatedAt.toISOString(),
		})),
		createdAt: trade.createdAt.toISOString(),
		updatedAt: trade.updatedAt.toISOString(),
	};
};

export const TradeListResponseSchema = Type.Object({
	pack: Type.Object({
		id: Type.String(),
		title: Type.String(),
		imageUrl: Type.String(),
		createdAt: Type.String(),
		updatedAt: Type.String(),
	}),
	trades: Type.Array(
		Type.Object({
			id: Type.String(),
			status: Type.String(),
			cards: Type.Array(
				Type.Object({
					id: Type.String(),
					title: Type.String(),
					location: Type.Union([Type.String(), Type.Null()]),
					shootingDate: Type.Union([Type.String(), Type.Null()]),
					backgroundColor: Type.String(),
					isEx: Type.Boolean(),
					numDia: Type.Number(),
					imageUrl: Type.String(),
					createdAt: Type.String(),
					updatedAt: Type.String(),
				}),
			),
			createdAt: Type.String(),
			updatedAt: Type.String(),
		}),
	),
});

export type TradeListResponse = Static<typeof TradeListResponseSchema>;

export const TradeListPresenter = (
	pack: Pack,
	trades: {
		trade: Trade;
		cards: Card[];
	}[],
): TradeListResponse => {
	return {
		pack: {
			id: pack.id,
			title: pack.title,
			imageUrl: generatePackImageUrl(pack.id),
			createdAt: pack.createdAt.toISOString(),
			updatedAt: pack.updatedAt.toISOString(),
		},
		trades: trades.map(({ trade, cards }) => ({
			id: trade.id,
			status: trade.status,
			cards: cards.map(card => ({
				id: card.id,
				title: card.title,
				location: card.location,
				shootingDate: card.shootingDate,
				backgroundColor: card.backgroundColor,
				isEx: card.isEx,
				numDia: card.numDia,
				imageUrl: generateCardImageUrl(card.id),
				createdAt: card.createdAt.toISOString(),
				updatedAt: card.updatedAt.toISOString(),
			})),
			createdAt: trade.createdAt.toISOString(),
			updatedAt: trade.updatedAt.toISOString(),
		})),
	};
};
