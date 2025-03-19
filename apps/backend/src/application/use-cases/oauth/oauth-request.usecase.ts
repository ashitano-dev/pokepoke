import { generateCodeVerifier, generateState } from "arctic";
import { err, validateRedirectUrl } from "../../../common/utils";
import type { OAuthProvider } from "../../../domain/value-object";
import type { OAuthProviderGateway } from "../../../interface-adapter/gateway/oauth-provider";
import type { IOAuthRequestUseCase, OAuthRequestUseCaseResult } from "./interfaces/oauth-request.usecase.interface";

export class OAuthRequestUseCase implements IOAuthRequestUseCase {
	constructor(private readonly oauthProviderGateway: typeof OAuthProviderGateway) {}

	public execute(
		provider: OAuthProvider,
		clientBaseUrl: URL,
		queryRedirectUrl: string,
		providerRedirectUrl: string,
	): OAuthRequestUseCaseResult {
		const providerGateway = this.oauthProviderGateway(provider, providerRedirectUrl);

		const validatedRedirectUrl = validateRedirectUrl(clientBaseUrl, queryRedirectUrl ?? "/");

		if (!validatedRedirectUrl) {
			return err("INVALID_REDIRECT_URL");
		}

		const state = generateState();
		const codeVerifier = generateCodeVerifier();
		const redirectToProvider = providerGateway.genAuthUrl(state, codeVerifier);

		return {
			state,
			codeVerifier,
			redirectToClientUrl: validatedRedirectUrl,
			redirectToProviderUrl: redirectToProvider,
		};
	}
}
