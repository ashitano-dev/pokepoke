import type { Err, Result } from "../../../../common/utils";
import type { CardId } from "../../../../domain/value-object";

export type GetCardImageUseCaseSuccessResponse = {
	file: File;
};

export type GetCardImageUseCaseErrorResponse = Err<"NOT_FOUND">;

export type GetCardImageUseCaseResponse = Result<GetCardImageUseCaseSuccessResponse, GetCardImageUseCaseErrorResponse>;

export interface IGetCardImageUseCase {
	execute(cardId: CardId): Promise<GetCardImageUseCaseResponse>;
}
