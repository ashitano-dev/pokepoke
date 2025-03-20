import Elysia, { t } from "elysia";
import { isErr } from "../../common/utils";
import { newCardId } from "../../domain/value-object";
import { InternalServerErrorException, NotFoundException } from "../../modules/error";
import { getCardImageUseCase } from "../global-instances";

export const GetCardImageRouter = new Elysia().get(
	"/cards/:cardId/image",
	async ({ params: { cardId } }) => {
		const result = await getCardImageUseCase.execute(newCardId(cardId));
		if (isErr(result)) {
			const { code } = result;
			switch (code) {
				case "NOT_FOUND":
					throw new NotFoundException({ message: "Card not found." });
				default:
					throw new InternalServerErrorException({ message: "Unknown GetCardImageUseCase error result." });
			}
		}

		return result.file;
	},
	{
		params: t.Object({
			cardId: t.String(),
		}),
		detail: {
			tags: ["Pack"],
		},
	},
);
