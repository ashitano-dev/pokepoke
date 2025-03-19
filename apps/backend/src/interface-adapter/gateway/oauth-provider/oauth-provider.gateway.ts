import type { OAuthProvider } from "../../../domain/value-object";
import { ENV } from "../../../modules/env";
import type { IOAuthProviderGateway } from "./interfaces/oauth-provider.gateway.interface";
import { DiscordOAuthGateway } from "./providers/discord.gateway";

const OAuthProviderGateway = (provider: OAuthProvider, redirectUrl: string): IOAuthProviderGateway => {
	switch (provider) {
		case "discord":
			return new DiscordOAuthGateway(ENV.DISCORD_CLIENT_ID, ENV.DISCORD_CLIENT_SECRET, redirectUrl);
		default:
			throw new Error(`Unsupported OAuth provider: ${provider}`);
	}
};

export { OAuthProviderGateway };
