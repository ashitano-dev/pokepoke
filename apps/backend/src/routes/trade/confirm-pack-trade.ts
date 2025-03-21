import Elysia, { t } from "elysia";
import { isErr } from "../../common/utils";
import { newTradeId, newUserId } from "../../domain/value-object";
import { TradePresenter } from "../../interface-adapter/presenters";
import { TradeResponseSchema } from "../../interface-adapter/presenters/trade";
import { AuthGuardResponseSchema, authGuard } from "../../modules/auth-guard";
import {
	BadRequestException,
	ErrorResponseSchema,
	InternalServerErrorException,
	InternalServerErrorResponseSchema,
} from "../../modules/error";
import { tradeConfirmUseCase } from "../global-instances";

export const ConfirmPackTradeRouter = new Elysia().use(authGuard()).post(
	"/friends/:friendId/trades/:tradeId/confirm",
	async ({ user, params: { tradeId, friendId } }) => {
		const result = await tradeConfirmUseCase.execute(newTradeId(tradeId), user.id, newUserId(friendId));

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

		return TradePresenter(result.trade, result.pack, result.cards);
	},
	{
		params: t.Object({
			friendId: t.String(),
			tradeId: t.String(),
		}),
		response: {
			200: TradeResponseSchema,
			400: t.Union([
				ErrorResponseSchema("NOT_FRIEND"),
				ErrorResponseSchema("ALREADY_CONFIRMED"),
				ErrorResponseSchema("NOT_REQUESTED"),
				ErrorResponseSchema("REQUESTER_IS_YOU"),
				ErrorResponseSchema("CARD_COUNT_TOO_LOW"),
				ErrorResponseSchema("PACK_NOT_FOUND"),
				ErrorResponseSchema("REQUEST_USER_NOT_FOUND"),
				ErrorResponseSchema("CONFIRM_USER_NOT_FOUND"),
			]),
			401: AuthGuardResponseSchema[401],
			500: InternalServerErrorResponseSchema,
		},
		detail: {
			tags: ["Trade"],
		},
	},
);
