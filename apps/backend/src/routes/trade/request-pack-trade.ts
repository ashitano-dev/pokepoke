import Elysia from "elysia";
import { authGuard } from "../../modules/auth-guard";
import { tradeRequestUseCase } from "../global-instances";

export const RequestPackTradeRouter = new Elysia().use(authGuard()).post(
	"/trades",
	async ({ user }) => {
		const result = await tradeRequestUseCase.execute(user.id);

		return {
			tradeId: result.trade.id,
		};
	},
	{
		detail: {
			tags: ["Trade"],
		},
	},
);
