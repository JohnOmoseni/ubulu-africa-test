import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { CloseIcon } from "@/constants/icons";
import CustomIcon from "@/components/reuseables/CustomIcon";

type ModalProps = {
	title?: string;
	description?: string;
	children?: ReactNode;
	openModal: boolean;
	modalStyles?: string;
	showCloseIcon?: boolean;
	setOpenModal?: () => void;
};

export default function Modal({
	title,
	description,
	children,
	openModal,
	showCloseIcon = true,
	setOpenModal,
	modalStyles,
}: ModalProps) {
	return (
		<AlertDialog
			open={openModal}
			onOpenChange={() => (setOpenModal ? setOpenModal() : null)}
		>
			{/* we will trigger the opening of the dialog somewhere else */}

			<AlertDialogContent
				style={{ zIndex: 999 }}
				className={cn(
					"block remove-scrollbar mx-auto max-h-[560px] md:max-h-[600px] min-h-[250px] max-w-[480px] overflow-x-clip overflow-y-auto rounded-xl py-5 px-4 md:px-5 shadow-lg max-sm:w-[90%]",
					modalStyles
				)}
			>
				{showCloseIcon && (
					<CustomIcon
						icon={CloseIcon}
						className="size-6 z-[1000] active:scale-95 transition text-[#667085] absolute right-5 top-5 cursor-pointer"
						action={setOpenModal}
						title="close"
					/>
				)}

				<AlertDialogHeader>
					<AlertDialogTitle
						className={cn("text-lg hidden pb-3 pr-3", title && "block")}
					>
						{title}
					</AlertDialogTitle>

					<AlertDialogDescription
						className={cn(
							"max-sm:text-center hidden leading-5",
							description && "block"
						)}
					>
						{description}
					</AlertDialogDescription>
				</AlertDialogHeader>

				{children}
			</AlertDialogContent>
		</AlertDialog>
	);
}
