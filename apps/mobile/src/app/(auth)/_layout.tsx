import { Redirect, Stack } from "expo-router";
import { useAccessToken } from "../../features/auth";
import { CustomThemeProvider } from "../../features/theme";

const AuthLayout = () => {
	const [accessToken] = useAccessToken();

	if (accessToken) {
		return <Redirect href="/(tabs)" />;
	}
	return (
		<CustomThemeProvider statusBarStyle="light" styleTheme="light">
			<Stack
				initialRouteName="login"
				screenOptions={{
					headerTransparent: true,
				}}
			>
				<Stack.Screen name="login" options={{ headerShown: false }} />
			</Stack>
		</CustomThemeProvider>
	);
};

export default AuthLayout;
