import { useCallback, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { usersColumn } from "../../components/table/columns/usersColumn";

import { useDeleteUser, useGetAllUsers } from "@/actions/data-table";
import type { ColumnFiltersState } from "@tanstack/react-table";
import CustomEmptyList from "@/components/reuseables/CustomEmptyList";
import TableFilters from "@/components/table/TableFilters";
import CustomButton from "@/components/reuseables/CustomButton";
import ConfirmDelete from "@/components/reuseables/ConfirmDelete";
import TableGlobalSearch from "@/components/table/GlobalTableSearch";
import ServerSideTable from "@/components/table/ServerSideTable";

const gender_filter_options = [
	{ label: "All Gender", value: "all" },
	{ label: "Male", value: "male" },
	{ label: "Female", value: "female" },
];

function RichDataTable() {
	const [selectedRows, setSelectedRows] = useState<any[]>([]);
	const [selectedFilter, setSelectedFilter] = useState("all");
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [globalFilter, setGlobalFilter] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(10);

	const { data, isLoading, error, isError } = useGetAllUsers({
		skip: (currentPage - 1) * perPage,
		limit: perPage,
	});
	const { mutateAsync: deleteUserMutation, isPending: isDeleting } =
		useDeleteUser();

	const handleAction = async (id: "delete") => {
		const selectedIds = selectedRows.map((row) => row.id);
		if (selectedIds.length === 0) {
			toast.info("No users selected!");
			return;
		}
		if (id !== "delete") return;

		try {
			await deleteUserMutation({ selected_ids: selectedIds });
		} catch (error: any) {}
	};

	const users: UserType[] = data?.users ?? [];
	const paginationMeta = useMemo(() => {
		const total = data?.total ?? 0;
		const limit = data?.limit ?? perPage;
		const skip = data?.skip ?? 0;
		const lastPage = Math.ceil(total / limit);
		const currentPageFromApi = Math.floor(skip / limit) + 1;

		return {
			total,
			limit,
			skip,
			lastPage,
			currentPage: currentPageFromApi,
			from: skip + 1,
			to: Math.min(skip + limit, total),
		};
	}, [data, perPage]);

	const tableData = useMemo(() => users || [], [users]);

	const handlePageChange = (page: number) => {
		console.log("page change info", page);
		setCurrentPage(page);
	};

	const handlePageSizeChange = useCallback((value: number) => {
		setPerPage(value);
		setCurrentPage(1);
	}, []);

	const emptyState: ReactNode = useMemo(() => {
		let title = isError
			? (error as any)?.message || "Something went wrong"
			: "No Student added yet!";

		return (
			<CustomEmptyList
				title={title}
				titleStyles="!text-xl"
				iconVariant={"show-icon"}
			/>
		);
	}, [isError]);

	return (
		<>
			<div className="flex-column gap-6">
				<div className="row-flex-btwn gap-6">
					<TableGlobalSearch
						onChange={(value: string) => setGlobalFilter(value)}
						placeholder="Search by name or email"
						globalValue={globalFilter}
					/>

					<TableFilters
						selectedFilter={selectedFilter}
						setSelectedFilter={setSelectedFilter}
						setColumnFilters={setColumnFilters}
						columnId="gender"
						placeholder="Filter By Gender"
						options={gender_filter_options}
					/>
				</div>

				{selectedRows.length > 0 && (
					<div className="row-flex-btwn w-full gap-3 px-2.5 py-2">
						<p className="text-xs font-semibold w-full">
							{selectedRows.length} row(s) selected
						</p>

						<ConfirmDelete
							title={`${
								selectedRows?.length === 1 ? "this user" : "these users"
							}?`}
							onDeleteClick={() => handleAction("delete")}
							isPending={isDeleting}
							trigger={
								<CustomButton
									title={`${
										selectedRows?.length === 1
											? "Delete user"
											: "Bulk Delete Users"
									}`}
									variant={"badge"}
									size={"badge"}
									className="bg-red-600 ml-auto w-max"
								/>
							}
						/>
					</div>
				)}

				<ServerSideTable
					columns={usersColumn}
					globalFilter={globalFilter}
					columnFilters={columnFilters}
					tableData={tableData}
					isLoading={isLoading}
					setSelectedRows={setSelectedRows}
					paginationMeta={{
						last_page: paginationMeta.lastPage,
						current_page: paginationMeta.currentPage,
						pageSize: paginationMeta.limit,
						total: paginationMeta.total,
						onPageChange: handlePageChange,
						onPageSizeChange: handlePageSizeChange,
					}}
					{...(isError || !tableData.length ? { emptyState } : {})}
				/>
			</div>
		</>
	);
}

export default RichDataTable;
