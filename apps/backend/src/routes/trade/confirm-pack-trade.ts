import Elysia, { t } from "elysia";
import { isErr } from "../../common/utils";
import { newTradeId } from "../../domain/value-object";
import { TradePresenter } from "../../interface-adapter/presenters/trade";
import { authGuard } from "../../modules/auth-guard";
import { BadRequestException, InternalServerErrorException } from "../../modules/error";
import { tradeConfirmUseCase } from "../global-instances";

export const ConfirmPackTradeRouter = new Elysia().use(authGuard()).post(
	"/trades/:tradeId/confirm",
	async ({ user, params: { tradeId } }) => {
		const result = await tradeConfirmUseCase.execute(newTradeId(tradeId), user.id);

		if (isErr(result)) {
			const { code } = result;

			switch (code) {
				case "NOT_FRIEND":
				case "ALREADY_CONFIRMED":
				case "NOT_REQUESTED":
				case "REQUESTER_IS_YOU":
				case "CARD_COUNT_TOO_LOW":
				case "PACK_NOT_FOUND":
				case "REQUEST_USER_NOT_FOUND":
				case "CONFIRM_USER_NOT_FOUND":
					throw new BadRequestException();
				default:
					throw new InternalServerErrorException({
						name: "UNKNOWN_ERROR",
						message: "Unknown TradeConfirmUseCase error result.",
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
