import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="max-w-lg mx-auto">
			<Outlet />
		</div>
	);
}
