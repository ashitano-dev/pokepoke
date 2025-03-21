import type { SupabaseService } from "../../../infrastructure/supabase";
import type { IImageRepository } from "./interfaces/image.repository.interface";

export class ImageRepository implements IImageRepository {
	constructor(private readonly supabaseService: SupabaseService) {}

	public async find(bucket: string, name: string): Promise<File | null> {
		const { data, error } = await this.supabaseService.client.storage.from(bucket).download(name);

		if (error) {
			throw error;
		}

		return this.blobToFile(data, name);
	}
	public async save(data: Buffer, name: string, type: "jpeg" | "png"): Promise<string> {
		const { data: res, error } = await this.supabaseService.client.storage.from("pictures").upload(name, data, {
			contentType: `image/${type}`,
		});
		if (error) {
			throw error;
		}
		return res.path;
	}

	// public async delete(bucket: string, name: string): Promise<void> {
	// 	throw new Error("Method not implemented.");
	// }

	private blobToFile(blob: Blob, fileName: string): File {
		return new File([blob], fileName, { type: blob.type });
	}
}
