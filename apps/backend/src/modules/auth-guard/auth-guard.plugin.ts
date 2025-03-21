import Elysia, { t } from "elysia";
import { readBearerToken } from "../../common/utils";
import { isErr } from "../../common/utils";
import type { Session, User } from "../../domain/entities";
import { validateSessionUseCase } from "../../routes/global-instances";
import { ErrorResponseSchema, InternalServerErrorException, UnauthorizedException } from "../error";

/**
 * Creates an authentication guard plugin for Elysia with environment configuration.
 *
 * @template T - A boolean indicating whether to include the session token in the derived context.
 * @param {AuthGuardOptions<T>} [options] - Optional configuration for the authentication guard.
 * @param {boolean} [options.requireEmailVerification=true] - Whether email verification is required for authentication.
 * @param {boolean} [options.enableSessionCookieRefresh=true] - Whether to enable session cookie refresh.
 * @param {boolean} [options.includeSessionToken=false] - Whether to include the session token in the derived context.
 * @returns The configured Elysia plugin with derived context.
 *
 * @example
 * const plugin = authGuard({ requireEmailVerification: false, includeSessionToken: true });
 */
const authGuard = <
	T extends boolean,
	U extends Record<string, unknown> = T extends true
		? {
				user: User;
				session: Session;
				sessionToken: string;
			}
		: {
				user: User;
				session: Session;
			},
>(options?: {
	requireEmailVerification?: boolean;
	includeSessionToken?: T;
}) => {
	const { requireEmailVerification = false, includeSessionToken = false } = options ?? {};

	const plugin = new Elysia({
		name: "@pokepoke/auth",
		seed: {
			requireEmailVerification,
			includeSessionToken,
		},
	}).derive<U, "scoped">({ as: "scoped" }, async ({ headers: { authorization } }): Promise<U> => {
		const sessionToken = readBearerToken(authorization ?? "");

		if (!sessionToken) {
			throw new UnauthorizedException();
		}

		const result = await validateSessionUseCase.execute(sessionToken);

		if (isErr(result)) {
			const { code } = result;
			switch (code) {
				case "SESSION_EXPIRED":
				case "SESSION_OR_USER_NOT_FOUND":
					throw new UnauthorizedException({
						name: code,
					});
				default:
					throw new InternalServerErrorException({
						message: "Unknown ValidateSessionUseCase error result.",
					});
			}
		}

		const { user, session } = result;

		if (requireEmailVerification && !user.emailVerified) {
			throw new UnauthorizedException({
				name: "EMAIL_VERIFICATION_IS_REQUIRED",
				message: "Email verification is required.",
			});
		}

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		return (includeSessionToken ? { user, session, sessionToken } : { user, session }) as any;
	});

	return plugin;
};

export const AuthGuardResponseSchema = {
	401: t.Union([
		ErrorResponseSchema("SESSION_EXPIRED"),
		ErrorResponseSchema("SESSION_OR_USER_NOT_FOUND"),
		ErrorResponseSchema("EMAIL_VERIFICATION_IS_REQUIRED"),
	]),
};

export { authGuard };
