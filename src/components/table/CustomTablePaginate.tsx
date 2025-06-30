import { KeyboardArrowLeft, KeyboardArrowRight } from "@/constants/icons";
import { pageSizeOptions } from "@/constants";
import { cn } from "@/lib/utils";
import type { Table } from "@tanstack/react-table";
import SelectComponent from "../ui/components/SelectComponent";

export function CustomTablePagination({ table }: { table: Table<any> }) {
	return (
		<div className="row-flex !flex-wrap justify-end gap-x-4 gap-y-3 mt-6 px-3 text-sm">
			<div className="row-flex-start gap-3.5">
				<span className="font-semibold">Number of Display:</span>

				<SelectComponent
					options={pageSizeOptions}
					defaultValue={pageSizeOptions[0]}
					triggerStyles="w-22 min-w-[0px] border border-input !h-[2.05rem]"
					placeholder=""
					onChangeHandler={(value: any) => {
						table.setPageSize(Number(value));
					}}
				/>
			</div>

			<span className="sm:block hidden">|</span>

			<div className="row-flex gap-4 text-sm">
				<button
					disabled={!table.getCanPreviousPage()}
					onClick={() => table.previousPage()}
					className={cn(
						"shad-grey-btn",
						!table.getCanPreviousPage() && "disabled-btn"
					)}
				>
					<KeyboardArrowLeft size={16} className="icon" />
					<span className="mr-1.5">Previous</span>
				</button>

				<span className="">
					Page {table.getState().pagination.pageIndex + 1} of{" "}
					{table.getPageCount() || 1}
				</span>

				<button
					disabled={!table.getCanNextPage()}
					onClick={() => table.nextPage()}
					className={cn(
						"shad-grey-btn",
						!table.getCanNextPage() && "disabled-btn"
					)}
				>
					<span className="ml-1.5">Next</span>
					<KeyboardArrowRight size={16} className="icon" />
				</button>
			</div>
		</div>
	);
}

interface ServerSideTableProps {
	table: Table<any>;
	last_page: number; // Total number of pages (last_page)
	current_page: number;
	total: number;
	onPageChange: (value: number) => void;
	onPageSizeChange?: (value: number) => void;
}

export function ServerSideTablePagination({
	table,
	current_page,
	total,
	last_page = 1,
	onPageChange,
	onPageSizeChange,
}: ServerSideTableProps) {
	const handlePageChange = (page: number) => {
		table.setPageIndex(page - 1); // Convert to 0-based index
		onPageChange(page);
	};

	const isPreviousDisabled = total === 0 || current_page === 1;
	const isNextDisabled = total === 0 || current_page === last_page;

	const handlePageSizeChange = (pageSize: number) => {
		table.setPageSize(pageSize);
		table.setPageIndex(0); // Reset to first page
		onPageSizeChange?.(pageSize);
	};

	return (
		<div className="row-flex !flex-wrap justify-end gap-x-4 gap-y-3 mt-6 px-3 text-sm">
			<div className="row-flex-start gap-3.5">
				<span className="font-semibold">Number of Display:</span>

				<SelectComponent
					options={pageSizeOptions}
					defaultValue={pageSizeOptions[0]}
					triggerStyles="w-22 min-w-[0px] border border-input !h-[2.05rem]"
					placeholder=""
					onChangeHandler={(value: any) => {
						table.setPageSize(Number(value));
						handlePageSizeChange(value);
					}}
				/>
			</div>

			<span className="sm:block hidden">|</span>

			<div className="row-flex-start gap-4">
				<button
					className="disabled:opacity-60 disabled:hidden shad-grey-btn"
					disabled={isPreviousDisabled}
					onClick={() => {
						table.previousPage();
						handlePageChange(current_page - 1);
					}}
				>
					<KeyboardArrowLeft size={16} className="icon" />
					<span className="mr-1.5">Previous</span>
				</button>
				Page {current_page} of {last_page}
				{/* Page {table.getState().pagination.pageIndex + 1} of {last_page} */}
				<button
					className="disabled:opacity-60 disabled:hidden shad-grey-btn"
					disabled={isNextDisabled}
					onClick={() => {
						handlePageChange(current_page + 1);
					}}
				>
					<span className="ml-1.5">Next</span>
					<KeyboardArrowRight size={16} className="icon" />
				</button>
			</div>
		</div>
	);
}
