import { app } from "./routes";

// Start the server
app.listen(8787);

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log("Listening on http://localhost:8787");
