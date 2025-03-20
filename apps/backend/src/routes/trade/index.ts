import Elysia from "elysia";
import { ConfirmPackTradeRouter } from "./confirm-pack-trade";
import { GetAllFriendTradesRouter } from "./get-all-friend-trades";
import { GetTradeRouter } from "./get-trade";
import { RequestPackTradeRouter } from "./request-pack-trade";

export const TradeRouter = new Elysia({
	prefix: "/@me",
})
	.use(RequestPackTradeRouter)

	.use(ConfirmPackTradeRouter)
	.use(GetTradeRouter)
	.use(GetAllFriendTradesRouter);
