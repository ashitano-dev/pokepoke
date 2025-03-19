import { getBackendBaseUrl, getMobileBaseScheme } from "@pokepoke/core/utils";
import { SessionTokenService } from "../application/services/session-token";
import { LogoutUseCase } from "../application/use-cases/auth/logout.usecase";
import { OAuthLoginCallbackUseCase, OAuthRequestUseCase } from "../application/use-cases/oauth";
import { DrizzleService } from "../infrastructure/drizzle";
import { OAuthProviderGateway } from "../interface-adapter/gateway/oauth-provider";
import { OAuthAccountRepository } from "../interface-adapter/repositories/oauth-account";
import { SessionRepository } from "../interface-adapter/repositories/session";
import { UserRepository } from "../interface-adapter/repositories/user";
import { ENV } from "../modules/env";

// Constants
export const backendBaseUrl = getBackendBaseUrl(ENV.NODE_ENV === "production");
export const mobileBaseUrl = getMobileBaseScheme();

// DB
const drizzleService = new DrizzleService(ENV.DATABASE_URL);

// Services
const sessionTokenService = new SessionTokenService(ENV.SESSION_PEPPER);

// Repositories
const sessionRepository = new SessionRepository(drizzleService);
const userRepository = new UserRepository(drizzleService);
const oauthAccountRepository = new OAuthAccountRepository(drizzleService);

// UseCases
export const logoutUseCase = new LogoutUseCase(sessionRepository, sessionTokenService);
export const oauthRequestUseCase = new OAuthRequestUseCase(OAuthProviderGateway);
export const oauthLoginCallbackUseCase = new OAuthLoginCallbackUseCase(
	OAuthProviderGateway,
	sessionTokenService,
	sessionRepository,
	oauthAccountRepository,
	userRepository,
);
