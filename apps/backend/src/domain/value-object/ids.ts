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
