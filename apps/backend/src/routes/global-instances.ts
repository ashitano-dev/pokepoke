import { getBackendBaseUrl, getMobileBaseScheme } from "@pokepoke/core/utils";
import { SessionTokenService } from "../application/services/session-token";
import { ValidateSessionUseCase } from "../application/use-cases/auth";
import { LogoutUseCase } from "../application/use-cases/auth/logout.usecase";
import {
	ApplyFriendUseCase,
	CreateFriendInviteTokenUseCase,
	GetUserFriendsUseCase,
} from "../application/use-cases/friend";
import { OAuthLoginCallbackUseCase, OAuthRequestUseCase } from "../application/use-cases/oauth";
import {
	AddCardUseCase,
	GetCardImageUseCase,
	GetFriendPackUseCase,
	PackCardCollectionUseCase,
} from "../application/use-cases/pack";
import {
	GetAllFriendTradesUseCase,
	GetTradeUseCase,
	TradeConfirmUseCase,
	TradeRequestUseCase,
} from "../application/use-cases/trade";
import { DrizzleService } from "../infrastructure/drizzle";
import { SupabaseService } from "../infrastructure/supabase";
import { OAuthProviderGateway } from "../interface-adapter/gateway/oauth-provider";
import { FriendInviteTokenRepository } from "../interface-adapter/repositories/friend-invite-token";
import { ImageRepository } from "../interface-adapter/repositories/image";
import { OAuthAccountRepository } from "../interface-adapter/repositories/oauth-account";
import { PackRepository } from "../interface-adapter/repositories/pack";
import { SessionRepository } from "../interface-adapter/repositories/session";
import { TradeRepository } from "../interface-adapter/repositories/trade";
import { UserRepository } from "../interface-adapter/repositories/user";
import { ENV } from "../modules/env";

// Constants
export const backendBaseUrl = getBackendBaseUrl(ENV.NODE_ENV === "production");
export const mobileBaseUrl = getMobileBaseScheme();

// DB
const drizzleService = new DrizzleService(ENV.DATABASE_URL);
const supabaseService = new SupabaseService();

// Services
const sessionTokenService = new SessionTokenService(ENV.SESSION_PEPPER);

// Repositories
const sessionRepository = new SessionRepository(drizzleService);
const userRepository = new UserRepository(drizzleService);
const oauthAccountRepository = new OAuthAccountRepository(drizzleService);
const friendInviteTokenRepository = new FriendInviteTokenRepository(drizzleService);
const packRepository = new PackRepository(drizzleService);
const tradeRepository = new TradeRepository(drizzleService);
const imageRepository = new ImageRepository(supabaseService);

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

export const applyFriendUseCase = new ApplyFriendUseCase(friendInviteTokenRepository, userRepository, packRepository);
export const createFriendInviteTokenUseCase = new CreateFriendInviteTokenUseCase(friendInviteTokenRepository);
export const getUserFriendsUseCase = new GetUserFriendsUseCase(userRepository);
export const addCardUseCase = new AddCardUseCase(imageRepository, packRepository, userRepository);
export const getCardImageUseCase = new GetCardImageUseCase(imageRepository, packRepository);
export const getFriendPackUseCase = new GetFriendPackUseCase(packRepository, userRepository);
export const getTradeUseCase = new GetTradeUseCase(tradeRepository, userRepository, packRepository);
export const getAllFriendTradesUseCase = new GetAllFriendTradesUseCase(tradeRepository, userRepository, packRepository);
export const tradeRequestUseCase = new TradeRequestUseCase(tradeRepository, userRepository);
export const tradeConfirmUseCase = new TradeConfirmUseCase(tradeRepository, userRepository, packRepository);
export const packCardCollectionUseCase = new PackCardCollectionUseCase(packRepository, userRepository);
export const validateSessionUseCase = new ValidateSessionUseCase(
	sessionTokenService,
	sessionRepository,
	userRepository,
);
