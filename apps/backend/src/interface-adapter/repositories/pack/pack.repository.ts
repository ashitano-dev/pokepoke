import { and, eq, sql } from "drizzle-orm";
import type { Pack } from "../../../domain/entities";
import type { Card } from "../../../domain/entities";
import {
	type CardId,
	type FriendshipId,
	type UserId,
	newCardId,
	newFriendshipId,
	newPackId,
	newUserId,
} from "../../../domain/value-object";
import type { DrizzleService } from "../../../infrastructure/drizzle";
import type { CreateCardDto, IPackRepository } from "./interfaces/pack.repository.interface";

interface FoundPackDto {
	id: string;
	title: string;
	ownerId: string;
	friendshipId: string;
	createdAt: Date;
	updatedAt: Date;
}

interface FoundCardDto {
	id: string;
	packId: string;
	title: string;
	location: string | null;
	shootingDate: string | null;
	backgroundColor: string;
	isEx: boolean;
	numDia: number;
	createdAt: Date;
	updatedAt: Date;
}

export class PackRepository implements IPackRepository {
	constructor(private readonly drizzleService: DrizzleService) {}

	async save(pack: Pack): Promise<void> {
		await this.drizzleService.db
			.insert(this.drizzleService.schema.packs)
			.values({
				id: pack.id,
				title: pack.title,
				ownerId: pack.ownerId,
				friendshipId: pack.friendshipId,
				createdAt: pack.createdAt,
				updatedAt: pack.updatedAt,
			})
			.onConflictDoUpdate({
				target: [this.drizzleService.schema.packs.id],
				set: {
					title: pack.title,
					updatedAt: pack.updatedAt,
				},
			});
	}

	async findByOwnerIdAndFriendshipId(ownerUserId: UserId, friendshipId: FriendshipId): Promise<Pack | null> {
		const packs = await this.drizzleService.db
			.select()
			.from(this.drizzleService.schema.packs)
			.where(
				and(
					eq(this.drizzleService.schema.packs.ownerId, ownerUserId),
					eq(this.drizzleService.schema.packs.friendshipId, friendshipId),
				),
			);

		if (packs.length > 1) {
			throw new Error("Multiple packs found for the same createUserId and targetUserId");
		}

		if (packs.length === 0) {
			return null;
		}

		const cards = await this.drizzleService.db
			.select()
			.from(this.drizzleService.schema.cards)
			.where(eq(this.drizzleService.schema.cards.packId, packs[0]!.id));

		return this.convertToPack(packs[0]!, cards);
	}

	async findCardById(cardId: CardId): Promise<Card | null> {
		const cards = await this.drizzleService.db
			.select()
			.from(this.drizzleService.schema.cards)
			.where(eq(this.drizzleService.schema.cards.id, cardId));

		if (cards.length > 1) {
			throw new Error("Multiple cards found for the same cardId");
		}

		return cards.length === 1 ? this.convertToCard(cards[0]!) : null;
	}

	async addCardByOwnerIdAndFriendshipId(
		ownerUserId: UserId,
		friendshipId: FriendshipId,
		card: CreateCardDto,
	): Promise<void> {
		const pack = await this.findByOwnerIdAndFriendshipId(ownerUserId, friendshipId);

		if (!pack) {
			throw new Error("Pack not found");
		}

		await this.drizzleService.db
			.insert(this.drizzleService.schema.cards)
			.values({
				id: card.id,
				packId: pack.id,
				title: card.title,
				location: card.location,
				shootingDate: card.shootingDate,
				backgroundColor: card.backgroundColor,
				isEx: card.isEx,
				numDia: card.numDia,
				createdAt: card.createdAt,
				updatedAt: card.updatedAt,
			})
			.onConflictDoUpdate({
				target: [this.drizzleService.schema.cards.id],
				set: {
					packId: pack.id,
					title: card.title,
					location: card.location,
					shootingDate: card.shootingDate,
					backgroundColor: card.backgroundColor,
					isEx: card.isEx,
					numDia: card.numDia,
					createdAt: card.createdAt,
					updatedAt: card.updatedAt,
				},
			});
	}

	public async findPackCardCollectionByOwnerIdAndFriendshipId(
		friendUserId: UserId,
		friendshipId: FriendshipId,
	): Promise<
		{
			card: Card;
			count: number;
		}[]
	> {
		const packCardCollection = await this.drizzleService.db
			.select({
				card: this.drizzleService.schema.cards,
				count: sql<number>`COUNT(${this.drizzleService.schema.cards.id})`.mapWith(Number),
			})
			.from(this.drizzleService.schema.tradesCards)
			.innerJoin(
				this.drizzleService.schema.cards,
				eq(this.drizzleService.schema.tradesCards.cardId, this.drizzleService.schema.cards.id),
			)
			.innerJoin(
				this.drizzleService.schema.packs,
				eq(this.drizzleService.schema.cards.packId, this.drizzleService.schema.packs.id),
			)
			.where(
				and(
					eq(this.drizzleService.schema.packs.ownerId, friendUserId),
					eq(this.drizzleService.schema.packs.friendshipId, friendshipId),
				),
			)
			.groupBy(this.drizzleService.schema.cards.id);

		return packCardCollection.map(({ card, count }) => ({
			card: this.convertToCard(card),
			count,
		}));
	}

	private convertToPack(packDto: FoundPackDto, cardDtoList: FoundCardDto[]): Pack {
		return {
			id: newPackId(packDto.id),
			title: packDto.title,
			ownerId: newUserId(packDto.ownerId),
			friendshipId: newFriendshipId(packDto.friendshipId),
			cards: cardDtoList.map(this.convertToCard),
			createdAt: packDto.createdAt,
			updatedAt: packDto.updatedAt,
		};
	}

	private convertToCard(cardDto: FoundCardDto): Card {
		return {
			id: newCardId(cardDto.id),
			packId: newPackId(cardDto.packId),
			title: cardDto.title,
			location: cardDto.location,
			shootingDate: cardDto.shootingDate,
			backgroundColor: cardDto.backgroundColor,
			isEx: cardDto.isEx,
			numDia: cardDto.numDia,
			createdAt: cardDto.createdAt,
			updatedAt: cardDto.updatedAt,
		};
	}
}
