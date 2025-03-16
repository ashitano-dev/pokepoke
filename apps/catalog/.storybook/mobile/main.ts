import type { StorybookConfig } from "@storybook/react-native";

const main: StorybookConfig = {
	stories: [
		{
			directory: "../../../mobile/src",
			files: "**/*.stories.@(ts|tsx)",
			titlePrefix: "app - mobile",
		},
		{
			directory: "../../../../packages/ui/src",
			files: "**/*.native.stories.@(ts|tsx)",
			titlePrefix: "package - ui",
		},
	],
	addons: ["@storybook/addon-ondevice-controls", "@storybook/addon-ondevice-actions"],
};

export default main;
