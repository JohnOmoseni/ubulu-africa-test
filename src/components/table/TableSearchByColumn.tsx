import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "@/constants/icons";

type TableSearchProps = {
	containerStyles?: string;
	placeholder?: string;
	columnFilters?: any;
	setColumnFilters?: any;
	filterBy?: string;
};

function TableSearchByColumn({
	columnFilters,
	setColumnFilters,
	containerStyles,
	placeholder,
	filterBy = "name",
}: TableSearchProps) {
	const taskName =
		columnFilters?.find((filter: any) => filter.id === filterBy)?.value || "";

	const onFilterChange = (columnId: string, value: string) => {
		setColumnFilters((prev: any) =>
			prev
				?.filter((filter: any) => filter.id !== columnId)
				?.concat({ id: columnId, value })
		);
	};

	return (
		<div
			className={cn(
				"row-flex-start bg-background w-64 rounded-lg border border-border px-3 py-1 max-[430px]:px-2.5 sm:w-[300px]",
				containerStyles
			)}
		>
			<SearchIcon className="size-5 text-icon-grey" />
			<Input
				value={taskName}
				placeholder={placeholder ?? "Search..."}
				className="!i-reset h-8 placeholder:text-grey"
				onChange={(e) => onFilterChange(filterBy, e.target.value)}
			/>
		</div>
	);
}

export default TableSearchByColumn;
