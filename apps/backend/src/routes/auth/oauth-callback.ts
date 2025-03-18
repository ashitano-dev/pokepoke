import Elysia, { t } from "elysia";
import {
	OAUTH_CODE_VERIFIER_COOKIE_NAME,
	OAUTH_REDIRECT_URL_COOKIE_NAME,
	OAUTH_STATE_COOKIE_NAME,
} from "../../common/constants";
import { convertRedirectableMobileScheme, isErr, validateRedirectUrl } from "../../common/utils";
import { newOAuthProvider, oauthProviderSchema } from "../../domain/value-object";
import { CookieService } from "../../modules/cookie";
import { ENV } from "../../modules/env";
import { BadRequestException, InternalServerErrorException } from "../../modules/error";
import { backendBaseUrl, mobileBaseUrl, oauthLoginCallbackUseCase } from "../global-instances";

export const OAuthCallbackRouter = new Elysia().get(
	"/login/:provider/callback",
	async ({ cookie, params: { provider: _provider }, query: { code, state: queryState, error }, set }) => {
		const provider = newOAuthProvider(_provider);

		const providerRedirectUrl = new URL(`auth/login/${provider}/callback`, backendBaseUrl);

		const cookieService = new CookieService(ENV.NODE_ENV === "production", cookie);

		const cookieState = cookieService.getCookie(OAUTH_STATE_COOKIE_NAME);
		const codeVerifier = cookieService.getCookie(OAUTH_CODE_VERIFIER_COOKIE_NAME);
		const redirectUrlCookieValue = cookieService.getCookie(OAUTH_REDIRECT_URL_COOKIE_NAME);

		const redirectToClientUrl = validateRedirectUrl(mobileBaseUrl, redirectUrlCookieValue ?? "/");

		if (!redirectToClientUrl) {
			throw new BadRequestException({
				name: "INVALID_REDIRECT_URL",
				message: "Invalid redirect URL",
			});
		}

		if (error) {
			if (error === "access_denied") {
				redirectToClientUrl.searchParams.set("error", "ACCESS_DENIED");

				set.headers.location = redirectToClientUrl.toString();
				set.status = 302;
				return;
			}

			redirectToClientUrl.searchParams.set("error", "PROVIDER_ERROR");

			set.headers.location = redirectToClientUrl.toString();
			set.status = 302;
			return;
		}

		if (!code || !queryState || queryState !== cookieState) {
			redirectToClientUrl.searchParams.set("error", "INVALID_STATE");

			set.headers.location = redirectToClientUrl.toString();
			set.status = 302;
			return;
		}

		const result = await oauthLoginCallbackUseCase.execute(
			code,
			codeVerifier,
			provider,
			providerRedirectUrl.toString(),
		);

		cookieService.deleteCookie(OAUTH_STATE_COOKIE_NAME);
		cookieService.deleteCookie(OAUTH_CODE_VERIFIER_COOKIE_NAME);
		cookieService.deleteCookie(OAUTH_REDIRECT_URL_COOKIE_NAME);

		if (isErr(result)) {
			switch (result.code) {
				case "FAILED_TO_GET_ACCOUNT_INFO":
				case "OAUTH_ACCOUNT_NOT_FOUND_BUT_LINKABLE":
					redirectToClientUrl.searchParams.set("error", result.code);

					set.headers.location = redirectToClientUrl.toString();
					set.status = 302;
					return;
				default:
					throw new InternalServerErrorException({
						name: "UNKNOWN_ERROR",
						message: "Unknown OAuthLoginCallbackUseCase error result.",
					});
			}
		}

		const { sessionToken } = result;

		redirectToClientUrl.searchParams.set("access-token", sessionToken);

		set.headers["referrer-policy"] = "strict-origin";
		set.headers.location = convertRedirectableMobileScheme(redirectToClientUrl).toString();
		set.status = 302;
		return;
	},
	{
		query: t.Object(
			{
				code: t.Optional(
					t.String({
						minLength: 1,
					}),
				),
				state: t.Optional(
					t.String({
						minLength: 1,
					}),
				),
				error: t.Optional(t.String()),
			},
			{ additionalProperties: true },
		),
		params: t.Object({
			provider: oauthProviderSchema,
		}),
		cookie: t.Cookie({
			[OAUTH_STATE_COOKIE_NAME]: t.String({
				minLength: 1,
			}),
			[OAUTH_REDIRECT_URL_COOKIE_NAME]: t.String({
				minLength: 1,
			}),
			[OAUTH_CODE_VERIFIER_COOKIE_NAME]: t.String({
				minLength: 1,
			}),
		}),
		detail: {
			tags: ["Auth"],
		},
	},
);
