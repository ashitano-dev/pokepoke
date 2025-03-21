import { getBackendBaseUrl } from "@pokepoke/core/utils";
import { ENV } from "../../modules/env";
import type { CardId, PackId } from "../value-object";

export interface Card {
	id: CardId;
	packId: PackId;
	title: string;
	location: string | null;
	shootingDate: string | null;
	backgroundColor: string;
	isEx: boolean;
	numDia: number;
	createdAt: Date;
	updatedAt: Date;
}

export const createCard = (arg: {
	id: CardId;
	packId: PackId;
	title: string;
	location: string | null;
	shootingDate: string | null;
	backgroundColor: string;
	isEx: boolean;
	numDia: number;
}): Card => {
	const now = new Date();

	return {
		id: arg.id,
		packId: arg.packId,
		title: arg.title,
		location: arg.location,
		shootingDate: arg.shootingDate,
		backgroundColor: arg.backgroundColor,
		isEx: arg.isEx,
		numDia: arg.numDia,
		createdAt: now,
		updatedAt: now,
	};
};

export const generateCardImageUrl = (card: Card): string => {
	const backendBaseUrl = getBackendBaseUrl(ENV.NODE_ENV === "production");
	return new URL(`/cards/${card.id}/image`, backendBaseUrl).toString();
};
