import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import type { ComponentProps } from "react";
import { AuthProvider } from "../../features/auth";

function TabBarIcon(props: {
	name: ComponentProps<typeof FontAwesome>["name"];
	color: string;
}) {
	return <FontAwesome size={28} {...props} />;
}

export default function TabLayout() {
	return (
		<AuthProvider>
			<Tabs initialRouteName="index" screenOptions={{ headerShown: false }}>
				<Tabs.Screen
					name="index"
					options={{
						title: "Home",
						tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
					}}
				/>
				<Tabs.Screen
					name="friends/index"
					options={{
						title: "Friend",
						tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
					}}
				/>
			</Tabs>
		</AuthProvider>
	);
}
