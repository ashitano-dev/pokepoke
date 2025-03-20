import type { Card, Pack, Trade, User } from "../../domain/entities";
import { FriendUserPresenter } from "./friend-user";

export const TradePresenter = (friendUser: User, trade: Trade, pack: Pack, cards: Card[]) => {
	return {
		id: trade.id,
		friendUser: FriendUserPresenter(friendUser),
		pack: {
			id: pack.id,
			title: pack.title,
		},
		cards: cards.map(card => ({
			id: card.id,
			title: card.title,
			location: card.location,
			shootingDate: card.shootingDate,
			backgroundColor: card.backgroundColor,
			isEx: card.isEx,
			numDia: card.numDia,
			createdAt: card.createdAt,
			updatedAt: card.updatedAt,
		})),

		createdAt: trade.createdAt,
		updatedAt: trade.updatedAt,
	};
};

export const TradeListPresenter = (
	pack: Pack,
	trades: {
		trade: Trade;
		cards: Card[];
	}[],
) => {
	return {
		pack: {
			id: pack.id,
			title: pack.title,
		},
		trades: trades.map(({ trade, cards }) => ({
			id: trade.id,
			cards: cards.map(card => ({
				id: card.id,
				title: card.title,
				location: card.location,
				shootingDate: card.shootingDate,
				backgroundColor: card.backgroundColor,
				isEx: card.isEx,
				numDia: card.numDia,
				createdAt: card.createdAt,
				updatedAt: card.updatedAt,
			})),
			createdAt: trade.createdAt,
			updatedAt: trade.updatedAt,
		})),
	};
};
