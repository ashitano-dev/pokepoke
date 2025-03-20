import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import satori from "satori";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const toBase64Image = (image: Buffer<ArrayBufferLike>, type: "jpeg" | "png" = "jpeg") => {
	return `data:image/${type};base64,${image.toString("base64")}`;
};

const resizeFileToBase64 = async (file: File, width: number, height?: number): Promise<string> => {
	const arrayBuffer = await file.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer);

	// sharp でリサイズ
	const resizedBuffer = await sharp(buffer).resize({ width, height }).toBuffer();

	return `data:${file.type};base64,${resizedBuffer.toString("base64")}`;
};

const mPlusRounded1c = fs.readFileSync(path.resolve(__dirname, "./fonts/m-plus-rounded1c-extra-bold.ttf"));
const chango = fs.readFileSync(path.resolve(__dirname, "./fonts/chango-regular.ttf"));

const exImg = toBase64Image(await sharp(path.resolve(__dirname, "./images/ex.png")).toBuffer(), "png");
const diaImg = toBase64Image(await sharp(path.resolve(__dirname, "./images/dia.png")).toBuffer(), "png");
const calendarIcon = toBase64Image(await sharp(path.resolve(__dirname, "./images/calendar.png")).toBuffer(), "png");
const mapIcon = toBase64Image(await sharp(path.resolve(__dirname, "./images/map.png")).toBuffer(), "png");

export const generateCardImage = async (
	imageFile: File,
	title: string,
	backgroundColor: string,
	isEx: boolean,
	numDia: number,
	location: string,
	shootingDate: string,
) => {
	if (imageFile.type !== "image/jpeg") {
		throw new Error("BAD_IMAGE");
	}

	const resizedImage = await resizeFileToBase64(imageFile, 404, 303);

	const svg = await satori(
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "100%",
				width: "100%",
				backgroundColor: "white",
				border: "4px",
				borderColor: "#CDCED6",
				borderRadius: "35px",
				padding: "18px",
			}}
		>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					rowGap: "13px",
					alignItems: "center",
					height: "100%",
					width: "100%",
					borderRadius: "18px",
					backgroundColor, // custom color
					padding: "26px",
				}}
			>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						height: "40px",
						width: "100%",
						columnGap: "5px",
					}}
				>
					<span
						style={{
							fontSize: "32px",
							color: "#000000",
							overflow: "hidden",
						}}
					>
						{title}
					</span>
					{isEx && <img src={exImg} height={30} alt="" />}
				</div>
				<div
					style={{
						display: "flex",
						width: "404px",
						height: "303px",
						backgroundColor: "gray",
						border: "4px",
						borderBottom: "16px",
						borderColor: "#4F3422",
					}}
				>
					<img src={resizedImage} style={{ width: "100%", height: "100%" }} alt="" />
				</div>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						rowGap: "10px",
						flexGrow: 1,
						width: "100%",
						fontSize: "20px",
					}}
				>
					<div style={{ display: "flex", alignItems: "center", columnGap: "5px" }}>
						<img src={calendarIcon} height={32} alt="" />
						<span>{shootingDate}</span>
					</div>
					<div style={{ display: "flex", alignItems: "center", columnGap: "5px" }}>
						<img src={mapIcon} height={32} alt="" />
						<span>{location}</span>
					</div>
				</div>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						columnGap: "5px",
						height: "36px",
						width: "100%",
					}}
				>
					{Array.from({ length: numDia }).map((_, i) => (
						<img
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							key={i}
							src={diaImg}
							height="24px"
							alt=""
							style={{}}
						/>
					))}
				</div>
			</div>
		</div>,

		{
			width: 500,
			height: 700,
			fonts: [
				{
					name: "chango",
					data: chango,
					weight: 400,
					style: "normal",
				},
				{
					name: "mPlusRounded1c",
					data: mPlusRounded1c,
					weight: 700,
					style: "normal",
				},
			],
		},
	);

	const pngBuffer = await sharp(Buffer.from(svg)).toFormat("jpeg").toBuffer();

	return pngBuffer;

	// 出力画像の保存
	// fs.writeFileSync(path.join(__dirname, "output.png"), pngBuffer);
};
