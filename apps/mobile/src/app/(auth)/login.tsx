import { getBackendBaseUrl } from "@pokepoke/core/utils";
import { openAuthSessionAsync } from "expo-web-browser";
import { useState } from "react";
import { Pressable, SafeAreaView, Text, View } from "react-native";
import { useAccessToken } from "../../features/auth";
import { BrandIcon, BrandLogo } from "../../shared/ui";

const backendBaseUrl = getBackendBaseUrl(process.env.NODE_ENV === "production");

const Login = () => {
	const [error, setError] = useState<string | null>(null);
	const [, setAccessToken] = useAccessToken();
	const authUrl = new URL(
		"/auth/login/discord",
		`${backendBaseUrl.protocol}//${backendBaseUrl.host === "localhost" ? `localhost:${backendBaseUrl.port}` : backendBaseUrl.host}`,
	);
	authUrl.searchParams.append("redirect-url", "/login/discord");

	return (
		<SafeAreaView className="mx-4">
			<View className="flex h-full w-full flex-col gap-4">
				<View className="flex flex-1 flex-col items-center justify-center gap-4">
					<BrandIcon />
					<BrandLogo />
				</View>
				{error && (
					<View className="flex items-center justify-center">
						<Text>{error}</Text>
					</View>
				)}
				<Pressable
					className="flex h-16 w-full items-center justify-center rounded-xl bg-discord transition-colors duration-200 active:bg-discord/85"
					onPress={async () => {
						const result = await openAuthSessionAsync(authUrl.toString(), "mona-ca://login/discord", {
							preferEphemeralSession: true,
						});

						if (result.type === "success") {
							const parsedUrl = new URL(result.url);

							const accessToken = parsedUrl.searchParams.get("access-token");
							const errorCode = parsedUrl.searchParams.get("error");

							if (errorCode) {
								console.error(`Error: ${errorCode}`);
								setError("エラーが発生しました。もう一度お試しください。");
							}

							if (accessToken) {
								// biome-ignore lint/suspicious/noConsoleLog: <explanation>
								console.log(accessToken);

								setAccessToken(accessToken);
							}
						}
					}}
				>
					<Text className="font-bold text-white text-xl">Discordでログイン</Text>
				</Pressable>
			</View>
		</SafeAreaView>
	);
};

export default Login;
// gunji.kousuke08@gmail.com
