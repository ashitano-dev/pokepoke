import Elysia from "elysia";
import { AddCardRouter } from "./add-card";
import { GetCardImageRouter } from "./get-card-image";
import { GetFriendPackRouter } from "./get-friend-pack";

export const PackRouter = new Elysia().use(AddCardRouter).use(GetCardImageRouter).use(GetFriendPackRouter);
