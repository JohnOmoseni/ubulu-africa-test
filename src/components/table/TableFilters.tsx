import {
	useMemo,
	type Dispatch,
	type ReactNode,
	type SetStateAction,
} from "react";
import SelectComponent from "../ui/components/SelectComponent";
import CustomIcon from "../reuseables/CustomIcon";
import { FilterIcon } from "@/constants/icons";

type Props = {
	setSelectedFilter: Dispatch<SetStateAction<string>>;
	selectedFilter: string;
	isSelected?: string;
	columnId?: string;
	setColumnFilters?: any;
	options?: {
		label: string;
		value: string;
	}[];
	placeholder?: string;
	trigger?: ReactNode;
};

function TableFilters({
	setSelectedFilter,
	selectedFilter,
	setColumnFilters,
	columnId,
	options = [],
	placeholder,
	trigger,
}: Props) {
	const handleClick = (filter: string) => {
		setSelectedFilter(filter);
		setColumnFilters((prev: any) =>
			prev
				?.filter((f: any) => f.id !== columnId)
				?.concat({ id: columnId, value: filter })
		);
	};

	const value = useMemo(
		() =>
			options.find((option) => option.value === selectedFilter) || options[0],
		[options, selectedFilter]
	);

	return (
		<div className="w-max">
			<SelectComponent
				value={value?.value!}
				trigger={
					trigger ? (
						trigger
					) : (
						<>
							<CustomIcon icon={FilterIcon} className="" />
							<p className="text-sm">{value?.label || placeholder}</p>
						</>
					)
				}
				triggerStyles=""
				defaultValue={options[0]}
				options={options}
				placeholder={placeholder}
				onChangeHandler={handleClick}
			/>
		</div>
	);
}

export default TableFilters;
