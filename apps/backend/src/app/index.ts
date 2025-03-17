import { node } from "@elysiajs/node";
import { Elysia } from "elysia";

new Elysia({ adapter: node() }).get("/", () => ({ hello: "Node.js👋" })).listen(3000);

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log("Listening on http://localhost:3000");
