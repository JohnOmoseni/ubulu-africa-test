import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const truncateString = (str: string, length: number): string => {
	return str.length > length ? `${str.substring(0, length - 2)}...` : str;
};
