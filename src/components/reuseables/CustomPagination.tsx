// import Pagination from "@mui/material/Pagination";
import { useState } from "react";
import SelectComponent from "../ui/components/SelectComponent";
import { pageSizeOptions } from "@/constants";

type Props = {
	count: number;
	onPageChange: (value: number) => void;
	onPageSizeChange?: (value: number) => void;
};

export default function CustomPagination({
	count = 1,
	onPageChange,
	onPageSizeChange,
}: Props) {
	const [page, setPage] = useState(1);

	const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
		onPageChange?.(value);
	};

	const handlePageSizeChange = (value: string) => {
		const pageSize = Number(value);
		onPageSizeChange?.(pageSize);
		setPage(1); // Reset to first page when page size changes
	};

	return (
		<div className="flex-column items-end md:row-flex !justify-end mt-auto gap-2  ml-auto">
			<div className="row-flex-start gap-2">
				<span className="">Show</span>

				<SelectComponent
					options={pageSizeOptions}
					defaultValue={
						pageSizeOptions.find((opt) => opt.value === "15") ||
						pageSizeOptions[0]
					}
					triggerStyles="!w-20 z-[6] !min-w-[0px] border !border-border !h-7"
					placeholder=""
					onChangeHandler={handlePageSizeChange}
				/>
			</div>

			<span className="hidden md:block text-gray-400">|</span>

			{/* <Pagination
				count={count}
				page={page}
				variant="outlined"
				shape="rounded"
				onChange={handleChange}
			/> */}
		</div>
	);
}
