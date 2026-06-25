import z from "zod";

export const createPostSchema = z.object({
	title: z.string().min(1, "Please add a title"),
	description: z.string().min(1, "Please add a description"),
	imageUrl: z.url("Please upload an image"),
});

export type CreatePostType = z.infer<typeof createPostSchema>;
