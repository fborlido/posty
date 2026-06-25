import { queryOptions } from "@tanstack/react-query";
import { fetchPosts, fetchUserPosts } from "./posts.functions";

export const POST_QUERY_KEYS = {
	ALL: ["posts"],
	BY_USER: (userId: string) => ["posts", "user", userId],
};

export const fetchPostsOptions = queryOptions({
	queryKey: POST_QUERY_KEYS.ALL,
	queryFn: () => fetchPosts(),
});

export const fetchPostsByUserOptions = (userId: string) =>
	queryOptions({
		queryKey: POST_QUERY_KEYS.BY_USER(userId),
		queryFn: () => fetchUserPosts({ data: userId }),
	});
