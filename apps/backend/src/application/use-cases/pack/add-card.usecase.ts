import { err } from "../../../common/utils";
import type { UserId } from "../../../domain/value-object";
import type { IImageRepository } from "../../../interface-adapter/repositories/image";
import type { CreateCardDto, IPackRepository } from "../../../interface-adapter/repositories/pack";
import { generateCardImage } from "./generate-card-image";
import type { AddCardUseCaseResult, IAddCardUseCase } from "./interfaces/add-card.usecase.interface";

export class AddCardUseCase implements IAddCardUseCase {
	constructor(
		private readonly imageRepository: IImageRepository,
		private readonly packRepository: IPackRepository,
	) {}

	async execute(file: File, userId: UserId, friendId: UserId, card: CreateCardDto): Promise<AddCardUseCaseResult> {
		if (file.type !== "image/jpeg") {
			return err("BAD_IMAGE");
		}

		const cardImage = await generateCardImage(
			file,
			card.title,
			card.backgroundColor,
			card.isEx,
			card.numDia,
			card.location ?? "",
			card.shootingDate ?? "",
		);

		await Promise.all([
			this.imageRepository.save(cardImage, card.id, "jpeg"),
			this.packRepository.addCardByCreateUserIdAndTargetUserId(userId, friendId, card),
		]);
	}
}
