import Elysia from "elysia";
import { AddCardRouter } from "./add-card";
import { GetCardImageRouter } from "./get-card-image";
import { GetFriendPackRouter } from "./get-friend-pack";
import { GetPackImageRouter } from "./get-pack-image";
import { PackCardCollection } from "./pack-card-collecton";

export const PackRouter = new Elysia()
	.use(AddCardRouter)
	.use(GetCardImageRouter)
	.use(GetFriendPackRouter)
	.use(PackCardCollection)
	.use(GetPackImageRouter);
