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
	setOpenModal?: () => void;
};

export default function FilterModal({
	title,
	description,
	children,
	openModal,
	setOpenModal,
	modalStyles,
}: ModalProps) {
	return (
		<AlertDialog
			open={openModal}
			onOpenChange={() => (setOpenModal ? setOpenModal() : null)}
		>
			<AlertDialogContent
				style={{ zIndex: 999 }}
				className={cn(
					"block remove-scrollbar mx-auto max-h-[560px] md:max-h-[600px] min-h-[250px] max-w-[480px] overflow-x-clip overflow-y-auto rounded-xl py-5 px-4 md:px-5 shadow-lg max-sm:w-[90%]",
					modalStyles
				)}
			>
				<div className="py-1 border-b-2 border-border row-flex-btwn">
					<AlertDialogHeader>
						<AlertDialogTitle className="text-lg">{title}</AlertDialogTitle>

						<AlertDialogDescription
							className={cn("hidden", description && "block")}
						>
							{description}
						</AlertDialogDescription>
					</AlertDialogHeader>

					<CustomIcon
						icon={CloseIcon}
						className="size-6 active:scale-95 transition text-[#667085] cursor-pointer"
						action={setOpenModal}
						title="close"
					/>
				</div>

				<div className="mt-12 mb-4 relative">{children}</div>
			</AlertDialogContent>
		</AlertDialog>
	);
}
