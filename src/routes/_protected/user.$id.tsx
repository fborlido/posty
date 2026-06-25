import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import PostCard from "#/components/post-card";
import { fetchPostsByUserOptions } from "#/features/posts/posts.queries";

export const Route = createFileRoute("/_protected/user/$id")({
	component: RouteComponent,
	loader: ({ context: { queryClient }, params: { id } }) =>
		queryClient.ensureQueryData(fetchPostsByUserOptions(id)),
});

function RouteComponent() {
	const { id } = Route.useParams();
	const { user } = Route.useRouteContext();
	const {
		data: { user: author, posts },
	} = useSuspenseQuery(fetchPostsByUserOptions(id));

	return (
		<div>
			<h1 className="font-heading font-bold text-3xl mb-8">
				{author.name}'s posts
			</h1>
			<div className="max-w-md mx-auto space-y-4">
				{posts.map((post) => (
					<PostCard
						key={post.id}
						author={{
							id: post.authorId,
							name: author.name,
							image: author.image,
						}}
						date={post.createdAt}
						title={post.title}
						description={post.description}
						postId={post.id}
						canEdit={post.authorId === user.id}
						headerImage={post.image}
					/>
				))}
			</div>
		</div>
	);
}
