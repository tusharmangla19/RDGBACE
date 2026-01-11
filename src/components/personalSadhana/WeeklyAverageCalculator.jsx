import { calculateFieldAverage } from "./utils";
const WeeklyAverageCalculator = ({
	formData,
	datesByWeek,
	morningProgramSchema,
}) => {
	// Function to calculate averages for a week
	const calculateWeeklyAverages = (weekDates) => {
		const weeklyData = weekDates.reduce((acc, date) => {
			const formattedDate = date.toLocaleDateString("en-US", {
				weekday: "short",
				day: "numeric",
				month: "short",
			});
			return { ...acc, [formattedDate]: formData[formattedDate] };
		}, {});

		const weeklyAverages = {};
		morningProgramSchema.forEach(({ name }) => {
			weeklyAverages[name] = calculateFieldAverage(weeklyData, name);
		});
		return weeklyAverages;
	};

	return (
		<>
			{Object.entries(datesByWeek).map(([weekNumber, weekDates]) => {
				const weeklyAverages = calculateWeeklyAverages(weekDates);

				return (
					<tr key={weekNumber} className="weeklyAverageRow">
						<td>
							Weekly Average (
							{weekNumber < 5 ? `Week ${weekNumber}` : "Remaining Days"})
						</td>
						{morningProgramSchema.map((field) => (
							<td key={field.name}>{weeklyAverages[field.name] || ""}</td>
						))}
					</tr>
				);
			})}
		</>
	);
};

export default WeeklyAverageCalculator;
