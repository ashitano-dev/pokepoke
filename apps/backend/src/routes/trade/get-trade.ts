import Elysia, { t } from "elysia";
import { isErr } from "../../common/utils";
import { newTradeId } from "../../domain/value-object";
import { TradePresenter } from "../../interface-adapter/presenters";
import { authGuard } from "../../modules/auth-guard";
import { BadRequestException, InternalServerErrorException } from "../../modules/error";
import { getTradeUseCase } from "../global-instances";

export const GetTradeRouter = new Elysia().use(authGuard()).get(
	"/trades/:tradeId",
	async ({ params: { tradeId }, user }) => {
		const result = await getTradeUseCase.execute(newTradeId(tradeId), user.id);

		if (isErr(result)) {
			const { code } = result;

			switch (code) {
				case "TRADE_NOT_FOUND":
				case "PACK_NOT_FOUND":
				case "FRIEND_USER_NOT_FOUND":
					throw new BadRequestException({ code });
				default:
					throw new InternalServerErrorException({
						name: "UNKNOWN_ERROR",
						message: "Unknown GetTradeUseCase error result.",
					});
			}
		}

		return TradePresenter(result.friendUser, result.trade, result.pack, result.cards);
	},
	{
		params: t.Object({
			tradeId: t.String(),
		}),
		detail: {
			tags: ["Trade"],
		},
	},
);
