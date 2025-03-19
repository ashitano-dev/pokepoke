import { ulid } from "ulid";
import { err } from "../../../common/utils";
import { createOAuthAccount, createSession, createUser } from "../../../domain/entities";
import { type OAuthProvider, newOAuthProviderId, newSessionId, newUserId } from "../../../domain/value-object";
import type { OAuthProviderGateway } from "../../../interface-adapter/gateway/oauth-provider";
import type { IOAuthAccountRepository } from "../../../interface-adapter/repositories/oauth-account";
import type { ISessionRepository } from "../../../interface-adapter/repositories/session";
import type { IUserRepository } from "../../../interface-adapter/repositories/user";
import type { ISessionTokenService } from "../../services/session-token";
import type {
	IOAuthLoginCallbackUseCase,
	OAuthLoginCallbackUseCaseResult,
} from "./interfaces/oauth-login-callback.usecase.interface";

export class OAuthLoginCallbackUseCase implements IOAuthLoginCallbackUseCase {
	constructor(
		private readonly oauthProviderGateway: typeof OAuthProviderGateway,
		private readonly sessionTokenService: ISessionTokenService,
		private readonly sessionRepository: ISessionRepository,
		private readonly oauthAccountRepository: IOAuthAccountRepository,
		private readonly userRepository: IUserRepository,
	) {}

	public async execute(
		code: string,
		codeVerifier: string,
		provider: OAuthProvider,
		providerRedirectUrl: string,
	): Promise<OAuthLoginCallbackUseCaseResult> {
		const providerGateway = this.oauthProviderGateway(provider, providerRedirectUrl);

		const tokens = await providerGateway.getTokens(code, codeVerifier);
		const accessToken = tokens.accessToken();

		const providerAccount = await providerGateway.getAccountInfo(accessToken);

		await providerGateway.revokeToken(accessToken);

		if (!providerAccount) {
			return err("FAILED_TO_GET_ACCOUNT_INFO");
		}

		let existingOAuthAccount = await this.oauthAccountRepository.findByProviderAndProviderId(
			provider,
			newOAuthProviderId(providerAccount.id),
		);

		const sameEmailUser = await this.userRepository.findByEmail(providerAccount.email);

		if (!existingOAuthAccount) {
			if (sameEmailUser) {
				return err("OAUTH_ACCOUNT_NOT_FOUND_BUT_LINKABLE");
			}

			const providerId = newOAuthProviderId(providerAccount.id);

			const user = createUser({
				id: newUserId(ulid()),
				name: providerAccount.name,
				email: providerAccount.email,
				emailVerified: providerAccount.emailVerified,
				iconUrl: providerAccount.iconUrl,
			});

			existingOAuthAccount = createOAuthAccount({
				provider,
				providerId,
				userId: user.id,
			});

			await this.userRepository.save(user);
			await this.oauthAccountRepository.save(existingOAuthAccount);
		}

		const sessionToken = this.sessionTokenService.generateSessionToken();
		const sessionId = newSessionId(this.sessionTokenService.hashSessionToken(sessionToken));
		const session = createSession({
			id: sessionId,
			userId: existingOAuthAccount.userId,
		});

		await this.sessionRepository.save(session);

		return {
			session,
			sessionToken,
		};
	}
}
