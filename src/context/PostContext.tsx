import { useGetAllPosts } from "@/actions/blog";
import { showToast } from "@/lib";
import {
	createContext,
	useContext,
	useEffect,
	useState,
	type PropsWithChildren,
} from "react";

interface PostCntextType {
	selectedPost: PostType | null;
	posts: PostType[];
	isFetchingPosts: boolean;
	fetchPostsError: Error | null;
	handleUpdatePost: (
		newPost: PostType,
		type: "add" | "update" | "delete" | "set"
	) => void;
	handleSetSelectedPost: (newPost: PostType | null) => Promise<void>;
}

const PostContext = createContext<PostCntextType | undefined>(undefined);
const PostContextProvider = ({ children }: PropsWithChildren) => {
	const [posts, setPosts] = useState<PostType[]>(() => {
		try {
			const savedPosts = localStorage.getItem("posts");
			return savedPosts ? JSON.parse(savedPosts) : [];
		} catch (error) {
			console.error("Failed to parse posts from localStorage:", error);
			return [];
		}
	});
	const [selectedPost, setSelectedPost] = useState<PostType | null>(null);
	const {
		data,
		isLoading: isFetchingPosts,
		error: fetchPostsError,
	} = useGetAllPosts();

	useEffect(() => {
		if (data) {
			setPosts(data);
		}
	}, [data]);

	useEffect(() => {
		try {
			const currentPosts = JSON.stringify(posts);
			const storedPosts = localStorage.getItem("posts");
			if (currentPosts !== storedPosts) {
				localStorage.setItem("posts", currentPosts);
			}
		} catch (error) {
			console.error("Failed to save posts to localStorage:", error);
		}
	}, [posts]);

	const handleUpdatePost = (
		newPost: PostType,
		type: "add" | "update" | "delete" | "set"
	) => {
		let message: string = "";

		if (type === "add") {
			setPosts((prev) => {
				if (prev.some((p) => p.id === newPost.id)) {
					showToast("info", `Post with ID ${newPost.id} already exists`);
					return prev;
				}
				return [newPost, ...prev];
			});
			message = "Post created successfully";
		} else if (type === "update") {
			setPosts((prev) => {
				return prev.map((post) => {
					if (post.id === newPost.id) {
						console.log("RUNNING", { ...post, ...newPost });
						return { ...post, ...newPost };
					}
					return post;
				});
			});
			message = "Post updated successfully";
		} else if (type === "delete") {
			setPosts((prev) => prev.filter((post) => post.id !== newPost.id));
			message = "Post deleted successfully";
		}
		if (message) showToast("success", message);
	};

	const handleSetSelectedPost = async (newPost: PostType | null) => {
		setSelectedPost(newPost);
	};

	return (
		<PostContext.Provider
			value={{
				posts,
				handleUpdatePost,
				isFetchingPosts,
				fetchPostsError,
				selectedPost,
				handleSetSelectedPost,
			}}
		>
			{children}
		</PostContext.Provider>
	);
};

export default PostContextProvider;

export const usePosts = () => {
	const context = useContext(PostContext);
	if (!context) {
		throw new Error("usePosts must be used within a PostProvider");
	}
	return context;
};
