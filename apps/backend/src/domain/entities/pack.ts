import type { PackId, UserId } from "../value-object";
import type { Card } from "./card";

export interface Pack {
	id: PackId;
	title: string;
	createUserId: UserId; // パックを作成したユーザー
	targetUserId: UserId; // パックの対象ユーザー
	cards: Card[];
	createdAt: Date;
	updatedAt: Date;
}

export const createPack = (arg: {
	id: PackId;
	title: string;
	createUserId: UserId;
	targetUserId: UserId;
	cards: Card[];
}): Pack => {
	const now = new Date();

	return {
		id: arg.id,
		title: arg.title,
		createUserId: arg.createUserId,
		targetUserId: arg.targetUserId,
		cards: arg.cards,
		createdAt: now,
		updatedAt: now,
	};
};
