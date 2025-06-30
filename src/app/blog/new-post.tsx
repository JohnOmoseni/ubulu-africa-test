import Modal from "@/components/ui/components/Modal";
import PostForm from "./_components/PostForm";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const NewBlog = () => {
	const navigate = useNavigate();

	const handleClose = useCallback(() => {
		navigate("/", { state: { currentTab: 2 } });
	}, [navigate]);

	return (
		<>
			<Modal openModal={true} setOpenModal={handleClose} title="Create Post">
				<div className="px-0.5 mt-2">
					<PostForm closeModal={handleClose} />
				</div>
			</Modal>
		</>
	);
};

export default NewBlog;
