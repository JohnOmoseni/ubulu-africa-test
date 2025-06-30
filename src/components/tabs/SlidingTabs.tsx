import { cn } from "@/lib/utils";
import type { TabProps, TabsProps } from "@/types";
import { motion } from "framer-motion";

const Tab = ({ idx, activeTab, tab, changeTab, className }: TabProps) => {
	return (
		<li
			role="tab"
			className={cn(
				"relative cursor-pointer whitespace-nowrap px-6 py-2 pb-3 text-center capitalize",
				activeTab === idx
					? "font-semibold text-foreground-variant transition-colors"
					: "font-medium text-foreground-100",

				className
			)}
			onClick={() => changeTab(idx)}
		>
			{tab}

			{activeTab === idx && (
				<motion.span
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ ease: "easeIn" }}
					className="absolute -bottom-px left-0 right-0 mx-auto h-[2px] w-full rounded-full bg-secondary shadow-sm"
				/>
			)}
		</li>
	);
};

export const SlidingTabs = ({ activeTab, changeTab, tabIDs }: TabsProps) => {
	return (
		<div className="remove-scrollbar overflow-x-auto overflow-y-hidden">
			<ul
				role="tablist"
				aria-label="Tabs"
				className="grid grid-flow-col gap-6 sm:gap-12 "
			>
				{tabIDs.map((tab, idx) => {
					return (
						<Tab
							key={idx}
							activeTab={activeTab}
							tab={tab}
							idx={idx}
							changeTab={changeTab}
						/>
					);
				})}
			</ul>
		</div>
	);
};
