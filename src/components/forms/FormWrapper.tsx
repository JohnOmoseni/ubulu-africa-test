import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import CustomButton from "../reuseables/CustomButton";

interface FormWrapperProps {
	children: ReactNode;
	buttonLabel?: string;
	isSubmitting?: boolean;
	containerStyles?: string;
	formWrapperStyles?: string;
	btnStyles?: string;
	onSubmit?: () => void;
	footerSection?: ReactNode;
}

function FormWrapper({
	children,
	buttonLabel,
	isSubmitting,
	containerStyles,
	btnStyles,
	onSubmit,
	footerSection,
	formWrapperStyles,
}: FormWrapperProps) {
	return (
		<div className={cn("mt-4 h-full w-full max-w-lg mx-auto", containerStyles)}>
			<form
				onSubmit={onSubmit}
				className={cn(
					"flex-column flex-1",
					!footerSection && "gap-8 md:gap-10"
				)}
			>
				<div className={cn("flex-column space-y-6", formWrapperStyles)}>
					{children}
				</div>

				{footerSection ? (
					footerSection
				) : (
					<CustomButton
						type="submit"
						title={isSubmitting ? "Submitting..." : buttonLabel || "Submit"}
						className={cn("!mt-auto mx-auto", btnStyles)}
						disabled={isSubmitting}
						isLoading={isSubmitting}
					/>
				)}
			</form>
		</div>
	);
}

export default FormWrapper;
