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

export const Route = createFileRoute("/_auth/login")({
	component: RouteComponent,
});

const formSchema = z.object({
	email: z.email("Please add a valid email"),
	password: z.string().min(1, "Please add a password"),
});

function RouteComponent() {
	const navigate = useNavigate();
	const formId = useId();
	const form = useAppForm({
		defaultValues: {
			email: "",
			password: "",
		},
		validators: {
			onSubmit: formSchema,
		},
		onSubmit: ({ value }) => {
			authClient.signIn.email(
				{
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
				<CardTitle>Sign In</CardTitle>
				<CardDescription>Access your account</CardDescription>
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
						<form.AppField name="email">
							{(field) => <field.TextField label="Email" />}
						</form.AppField>
						<form.AppField name="password">
							{(field) => <field.TextField label="Password" type="password" />}
						</form.AppField>
					</FieldGroup>
				</form>
			</CardContent>
			<CardFooter className="flex flex-col items-stretch gap-2">
				<Button type="submit" form={formId}>
					Sign In
				</Button>
				<Button variant={"link"}>
					<Link to="/register">Don't have an account?</Link>
				</Button>
			</CardFooter>
		</Card>
	);
}
