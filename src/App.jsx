import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HP_Table from "./components/homePage/HP_Table";
import devoteeData from "./data/devoteesData";
import MorningProgram from "./components/personalSadhana/MorningProgram";
import Header from "./Header";

function App() {
	const [darkMode, setDarkMode] = useState(true);
	const [tableData, setTableData] = useState(true);
	useEffect(() => {
		// Set theme class
		document.body.className = darkMode ? "darkMode" : "lightMode";
	}, [darkMode]);

	const toggleTheme = () => {
		setDarkMode((prevMode) => !prevMode);
	};

	return (
		<Router>
			<div className="app-container">
				<div className="App">
					<Header theme={toggleTheme} darkMode={darkMode} />
					<Routes>
						<Route
							path="/"
							element={
								<HP_Table
									devoteeData={devoteeData}
									theme={toggleTheme}
									darkMode={darkMode}
									setTableData={setTableData}
								/>
							}
						/>
						<Route
							path="/morning-program/:devoteeId/*"
							element={<MorningProgram tableData={tableData} />}
						/>
					</Routes>
				</div>
			</div>
		</Router>
	);
}

export default App;
