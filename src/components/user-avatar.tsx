import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type UserAvatarProps = {
	image?: string | null;
	name: string;
};

export default function UserAvatar({ name, image }: UserAvatarProps) {
	return (
		<Avatar>
			<AvatarImage src={image || ""} />
			<AvatarFallback>{name[0].toUpperCase()}</AvatarFallback>
		</Avatar>
	);
}
