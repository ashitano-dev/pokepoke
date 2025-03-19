import type { OAuth2Tokens } from "arctic";

export interface AccountInfo {
	id: string;
	email: string;
	emailVerified: boolean;
	name: string;
	iconUrl: string | null;
}

export interface IOAuthProviderGateway {
	genAuthUrl(state: string, codeVerifier: string): URL;
	getTokens(code: string, codeVerifier: string): Promise<OAuth2Tokens>;
	getAccountInfo(accessToken: string): Promise<AccountInfo | null>;
	revokeToken(token: string): Promise<void>;
}
