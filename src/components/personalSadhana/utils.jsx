import { morningProgramSchema } from "../../personalSadhnaSchema";
export const calculateFieldAverage = (formData, fieldName) => {
	const formattedDates = Object.keys(formData);
	const numericValues = formattedDates
		.map((formattedDate) => {
			const record = formData[formattedDate];
			if (
				record &&
				record[fieldName] !== undefined &&
				record[fieldName].trim() !== ""
			) {
				if (
					fieldName === "Wake Up Time" ||
					fieldName === "Sleep Time" ||
					fieldName === "16th Round" ||
					fieldName === "Sleep"
				) {
					const timeString = record[fieldName].trim().toLowerCase();
					let hours, minutes, period;

					// Match both 12-hour and 24-hour formats
					const match = timeString.match(/^(\d{1,2}):(\d{2})\s*(am|pm)?$/i);

					if (match) {
						hours = parseInt(match[1], 10);
						minutes = parseInt(match[2], 10);
						period = match[3] ? match[3].toUpperCase() : null;

						// Convert to 24-hour format minutes
						if (period) {
							if (period === "AM" && hours === 12) hours = 0;
							else if (period === "PM" && hours < 12) hours += 12;
						}
						return hours * 60 + minutes;
					}
					return null;
				} else if (
					fieldName === "Japa" ||
					fieldName === "SP Lecture" ||
					fieldName === "Other Lecture" ||
					fieldName === "SP Books" ||
					fieldName === "Other Books" ||
					fieldName === "Day Rest Time" ||
					fieldName === "Seva"
				) {
					const value = parseInt(record[fieldName], 10);
					return isNaN(value) ? null : value;
				} else if (fieldName === "Mangala Arti"||fieldName === "Class") {
					const response = record[fieldName].trim().toLowerCase();
					return response === "yes" ? 1 : 0;
				}
			}
			return null;
		})
		.filter((value) => value !== null);

	if (numericValues.length > 0) {
		if (
			fieldName === "Wake Up Time" ||
			fieldName === "Sleep Time" ||
			fieldName === "16th Round" ||
			fieldName === "Sleep"	
		) {
			const radians = numericValues.map(
				(minutes) => (minutes / (24 * 60)) * 2 * Math.PI
			);
			const sumSin = radians.reduce((acc, rad) => acc + Math.sin(rad), 0);
			const sumCos = radians.reduce((acc, rad) => acc + Math.cos(rad), 0);
			const averageAngle = Math.atan2(sumSin, sumCos);

			let averageMinutes = Math.round((averageAngle / (2 * Math.PI)) * 24 * 60);
			if (averageMinutes < 0) averageMinutes += 24 * 60;

			let hours = Math.floor(averageMinutes / 60);
			const minutes = Math.round(averageMinutes % 60);

			const period = hours >= 12 ? "PM" : "AM";
			hours = hours % 12 || 12;

			return `${hours}:${minutes < 10 ? "0" : ""}${minutes} ${period}`;
		} else if (
			fieldName === "Japa" ||
			fieldName === "SP Lecture" ||
			fieldName === "Other Lecture" ||
			fieldName === "SP Books" ||
			fieldName === "Other Books" ||
			fieldName === "Day Rest Time" ||
			fieldName === "Seva"
		) {
			const sum = numericValues.reduce((acc, value) => acc + value, 0);
			return Math.round(sum / numericValues.length);
		} else if (fieldName === "Mangala Arti"||fieldName === "Class") {
			return numericValues.reduce((acc, value) => acc + value, 0);
		}
	}
	return null;
};

export const getMonthDates = (selectedMonth) => {
	const currentYear = selectedMonth.getFullYear();
	const currentMonth = selectedMonth.getMonth();
	const numberOfDaysInMonth = new Date(
		currentYear,
		currentMonth + 1,
		0
	).getDate();

	const dates = [];
	for (let day = 1; day <= numberOfDaysInMonth; day++) {
		dates.push(new Date(currentYear, currentMonth, day));
	}
	return dates;
};

export const calculateAverages = (data) => {
	const averages = {};
	morningProgramSchema.forEach(({ name }) => {
		averages[name] = calculateFieldAverage(data, name); // Use utility for averages
	});
	return averages;
};
