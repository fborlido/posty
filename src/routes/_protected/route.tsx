import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { getSession } from "#/features/auth/auth.functions";

export const Route = createFileRoute("/_protected")({
	component: RouteComponent,
	beforeLoad: async () => {
		const session = await getSession();
		if (!session) {
			throw redirect({ to: "/login" });
		}
		return { user: session.user };
	},
});

function RouteComponent() {
	return <Outlet />;
}
