import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { localStorage } from "../../../shared/store";

const accessTokenAtom = atomWithStorage<string | null>("accessToken", null, localStorage);

const useAccessToken = () => {
	const [accessToken, setAccessToken] = useAtom(accessTokenAtom);

	return [accessToken, setAccessToken] as const;
};

export { useAccessToken, accessTokenAtom };
