import { and, eq, isNull, or } from "drizzle-orm";
import type { Card, Trade } from "../../../domain/entities";
import { type TradeId, type UserId, newCardId, newPackId, newTradeId, newUserId } from "../../../domain/value-object";
import type { DrizzleService } from "../../../infrastructure/drizzle";
import type { CreateTradeCardsDto, ITradeRepository } from "./interfaces/trade.repository.interface";

interface FoundTradeDto {
	id: string;
	requestUserId: string;
	requestUserCreatedPackId: string | null;
	confirmUserId: string | null;
	confirmUserCreatedPackId: string | null;
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

export class TradeRepository implements ITradeRepository {
	constructor(private readonly drizzleService: DrizzleService) {}

	public async findById(id: TradeId): Promise<Trade | null> {
		const trades = await this.drizzleService.db
			.select()
			.from(this.drizzleService.schema.trades)
			.where(eq(this.drizzleService.schema.trades.id, id));

		if (trades.length > 1) {
			throw new Error("Found multiple trades with the same ID");
		}

		return trades.length === 0 ? null : this.convertToTrade(trades[0]!);
	}

	public async findManyByUserIdAndFriendUserId(userId: UserId, friendUserId: UserId): Promise<Trade[]> {
		const trades = await this.drizzleService.db
			.select()
			.from(this.drizzleService.schema.trades)
			.where(
				or(
					and(
						eq(this.drizzleService.schema.trades.requestUserId, userId),
						eq(this.drizzleService.schema.trades.confirmUserId, friendUserId),
					),
					and(
						eq(this.drizzleService.schema.trades.requestUserId, friendUserId),
						eq(this.drizzleService.schema.trades.confirmUserId, userId),
					),
				),
			);

		return trades.map(this.convertToTrade);
	}

	public async save(trade: Trade): Promise<void> {
		await this.drizzleService.db
			.insert(this.drizzleService.schema.trades)
			.values({
				id: trade.id,
				requestUserId: trade.requestUserId,
				requestUserCreatedPackId: trade.requestUserCreatedPackId,
				confirmUserId: trade.confirmUserId,
				confirmUserCreatedPackId: trade.confirmUserCreatedPackId,
				createdAt: trade.createdAt,
				updatedAt: trade.updatedAt,
			})
			.onConflictDoUpdate({
				target: [this.drizzleService.schema.trades.id],
				set: {
					requestUserCreatedPackId: trade.requestUserCreatedPackId,
					confirmUserId: trade.confirmUserId,
					confirmUserCreatedPackId: trade.confirmUserCreatedPackId,
					updatedAt: trade.updatedAt,
				},
			});
	}

	public async findCardsByTradeIdAndUserId(tradeId: TradeId, userId: UserId): Promise<Card[]> {
		const cardIdsQuery = this.drizzleService.db
			.select({
				cardId: this.drizzleService.schema.tradesCards.cardId,
			})
			.from(this.drizzleService.schema.tradesCards)
			.where(
				and(
					eq(this.drizzleService.schema.tradesCards.userId, userId),
					eq(this.drizzleService.schema.tradesCards.tradeId, tradeId),
				),
			)
			.as("cardIdsQuery");

		const cards = await this.drizzleService.db
			.select({
				cards: this.drizzleService.schema.cards,
			})
			.from(this.drizzleService.schema.cards)
			.innerJoin(cardIdsQuery, eq(this.drizzleService.schema.cards.id, cardIdsQuery.cardId));

		return cards.map(({ cards }) => this.convertToCard(cards));
	}

	public async addCards(tradeCardDtoList: CreateTradeCardsDto[]): Promise<void> {
		await this.drizzleService.db.insert(this.drizzleService.schema.tradesCards).values(tradeCardDtoList);
	}

	public async deleteUnconfirmedTradeByRequestUserId(requestUserId: UserId): Promise<void> {
		await this.drizzleService.db
			.delete(this.drizzleService.schema.trades)
			.where(
				and(
					eq(this.drizzleService.schema.trades.requestUserId, requestUserId),
					isNull(this.drizzleService.schema.trades.confirmUserId),
				),
			);
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

	private convertToTrade(tradeDto: FoundTradeDto): Trade {
		return {
			id: newTradeId(tradeDto.id),
			requestUserId: newUserId(tradeDto.requestUserId),
			requestUserCreatedPackId: tradeDto.requestUserCreatedPackId ? newPackId(tradeDto.requestUserCreatedPackId) : null,
			confirmUserId: tradeDto.confirmUserId ? newUserId(tradeDto.confirmUserId) : null,
			confirmUserCreatedPackId: tradeDto.confirmUserCreatedPackId ? newPackId(tradeDto.confirmUserCreatedPackId) : null,
			createdAt: tradeDto.createdAt,
			updatedAt: tradeDto.updatedAt,
		};
	}
}
