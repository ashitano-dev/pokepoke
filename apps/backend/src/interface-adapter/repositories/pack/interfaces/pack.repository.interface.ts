import type { Pack } from "../../../../domain/entities";
import type { Card } from "../../../../domain/entities";
import type { CardId, UserId } from "../../../../domain/value-object";

export interface CreateCardDto extends Omit<Card, "packId"> {}

export interface IPackRepository {
	save(pack: Pack): Promise<void>;
	findByCreateUserIdAndTargetUserId(createUserId: UserId, targetUserId: UserId): Promise<Pack | null>;

	findCardById(cardId: CardId): Promise<Card | null>;
	addCardByCreateUserIdAndTargetUserId(createUserId: UserId, targetUserId: UserId, card: CreateCardDto): Promise<void>;
}
