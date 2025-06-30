import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { profile } from "@/constants/icons";
import { cn } from "@/lib/utils";

type AvatarProps = {
	src?: string;
	fallback?: string;
	containerClassName?: string;
};

function AvatarWrapper({
	src,
	fallback = "QU",
	containerClassName,
}: AvatarProps) {
	return (
		<Avatar
			className={cn(
				"icon place-items-center leading-none bg-[#F4ECEC] transition-all clip-circle group overflow-hidden",
				containerClassName
			)}
		>
			<AvatarImage
				src={src || profile}
				className="group-hover:scale-105 user-select-none"
			/>
			<AvatarFallback className="leading-none mt-px tracking-wider">
				{fallback}
			</AvatarFallback>
		</Avatar>
	);
}

export default AvatarWrapper;
