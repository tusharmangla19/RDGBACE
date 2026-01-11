const MissingFieldsChecker = ({
	formData,
	selectedMonth,
	morningProgramSchema,
}) => {
	const findIncompleteDays = () => {
		const currentDate = new Date(); // Current date
		const firstDayOfMonth = new Date(
			selectedMonth.getFullYear(),
			selectedMonth.getMonth(),
			1
		);

		let incompleteDaysCount = 0;

		for (
			let date = new Date(firstDayOfMonth);
			date <= currentDate;
			date.setDate(date.getDate() + 1)
		) {
			const formattedDate = date.toLocaleDateString("en-US", {
				weekday: "short",
				day: "numeric",
				month: "short",
			});
			// Check if the date exists in formData
			const dayData = formData.find((form) => form.date === formattedDate);

			// If dayData is missing or has incomplete fields, count it as incomplete
			const isDayIncomplete =
				!dayData ||
				morningProgramSchema.some((field) => {
					const fieldValue = dayData[field.name];
					return (
						fieldValue === undefined ||
						fieldValue === null ||
						fieldValue.trim() === ""
					);
				});

			if (isDayIncomplete) {
				incompleteDaysCount++;
			}
		}

		return incompleteDaysCount - 1; // Return the count of incomplete days
	};

	return findIncompleteDays(); // Directly return the count
};

export default MissingFieldsChecker;
