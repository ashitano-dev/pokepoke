import type { Static } from "elysia";
import type {
	AppEnvSchema,
	DatabaseEnvSchema,
	OAuthProviderEnvSchema,
	PepperEnvSchema,
	PublicEnvSchema,
} from "./schema";

export type PublicEnv = Static<typeof PublicEnvSchema>;

export type PepperEnv = Static<typeof PepperEnvSchema>;

export type DatabaseEnv = Static<typeof DatabaseEnvSchema>;

export type OAuthProviderEnv = Static<typeof OAuthProviderEnvSchema>;

export type AppEnv = Static<typeof AppEnvSchema>;
