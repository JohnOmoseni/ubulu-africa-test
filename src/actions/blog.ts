import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { handleApiError, showToast } from "../lib";
import axios from "axios";
import type { AxiosResponse } from "axios";
import { extractErrorMessage } from "@/lib/errorUtils";

export const useGetAllPosts = () => {
	return useQuery({
		queryKey: ["posts"],
		queryFn: () => getPosts(),
		staleTime: Infinity,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
	});
};

// MUTATIONS
export const useCreatePost = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: any) => createPost(data),
		onError: (error) => {
			const message = error?.message || `Error creating Post`;
			console.error("[Create Post error]", error, message);
		},
		onSuccess: () => {
			const message = "Post created successfully";
			queryClient.invalidateQueries({
				queryKey: ["posts"],
			});
			showToast("success", message);
		},
	});
};

export const useEditPost = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: any) => editPost(data),
		onError: (error) => {
			const message = extractErrorMessage(error, "Failed to update Post");
			showToast("error", message);
			throw error;
		},
		onSuccess: (data, variables) => {
			const message = data?.message || "Updated successfully";
			queryClient.invalidateQueries({
				queryKey: ["posts", variables.post_id],
			});
			queryClient.invalidateQueries({
				queryKey: ["posts"],
			});
			showToast("success", message);
		},
	});
};

export const useDeletePost = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ post_id }: { post_id: string }) => deletePost({ post_id }),
		onError: (error) => {
			const message = error?.message || "Something went wrong";
			showToast("error", message);
		},
		onSuccess: (data) => {
			const message = data?.message || "Deleted successfully";
			showToast("success", message);
			queryClient.invalidateQueries({ queryKey: ["posts"] });
		},
	});
};

//QUERIES
const getPosts = async (): Promise<AxiosResponse["data"]> => {
	try {
		const response = await axios.get(
			"https://jsonplaceholder.typicode.com/posts"
		);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

const createPost = async (payload: any): Promise<AxiosResponse["data"]> => {
	try {
		const response = await axios.post(
			"https://jsonplaceholder.typicode.com/posts",
			payload
		);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

const editPost = async ({
	post_id,
	...payload
}: any): Promise<AxiosResponse["data"]> => {
	try {
		const response = await axios.put(
			`https://jsonplaceholder.typicode.com/posts/${post_id}`,
			payload
		);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

const deletePost = async ({ post_id }: any): Promise<AxiosResponse["data"]> => {
	try {
		const response = await axios.delete(
			`https://jsonplaceholder.typicode.com/posts/${post_id}`
		);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};
