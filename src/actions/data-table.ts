import { useMutation, useQuery } from "@tanstack/react-query";
import { handleApiError, wait } from "../lib";
import axios from "axios";
import { toast } from "sonner";
import type { AxiosResponse } from "axios";

export const useGetAllUsers = (options?: PaginationParams) => {
	return useQuery({
		queryKey: ["users", options?.skip, options?.limit],
		queryFn: () => getUsers(options),
		select(data) {
			return data as UsersResponse;
		},
		refetchOnWindowFocus: false,
	});
};

export const useDeleteUser = () => {
	return useMutation({
		mutationFn: ({ selected_ids }: { selected_ids: string[] }) =>
			deleteUsers({ selected_ids }),
		onError: (_error, variables) => {
			toast.error(
				`Error deleting ${
					variables.selected_ids?.length === 1 ? "user" : "users"
				}`
			);
		},
		onSuccess: (data, variables) => {
			const message =
				data?.message ||
				`${
					variables.selected_ids?.length === 1 ? "User" : "Users"
				} deleted successfully`;
			toast.success(message);
		},
	});
};

//QUERIES
const getUsers = async (
	options?: PaginationParams
): Promise<AxiosResponse["data"]> => {
	try {
		const { limit, skip } = options ? options : {};
		const queryParams = new URLSearchParams();

		if (limit) queryParams.append("limit", limit.toString());
		if (skip) queryParams.append("skip", skip.toString());

		const response = await axios.get(`https://dummyjson.com/users`, {
			params: queryParams,
		});

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

// @ts-ignore
const deleteUsers = async ({
	selected_ids,
}: {
	selected_ids: string[];
}): Promise<AxiosResponse["data"]> => {
	try {
		// await axios.delete(`https://dummyjson.com/users`, {
		// 	data: { ids: selected_ids },
		// });

		// return response.data;
		return await wait(3000);
	} catch (error) {
		handleApiError(error);
	}
};
