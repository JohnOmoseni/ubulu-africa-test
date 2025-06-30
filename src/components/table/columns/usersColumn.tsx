import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { StatusBadge } from "@/components/reuseables/StatusBadge";
import type { StatusType } from "@/types";
import { fallback_post_img } from "@/constants/icons";

export const usersColumn: ColumnDef<UserType>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<input
				type="checkbox"
				checked={table.getIsAllRowsSelected()}
				onChange={table.getToggleAllRowsSelectedHandler()}
				className="input-checkbox h-5 w-5 shrink-0 bg-background-100 border border-input rounded-full focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
			/>
		),
		enableSorting: false,
		enableHiding: false,
		cell: ({ row }) => (
			<>
				<Checkbox
					checked={row.getIsSelected()}
					onCheckedChange={row.getToggleSelectedHandler()}
				/>
			</>
		),
	},
	{
		accessorFn: (row) => `${row.firstName}`,
		header: "First Name",
		enableSorting: true,
		cell: ({ row }) => {
			const name = row.original?.firstName || "";
			const image = row.original?.image || fallback_post_img;

			return (
				<div className="grid grid-cols-[max-content_1fr] min-w-[100px] items-center gap-3 w-full">
					<img
						src={image}
						alt=""
						className="rounded-full size-[40px] object-cover"
					/>
					<p className="text-left font-semibold">{name}</p>
				</div>
			);
		},
		size: 100,
	},

	{
		accessorKey: "email",
		header: "Email",
		enableSorting: true,
		cell: ({ row }) => (
			<p className="table-data-sm !lowercase">{row.original?.email}</p>
		),
	},
	{
		accessorKey: "gender",
		header: "Gender",
		size: 100,
		enableSorting: false,
		cell: ({ row }) => <p className="table-data-sm">{row.original?.gender}</p>,
		enableColumnFilter: true,
		filterFn: (row, columnId, filterValue) => {
			const gender = row.getValue(columnId) as string;
			if (filterValue.toLowerCase() === "all") return true;

			return gender?.toLowerCase() === filterValue.toLowerCase();
		},
	},
	{
		accessorKey: "role",
		enableSorting: false,
		header: () => <span className="text-center w-full">Role</span>,
		cell: ({ row }) => {
			const status = row.original?.role;
			return (
				<div className="max-sm:px-2">
					<StatusBadge status={status as StatusType} />
				</div>
			);
		},
	},
];
