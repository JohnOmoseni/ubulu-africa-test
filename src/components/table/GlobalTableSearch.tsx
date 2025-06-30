import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { SearchIcon } from "@/constants/icons";

type TableGlobalSearchProps = {
	containerStyles?: string;
	placeholder?: string;
	globalValue: string;
	onChange: (value: string) => void;
};

function TableGlobalSearch({
	onChange,
	globalValue,
	containerStyles,
	placeholder,
}: TableGlobalSearchProps) {
	const [value, setValue] = useState(globalValue);

	useEffect(() => {
		setValue(globalValue);
	}, [globalValue]);

	useEffect(() => {
		const timeout = setTimeout(() => onChange(value), 50);

		return () => clearTimeout(timeout);
	}, [value]);

	return (
		<div
			className={cn(
				"row-flex-start bg-background w-56 rounded-lg border border-input px-3 py-1 max-[430px]:px-2.5 sm:w-[300px]",
				containerStyles
			)}
		>
			<SearchIcon className="size-5 text-grey mr-1.5" />
			<Input
				value={value}
				placeholder={placeholder ?? "Search"}
				className="!i-reset h-8 !pl-1"
				onChange={(e) => setValue(e.target.value)}
			/>
		</div>
	);
}

export default TableGlobalSearch;
