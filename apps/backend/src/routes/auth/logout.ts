import Elysia from "elysia";
import { authGuard } from "../../modules/auth-guard";
import { logoutUseCase } from "../global-instances";

export const LogoutRouter = new Elysia()
	.use(
		authGuard({
			includeSessionToken: true,
		}),
	)
	.post(
		"/logout",
		async ({ sessionToken }) => {
			await logoutUseCase.execute(sessionToken);
		},
		{
			detail: {
				tags: ["Auth"],
			},
		},
	);
