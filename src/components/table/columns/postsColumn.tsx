import PostTableAction from "@/app/blog/_components/PostTableAction";
import { truncateString } from "@/lib/utils";
import { type ColumnDef } from "@tanstack/react-table";
import MDEditor from "@uiw/react-md-editor";

export const postsColumn: ColumnDef<any>[] = [
	{
		id: "sn",
		header: "S/N",
		accessorFn: (_row, index) => index + 1,
		size: 50,
		cell: ({ row }) => <p className="table-data-sm">{row.index + 1}</p>,
	},
	{
		accessorFn: (row) => `${row.title} ${row.body}`,
		header: "Post",
		cell: ({ row }) => {
			const post = row.original;
			const content = post.body ? truncateString(post.body, 90) : "No Title";

			return (
				<div className="w-full flex-column gap-1">
					<h3 className="min-w-[20ch]">
						{post.title ? truncateString(post.title, 50) : "No Title"}
					</h3>
					<p className="text-grey">
						<MDEditor.Markdown
							source={content}
							style={{ whiteSpace: "pre-wrap" }}
						/>
					</p>
				</div>
			);
		},
	},
	{
		id: "Actions",
		cell: ({ row }) => {
			const post = row.original;

			return <PostTableAction post={post} />;
		},
	},
];
