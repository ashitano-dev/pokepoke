import type { Pack } from "../../../../domain/entities";
import type { Card } from "../../../../domain/entities";
import type { CardId, FriendshipId, UserId } from "../../../../domain/value-object";

export interface CreateCardDto extends Omit<Card, "packId"> {}

export interface IPackRepository {
	save(pack: Pack): Promise<void>;
	findByOwnerIdAndFriendshipId(ownerUserId: UserId, friendshipId: FriendshipId): Promise<Pack | null>;

	findCardById(cardId: CardId): Promise<Card | null>;
	addCardByOwnerIdAndFriendshipId(ownerUserId: UserId, friendshipId: FriendshipId, card: CreateCardDto): Promise<void>;
}
