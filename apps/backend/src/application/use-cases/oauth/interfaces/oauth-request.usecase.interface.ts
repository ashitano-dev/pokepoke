import type { Err, Result } from "../../../../common/utils";
import type { OAuthProvider } from "../../../../domain/value-object";

export type OAuthRequestUseCaseSuccessResult = {
	state: string;
	codeVerifier: string;
	redirectToClientUrl: URL;
	redirectToProviderUrl: URL;
};

export type OAuthRequestUseCaseErrorResult = Err<"INVALID_REDIRECT_URL">;

export type OAuthRequestUseCaseResult = Result<OAuthRequestUseCaseSuccessResult, OAuthRequestUseCaseErrorResult>;

export interface IOAuthRequestUseCase {
	execute(
		provider: OAuthProvider,
		clientBaseUrl: URL,
		queryRedirectUrl: string,
		providerRedirectUrl: string,
	): OAuthRequestUseCaseResult;
}
