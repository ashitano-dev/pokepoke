import { err } from "../../../common/utils";
import type { CardId } from "../../../domain/value-object";
import type { IImageRepository } from "../../../interface-adapter/repositories/image";
import type { IPackRepository } from "../../../interface-adapter/repositories/pack";
import type { GetCardImageUseCaseResponse, IGetCardImageUseCase } from "./interfaces/get-card-image.interface";

export class GetCardImageUseCase implements IGetCardImageUseCase {
	constructor(
		private readonly imageRepository: IImageRepository,
		private readonly packRepository: IPackRepository,
	) {}

	public async execute(cardId: CardId): Promise<GetCardImageUseCaseResponse> {
		const card = await this.packRepository.findCardById(cardId);

		if (!card) {
			return err("NOT_FOUND");
		}

		const file = await this.imageRepository.find("pictures", cardId);

		if (!file) {
			return err("NOT_FOUND");
		}

		return { file };
	}
}
