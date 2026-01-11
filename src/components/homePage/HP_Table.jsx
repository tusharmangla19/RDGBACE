import { morningProgramSchema } from "../../personalSadhnaSchema";
import HP_TableData from "./HP_TableData";
const HP_Table = ({ devoteeData, theme, darkMode, setTableData }) => {
	return (
		<>
			<div className="homePage">
				<button onClick={theme} className="theme-toggle-btn">
					{darkMode ? "Light Mode" : "Dark Mode"}
				</button>
			</div>

			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Name</th>
						{morningProgramSchema.map((field) => (
							<th key={field.name}>{field.name}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{devoteeData.map((devotee, index) => (
						<HP_TableData
							key={devotee.id}
							{...devotee}
							number={index + 1}
							category={devotee.category}
							setTableData={setTableData}
						/>
					))}
				</tbody>
			</table>
		</>
	);
};

export default HP_Table;
