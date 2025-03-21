import { type Static, Type } from "@sinclair/typebox";
import { type Card, type Pack, generateCardImageUrl, generatePackImageUrl } from "../../domain/entities";

export const CardResponseSchema = Type.Object({
	id: Type.String(),
	packId: Type.String(),
	title: Type.String(),
	location: Type.Union([Type.String(), Type.Null()]),
	shootingDate: Type.Union([Type.String(), Type.Null()]),
	backgroundColor: Type.String(),
	isEx: Type.Boolean(),
	numDia: Type.Number(),
	imageUrl: Type.String(),
	createdAt: Type.String(),
	updatedAt: Type.String(),
});

export const PackResponseSchema = Type.Object({
	id: Type.String(),
	title: Type.String(),
	imageUrl: Type.String(),
	cards: Type.Array(CardResponseSchema),
	createdAt: Type.String(),
	updatedAt: Type.String(),
});

export type CardResponse = Static<typeof CardResponseSchema>;
export type PackResponse = Static<typeof PackResponseSchema>;

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
		imageUrl: generateCardImageUrl(card.id),
		createdAt: card.createdAt.toISOString(),
		updatedAt: card.updatedAt.toISOString(),
	};
};

export const PackPresenter = (pack: Pack): PackResponse => {
	return {
		id: pack.id,
		title: pack.title,
		imageUrl: generatePackImageUrl(pack.id),
		cards: pack.cards.map(CardPresenter),
		createdAt: pack.createdAt.toISOString(),
		updatedAt: pack.updatedAt.toISOString(),
	};
};
