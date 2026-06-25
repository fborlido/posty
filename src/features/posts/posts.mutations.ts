import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { createPost, deletePost } from "./posts.functions";
import { POST_QUERY_KEYS } from "./posts.queries";

export const useCreatePost = () => {
	const navigate = useNavigate();
	const mutation = useMutation({
		mutationFn: createPost,
		onError: () => {
			toast.error("Unable to create post. Try again");
		},
		onSuccess: () => {
			navigate({ to: "/posts" });
		},
	});
	return mutation;
};

export const useDeletePost = () => {
	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: deletePost,
		onError: () => {
			toast.error("Unable to delete post. Try again");
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: POST_QUERY_KEYS.ALL });
		},
	});
	return mutation;
};
