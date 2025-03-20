import { err } from "../../../common/utils";
import type { TradeId, UserId } from "../../../domain/value-object";
import type { IPackRepository } from "../../../interface-adapter/repositories/pack";
import type { ITradeRepository } from "../../../interface-adapter/repositories/trade";
import type { IUserRepository } from "../../../interface-adapter/repositories/user";
import type { GetTradeUseCaseResult, IGetTradeUseCase } from "./interfaces/get-trade.interface";

export class GetTradeUseCase implements IGetTradeUseCase {
	constructor(
		private readonly tradeRepository: ITradeRepository,
		private readonly userRepository: IUserRepository,
		private readonly packRepository: IPackRepository,
	) {}

	public async execute(tradeId: TradeId, userId: UserId, friendUserId: UserId): Promise<GetTradeUseCaseResult> {
		const [trade, friendship] = await Promise.all([
			this.tradeRepository.findById(tradeId),
			this.userRepository.findFriendshipByUserIds(userId, friendUserId),
		]);

		if (!friendship) {
			return err("NOT_FRIEND");
		}

		if (!trade) {
			return err("TRADE_NOT_FOUND");
		}

		const [pack, cards] = await Promise.all([
			this.packRepository.findByOwnerIdAndFriendshipId(friendUserId, friendship.id),
			this.tradeRepository.findCardsByTradeIdAndUserId(tradeId, userId),
		]);

		if (!pack) {
			return err("PACK_NOT_FOUND");
		}

		return {
			trade,
			pack,
			cards,
		};
	}
}
