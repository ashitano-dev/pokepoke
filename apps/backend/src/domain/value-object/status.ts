import type { NewType } from "../../common/utils";

export type TradeStatus = NewType<"Status", "PENDING" | "CONFIRMED">;

export const newTradeStatus = (raw: "PENDING" | "CONFIRMED") => {
	return raw as TradeStatus;
};
