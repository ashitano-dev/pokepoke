import Elysia, { t } from "elysia";
import { FriendUserPresenter, FriendUserResponseSchema } from "../../../interface-adapter/presenters";
import { AuthGuardResponseSchema, authGuard } from "../../../modules/auth-guard";
import { InternalServerErrorResponseSchema } from "../../../modules/error";
import { getUserFriendsUseCase } from "../../global-instances";

export const GetFriendsRouter = new Elysia().use(authGuard()).get(
	"/",
	async ({ user }) => {
		const result = await getUserFriendsUseCase.execute(user.id);

		return {
			friends: result.friends.map(FriendUserPresenter),
		};
	},
	{
		response: {
			200: t.Object({
				friends: t.Array(FriendUserResponseSchema),
			}),
			401: AuthGuardResponseSchema[401],
			500: InternalServerErrorResponseSchema,
		},
		detail: {
			tags: ["Me"],
		},
	},
);
