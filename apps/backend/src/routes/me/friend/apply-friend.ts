import Elysia, { t } from "elysia";
import { isErr } from "../../../common/utils";
import { AuthGuardResponseSchema, authGuard } from "../../../modules/auth-guard";
import {
	BadRequestException,
	ErrorResponseSchema,
	InternalServerErrorException,
	InternalServerErrorResponseSchema,
} from "../../../modules/error";
import { applyFriendUseCase } from "../../global-instances";

export const ApplyFriendRouter = new Elysia().use(authGuard()).post(
	"/apply",
	async ({ body: { friendInviteToken }, user }) => {
		const result = await applyFriendUseCase.execute(friendInviteToken, user);

		if (isErr(result)) {
			const { code } = result;
			switch (code) {
				case "INVALID_TOKEN":
				case "ALREADY_FRIENDED":
				case "TOKEN_IS_EXPIRED":
					throw new BadRequestException({
						name: code,
						message: "Invalid friend invite token.",
					});
				default:
					throw new InternalServerErrorException({
						message: "Unknown ApplyFriendUseCase error result.",
					});
			}
		}
	},
	{
		body: t.Object({
			friendInviteToken: t.String(),
		}),
		response: {
			200: t.Void(),
			400: t.Union([
				ErrorResponseSchema("INVALID_TOKEN"),
				ErrorResponseSchema("ALREADY_FRIENDED"),
				ErrorResponseSchema("TOKEN_IS_EXPIRED"),
			]),
			401: AuthGuardResponseSchema[401],
			500: InternalServerErrorResponseSchema,
		},
		detail: {
			tags: ["Me"],
		},
	},
);
