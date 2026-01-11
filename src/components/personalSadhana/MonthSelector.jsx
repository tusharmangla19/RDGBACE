import { format, addMonths } from "date-fns";
import "./MonthSelector.css";
const MonthSelector = ({ selectedMonth, setSelectedMonth }) => {
	const handleChangeMonth = (amount) => {
		setSelectedMonth((prevMonth) => addMonths(prevMonth, amount));
	};

	return (
		<div>
			<label className="label">Select Month: </label>
			<select
				style={{
					width: "10rem",
					height: "2rem",
					border: "1px solid",
					borderRadius: ".5rem",
					background: "#f4f4f4",
					fontSize: "1rem",
				}}
				value={format(selectedMonth, "yyyy-MM")}
				onChange={(e) => setSelectedMonth(new Date(e.target.value))}
			>
				{/* Show only previous months */}
				{Array.from({ length: 12 }, (_, index) => index).map((month) => (
					<option
						key={month}
						value={format(addMonths(new Date(), -month), "yyyy-MM")} // Show previous months only
					>
						{format(addMonths(new Date(), -month), "MMMM yyyy")}
					</option>
				))}
			</select>
			{/* Previous month button */}
			<button className="prevMonBtn" onClick={() => handleChangeMonth(-1)}>
				Previous Month
			</button>
			{/* Next month button */}
			<button className="nextMonBtn" onClick={() => handleChangeMonth(1)}>
				Next Month
			</button>
		</div>
	);
};

export default MonthSelector;
