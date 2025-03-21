import type { Err, Result } from "../../../../common/utils";
import type { Card } from "../../../../domain/entities";
import type { UserId } from "../../../../domain/value-object";

export type AddCardUseCaseErrorResult = Err<"NOT_FRIEND"> | Err<"BAD_IMAGE">;

export type AddCardUseCaseResult = Result<void, AddCardUseCaseErrorResult>;

export interface IAddCardUseCase {
	execute(file: File, userId: UserId, friendId: UserId, card: Card): Promise<AddCardUseCaseResult>;
}
