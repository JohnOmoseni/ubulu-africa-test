import Modal from "@/components/ui/components/Modal";
import PostForm from "./PostForm";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { usePosts } from "@/context/PostContext";

const EditBlog = () => {
	const navigate = useNavigate();
	const { selectedPost: post } = usePosts();

	const handleClose = useCallback(() => {
		navigate("/", { state: { currentTab: 2 } });
	}, [navigate]);

	return (
		<>
			<Modal
				openModal={true}
				setOpenModal={handleClose}
				title={`${post?.title ? post.title : "Edit Post"}`}
			>
				<div className="px-0.5">
					<PostForm
						post={post as PostType}
						type="edit"
						closeModal={handleClose}
					/>
				</div>
			</Modal>
		</>
	);
};

export default EditBlog;
