import { Redirect } from "expo-router";
import type { FC, ReactNode } from "react";
import { useAccessToken } from "../models/access-token";

type AuthProviderProps = {
	children: ReactNode;
};

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
	const [accessToken] = useAccessToken();

	if (accessToken === null) {
		return <Redirect href="/(auth)/login" />;
	}

	return <>{children}</>;
};

export { AuthProvider };
