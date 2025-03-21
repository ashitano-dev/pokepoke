import Elysia, { t } from "elysia";
import {
	OAUTH_CODE_VERIFIER_COOKIE_NAME,
	OAUTH_REDIRECT_URL_COOKIE_NAME,
	OAUTH_STATE_COOKIE_NAME,
} from "../../common/constants";
import { isErr } from "../../common/utils";
import { newOAuthProvider, oauthProviderSchema } from "../../domain/value-object";
import { CookieService } from "../../modules/cookie";
import { ENV } from "../../modules/env";
import {
	BadRequestException,
	ErrorResponseSchema,
	InternalServerErrorException,
	InternalServerErrorResponseSchema,
} from "../../modules/error";
import { backendBaseUrl, mobileBaseUrl, oauthRequestUseCase } from "../global-instances";

export const OAuthRequestRouter = new Elysia().get(
	"/login/:provider",
	async ({ params: { provider: _provider }, cookie, query: { "redirect-url": queryRedirectUrl = "/" }, set }) => {
		const provider = newOAuthProvider(_provider);

		const providerRedirectUrl = new URL(`auth/login/${provider}/callback`, backendBaseUrl);

		const cookieService = new CookieService(ENV.NODE_ENV === "production", cookie);

		const result = oauthRequestUseCase.execute(
			provider,
			mobileBaseUrl,
			queryRedirectUrl,
			providerRedirectUrl.toString(),
		);

		if (isErr(result)) {
			const { code } = result;
			switch (code) {
				case "INVALID_REDIRECT_URL":
					throw new BadRequestException({
						name: code,
						message: "Invalid redirect URL.",
					});
				default:
					throw new InternalServerErrorException({
						message: "Unknown OAuthRequestUseCase error result.",
					});
			}
		}

		const { state, codeVerifier, redirectToClientUrl, redirectToProviderUrl } = result;

		cookieService.setCookie(OAUTH_STATE_COOKIE_NAME, state, {
			maxAge: 60 * 10,
		});

		cookieService.setCookie(OAUTH_CODE_VERIFIER_COOKIE_NAME, codeVerifier, {
			maxAge: 60 * 10,
		});

		cookieService.setCookie(OAUTH_REDIRECT_URL_COOKIE_NAME, redirectToClientUrl.toString(), {
			maxAge: 60 * 10,
		});

		set.status = 302;
		set.headers = { location: redirectToProviderUrl.toString() };
		return;
	},
	{
		query: t.Object({
			"redirect-url": t.Optional(t.String()),
		}),
		params: t.Object({
			provider: oauthProviderSchema,
		}),
		cookie: t.Cookie({
			[OAUTH_STATE_COOKIE_NAME]: t.Optional(t.String()),
			[OAUTH_CODE_VERIFIER_COOKIE_NAME]: t.Optional(t.String()),
			[OAUTH_REDIRECT_URL_COOKIE_NAME]: t.Optional(t.String()),
		}),
		response: {
			302: t.Void(),
			400: t.Union([ErrorResponseSchema("INVALID_REDIRECT_URL")]),
			500: InternalServerErrorResponseSchema,
		},
		detail: {
			tags: ["Auth"],
		},
	},
);
