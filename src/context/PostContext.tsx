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
		newPost: PostType | PostType[],
		type: "add" | "update" | "delete" | "set"
	) => {
		if (type === "add" && !Array.isArray(newPost)) {
			setPosts((prev) => {
				if (prev.some((p) => p.id === newPost.id)) {
					showToast("info", `Post with ID ${newPost.id} already exists`);
					return prev;
				}
				return [newPost, ...prev];
			});
		} else if (type === "update" && !Array.isArray(newPost)) {
			setPosts((prev) => {
				return prev.map((post) => {
					if (post.id === newPost.id) {
						return { ...post, ...newPost };
					}
					return post;
				});
			});
		} else if (type === "delete" && !Array.isArray(newPost)) {
			setPosts((prev) => prev.filter((post) => post.id !== newPost.id));
		} else if (type === "set" && Array.isArray(newPost)) {
			setPosts(newPost || []);
		}
	};

	const handleSetSelectedPost = async (newPost: PostType | null) => {
		setSelectedPost(newPost);
	};

	return (
		<PostContext.Provider
			value={{ posts, handleUpdatePost, selectedPost, handleSetSelectedPost }}
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
