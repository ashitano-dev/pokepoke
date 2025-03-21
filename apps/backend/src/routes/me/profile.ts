import Elysia from "elysia";
import { UserPresenter } from "../../interface-adapter/presenters";
import { authGuard } from "../../modules/auth-guard";

export const ProfileRouter = new Elysia().use(authGuard()).get(
	"/",
	async ({ user }) => {
		return UserPresenter(user);
	},
	{
		detail: {
			tags: ["Me"],
		},
	},
);
