import { drizzle } from "drizzle-orm/d1";
import postgres from "postgres";
import * as schema from "./schema";

export class DrizzleService {
	public db;
	public schema = schema;

	constructor(databaseUrl: string = process.env.DATABASE_URL!) {
		const client = postgres(databaseUrl, { prepare: false });
		this.db = drizzle({ client });
	}
}
