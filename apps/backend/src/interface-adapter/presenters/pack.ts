import { type Card, type Pack, generateCardImageUrl } from "../../domain/entities";

type PackResponse = {
	id: string;
	title: string;
	cards: CardResponse[];
	createdAt: string;
	updatedAt: string;
};

type CardResponse = {
	id: string;
	packId: string;
	title: string;
	location: string | null;
	shootingDate: string | null;
	backgroundColor: string;
	isEx: boolean;
	numDia: number;
	imageUrl: string;
	createdAt: string;
	updatedAt: string;
};

export const CardPresenter = (card: Card): CardResponse => {
	return {
		id: card.id,
		packId: card.packId,
		title: card.title,
		location: card.location,
		shootingDate: card.shootingDate,
		backgroundColor: card.backgroundColor,
		isEx: card.isEx,
		numDia: card.numDia,
		imageUrl: generateCardImageUrl(card),
		createdAt: card.createdAt.toISOString(),
		updatedAt: card.updatedAt.toISOString(),
	};
};

export const PackPresenter = (pack: Pack): PackResponse => {
	return {
		id: pack.id,
		title: pack.title,
		cards: pack.cards.map(CardPresenter),
		createdAt: pack.createdAt.toISOString(),
		updatedAt: pack.updatedAt.toISOString(),
	};
};
