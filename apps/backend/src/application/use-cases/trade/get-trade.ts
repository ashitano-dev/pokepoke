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

	public async execute(tradeId: TradeId, userId: UserId): Promise<GetTradeUseCaseResult> {
		const trade = await this.tradeRepository.findById(tradeId);

		if (!trade) {
			return err("TRADE_NOT_FOUND");
		}

		if (
			trade.confirmUserCreatedPackId === null ||
			trade.requestUserCreatedPackId === null ||
			trade.confirmUserId === null
		) {
			return err("PACK_NOT_FOUND");
		}

		const friendUserId = trade.requestUserId === userId ? trade.confirmUserId : trade.requestUserId;

		const [friendUser, pack, cards] = await Promise.all([
			this.userRepository.findById(friendUserId),
			this.packRepository.findByCreateUserIdAndTargetUserId(friendUserId, userId),
			this.tradeRepository.findCardsByTradeIdAndUserId(tradeId, userId),
		]);

		if (!pack) {
			return err("PACK_NOT_FOUND");
		}

		if (!friendUser) {
			return err("FRIEND_USER_NOT_FOUND");
		}

		return {
			friendUser,
			trade,
			pack,
			cards,
		};
	}
}
