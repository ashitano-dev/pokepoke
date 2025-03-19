import Elysia from "elysia";
import { LogoutRouter } from "./logout";
import { OAuthCallbackRouter } from "./oauth-callback";
import { OAuthRequestRouter } from "./oauth-request";

export const AuthRouter = new Elysia({ prefix: "/auth" })
	.use(LogoutRouter)
	.use(OAuthRequestRouter)
	.use(OAuthCallbackRouter);
