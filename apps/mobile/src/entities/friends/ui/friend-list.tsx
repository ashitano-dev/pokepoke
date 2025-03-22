import { ChevronRight } from "lucide-react-native";
import { type FC, Fragment } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import type { Friend } from "../models/friend";

const FriendLink: FC<Friend> = ({ id, name, iconUrl }) => {
	return (
		<TouchableOpacity key={id} className="flex-row items-center justify-between self-stretch">
			<View className="flex-row items-center gap-2 p-3">
				<Image className="h-12 w-12 rounded-full" source={{ uri: iconUrl! }} />
				<View>
					<Text className="font-nomal text-lg leading-none">{name}</Text>
					<Text className="font-bold text-xs leading-3">@example</Text>
				</View>
			</View>

			<View className="p-4">
				<ChevronRight />
			</View>
		</TouchableOpacity>
	);
};

export const FriendList = ({ friends }: { friends: Friend[] }) => {
	const firstFriend = friends[0];
	if (!firstFriend) {
		return null;
	}

	const otherFriends = friends.slice(1);

	return (
		<View className="flex-col items-start divide-y divide-neutral-400 rounded-2xl bg-white bg-opacity-20">
			<FriendLink {...firstFriend} />
			{otherFriends.map(friend => (
				<Fragment key={friend.id}>
					<View className="h-[1px] w-full bg-gray-8" />
					<FriendLink key={friend.id} {...friend} />
				</Fragment>
			))}
		</View>
	);
};
