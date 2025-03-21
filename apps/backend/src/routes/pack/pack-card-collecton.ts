import Elysia, { t } from "elysia";
import { isErr } from "../../common/utils";
import { newUserId } from "../../domain/value-object";
import { CardPresenter, CardResponseSchema } from "../../interface-adapter/presenters";
import { AuthGuardResponseSchema, authGuard } from "../../modules/auth-guard";
import {
	BadRequestException,
	InternalServerErrorException,
	InternalServerErrorResponseSchema,
} from "../../modules/error";
import { packCardCollectionUseCase } from "../global-instances";

export const PackCardCollection = new Elysia().use(authGuard()).get(
	"@me/collection/friends/:friendId",
	async ({ params: { friendId }, user }) => {
		const result = await packCardCollectionUseCase.execute(user.id, newUserId(friendId));

		if (isErr(result)) {
			const { code } = result;
			switch (code) {
				case "NOT_FRIEND":
					throw new BadRequestException({ message: "Friend not found." });
				default:
					throw new InternalServerErrorException({ message: "Unknown PackCardCollectionUseCase error result." });
			}
		}

		const { collection } = result;
		return collection.map(({ card, count }) => {
			return {
				count,
				card: CardPresenter(card),
			};
		});
	},
	{
		params: t.Object({
			friendId: t.String(),
		}),
		response: {
			200: t.Array(
				t.Object({
					count: t.Integer(),
					card: CardResponseSchema,
				}),
			),
			401: AuthGuardResponseSchema[401],
			500: InternalServerErrorResponseSchema,
		},
		detail: {
			tags: ["Pack"],
		},
	},
);
