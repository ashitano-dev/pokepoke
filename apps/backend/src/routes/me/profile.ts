import Elysia from "elysia";
import { UserPresenter, UserResponseSchema } from "../../interface-adapter/presenters";
import { AuthGuardResponseSchema, authGuard } from "../../modules/auth-guard";
import { InternalServerErrorResponseSchema } from "../../modules/error";

export const ProfileRouter = new Elysia().use(authGuard()).get(
	"/",
	async ({ user }) => {
		return UserPresenter(user);
	},
	{
		response: {
			200: UserResponseSchema,
			401: AuthGuardResponseSchema[401],
			500: InternalServerErrorResponseSchema,
		},
		detail: {
			tags: ["Me"],
		},
	},
);
