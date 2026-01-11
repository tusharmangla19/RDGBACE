import React from "react";
import WeeklyAverageCalculator from "./WeeklyAverageCalculator";
import { getMonthDates } from "./utils";

const MorningProgramTableBody = ({
	formData,
	morningProgramSchema,
	handleInputChange,
	selectedMonth,
}) => {
	// Utility: Group dates by week
	const groupDatesByWeek = (dates) => {
		const weeks = {};	
		dates.forEach((date) => {
			const weekNumber = Math.ceil(date.getDate() / 7); // Week number calculation
			if (!weeks[weekNumber]) weeks[weekNumber] = [];
			weeks[weekNumber].push(date);
		});
		return weeks;
	};

	// Group formatted dates by week
	const datesByWeek = groupDatesByWeek(getMonthDates(selectedMonth));

	return (
		<tbody>
			{Object.entries(datesByWeek).map(([weekNumber, weekDates]) => (
				<React.Fragment key={weekNumber}>
					{/* Render week data */}
					{weekDates.map((date) => {
						const formattedDate = date.toLocaleDateString("en-US", {
							weekday: "short",
							day: "numeric",
							month: "short",
						});
						return (
							<tr key={formattedDate}>
								<td className="fields">{formattedDate}</td>
								{morningProgramSchema.map((field) => (
									<td key={field.name} className="fields">
										{field.type === "select" ? (
											<select
												className={
													field.name === "Mangala Arti"
														? "mangalaArti_inputField"
														: "seva_inputField"
												}
												name={field?.name}
												value={formData[formattedDate]?.[field?.name] || ""}
												onChange={(e) => handleInputChange(e, formattedDate)}
											>
												<option value="">Select</option>
												{field?.options?.map((option) => (
													<option key={option} value={option}>
														{option}
													</option>
												))}
											</select>
										) : (
											<input
												type={field.type === "time" ? "time" : "text"}
												name={field.name}
												className={
													field.type === "time"
														? "time_inputField"
														: "text_inputField"
												}
												value={formData[formattedDate]?.[field.name] || ""}
												onChange={(e) => handleInputChange(e, formattedDate)}
											/>
										)}
									</td>
								))}
							</tr>
						);
					})}

					{/* Weekly Average Row */}
					<WeeklyAverageCalculator
						formData={formData}
						datesByWeek={{ [weekNumber]: weekDates }}
						morningProgramSchema={morningProgramSchema}
					/>
				</React.Fragment>
			))}
		</tbody>
	);
};

export default MorningProgramTableBody;
