import { getBackendBaseUrl } from "@pokepoke/core/utils";
import type { Cookie } from "elysia";
import { ENV } from "../env";

const backendBaseUrl = getBackendBaseUrl(ENV.NODE_ENV === "production");

export type CookieAttributes = {
	secure?: boolean;
	path?: string;
	domain?: string;
	sameSite?: "lax" | "strict" | "none";
	httpOnly?: boolean;
	maxAge?: number;
	expires?: Date;
};

export type CookieToObject<T> = {
	[K in keyof T as string extends K ? never : K]: T[K] extends Cookie<infer U> ? U : never;
};

export type ObjectToCookie<T> = {
	[K in keyof T]: Cookie<T[K]>;
};

export class CookieService<
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	C extends Record<string, Cookie<any>>,
	E extends CookieToObject<C> = CookieToObject<C>,
> {
	private readonly baseCookieAttributes: CookieAttributes;

	constructor(
		production: boolean,
		private readonly cookie: C,
	) {
		this.baseCookieAttributes = {
			secure: production,
			domain: backendBaseUrl.hostname,
			sameSite: "lax",
			httpOnly: true,
			path: "/",
		};
	}

	public setCookie<N extends keyof E>(name: N, value: E[N], attributes?: CookieAttributes): void {
		this.cookie[name]?.set({ ...this.baseCookieAttributes, ...attributes, value });
	}

	public getCookie<N extends keyof E>(name: N): E[N] {
		return this.cookie[name as keyof C]!.value;
	}

	public deleteCookie(name: keyof E, attributes?: Omit<CookieAttributes, "maxAge" | "expires">): void {
		this.cookie[name]?.set({
			...this.baseCookieAttributes,
			...attributes,
			value: "",
			expires: new Date(0),
			maxAge: 0,
		});
	}
}
