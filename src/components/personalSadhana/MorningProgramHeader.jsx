import React from "react";
import MonthSelector from "./MonthSelector";

const MorningProgramHeader = ({ name, selectedMonth, setSelectedMonth }) => {
	return (
		<div className="mpHeader">
			<h2 className="mpHeader_dvtName">
				Personal Sadhana Page for:
				<span className="mpHeader_name"> {name}</span>
			</h2>
			<MonthSelector
				selectedMonth={selectedMonth}
				setSelectedMonth={setSelectedMonth}
			/>
		</div>
	);
};

export default MorningProgramHeader;
