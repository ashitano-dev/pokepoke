import { Redirect, Stack } from "expo-router";
import { useAccessToken } from "../../features/auth";
import { CustomThemeProvider } from "../../features/theme";

const AuthLayout = () => {
	const [accessToken] = useAccessToken();

	if (accessToken) {
		return <Redirect href="/(with-auth)" />;
	}
	return (
		<CustomThemeProvider statusBarStyle="dark" styleTheme="light">
			<Stack
				initialRouteName="login"
				screenOptions={{
					headerTransparent: true,
					headerShown: false,
				}}
			>
				<Stack.Screen name="login" options={{ headerShown: false }} />
			</Stack>
		</CustomThemeProvider>
	);
};

export default AuthLayout;
