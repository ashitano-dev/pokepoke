import { err } from "../../../common/utils";
import type { UserId } from "../../../domain/value-object";
import type { IImageRepository } from "../../../interface-adapter/repositories/image";
import type { CreateCardDto, IPackRepository } from "../../../interface-adapter/repositories/pack";
import type { IUserRepository } from "../../../interface-adapter/repositories/user";
import { generateCardImage } from "./generate-card-image";
import type { AddCardUseCaseResult, IAddCardUseCase } from "./interfaces/add-card.usecase.interface";

export class AddCardUseCase implements IAddCardUseCase {
	constructor(
		private readonly imageRepository: IImageRepository,
		private readonly packRepository: IPackRepository,
		private readonly userRepository: IUserRepository,
	) {}

	async execute(file: File, userId: UserId, friendId: UserId, card: CreateCardDto): Promise<AddCardUseCaseResult> {
		if (file.type !== "image/jpeg") {
			return err("BAD_IMAGE");
		}

		const [cardImage, friendship] = await Promise.all([
			generateCardImage(
				file,
				card.title,
				card.backgroundColor,
				card.isEx,
				card.numDia,
				card.location ?? "",
				card.shootingDate ?? "",
			),
			this.userRepository.findFriendshipByUserIds(userId, friendId),
		]);

		if (!friendship) {
			return err("NOT_FRIEND");
		}

		await Promise.all([
			this.imageRepository.save(cardImage, card.id, "jpeg"),
			this.packRepository.addCardByOwnerIdAndFriendshipId(userId, friendship.id, card),
		]);
	}
}
