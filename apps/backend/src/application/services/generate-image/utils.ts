import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

export const resizeFileToBase64 = async (file: File, width: number, height?: number): Promise<string> => {
	const arrayBuffer = await file.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer);

	// sharp でリサイズ
	const resizedBuffer = await sharp(buffer).resize({ width, height }).toBuffer();

	return `data:${file.type};base64,${resizedBuffer.toString("base64")}`;
};

export const toBase64Image = (image: Buffer<ArrayBufferLike>, type: "jpeg" | "png" = "jpeg") => {
	return `data:image/${type};base64,${image.toString("base64")}`;
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const mPlusRounded1c = fs.readFileSync(path.resolve(__dirname, "./fonts/m-plus-rounded1c-extra-bold.ttf"));
export const chango = fs.readFileSync(path.resolve(__dirname, "./fonts/chango-regular.ttf"));

export const exImg = toBase64Image(await sharp(path.resolve(__dirname, "./images/ex.png")).toBuffer(), "png");
export const diaImg = toBase64Image(await sharp(path.resolve(__dirname, "./images/dia.png")).toBuffer(), "png");
export const calendarIcon = toBase64Image(
	await sharp(path.resolve(__dirname, "./images/calendar.png")).toBuffer(),
	"png",
);
export const mapIcon = toBase64Image(await sharp(path.resolve(__dirname, "./images/map.png")).toBuffer(), "png");

export const brandLogo = toBase64Image(await sharp(path.resolve(__dirname, "./images/logo.png")).toBuffer(), "png");

export const packDefaultImage = await sharp(path.resolve(__dirname, "./images/pack-default.png")).toBuffer();

export const writeFile = (filename: string, buffer: Buffer<ArrayBufferLike>) => {
	fs.writeFileSync(path.join(__dirname, filename), buffer);
};
