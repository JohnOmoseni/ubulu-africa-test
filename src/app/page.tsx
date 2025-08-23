import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import data from "./data.json";
import { AppSidebar } from "@/components/example/app-sidebar";
import { SiteHeader } from "@/components/example/site-header";
import { SectionCards } from "@/components/example/section-cards";
import { ChartAreaInteractive } from "@/components/example/chart-area-interactive";
import { DataTable } from "@/components/example/data-table";

export default function ShadCNPage() {
	return (
		<SidebarProvider
			className="h-svh"
			style={
				{
					"--sidebar-width": "calc(var(--spacing) * 72)",
					"--header-height": "calc(var(--spacing) * 12)",
				} as React.CSSProperties
			}
		>
			<AppSidebar variant="inset" />
			<SidebarInset className="overflow-y-auto">
				<SiteHeader />
				<div className="flex flex-1 flex-col">
					<div className="@container/main flex flex-1 flex-col gap-2">
						<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
							<SectionCards />
							<div className="px-4 lg:px-6">
								<ChartAreaInteractive />
							</div>
							<DataTable data={data as any} />
						</div>
					</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
