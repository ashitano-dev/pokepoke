import type { StatusMap } from "elysia";
import type { redirect } from "elysia";
import type { ElysiaCookie } from "elysia/cookies";
import type { HTTPHeaders } from "elysia/types";

export type ElysiaRedirect = typeof redirect;

export type ElysiaSet = {
	headers: HTTPHeaders;
	status?: number | keyof StatusMap;
	redirect?: string;
	cookie?: Record<string, ElysiaCookie>;
};
