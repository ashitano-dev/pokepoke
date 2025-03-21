import { treaty } from "@elysiajs/eden";
import type { BackendApp } from "@pokepoke/backend";
import { getBackendBaseUrl } from "@pokepoke/core/utils";

export const createEdenFetcher = (production: boolean) => treaty<BackendApp>(getBackendBaseUrl(production).toString());
