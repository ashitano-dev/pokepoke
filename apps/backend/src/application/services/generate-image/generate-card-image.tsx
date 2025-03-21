import satori from "satori";
import sharp from "sharp";
import { calendarIcon, chango, diaImg, exImg, mPlusRounded1c, mapIcon, resizeFileToBase64 } from "./utils";

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

	const jpegBuffer = await sharp(Buffer.from(svg)).toFormat("jpeg").toBuffer();

	return jpegBuffer;

	// 出力画像の保存
	// fs.writeFileSync(path.join(__dirname, "output.png"), pngBuffer);
};
