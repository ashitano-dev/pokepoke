import Elysia, { t } from "elysia";
import { isErr } from "../../common/utils";
import { newUserId } from "../../domain/value-object";
import { PackPresenter, PackResponseSchema } from "../../interface-adapter/presenters";
import { AuthGuardResponseSchema, authGuard } from "../../modules/auth-guard";
import {
	BadRequestException,
	ErrorResponseSchema,
	InternalServerErrorException,
	InternalServerErrorResponseSchema,
} from "../../modules/error";
import { getFriendPackUseCase } from "../global-instances";

export const GetFriendPackRouter = new Elysia().use(authGuard()).get(
	"@me/friends/:friendId/pack",
	async ({ params: { friendId }, user }) => {
		const result = await getFriendPackUseCase.execute(newUserId(user.id), newUserId(friendId));

		if (isErr(result)) {
			const { code } = result;
			switch (code) {
				case "NOT_FRIEND":
					throw new BadRequestException({ message: "Friend not found." });
				default:
					throw new InternalServerErrorException({ message: "Unknown GetFriendPackUseCase error result." });
			}
		}

		return PackPresenter(result.pack);
	},
	{
		params: t.Object({
			friendId: t.String(),
		}),
		response: {
			200: PackResponseSchema,
			400: t.Union([ErrorResponseSchema("NOT_FRIEND")]),
			401: AuthGuardResponseSchema[401],
			500: InternalServerErrorResponseSchema,
		},
		detail: {
			tags: ["Pack"],
		},
	},
);
