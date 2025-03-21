import { getBackendBaseUrl } from "@pokepoke/core/utils";
import { ENV } from "../../modules/env";
import type { FriendshipId, PackId, UserId } from "../value-object";
import type { Card } from "./card";

export interface Pack {
	id: PackId;
	title: string;
	ownerId: UserId;
	friendshipId: FriendshipId;
	cards: Card[];
	createdAt: Date;
	updatedAt: Date;
}

export const createPack = (arg: {
	id: PackId;
	title: string;
	ownerId: UserId;
	friendshipId: FriendshipId;
	cards: Card[];
}): Pack => {
	const now = new Date();

	return {
		id: arg.id,
		title: arg.title,
		ownerId: arg.ownerId,
		friendshipId: arg.friendshipId,
		cards: arg.cards,
		createdAt: now,
		updatedAt: now,
	};
};

export const generatePackImageUrl = (packId: PackId): string => {
	const backendBaseUrl = getBackendBaseUrl(ENV.NODE_ENV === "production");
	return new URL(`/packs/${packId}/image`, backendBaseUrl).toString();
};
