import { ChevronRight } from "lucide-react-native";
import { Image, Text, TouchableOpacity, View } from "react-native";
import type { Friend } from "../models/friend";

export const FriendList = ({ friends }: { friends: Friend[] }) => {
	return (
		<View className="flex-col items-start divide-y divide-neutral-400 rounded-2xl bg-white bg-opacity-20">
			{friends.map(friend => (
				<TouchableOpacity key={friend.id} className="flex-row items-center justify-between self-stretch">
					<View className="flex-row items-center gap-2 p-3">
						<Image className="h-12 w-12 rounded-full" source={{ uri: friend.iconUrl! }} />
						<View>
							<Text className="font-nomal text-lg leading-none">{friend.name}</Text>
							<Text className="font-bold text-xs leading-3">@example</Text>
						</View>
					</View>

					<View className="p-4">
						<ChevronRight />
					</View>
				</TouchableOpacity>
			))}
		</View>
	);
};
