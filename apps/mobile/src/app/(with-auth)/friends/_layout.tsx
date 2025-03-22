import { Stack } from "expo-router";

const FriendsLayout = () => {
	return (
		<Stack initialRouteName="index" screenOptions={{ headerShown: false }}>
			<Stack.Screen name="qrcode" options={{ headerShown: false }} />
			<Stack.Screen name="camera" options={{ headerShown: false }} />
			<Stack.Screen name="index" options={{ headerShown: false }} />
		</Stack>
	);
};

export default FriendsLayout;
