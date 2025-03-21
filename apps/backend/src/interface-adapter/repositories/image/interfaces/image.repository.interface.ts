export interface IImageRepository {
	// search for an image
	find(bucket: string, name: string): Promise<File | null>;

	// upload an image
	save(data: Buffer, name: string, type: "jpeg" | "png"): Promise<string>;

	// delete an image
	// delete(bucket: string, name: string): Promise<void>;
}
