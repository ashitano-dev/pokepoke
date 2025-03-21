import satori from "satori";
import sharp from "sharp";
import { brandLogo, chango, mPlusRounded1c, toBase64Image } from "./utils";

export const generatePackImage = async (
	title: string,
	imageFile: Buffer<ArrayBufferLike>,
	fileType: "jpeg" | "png",
): Promise<Buffer<ArrayBufferLike>> => {
	const resize = await sharp(imageFile).resize(640, 1280).toBuffer();

	const resizedImage = toBase64Image(resize, fileType);

	const svg = await satori(
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				height: "100%",
				width: "100%",
			}}
		>
			<img
				src={resizedImage}
				height="1280px"
				alt=""
				style={{
					position: "absolute",
				}}
			/>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					width: "100%",
					height: "200px",
					backgroundColor: "#ffffffd0",
				}}
			>
				<img src={brandLogo} height="64px" alt="" />
			</div>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "flex-end",
					width: "100%",
					flex: 1,
					padding: "48px",
				}}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignContent: "center",
						fontFamily: "chango",
						fontSize: "52px",
						width: "100%",
						padding: "16px",
						textAlign: "center",
						backgroundColor: "#ffffffd0",
						borderRadius: "36px",
					}}
				>
					<span
						style={{
							margin: "0 auto",
						}}
					>
						{title}
					</span>
				</div>
			</div>
			<div
				style={{
					width: "100%",
					height: "68px",
					backgroundColor: "#ffffffd0",
				}}
			/>
		</div>,
		{
			width: 640,
			height: 1280,
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
	const jpegBuffer = await sharp(Buffer.from(svg)).toFormat("jpeg").toBuffer();

	// 出力画像の保存
	// fs.writeFileSync(path.join(__dirname, "output.png"), jpegBuffer);

	return jpegBuffer;
};
