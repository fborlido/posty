import type { FileRouter } from "uploadthing/server";
import { createUploadthing, UploadThingError } from "uploadthing/server";
import { getSession } from "../auth/auth.functions";

const f = createUploadthing();

export const uploadRouter = {
	imageUploader: f({
		image: {
			maxFileSize: "4MB",
			maxFileCount: 1,
		},
	})
		.middleware(async () => {
			const session = await getSession();
			if (!session) throw new UploadThingError("Unauthorized");
			return { userId: session.user.id };
		})
		.onUploadComplete(async ({ metadata, file }) => ({
			uploadedBy: metadata.userId,
			fileUrl: file.ufsUrl,
		})),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;
