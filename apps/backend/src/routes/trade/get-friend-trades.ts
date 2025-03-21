import Elysia, { t } from "elysia";
import { isErr } from "../../common/utils";
import { newUserId } from "../../domain/value-object";
import { TradeListPresenter } from "../../interface-adapter/presenters";
import { TradeListResponseSchema } from "../../interface-adapter/presenters/trade";
import { AuthGuardResponseSchema, authGuard } from "../../modules/auth-guard";
import {
	BadRequestException,
	ErrorResponseSchema,
	InternalServerErrorException,
	InternalServerErrorResponseSchema,
} from "../../modules/error";
import { getFriendTradesUseCase } from "../global-instances";

export const GetFriendTradesRouter = new Elysia().use(authGuard()).get(
	"/friends/:friendId/trades",
	async ({ params: { friendId }, user }) => {
		const result = await getFriendTradesUseCase.execute(user.id, newUserId(friendId));

		if (isErr(result)) {
			const { code } = result;

			switch (code) {
				case "NOT_FRIEND":
				case "PACK_NOT_FOUND":
					throw new BadRequestException({ code });
				default:
					throw new InternalServerErrorException({
						name: "UNKNOWN_ERROR",
						message: "Unknown GetAllFriendTradesUseCase error result.",
					});
			}
		}

		return TradeListPresenter(result.pack, result.trades);
	},
	{
		params: t.Object({
			friendId: t.String(),
		}),
		response: {
			200: TradeListResponseSchema,
			400: t.Union([ErrorResponseSchema("NOT_FRIEND"), ErrorResponseSchema("PACK_NOT_FOUND")]),
			401: AuthGuardResponseSchema[401],
			500: InternalServerErrorResponseSchema,
		},
		detail: {
			tags: ["Trade"],
		},
	},
);
