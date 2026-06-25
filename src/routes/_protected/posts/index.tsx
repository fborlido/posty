import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import PostCard from "#/components/post-card";
import { Button } from "#/components/ui/button";
import { fetchPostsOptions } from "#/features/posts/posts.queries";

export const Route = createFileRoute("/_protected/posts/")({
	component: RouteComponent,
	loader: async ({ context: { queryClient } }) =>
		queryClient.ensureQueryData(fetchPostsOptions),
});

function RouteComponent() {
	const { user } = Route.useRouteContext();
	const { data: posts } = useSuspenseQuery(fetchPostsOptions);

	return (
		<div>
			<div className="flex items-center justify-between mb-8">
				<h1 className="font-bold font-heading text-3xl">All posts</h1>
				<Button asChild size={"lg"}>
					<Link to="/posts/new">
						<Plus />
						Create
					</Link>
				</Button>
			</div>
			<div className="max-w-md mx-auto space-y-4">
				{posts.map((post) => (
					<PostCard
						key={post.id}
						postId={post.id}
						author={{
							id: post.authorId,
							name: post.author.name,
							image: post.author.image,
						}}
						date={post.createdAt}
						title={post.title}
						description={post.description}
						headerImage={post.image}
						canEdit={post.authorId === user.id}
					/>
				))}
			</div>
		</div>
	);
}
