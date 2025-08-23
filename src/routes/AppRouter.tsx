import EditBlog from "@/app/blog/edit-blog";
import NewBlog from "@/app/blog/new-post";
import BlogPost from "@/app/blog/page";
import Home from "@/app/ubulu-page";
import ShadCNPage from "@/app/page";
import DashboardLayout from "@/layouts/DashboardLayout";
import NotFound from "@/layouts/NotFound";
import LayoutProvider from "@/providers/LayoutProvider";
import { Route, Routes } from "react-router-dom";

const AppRouter = () => {
	return (
		<>
			<Routes>
				<Route element={<LayoutProvider />}>
					<Route path="*" element={<NotFound />} />

					<Route path="/dashboard/*" element={<ShadCNPage />} />

					<Route element={<DashboardLayout />}>
						<Route index element={<Home />} />
						<Route element={<BlogPost />}>
							<Route path="new" element={<NewBlog />} />
							<Route path="edit/:id" element={<EditBlog />} />
						</Route>
					</Route>
				</Route>
			</Routes>
		</>
	);
};

export default AppRouter;
