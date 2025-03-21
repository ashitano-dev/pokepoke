import { err } from "../../../common/utils";
import type { UserId } from "../../../domain/value-object";
import type { IPackRepository } from "../../../interface-adapter/repositories/pack";
import type { ITradeRepository } from "../../../interface-adapter/repositories/trade";
import type { UserRepository } from "../../../interface-adapter/repositories/user";
import type {
	GetAllFriendTradesUseCaseResult,
	IGetAllFriendTradesUseCase,
} from "./interfaces/get-all-friend-trades.interface";

export class GetAllFriendTradesUseCase implements IGetAllFriendTradesUseCase {
	constructor(
		private readonly tradeRepository: ITradeRepository,
		private readonly userRepository: UserRepository,
		private readonly packRepository: IPackRepository,
	) {}

	public async execute(userId: UserId, friendUserId: UserId): Promise<GetAllFriendTradesUseCaseResult> {
		const friendship = await this.userRepository.findFriendshipByUserIds(userId, friendUserId);

		if (!friendship) {
			return err("NOT_FRIEND");
		}

		await this.tradeRepository.deletePendingTradeByRequestUserIdAndFriendshipId(userId, friendship.id);

		const [trades, pack] = await Promise.all([
			this.tradeRepository.findManyByFriendshipId(friendship.id),
			// フレンドがつくった自分のパックを取得
			this.packRepository.findByOwnerIdAndFriendshipId(friendUserId, friendship.id),
		]);

		if (!pack) {
			return err("PACK_NOT_FOUND");
		}

		const result = await Promise.all(
			trades.map(async trade => {
				const cards = await this.tradeRepository.findCardsByTradeIdAndUserId(trade.id, userId);

				return {
					trade,
					cards,
				};
			}),
		);

		return {
			pack,
			trades: result,
		};
	}
}
