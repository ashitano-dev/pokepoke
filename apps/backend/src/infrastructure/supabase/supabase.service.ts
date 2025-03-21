import { createClient } from "@supabase/supabase-js";
import { ENV } from "../../modules/env";

export class SupabaseService {
	public client;

	constructor() {
		this.client = createClient(ENV.SUPABASE_URL, ENV.SUPABASE_SERVICE_ROLE_KEY);
	}
}
