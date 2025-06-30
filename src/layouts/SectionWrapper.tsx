import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
	children: ReactNode;
	sectionTitle: string;
	mainContainerStyles?: string;
	customHeaderContent?: ReactNode;
};

const SectionWrapper = ({
	children,
	sectionTitle,
	mainContainerStyles,
}: Props) => {
	return (
		<>
			<section className="font-medium block text-center capitalize md:hidden">
				{sectionTitle}
			</section>
			<main
				className={cn(
					"min-h-[80vh] w-full overflow-y-auto py-3 pb-4 sm:py-6",
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
