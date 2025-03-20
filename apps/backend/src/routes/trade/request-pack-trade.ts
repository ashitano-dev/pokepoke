import Elysia, { t } from "elysia";
import { isErr } from "../../common/utils";
import { newUserId } from "../../domain/value-object";
import { authGuard } from "../../modules/auth-guard";
import { BadRequestException, InternalServerErrorException } from "../../modules/error";
import { tradeRequestUseCase } from "../global-instances";

export const RequestPackTradeRouter = new Elysia().use(authGuard()).post(
	"/friends/:friendId/trades",
	async ({ params: { friendId }, user }) => {
		const result = await tradeRequestUseCase.execute(user.id, newUserId(friendId));

		if (isErr(result)) {
			const { code } = result;

			switch (code) {
				case "NOT_FRIEND":
					throw new BadRequestException({ code });
				default:
					throw new InternalServerErrorException({
						name: "UNKNOWN_ERROR",
						message: "Unknown TradeRequestUseCase error result.",
					});
			}
		}

		return {
			tradeId: result.trade.id,
		};
	},
	{
		params: t.Object({
			friendId: t.String(),
		}),
		detail: {
			tags: ["Trade"],
		},
	},
);
