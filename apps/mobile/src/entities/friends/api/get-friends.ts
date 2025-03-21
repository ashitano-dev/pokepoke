import { fetcher } from "../../../shared/utils/fetcher";
import type { Friend } from "../models/friend";

export const getFriends = async () => {
	try {
		const res = await fetcher["@me"].friends.index.get();

		if (res.status !== 200) {
			throw new Error();
		}

		return res.data?.friends as Friend[];
	} catch (e) {
		throw new Error();
	}
};
