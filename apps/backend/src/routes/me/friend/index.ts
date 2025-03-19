import Elysia from "elysia";
import { ApplyFriendRouter } from "./apply-friend";
import { CreateFriendInviteTokenRouter } from "./create-friend-invite-token";
import { GetFriendsRouter } from "./get-friends";

export const FriendRouter = new Elysia({ prefix: "/friends" })
	.use(GetFriendsRouter)
	.use(CreateFriendInviteTokenRouter)
	.use(ApplyFriendRouter);
