import { err } from "../../../common/utils";
import type { PackId } from "../../../domain/value-object";
import type { IImageRepository } from "../../../interface-adapter/repositories/image";
import type { IPackRepository } from "../../../interface-adapter/repositories/pack";
import type { GetPackImageUseCaseResponse, IGetPackImageUseCase } from "./interfaces/get-pack-image.usecase.interface";

export class GetPackImageUseCase implements IGetPackImageUseCase {
	constructor(
		private readonly imageRepository: IImageRepository,
		private readonly packRepository: IPackRepository,
	) {}

	public async execute(packId: PackId): Promise<GetPackImageUseCaseResponse> {
		const card = await this.packRepository.findById(packId);

		if (!card) {
			return err("NOT_FOUND");
		}

		const file = await this.imageRepository.find("pictures", packId);

		if (!file) {
			return err("NOT_FOUND");
		}

		return { file };
	}
}
