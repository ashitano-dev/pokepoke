import { node } from "@elysiajs/node";
import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { cors } from "../modules/cors";
import { error } from "../modules/error";
import { AuthRouter } from "./auth";

export const app = new Elysia({ strictPath: false, adapter: node() })
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
				],
			},
		}),
	)
	.use(AuthRouter)
	.get("/", async () => {
		return "Hello, PokePoke!";
	});
