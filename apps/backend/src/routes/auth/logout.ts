import Elysia, { t } from "elysia";
import { authGuard } from "../../modules/auth-guard";
import { InternalServerErrorResponseSchema } from "../../modules/error";
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
			response: {
				200: t.Void(),
				500: InternalServerErrorResponseSchema,
			},
			detail: {
				tags: ["Auth"],
			},
		},
	);
