import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";

export type StatusType =
	| "Active"
	| "Inactive"
	| "Expired"
	| "Pending"
	| "Completed";

export type ToastType = "success" | "info" | "error";

export type OptionSelectType = {
	label: string;
	value: string;
};

export type TabsPanelProp = {
	activeTab: number;
	id: string;
	idx: number;
	children: React.ReactNode;
};

export type TabsProps = {
	activeTab: number;
	changeTab: (idx: number) => void;
	tabIDs: string[];
};

export type TabProps = {
	idx: number;
	activeTab: number;
	tab: string;
	changeTab: (idx: number) => void;
	className?: string;
};

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
