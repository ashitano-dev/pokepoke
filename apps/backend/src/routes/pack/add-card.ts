import Elysia, { t } from "elysia";
import { ulid } from "ulid";
import { isErr } from "../../common/utils";
import { newCardId, newUserId } from "../../domain/value-object";
import { authGuard } from "../../modules/auth-guard";
import { BadRequestException, InternalServerErrorException } from "../../modules/error";
import { addCardUseCase } from "../global-instances";

export const AddCardRouter = new Elysia().use(authGuard()).post(
	"@me/friends/:friendId/pack/cards",
	async ({
		params: { friendId },
		body: { file, title, backgroundColor, isEx, numDia, location, shootingDate },
		user,
	}) => {
		const now = new Date();
		const card = {
			id: newCardId(ulid()),
			backgroundColor,
			isEx: !!isEx,
			numDia,
			location: location === "" ? null : location,
			shootingDate: shootingDate === "" ? null : shootingDate,
			title,
			createdAt: now,
			updatedAt: now,
		};

		const result = await addCardUseCase.execute(file, user.id, newUserId(friendId), card);

		if (isErr(result)) {
			const { code } = result;
			switch (code) {
				case "BAD_IMAGE":
					throw new BadRequestException({
						name: code,
						message: "Invalid image file.",
					});
				default:
					throw new InternalServerErrorException({
						message: "Unknown AddCardUseCase error result.",
					});
			}
		}
	},
	{
		params: t.Object({
			friendId: t.String(),
		}),
		body: t.Object({
			file: t.File(),
			title: t.String(),
			backgroundColor: t.String(),
			isEx: t.Integer(),
			numDia: t.Integer(),
			location: t.String(),
			shootingDate: t.String(),
		}),
		detail: {
			tags: ["Pack"],
		},
	},
);
