import Elysia from "elysia";
import { FriendRouter } from "./friend";
import { ProfileRouter } from "./profile";

export const MeRouter = new Elysia({ prefix: "/@me" }).use(FriendRouter).use(ProfileRouter);
