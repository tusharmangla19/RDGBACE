import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db, collection, getDocs, doc } from "../../firebase/Firebase";
import { morningProgramSchema } from "../../personalSadhnaSchema";
import { calculateFieldAverage } from "../personalSadhana/utils"; // Make sure this path is correct
import MissingFieldsChecker from "../personalSadhana/MissingFieldsChecker";
import "./HP_TableData.css";
import { format } from "date-fns"; // Ensure date-fns is installed
const HP_TableData = ({ id, name, number, category }) => {
	const [formData, setFormData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [averages, setAverages] = useState({});
	const [selectedMonth, setSelectedMonth] = useState(new Date());

	const dvtId = id.toString();
	useEffect(() => {
		const fetchData = async () => {
			if (!id) {
				console.error("No id provided");
				setIsLoading(false);
				return;
			}

			try {
				const devoteeRef = doc(db, "morningProgram", dvtId);
				const devoteeCollection = collection(devoteeRef, "dailyData");
				// Get the current month's abbreviation
				const currentMonthAbbreviation = format(selectedMonth, "MMM"); // "MMM" gives short month names like "Dec"

				// Fetch all documents (since Firestore cannot query directly on part of a string)
				const querySnapshot = await getDocs(devoteeCollection);
				const data = [];

				querySnapshot.forEach((doc) => {
					const record = doc.data();
					const recordMonth = record.date.split(", ")[1]?.split(" ")[0]; // Extract "Dec" from "Mon, Dec 30"

					// Only include records from the current month
					if (recordMonth === currentMonthAbbreviation) {
						data.push({ id: doc.id, ...record });
					}
				});

				setFormData(data);

				// Calculate averages
				const newAverages = morningProgramSchema.reduce((acc, field) => {
					acc[field.name] = calculateFieldAverage(data, field.name);
					return acc;
				}, {});

				setAverages(newAverages);
				setIsLoading(false);
			} catch (error) {
				console.error("Error fetching documents: ", error);
				setIsLoading(false);
			}
		};

		fetchData();
	}, [id]);
	let rowClass = "";
	if (category === "BC") {
		rowClass = "category-BC";
	} else if (category === "bace") {
		rowClass = "category-bace";
	} else if (category === "email") {
		rowClass = "category-email";
	} else {
		rowClass = "category-default";
	}
	const missingDays = MissingFieldsChecker({
		formData,
		selectedMonth,
		morningProgramSchema,
	});
	return (
		<>
			<tr>
				<td>{number}</td>
				<td className={rowClass}>
					<Link
						to={`/morning-program/${id}`}
						state={{ name: name }}
						style={category && { color: "black" }}
					>
						<div
							style={{ display: "flex", alignItems: "center", width: "100%" }}
						>
							<span
								style={{
									flexGrow: 1, // Allows this field to take up extra space
									whiteSpace: "nowrap", // Optional: Prevents text wrapping
									textDecoration: "underline",
								}}
							>
								{name}
							</span>
							{missingDays > 0 && (
								<span
									className="missingDays"
									style={{
										flexShrink: 0, // Prevents this field from shrinking
										marginLeft: "10px", // Adds space between name and number
										textDecoration: "none",
									}}
								>
									{missingDays}
								</span>
							)}
						</div>
					</Link>
				</td>

				{morningProgramSchema.map((field) => (
					<td key={field.name}>{averages[field.name] || ""}</td>
				))}
			</tr>
		</>
	);
};

export default HP_TableData;
