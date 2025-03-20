import Elysia, { t } from "elysia";
import { isErr } from "../../common/utils";
import { newUserId } from "../../domain/value-object";
import { TradeListPresenter } from "../../interface-adapter/presenters";
import { authGuard } from "../../modules/auth-guard";
import { BadRequestException, InternalServerErrorException } from "../../modules/error";
import { getAllFriendTradesUseCase } from "../global-instances";

export const GetAllFriendTradesRouter = new Elysia().use(authGuard()).get(
	"/friends/:friendId/trades",
	async ({ params: { friendId }, user }) => {
		const result = await getAllFriendTradesUseCase.execute(user.id, newUserId(friendId));

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
		detail: {
			tags: ["Trade"],
		},
	},
);
