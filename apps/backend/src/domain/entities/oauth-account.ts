import type { OAuthProvider, OAuthProviderId, UserId } from "../value-object";

export interface OAuthAccount {
	provider: OAuthProvider;
	providerId: OAuthProviderId;
	userId: UserId;
	createdAt: Date;
	updatedAt: Date;
}

export const createOAuthAccount = (arg: {
	provider: OAuthProvider;
	providerId: OAuthProviderId;
	userId: UserId;
}): OAuthAccount => {
	const now = new Date();

	return {
		provider: arg.provider,
		providerId: arg.providerId,
		userId: arg.userId,
		createdAt: now,
		updatedAt: now,
	};
};

export const updateOAuthAccount = (
	oauthAccount: OAuthAccount,
	arg: {
		provider?: OAuthProvider;
		providerId?: OAuthProviderId;
		userId?: UserId;
	},
): OAuthAccount => {
	const now = new Date();

	return {
		...oauthAccount,
		provider: arg.provider ?? oauthAccount.provider,
		providerId: arg.providerId ?? oauthAccount.providerId,
		userId: arg.userId ?? oauthAccount.userId,
		updatedAt: now,
	};
};
