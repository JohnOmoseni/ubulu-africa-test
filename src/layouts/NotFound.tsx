import { NotFoundIcon } from "@/constants/icons";

function NotFound() {
	return (
		<div className="grid place-items-center h-svh overflow-hidden">
			<div className="flex-column items-center gap-4 px-6">
				<div className="relative mt-3 h-[200px]">
					<NotFoundIcon className="max-[390px]:w-[280px]" />
				</div>

				<div className="flex-column gap-2.5">
					<h2 className="max-w-sm text-center">Page not found.</h2>
					<p className="max-w-[50ch] text-center text-lg text-gray-700 leading-5">
						The requested URL was not found on this server
					</p>
				</div>
			</div>
		</div>
	);
}

export default NotFound;
