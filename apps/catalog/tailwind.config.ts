import { baseConfig } from "@pokepoke/tailwind-config";
import type { Config } from "tailwindcss";

const nativewindConfig = require("nativewind/preset");

const config = {
	content: {
		files: [
			"./.storybook/**/*.{ts,tsx}",
			"../web/src/**/*.{js,jsx,ts,tsx}",
			"../mobile/src/**/*.{js,jsx,ts,tsx}",
			"../../packages/ui/src/**/*.{js,jsx,ts,tsx}",
		],
	},
	presets: [nativewindConfig, baseConfig],
	corePlugin: {
		textOpacity: true,
		backgroundOpacity: true,
	},
} satisfies Config;

export default config;
