import { node } from "@elysiajs/node";
import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";
import logixlysia from "logixlysia";
import { cors } from "../modules/cors";
import { ENV } from "../modules/env";
import { error } from "../modules/error";
import { AuthRouter } from "./auth";
import { MeRouter } from "./me";
import { PackRouter } from "./pack";
import { TradeRouter } from "./trade";

export const app = new Elysia({
	strictPath: false,
	adapter: node(),
})
	.use(
		logixlysia({
			config: {
				showStartupMessage: false,
				startupMessageFormat: "simple",
				timestamp: {
					translateTime: "yyyy-mm-dd HH:MM:ss",
				},
				ip: true,
				customLogFormat: "🚀 {now} {level} {duration} {method} {pathname} {status} {message} {ip}",
			},
		}),
	)
	.use(
		cors({
			origin: () => {
				if (ENV.NODE_ENV === "production") {
					return ["pokepoke.up.railway.app", /localhost:\d{4}$/];
				}
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
					{ name: "Pack", description: "Endpoints for packs" },
					{ name: "Trade", description: "Endpoints for pack trades" },
				],
			},
		}),
	)
	.use(AuthRouter)
	.use(MeRouter)
	.use(PackRouter)
	.use(TradeRouter)
	.get("/", async () => {
		return "Hello, PokePoke!";
	});
