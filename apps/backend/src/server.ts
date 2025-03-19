import { app } from "./routes";

// Start the server
app.listen(8787);

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log("Start Server!\n" + "Listening  - http://localhost:8787\n" + "Swagger UI - http://localhost:8787/swagger");
