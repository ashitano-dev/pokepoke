import { t } from "elysia";
import type { NewType } from "../../common/utils";

export type OAuthProvider = NewType<"oauth-provider", "discord">;

export const newOAuthProvider = (raw: "discord") => {
	return raw as OAuthProvider;
};

export const oauthProviderSchema = t.Union([t.Literal("discord")]);
