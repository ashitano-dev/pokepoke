import type { Err, Result } from "../../../../common/utils";
import type { PackId } from "../../../../domain/value-object";

export type GetPackImageUseCaseSuccessResponse = {
	file: File;
};

export type GetPackImageUseCaseErrorResponse = Err<"NOT_FOUND">;

export type GetPackImageUseCaseResponse = Result<GetPackImageUseCaseSuccessResponse, GetPackImageUseCaseErrorResponse>;

export interface IGetPackImageUseCase {
	execute(packId: PackId): Promise<GetPackImageUseCaseResponse>;
}
