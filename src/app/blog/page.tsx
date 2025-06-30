import { useMemo, useState } from "react";
import { postsColumn } from "@/components/table/columns/postsColumn";
import { Outlet, useNavigate } from "react-router-dom";
import { usePosts } from "@/context/PostContext";
import CustomButton from "@/components/reuseables/CustomButton";
import TableGlobalSearch from "@/components/table/GlobalTableSearch";
import CustomDataTable from "@/components/table/CustomDataTable";
import useEmptyState from "@/hooks/useEmptyState";

const BlogPost = () => {
	const navigate = useNavigate();
	const [globalFilter, setGlobalFilter] = useState("");

	const { posts, isFetchingPosts, fetchPostsError } = usePosts();

	const { emptyState } = useEmptyState({
		data: posts,
		isError: Boolean(fetchPostsError),
		error: fetchPostsError,
	});

	const tableData = useMemo(() => posts || [], [posts]);

	return (
		<>
			<div className="flex-column mt-4 gap-6">
				<h2 className=" text-center">Blog Posts</h2>

				<div className="row-flex-btwn gap-5 mt-4">
					<TableGlobalSearch
						globalValue={globalFilter || ""}
						placeholder="Search Posts"
						onChange={(value: string) => setGlobalFilter(value)}
					/>

					<CustomButton
						title="Create New Post"
						onClick={() => navigate("/new")}
					/>
				</div>

				<CustomDataTable
					columns={postsColumn}
					globalFilter={globalFilter}
					tableData={tableData}
					hideTableHeader={true}
					isLoading={isFetchingPosts}
					{...(fetchPostsError || !tableData.length ? { emptyState } : {})}
				/>
			</div>

			<Outlet />
		</>
	);
};

export default BlogPost;
