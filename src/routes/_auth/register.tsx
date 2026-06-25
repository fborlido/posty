import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useId } from "react";
import { toast } from "sonner";
import z from "zod";
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
import { authClient } from "#/lib/auth-client";
import { useAppForm } from "#/lib/form";

export const Route = createFileRoute("/_auth/register")({
	component: RouteComponent,
});

const formSchema = z
	.object({
		name: z.string().min(1, "Please add a name"),
		email: z.email("Please add a valid email"),
		password: z.string().min(1, "Please add a password"),
		confirm: z.string().min(1, "Please confirm your password"),
	})
	.refine(({ confirm, password }) => password === confirm, {
		error: "Passwords do not match",
		path: ["confirm"],
	});

function RouteComponent() {
	const navigate = useNavigate();
	const formId = useId();
	const form = useAppForm({
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirm: "",
		},
		validators: {
			onSubmit: formSchema,
		},
		onSubmit: ({ value }) => {
			authClient.signUp.email(
				{
					name: value.name,
					email: value.email,
					password: value.password,
				},
				{
					onError: ({ error }) => {
						toast.error(error.message);
					},
					onSuccess: () => {
						toast.success("Welcome!");
						navigate({ to: "/" });
					},
				},
			);
		},
	});

	return (
		<Card>
			<CardHeader className="text-center">
				<CardTitle>Sign up</CardTitle>
				<CardDescription>Create a new account</CardDescription>
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
						<form.AppField name="name">
							{(field) => <field.TextField label="Name" />}
						</form.AppField>
						<form.AppField name="email">
							{(field) => <field.TextField label="Email" />}
						</form.AppField>
						<form.AppField name="password">
							{(field) => <field.TextField label="Password" type="password" />}
						</form.AppField>
						<form.AppField name="confirm">
							{(field) => (
								<field.TextField label="Confirm password" type="password" />
							)}
						</form.AppField>
					</FieldGroup>
				</form>
			</CardContent>
			<CardFooter className="flex flex-col items-stretch gap-2">
				<Button type="submit" form={formId}>
					Sign up
				</Button>
				<Button variant={"link"}>
					<Link to="/login">Alread have an account?</Link>
				</Button>
			</CardFooter>
		</Card>
	);
}
