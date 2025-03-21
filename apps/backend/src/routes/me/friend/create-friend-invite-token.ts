import Elysia, { t } from "elysia";
import { AuthGuardResponseSchema, authGuard } from "../../../modules/auth-guard";
import { InternalServerErrorResponseSchema } from "../../../modules/error";
import { createFriendInviteTokenUseCase } from "../../global-instances";

export const CreateFriendInviteTokenRouter = new Elysia().use(authGuard()).post(
	"/invite-token",
	async ({ user }) => {
		const result = await createFriendInviteTokenUseCase.execute(user.id);

		return {
			friendInviteToken: result.friendInviteToken.token,
		};
	},

	{
		response: {
			200: t.Object({
				friendInviteToken: t.String(),
			}),
			401: AuthGuardResponseSchema[401],
			500: InternalServerErrorResponseSchema,
		},
		detail: {
			tags: ["Me"],
		},
	},
);
