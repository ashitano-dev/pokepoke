import type { Err, Result } from "../../../../common/utils";
import type { Card } from "../../../../domain/entities";
import type { UserId } from "../../../../domain/value-object";

export type PackCardCollectionSuccessResponse = {
	collection: {
		card: Card;
		count: number;
	}[];
};

export type PackCardCollectionErrorResponse = Err<"NOT_FRIEND">;

export type PackCardCollectionResponse = Result<PackCardCollectionSuccessResponse, PackCardCollectionErrorResponse>;

export interface IPackCardCollectionUseCase {
	execute(ownerUserId: UserId, friendUserId: UserId): Promise<PackCardCollectionResponse>;
}
