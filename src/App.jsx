import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Layout from "./components/Layout";
import Index from "./components/Index";
import EnterNumbers from "./components/EnterNumbers";
import PreviousTrees from "./components/PreviousTrees";

//Routes: /, /enter-numbers, /previous-trees
//Post Route: /proccess-numbers

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<Index />} />
						<Route path="/enter-numbers" element={<EnterNumbers />}></Route>
						<Route path="/previous-trees" element={<PreviousTrees />}></Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
