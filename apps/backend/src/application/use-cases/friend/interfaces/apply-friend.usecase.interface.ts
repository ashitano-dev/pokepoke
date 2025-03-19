import type { Err, Result } from "../../../../common/utils";
import type { User } from "../../../../domain/entities";

export type ApplyFriendUseCaseErrorResult = Err<"ALREADY_FRIENDED" | "TOKEN_IS_EXPIRED" | "INVALID_TOKEN">;

export type ApplyFriendUseCaseResult = Result<void, ApplyFriendUseCaseErrorResult>;

export interface IApplyFriendUseCase {
	execute(token: string, me: User): Promise<ApplyFriendUseCaseResult>;
}
