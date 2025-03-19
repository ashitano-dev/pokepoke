import Elysia from "elysia";
import { friendUserPresenter } from "../../../interface-adapter/presenters";
import { authGuard } from "../../../modules/auth-guard";
import { getUserFriendsUseCase } from "../../global-instances";

export const GetFriendsRouter = new Elysia().use(authGuard()).get(
	"/",
	async ({ user }) => {
		const result = await getUserFriendsUseCase.execute(user.id);

		return {
			friends: result.friends.map(friendUserPresenter),
		};
	},
	{
		detail: {
			tags: ["Me"],
		},
	},
);
