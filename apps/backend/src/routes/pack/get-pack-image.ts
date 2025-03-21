import Elysia, { t } from "elysia";
import { isErr } from "../../common/utils";
import { newPackId } from "../../domain/value-object";
import {
	ErrorResponseSchema,
	InternalServerErrorException,
	InternalServerErrorResponseSchema,
	NotFoundException,
} from "../../modules/error";
import { getPackImageUseCase } from "../global-instances";

export const GetPackImageRouter = new Elysia().get(
	"packs/:packId/image",
	async ({ params: { packId } }) => {
		const result = await getPackImageUseCase.execute(newPackId(packId));

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
			packId: t.String(),
		}),
		response: {
			400: t.Union([ErrorResponseSchema("NOT_FRIEND")]),
			404: ErrorResponseSchema("NOT_FOUND"),
			500: InternalServerErrorResponseSchema,
		},
		detail: {
			tags: ["Pack"],
		},
	},
);
