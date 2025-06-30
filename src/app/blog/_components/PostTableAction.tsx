import { usePosts } from "@/context/PostContext";
import { useNavigate } from "react-router-dom";
import { EditIcon, TrashIcon } from "@/constants/icons";
import { BtnLoader } from "@/components/fallback/FallbackLoader";
import { useDeletePost } from "@/actions/blog";
import { PopoverComponent } from "@/components/ui/components/PopoverComponent";
import usePopoverActions from "@/hooks/usePopoverActions";
import ConfirmDelete from "@/components/reuseables/ConfirmDelete";

const popoverList = [
	{ icon: EditIcon, label: "Edit", showLoader: false },
	{ icon: TrashIcon, label: "Delete", showLoader: true },
];

export const PostTableAction = ({ post }: { post: any }) => {
	const { mutateAsync: deletePost, isPending: isDeletingPost } =
		useDeletePost();
	const navigate = useNavigate();
	const { handleUpdatePost, handleSetSelectedPost } = usePosts();

	const onClickHandlers: { [index: number]: () => Promise<void> | void } = {
		0: async () => {
			await handleSetSelectedPost(post);
			navigate(`edit/${post?.id}`);
		},
		1: async () => {
			try {
				await deletePost({ post_id: String(post?.id) });
				handleUpdatePost(post, "delete");
			} catch (err: any) {}
		},
	};

	// const handlePreview = (id: number) => {
	// 	const externalURL = `https://www.qataloog.com/blogs/${id}`;
	// 	window.open(externalURL, "_blank");
	// };

	const { handleItemClick, loadingStates } = usePopoverActions({
		list: popoverList,
		onClickHandlers,
	});

	return (
		<>
			<PopoverComponent
				list={popoverList}
				containerStyles="!w-52"
				renderItem={(item, index) => (
					<>
						{item?.label.includes("Delete") ? (
							<div key={index}>
								<ConfirmDelete
									title="this post"
									onDeleteClick={() => handleItemClick(index, item?.showLoader)}
									isPending={isDeletingPost}
									trigger={
										<span className="popover-item">
											{item?.icon && (
												<item.icon className="size-4 text-red-600 mt-px font-semibold" />
											)}
											<span className="text-red-600 mt-px font-semibold">
												{item?.label}
											</span>
										</span>
									}
								/>
							</div>
						) : (
							<div
								key={index}
								className="popover-item"
								onClick={() => handleItemClick(index, item?.showLoader)}
							>
								{item?.icon && <item.icon className="size-4" />}

								<span className="mt-px">{item?.label}</span>
								<BtnLoader isLoading={loadingStates[index]} />
							</div>
						)}
					</>
				)}
			/>
		</>
	);
};

export default PostTableAction;
