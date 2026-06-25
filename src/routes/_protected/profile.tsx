import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "#/components/ui/button";
import UploadButton from "#/components/upload-button";
import { authClient } from "#/lib/auth-client";

export const Route = createFileRoute("/_protected/profile")({
	component: RouteComponent,
});

function RouteComponent() {
	const { user } = Route.useRouteContext();
	const navigate = useNavigate();

	const handleLogout = () => {
		authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					toast.success("See you later!");
					navigate({ to: "/login" });
				},
			},
		});
	};

	const handleUpload = async (url: string) => {
		await authClient
			.updateUser({ image: url })
			.then(() => {
				toast.success("Success!");
			})
			.catch(() => toast.error("Error adding image"));
	};

	return (
		<div className=" space-y-8">
			<h1 className="font-heading font-bold text-3xl">
				Welcome, <span className="text-primary">{user.name}</span> !
			</h1>
			<div className="text-lg space-y-2">
				<h2>Update profile picture</h2>
				<UploadButton onUpload={(url) => handleUpload(url)} />
			</div>
			<div className="text-lg space-y-2">
				<h2>Say goodbye</h2>
				<Button variant={"destructive"} onClick={() => handleLogout()}>
					Logout
				</Button>
			</div>
		</div>
	);
}
