import { createEdenFetcher } from "@pokepoke/eden-fetcher";

export const fetcher = createEdenFetcher(process.env.NODE_ENV === "production");
