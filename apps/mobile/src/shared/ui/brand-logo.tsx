import { twMerge } from "@pokepoke/tailwind-helper";
import { cssInterop } from "nativewind";
import type { FC } from "react";
import BrandLogoSvg from "../assets/brand-logo.svg";

type Props = {
	className?: string;
};

cssInterop(BrandLogoSvg, {
	className: {
		target: "style",
	},
});

const BrandLogo: FC<Props> = ({ className }) => {
	return <BrandLogoSvg className={twMerge(className)} />;
};

export { BrandLogo };
