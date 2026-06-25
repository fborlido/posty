import { Link } from "@tanstack/react-router";
import { Edit, Trash } from "lucide-react";
import { useState } from "react";
import { useDeletePost } from "#/features/posts/posts.mutations";
import { Button } from "./ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";
import UserAvatar from "./user-avatar";

type PostCardProps = {
	postId: string;
	author: {
		id: string;
		name: string;
		image?: string | null;
	};
	date: Date;
	title: string;
	description: string;
	headerImage?: string | null;
	canEdit: boolean;
};

export default function PostCard({
	postId,
	author,
	date,
	description,
	title,
	headerImage,
	canEdit,
}: PostCardProps) {
	const { mutate: deletePost, isPending } = useDeletePost();
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);

	return (
		<Card>
			{headerImage && (
				<img src={headerImage} alt="" className="h-52 object-cover" />
			)}
			<CardHeader className="flex gap-4">
				<UserAvatar name={author.name} image={author.image} />
				<div className="">
					<Link to="/user/$id" params={{ id: author.id }}>
						<CardTitle className="hover:underline">{author.name}</CardTitle>
					</Link>
					<CardDescription>{date.toDateString()}</CardDescription>
				</div>
				{canEdit && (
					<div className="flex justify-end grow gap-2">
						<Button variant={"secondary"} size={"icon"}>
							<Edit />
						</Button>
						<Dialog
							open={deleteModalOpen}
							onOpenChange={(e) => setDeleteModalOpen(e)}
						>
							<DialogTrigger asChild>
								<Button variant={"destructive"} size={"icon"}>
									<Trash />
								</Button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Delete post</DialogTitle>
									<DialogDescription>
										Are you sure you want to delete this post?
									</DialogDescription>
								</DialogHeader>
								<div className="space-x-2">
									<DialogClose asChild>
										<Button variant={"secondary"}>Cancel</Button>
									</DialogClose>
									<Button
										variant={"destructive"}
										onClick={() => {
											deletePost({ data: postId });
											setDeleteModalOpen(false);
										}}
										disabled={isPending}
									>
										Delete
									</Button>
								</div>
							</DialogContent>
						</Dialog>
					</div>
				)}
			</CardHeader>
			<CardContent>
				<h3 className="font-heading font-bold mb-2">{title}</h3>
				<p>{description}</p>
			</CardContent>
		</Card>
	);
}
