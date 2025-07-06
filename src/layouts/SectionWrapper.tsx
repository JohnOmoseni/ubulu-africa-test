import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
	children: ReactNode;
	mainContainerStyles?: string;
	customHeaderContent?: ReactNode;
};

const SectionWrapper = ({ children, mainContainerStyles }: Props) => {
	return (
		<>
			<main
				className={cn(
					"min-h-[80vh] w-full overflow-y-auto py-3 pb-4 sm:py-6 max-w-[1100px] mx-auto",
					mainContainerStyles,
					!mainContainerStyles && "px-3.5 md:px-6"
				)}
			>
				{children}
			</main>
		</>
	);
};

export default SectionWrapper;
