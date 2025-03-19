import { Value } from "@sinclair/typebox/value";
import { AppEnvSchema } from "./schema";
import type { AppEnv } from "./type";

const parsedEnv = Value.Decode(AppEnvSchema, process.env);

if (!parsedEnv) {
	console.error("🚨 Invalid environment variables!", Value.Errors(AppEnvSchema, process.env));
	process.exit(1);
}

export const ENV: AppEnv = parsedEnv;
