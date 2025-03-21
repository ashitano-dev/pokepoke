// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("node:path");
const withStorybook = require("@storybook/react-native/metro/withStorybook");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

const withNativeWindConfig = withNativeWind(config, {
	input: "./src/app/global.css",
	configPath: "./tailwind.config.ts",
	inlineRem: 16,
});

const withStorybookConfig = withStorybook(withNativeWindConfig, {
	enabled: true,
	configPath: path.resolve(__dirname, "./.storybook/mobile"),
});

module.exports = withStorybookConfig;
