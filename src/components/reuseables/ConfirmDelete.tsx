import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { type ReactNode, useEffect, useRef, useState } from "react";

type Props = {
	isPending?: boolean;
	title?: string;
	trigger: ReactNode;
	onDeleteClick: () => void;
};

const ConfirmDelete = ({ onDeleteClick, title, isPending, trigger }: Props) => {
	const [open, setOpen] = useState(false);
	const isActive = useRef(false);

	useEffect(() => {
		if (isActive.current) {
			isPending ? null : setOpen(false);
		}
	}, [isPending]);

	const handleDeleteClick = () => {
		isActive.current = true;
		onDeleteClick();
	};
	return (
		<AlertDialog open={open}>
			<AlertDialogTrigger
				asChild
				onClick={() => setOpen(true)}
				className="w-full"
			>
				{trigger}
			</AlertDialogTrigger>

			<AlertDialogContent className="bg-background z-[999] w-[90%] max-sm:max-w-[480px]">
				<AlertDialogHeader>
					<AlertDialogTitle>
						Are you sure you want to delete {title}
					</AlertDialogTitle>
					<AlertDialogDescription className="">
						This action is irreversible
					</AlertDialogDescription>
				</AlertDialogHeader>

				<AlertDialogFooter>
					<AlertDialogCancel
						className="cursor-pointer min-w-[90px]"
						onClick={() => setOpen(false)}
					>
						Cancel
					</AlertDialogCancel>
					<AlertDialogAction
						className="bg-red-500 text-white cursor-pointer min-w-[90px]"
						onClick={handleDeleteClick}
					>
						{isPending ? "Deleting..." : "Delete"}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default ConfirmDelete;
