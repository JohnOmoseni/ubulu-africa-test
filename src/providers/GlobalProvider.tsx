import store from "@/redux/store";
import { Provider } from "react-redux";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PostContextProvider from "@/context/PostContext";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 2 * 60 * 1000, // 2 minutes
		},
	},
});

export default function GlobalProvider({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<PostContextProvider>
			<QueryClientProvider client={queryClient}>
				<Provider store={store}>{children}</Provider>
			</QueryClientProvider>
		</PostContextProvider>
	);
}
