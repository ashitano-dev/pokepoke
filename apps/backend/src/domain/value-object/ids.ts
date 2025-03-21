import type { NewType } from "../../common/utils";

export type UserId = NewType<"UserId", string>;

export const newUserId = (rawUserId: string) => {
	return rawUserId as UserId;
};

export type SessionId = NewType<"SessionId", string>;

export const newSessionId = (rawSessionId: string) => {
	return rawSessionId as SessionId;
};

export type OAuthProviderId = NewType<"OAuthProviderId", string>;

export const newOAuthProviderId = (rawOAuthProviderId: string) => {
	return rawOAuthProviderId as OAuthProviderId;
};

export type FriendInviteTokenId = NewType<"FriendInviteTokenId", string>;

export const newFriendInviteTokenId = (rawFriendInviteToken: string) => {
	return rawFriendInviteToken as FriendInviteTokenId;
};

export type FriendshipId = NewType<"FriendshipId", string>;

export const newFriendshipId = (rawFriendshipId: string) => {
	return rawFriendshipId as FriendshipId;
};

export type CardId = NewType<"CardId", string>;

export const newCardId = (rawCardId: string) => {
	return rawCardId as CardId;
};

export type PackId = NewType<"PackId", string>;

export const newPackId = (rawPackId: string) => {
	return rawPackId as PackId;
};

export type TradeId = NewType<"TradeId", string>;

export const newTradeId = (rawTradeId: string) => {
	return rawTradeId as TradeId;
};

export type TradCardId = NewType<"TradCardId", string>;

export const newTradCardId = (rawTradCardId: string) => {
	return rawTradCardId as TradCardId;
};
