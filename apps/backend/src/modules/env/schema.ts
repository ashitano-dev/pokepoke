import { t } from "elysia";

export const PublicEnvSchema = t.Object({
	NODE_ENV: t.Union([t.Literal("development"), t.Literal("production"), t.Literal("test")]),
});

export const PepperEnvSchema = t.Object({
	SESSION_PEPPER: t.String(),
});

export const DatabaseEnvSchema = t.Object({
	DATABASE_URL: t.String(),
	SUPABASE_URL: t.String(),
	SUPABASE_SERVICE_ROLE_KEY: t.String(),
	SUPABASE_ANON_KEY: t.String(),
});

export const OAuthProviderEnvSchema = t.Object({
	DISCORD_CLIENT_ID: t.String(),
	DISCORD_CLIENT_SECRET: t.String(),
});

export const AppEnvSchema = t.Intersect([PublicEnvSchema, DatabaseEnvSchema, PepperEnvSchema, OAuthProviderEnvSchema], {
	additionalProperties: true,
});
