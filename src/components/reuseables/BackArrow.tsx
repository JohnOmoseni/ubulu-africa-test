import { ArrowBack } from "@/constants/icons";
import { useNavigate } from "react-router-dom";
import { type ReactNode } from "react";
import CustomIcon from "./CustomIcon";

function BackArrow({
	icon = ArrowBack,
	onHandleGoBack,
	showLabel,
	children,
}: {
	icon?: any;
	showLabel?: boolean;
	children?: ReactNode;
	onHandleGoBack?: (() => void) | null;
}) {
	const navigate = useNavigate();

	return (
		<div
			className="w-max"
			onClick={() => (onHandleGoBack ? onHandleGoBack() : navigate(-1))}
		>
			{children ? (
				children
			) : (
				<>
					<CustomIcon icon={icon} iconBgVariant={"show-bg"} />

					{showLabel && (
						<p className="mt-0.5 text-sm font-medium capitalize transition">
							Back
						</p>
					)}
				</>
			)}
		</div>
	);
}

export default BackArrow;
