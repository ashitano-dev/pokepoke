import { twMerge } from "@pokepoke/tailwind-helper";
import { cssInterop } from "nativewind";
import type { FC } from "react";
import BrandIconSvg from "../assets/brand-icon.svg";

type Props = {
	className?: string;
};

cssInterop(BrandIconSvg, {
	className: {
		target: "style",
	},
});

const BrandIcon: FC<Props> = ({ className }) => {
	return <BrandIconSvg className={twMerge(className)} />;
};

export { BrandIcon };
