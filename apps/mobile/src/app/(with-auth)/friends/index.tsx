import { Link } from "expo-router";
import { Camera, ChevronRight, QrCode } from "lucide-react-native";
import { ScrollView, Text, View } from "react-native";
// import { getFriends } from "../../entities/friends/api/get-friends";
import { FriendList } from "../../../entities/friends/ui/friend-list";
import { useLayoutInsets } from "../../../shared/hooks";

const Friends = () => {
	//const friends = getFriends();
	const { top, bottom, left, right } = useLayoutInsets();

	return (
		<ScrollView
			className="min-h-full flex-col"
			contentContainerStyle={{
				rowGap: 16,
			}}
			style={{
				paddingTop: top,
				paddingBottom: bottom,
				paddingLeft: left,
				paddingRight: right,
			}}
		>
			<View className="flex items-center">
				<Text className="py-4 font-bold text-4xl leading-9">フレンド❤️</Text>
			</View>
			<View className="flex-col divide-y divide-neutral-400 rounded-2xl bg-white bg-opacity-20">
				<Link href="/friends/qr-code" className="w-full flex-row items-center justify-between gap-3 self-stretch">
					<View className="flex-row items-center justify-between gap-3 self-stretch">
						<View className="flex-1 flex-row items-center gap-3 p-3">
							<QrCode size={24} />
							<Text className="text-lg">QRコードからフレンドを追加</Text>
						</View>
						<View className="p-4">
							<ChevronRight size={24} />
						</View>
					</View>
				</Link>
				<View className="h-[1px] w-full bg-gray-8" />
				<Link href="/(with-auth)/friends/camera" className="w-full">
					<View className="flex-row items-center justify-between gap-3 self-stretch">
						<View className="flex-1 flex-row items-center gap-3 p-3">
							<Camera size={24} />
							<Text className="text-lg">カメラからフレンドを追加</Text>
						</View>
						<View className="p-4">
							<ChevronRight size={24} />
						</View>
					</View>
				</Link>
			</View>
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
	);
};

export default Friends;
