import { useState, useEffect } from "react";
import {
	db,
	collection,
	getDocs,
	doc,
	query,
	where,
	updateDoc,
	addDoc,
} from "../../firebase/Firebase";
import { useLocation, useParams } from "react-router-dom";
import "./MorningProgram.css";
import { calculateAverages, getMonthDates } from "./utils";
import { morningProgramSchema } from "../../personalSadhnaSchema";
import MorningProgramHeader from "./MorningProgramHeader";
import MorningProgramTableBody from "./MorningProgramTableBody"; // Import the new table body component
import { format } from "date-fns"; // Ensure date-fns is installed

const MorningProgram = () => {
	const { devoteeId } = useParams();
	const [selectedMonth, setSelectedMonth] = useState(new Date());
	const [formData, setFormData] = useState({});
	const [existingData, setExistingData] = useState([]);
	const [averages, setAverages] = useState({});

	const location = useLocation();
	const { name } = location.state;

	// Fetch data when devoteeId or selectedMonth changes
	useEffect(() => {
		fetchData();
	}, [devoteeId, selectedMonth]);

	// Recalculate averages when formData changes
	useEffect(() => {
		const newAverages = calculateAverages(formData);
		setAverages(newAverages);
	}, [formData]);

	// Handle input changes for a specific date and field
	const handleInputChange = (e, date) => {
		const { name, value } = e.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[date]: {
				...(prevFormData[date] || {}),
				[name]: value,
			},
		}));
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const devoteeRef = doc(db, "morningProgram", devoteeId);
			const devoteeCollection = collection(devoteeRef, "dailyData");

			const updatedData = [];

			for (const [date, data] of Object.entries(formData)) {
				const dataToSubmit = {
					date,
					devoteeId,
					...data,
				};

				const existingDocQuery = query(
					devoteeCollection,
					where("date", "==", date)
				);
				const existingDocSnapshot = await getDocs(existingDocQuery);

				if (existingDocSnapshot.empty) {
					const docRef = await addDoc(devoteeCollection, dataToSubmit);
					updatedData.push({ id: docRef.id, ...dataToSubmit });
				} else {
					const existingDocId = existingDocSnapshot.docs[0].id;
					await updateDoc(doc(devoteeCollection, existingDocId), dataToSubmit);
					updatedData.push({ id: existingDocId, ...dataToSubmit });
				}
			}

			setExistingData(updatedData);
			alert("Data Added Successfully!");
		} catch (error) {
			alert("Error: " + error);
		}
	};

	// Fetch data from Firestore

	const fetchData = async () => {
		try {
			const devoteeRef = doc(db, "morningProgram", devoteeId);
			const devoteeCollection = collection(devoteeRef, "dailyData");

			// Generate valid date strings for the selected Month/Year to filter correctly
			const datesInMonth = getMonthDates(selectedMonth);
			const validDateStrings = datesInMonth.map((date) =>
				date.toLocaleDateString("en-US", {
					weekday: "short",
					day: "numeric",
					month: "short",
				})
			);

			// Fetch all documents (since Firestore cannot query directly on part of a string)
			const querySnapshot = await getDocs(devoteeCollection);
			const data = [];

			querySnapshot.forEach((doc) => {
				const record = doc.data();

				// Only include records that match a valid date string for the current month and year
				if (validDateStrings.includes(record.date)) {
					data.push({ id: doc.id, ...record });
				}
			});

			// Prepare initial form data
			const initialFormData = {};
			data.forEach((record) => {
				initialFormData[record.date] = { ...record };
			});

			setExistingData(data);
			setFormData(initialFormData);
		} catch (error) {
			console.error("Error fetching documents: ", error);
		}
	};

	return (
		<div className="morningProgramComponent">
			<MorningProgramHeader
				name={name}
				selectedMonth={selectedMonth}
				setSelectedMonth={setSelectedMonth}
			/>
			<form onSubmit={handleSubmit}>
				<table>
					<thead>
						<tr>
							<th>Date</th>
							{morningProgramSchema.map((field) => (
								<th key={field.name}>{field.name}</th>
							))}
						</tr>
					</thead>
					{/* Use the new table body component */}
					<MorningProgramTableBody
						formData={formData}
						morningProgramSchema={morningProgramSchema}
						handleInputChange={handleInputChange}
						selectedMonth={selectedMonth}
					/>
					<tfoot>
						<tr>
							<td>Monthly Average</td>
							{Object.values(averages).map((avg, index) => (
								<td key={index}>{avg}</td>
							))}
						</tr>
					</tfoot>
				</table>
				<button className="submitBtn" type="submit">
					Submit
				</button>
			</form>

			{/* Include MissingFieldsChecker */}
			{/* <MissingFieldsChecker
				formData={formData}
				selectedMonth={selectedMonth}
				morningProgramSchema={morningProgramSchema}
			/> */}
		</div>
	);
};

export default MorningProgram;
