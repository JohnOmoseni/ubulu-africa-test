import type { ToastType } from "@/types";
import { toast } from "sonner";

export const handleApiError = (error: any, message?: string) => {
	console.error(`API Error - ${message}:`, error);
	if (error.response) {
		// Server returned a responnse not in the 200 range
		console.error("Error Response data:", error.response.data);
		console.error("Response status:", error.response.status);
		throw error.response.data;
	} else if (error.request) {
		console.error("Request data:", error.request);
	} else {
		console.error("Error message:", error.message);
	}
	throw error;
};

export const wait = (ms: number) => {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
};

export function showToast(type: ToastType, message: string, desc?: string) {
	toast[type](
		<div className="flex-column">
			<h3 className="font-semibold leading-5 text-base">{message}</h3>
			{desc && <p className="text-sm">{desc}</p>}
		</div>
	);
}
