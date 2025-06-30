import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import GlobalProvider from "./providers/GlobalProvider";

import "@/styles/globals.css";
import "@/styles/index.css";
import "@/styles/utils.css";

function App() {
	return (
		<Router>
			<GlobalProvider>
				<AppRouter />
			</GlobalProvider>
		</Router>
	);
}

export default App;
