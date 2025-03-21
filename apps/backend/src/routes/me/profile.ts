import Elysia from "elysia";
import { userPresenter } from "../../interface-adapter/presenters";
import { authGuard } from "../../modules/auth-guard";

export const ProfileRouter = new Elysia().use(authGuard()).get(
	"/",
	async ({ user }) => {
		return userPresenter(user);
	},
	{
		detail: {
			tags: ["Me"],
		},
	},
);
