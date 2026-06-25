import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import db from "#/db";
import { post } from "#/db/schemas/posts.schema";
import { ensureSession } from "../auth/auth.middlewares";
import { type CreatePostType, createPostSchema } from "./posts.schemas";

export const fetchPosts = createServerFn({ method: "GET" }).handler(
	async () => {
		try {
			const posts = await db.query.post.findMany({
				with: { author: true },
				orderBy: ({ createdAt }, { desc }) => desc(createdAt),
			});
			return posts;
		} catch (error) {
			console.log(error);
			throw new Error("Something went wrong");
		}
	},
);

export const createPost = createServerFn({ method: "POST" })
	.validator((post: CreatePostType) => post)
	.middleware([ensureSession])
	.handler(async ({ data, context }) => {
		try {
			const parsedData = createPostSchema.safeParse(data);
			if (!parsedData.success) throw new Error("Invalid data");
			const postData = parsedData.data;
			const createdPost = await db
				.insert(post)
				.values({
					title: postData.title,
					description: postData.description,
					authorId: context.user.id,
					image: postData.imageUrl,
				})
				.returning();
			return createdPost;
		} catch (error) {
			console.log(error);
			throw new Error("Something went wrong");
		}
	});

export const fetchUserPosts = createServerFn({ method: "GET" })
	.validator((userId: string) => userId)
	.handler(async ({ data }) => {
		try {
			const user = await db.query.user.findFirst({
				where: ({ id }, { eq }) => eq(id, data),
			});

			if (!user) throw new Error("User not found");
			const posts = await db.query.post.findMany({
				where: ({ authorId }, { eq }) => eq(authorId, data),
				orderBy: ({ createdAt }, { desc }) => desc(createdAt),
			});

			return { user, posts };
		} catch (error) {
			console.log(error);
			throw new Error("Something went wrong");
		}
	});

export const deletePost = createServerFn({ method: "POST" })
	.validator((postId: string) => postId)
	.middleware([ensureSession])
	.handler(async ({ data: postId, context }) => {
		try {
			const postToDelete = await db.query.post.findFirst({
				where: ({ id }, { eq }) => eq(id, postId),
			});
			if (!postToDelete) throw new Error("Post not found");
			if (postToDelete.authorId !== context.user.id)
				throw new Error("Unauthorized");
			const [deletedPost] = await db
				.delete(post)
				.where(eq(post.id, postId))
				.returning();
			return deletedPost;
		} catch (error) {
			console.log(error);
			throw new Error("Something went wrong");
		}
	});
