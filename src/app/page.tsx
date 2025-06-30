import { SlidingTabs } from "@/components/tabs/SlidingTabs";
import { useCallback, useState } from "react";
import { useLocation } from "react-router-dom";
import TabsPanel from "@/components/tabs/TabsPanel";
import SectionWrapper from "@/layouts/SectionWrapper";
import FormBuilder from "./form-builder/page";
import BlogPost from "./blog/page";
import RichDataTable from "./data-table/page";

const tabIDs = ["Rich Data Table", "Custom Form Builder", "Mini Blog App"];
function Home() {
	const { state } = useLocation();
	const initialTab = state?.currentTab ? state?.currentTab : 0;

	const [activeTab, setActiveTab] = useState(initialTab || 0);

	const changeTab = useCallback((id: number) => {
		setActiveTab(id);
	}, []);

	return (
		<SectionWrapper sectionTitle={""}>
			<div className="mt-3 border-b border-border">
				<SlidingTabs
					activeTab={activeTab}
					changeTab={changeTab}
					tabIDs={tabIDs}
				/>
			</div>

			<TabsPanel activeTab={activeTab} id={tabIDs[0]} idx={0}>
				<div className="mt-8 max-w-3xl mx-auto px-3.5 md:px-6 pt-5 pb-8 rounded-md shadow">
					<RichDataTable />
				</div>
			</TabsPanel>

			<TabsPanel activeTab={activeTab} id={tabIDs[1]} idx={1}>
				<div className="mt-8 max-w-md mx-auto px-6 md:px-8 pt-4 pb-8 rounded-md shadow">
					<FormBuilder />
				</div>
			</TabsPanel>

			<TabsPanel activeTab={activeTab} id={tabIDs[2]} idx={2}>
				<div className="mt-6 max-w-2xl mx-auto px-3.5 md:px-6 pt-4 pb-6 rounded-md shadow">
					<BlogPost />
				</div>
			</TabsPanel>
		</SectionWrapper>
	);
}

export default Home;
