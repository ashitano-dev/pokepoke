import { logger } from "@bogeychan/elysia-logger";
import { node } from "@elysiajs/node";
import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { cors } from "../modules/cors";
import { error } from "../modules/error";
import { AuthRouter } from "./auth";
import { MeRouter } from "./me";

export const app = new Elysia({ strictPath: false, adapter: node() })
	.use(
		logger({
			transport: {
				target: "pino-pretty",
				options: {
					colorize: true,
				},
			},
		}),
	)
	.use(
		cors({
			origin: () => {
				// if (app_env === "production") {
				//   return ["mona-ca.com"];
				// }
				return [/localhost:\d{4}$/];
			},
			allowedHeaders: ["Content-Type", "Authorization"],
		}),
	)
	.use(error)
	.use(
		swagger({
			documentation: {
				info: {
					title: "PokePoke Backend API Documentation",
					version: "0.0.0",
				},
				tags: [
					{ name: "App", description: "General endpoints" },
					{ name: "Auth", description: "Authentication endpoints" },
					{ name: "Me", description: "Endpoints for the current user" },
				],
			},
		}),
	)
	.use(AuthRouter)
	.use(MeRouter)
	.get("/", async () => {
		return "Hello, PokePoke!";
	});
