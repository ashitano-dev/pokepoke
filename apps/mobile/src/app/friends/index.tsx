import { Camera, ChevronRight, QrCode } from "lucide-react-native";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getFriends } from "../../entities/friends/api/get-friends";
import { FriendList } from "../../entities/friends/ui/friend-list";
export default function Friends() {
	//const friends = getFriends();

	return (
		<SafeAreaView className="mx-4">
			<ScrollView
				className="flex-col "
				contentContainerStyle={{
					rowGap: 16,
				}}
			>
				<Text className="py-4 font-bold text-4xl leading-9">フレンド❤️</Text>
				<ScrollView className="flex-col divide-y divide-neutral-400 rounded-2xl bg-white bg-opacity-20">
					<TouchableOpacity className="flex-row items-center justify-between gap-3 self-stretch">
						<View className="flex-row items-center gap-3 p-3">
							<QrCode size={24} />
							<Text className="text-lg">QRコードからフレンドを追加</Text>
						</View>
						<View className="p-4">
							<ChevronRight size={24} />
						</View>
					</TouchableOpacity>
					<TouchableOpacity className="flex-row items-center justify-between gap-3 self-stretch">
						<View className="flex-row items-center gap-3 p-3">
							<Camera size={24} />
							<Text className="text-lg">カメラからフレンドを追加</Text>
						</View>
						<View className="p-4">
							<ChevronRight size={24} />
						</View>
					</TouchableOpacity>
				</ScrollView>
				<FriendList
					friends={[
						{
							id: "1",
							name: "友達1",
							iconUrl: "https://github.com/sayoi341.png",
						},
						{
							id: "2",
							name: "友達1",
							iconUrl: "https://github.com/sayoi341.png",
						},
					]}
				/>
			</ScrollView>
		</SafeAreaView>
	);
}
