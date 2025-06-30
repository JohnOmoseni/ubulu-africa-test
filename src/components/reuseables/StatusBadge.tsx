import clsx from "clsx";

import { type StatusType } from "@/types";

export const StatusBadge = ({
	status,
	containerStyles,
}: {
	status: StatusType;
	containerStyles?: string;
}) => {
	const green = ["admin"];
	const error = ["failed"];
	const yellow = ["moderator"];

	return (
		<div
			className={clsx(
				"row-flex rounded-full border px-4 w-max py-1 mx-auto",
				"bg-slate-300 border border-slate-700",
				{
					"!bg-green-200 !border-green-500": green.includes(status),
					"!bg-red-100 !border-red-500": error.includes(status),
					"!bg-yellow-100 !border-yellow-400": yellow.includes(status),
				},
				containerStyles
			)}
		>
			<p
				className={clsx(
					"whitespace-nowrap text-xs font-semibold capitalize",
					"text-slate-600",

					{
						"!text-green-500": green.includes(status),
						"!text-red-500": error.includes(status),
						"!text-yellow-500": yellow.includes(status),
					}
				)}
			>
				{status || "Unknown"}
			</p>
		</div>
	);
};
