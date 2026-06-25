import { createFileRoute } from "@tanstack/react-router";
import { useId } from "react";
import { Button } from "#/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "#/components/ui/card";
import { FieldGroup } from "#/components/ui/field";
import { useCreatePost } from "#/features/posts/posts.mutations";
import { createPostSchema } from "#/features/posts/posts.schemas";
import { useAppForm } from "#/lib/form";

export const Route = createFileRoute("/_protected/posts/new")({
	component: RouteComponent,
});

function RouteComponent() {
	const { mutate: createPost, isPending } = useCreatePost();

	const formId = useId();
	const form = useAppForm({
		defaultValues: {
			title: "",
			description: "",
			imageUrl: "",
		},
		validators: {
			onSubmit: createPostSchema,
		},
		onSubmit: ({ value }) => {
			createPost({ data: value });
		},
	});

	return (
		<Card>
			<CardHeader>
				<CardTitle>Create a new post</CardTitle>
				<CardDescription>What's on your mind?</CardDescription>
			</CardHeader>
			<CardContent>
				<form
					id={formId}
					onSubmit={(e) => {
						e.preventDefault();
						form.handleSubmit();
					}}
				>
					<FieldGroup>
						<form.AppField name="title">
							{(field) => <field.TextField label="Title" />}
						</form.AppField>
						<form.AppField name="description">
							{(field) => <field.TextField label="Description" />}
						</form.AppField>
						<form.AppField name="imageUrl">
							{(field) => <field.ImageUploadField label="Header image" />}
						</form.AppField>
					</FieldGroup>
				</form>
			</CardContent>
			<CardFooter className="flex gap-2">
				<Button variant={"secondary"} onClick={() => form.reset()}>
					Reset
				</Button>
				<Button type="submit" form={formId} disabled={isPending}>
					Submit
				</Button>
			</CardFooter>
		</Card>
	);
}
