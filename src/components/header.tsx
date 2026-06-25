import { Link } from "@tanstack/react-router";
import { authClient } from "#/lib/auth-client";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import UserAvatar from "./user-avatar";

export default function Header() {
	const { data: session, isPending } = authClient.useSession();

	return (
		<header className="border-b">
			<div className="max-w-4xl mx-auto grid grid-cols-3 items-center p-4">
				<img src="/posty.png" alt="" className="w-18" />
				{/* <div className="font-heading font-bold text-primary text-lg">
					Auth App
				</div> */}
				<div className="flex items-center justify-center gap-2">
					<Button asChild variant={"ghost"}>
						<Link to="/">Home</Link>
					</Button>
					<Button asChild variant={"ghost"}>
						<Link to="/posts">Posts</Link>
					</Button>
				</div>
				<div className="flex justify-end">
					{isPending ? (
						<Skeleton className="size-8 rounded-full" />
					) : session ? (
						<Link to="/profile">
							<UserAvatar image={session.user.image} name={session.user.name} />
						</Link>
					) : (
						<Button asChild>
							<Link to="/register">Get started</Link>
						</Button>
					)}
				</div>
			</div>
		</header>
	);
}
