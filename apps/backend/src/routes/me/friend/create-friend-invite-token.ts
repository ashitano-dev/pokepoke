import Elysia from "elysia";
import { authGuard } from "../../../modules/auth-guard";
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
		detail: {
			tags: ["Me"],
		},
	},
);
