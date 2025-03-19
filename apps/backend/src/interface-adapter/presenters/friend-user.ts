import type { User } from "../../domain/entities";

type FriendUserResponse = {
	id: string;
	name: string;
	iconUrl: string | null;
};

export const friendUserPresenter = (friendUser: User): FriendUserResponse => {
	return {
		id: friendUser.id,
		name: friendUser.name,
		iconUrl: friendUser.iconUrl,
	};
};
