// Configure as Client Component
"use client";
import { useState } from "react";
import { InputChangeEvent, FormSubmitEvent, FormData } from "../../typings";
import { generateBasePrompt } from "../utils/promptUtils";
import { BeatLoader } from "react-spinners";
import { Tooltip, Button } from "@nextui-org/react";

function Form() {
	// Define the response text
	const [responseText, setResponseText] = useState("");
	// Define the input steps
	const [step, setStep] = useState(1);
	// New state for loading indicator
	const [isGeneratingCV, setIsGeneratingCV] = useState(false);

	// Define the form data
	const [formData, setFormData] = useState<FormData>({
		firstname: "",
		lastname: "",
		email: "",
		jobTitle: "",
		workload: "",
		companyName: "",
		jobDescription: "",
	});

	// Destructure the form data
	const {
		firstname,
		lastname,
		email,
		jobTitle,
		workload,
		companyName,
		jobDescription,
	} = formData;

	// Group related state variables into a 'validation' object
	const [validation, setValidation] = useState({
		isEmailValid: false,
		emailError: "",
	});

	const handleInputChange = (e: InputChangeEvent) => {
		const { name, value } = e.target;

		// If the email field is changed, validate the email
		if (name === "email") {
			const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
			const isValid = emailRegex.test(value);

			setValidation((prev) => ({
				...prev,
				isEmailValid: isValid,
				emailError: isValid ? "" : "Email nicht gültig",
			}));
		}

		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleNextStep = () => {
		if (!firstname || !lastname || !email) {
			console.error("Please fill in all fields");
			return;
		}

		if (!validation.isEmailValid) {
			console.error("Email is invalid");
			return;
		}
		setStep(step + 1);
	};

	const handlePreviousStep = () => {
		setStep(step - 1);
	};

	const handleSubmit = async (e: FormSubmitEvent) => {
		e.preventDefault();
		const prompt = generateBasePrompt(formData);

		try {
			setIsGeneratingCV(true); // Set the loading state to true
			// console.log("Sending prompt to API: ", JSON.stringify(prompt)); // Log the prompt here
			const response = await fetch("/api/cv", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ prompt: prompt }),
			});

			if (!response.body) {
				throw Error("Read error");
			}

			// Use getReader() to get a reader from the stream
			const reader = response.body.getReader();

			let chunks = "";
			// Read the stream
			while (true) {
				const { done, value } = await reader.read();
				if (done) {
					// console.log("Stream complete");
					break;
				}
				chunks += new TextDecoder("utf-8").decode(value);
			}
			setResponseText(chunks);
			// Increment the step
			setStep(step + 1);
		} catch (error) {
			console.error("Error:", error);
		} finally {
			setIsGeneratingCV(false); // Set the loading state to false
		}
	};

	return (
		<form className="flex flex-col flex-grow" onSubmit={handleSubmit}>
			{step === 1 && (
				<div>
					<div className="p-10 bg-white rounded-lg drop-shadow-xl">
						<h2 className="mb-5 form-label">Persönliche Angaben</h2>
						<hr className="w-1/3 mb-5" />
						{/* Step 1 content */}
						<div className="mb-4">
							<label className="form-input-label">Vorname:</label>
							<input
								type="text"
								name="firstname"
								placeholder="John"
								value={firstname}
								onChange={handleInputChange}
								className={`form-input-field ${
									!firstname ? "required-field" : ""
								}`}
							/>
						</div>
						<div className="mb-4">
							<label className="form-input-label">Nachname:</label>
							<input
								type="text"
								name="lastname"
								placeholder="Doe"
								value={lastname}
								onChange={handleInputChange}
								className={`form-input-field ${
									!lastname ? "required-field" : ""
								}`}
							/>
						</div>
						<div className="mb-4">
							<label className="form-input-label">Email:</label>
							<input
								type="email"
								name="email"
								placeholder="john.doe@gmail.com"
								pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
								value={email}
								onChange={handleInputChange}
								className={`form-input-field ${!email ? "required-field" : ""}`}
							/>
						</div>
						<div className="space-y-2">
							{(!firstname || !lastname || !email) && (
								<p className="text-sm text-red-500 sm:text-base">
									Bitte alle Felder ausfüllen.
								</p>
							)}
							{validation.emailError && (
								<p className="text-red-500">{validation.emailError}</p>
							)}
							<button
								type="button"
								onClick={handleNextStep}
								className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
							>
								Next
							</button>
						</div>
					</div>
				</div>
			)}
			{step === 2 && !isGeneratingCV && (
				<div>
					<div className="p-10 bg-white rounded-lg drop-shadow-xl">
						<h2 className="mb-4 form-label">Angaben zum angestrebten Job</h2>
						<hr className="w-1/3 mb-5" />
						{/* Step 2 content */}
						<div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
							<div className="col-span-1 mb-4 sm:col-span-3">
								<label className="form-input-label">Job Titel:</label>
								<input
									type="text"
									name="jobTitle"
									placeholder="Software Engineer"
									value={jobTitle}
									onChange={handleInputChange}
									className="form-input-field "
									required={true}
								/>
							</div>
							<div className="mb-4">
								<label className="col-span-1 sm:col-span-1 form-input-label">
									Arbeitspensum:
								</label>
								<select
									className="form-input-field"
									name="workload"
									value={workload}
									onChange={handleInputChange}
									required={true}
								>
									<option value="">auswählen</option>
									{Array.from({ length: 9 }, (_, i) => (
										<option key={i} value={`${(i + 2) * 10}%`}>
											{`${(i + 2) * 10}%`}
										</option>
									))}
								</select>
							</div>
						</div>
						<div className="mb-4">
							<label className="form-input-label">Firmenname:</label>
							<input
								type="text"
								name="companyName"
								placeholder="Google"
								value={companyName}
								onChange={handleInputChange}
								className="form-input-field "
								required={true}
							/>
						</div>
						<div className="mb-4">
							<label className="form-input-label">Job Beschreibung:</label>
							<textarea
								name="jobDescription"
								value={jobDescription}
								onChange={handleInputChange}
								className="form-input-field"
								placeholder="Bitte fügen Sie die Stellenbeschreibung hier ein..."
								rows={7}
								required={true}
							/>
						</div>
						<div className="flex justify-between">
							<button
								type="button"
								onClick={handlePreviousStep}
								className="px-4 py-2 font-semibold text-white bg-red-400 rounded hover:bg-gray-600"
							>
								Zurück
							</button>
							<button
								type="submit"
								className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
							>
								Senden
							</button>
						</div>
					</div>
				</div>
			)}
			{/* Step 3 content */}
			{step === 3 && (
				<div>
					<div className="p-10 bg-white rounded-lg drop-shadow-xl">
						<h2 className="mb-5 form-label">Entwurf</h2>
						<hr className="w-1/3 mb-5" />
						<div className="mb-4">
							<textarea
								name="draftCV"
								value={responseText}
								readOnly
								className="form-input-field"
								rows={20}
							/>
						</div>
						<div className="flex justify-between">
							<button
								type="button"
								onClick={handlePreviousStep}
								className="px-4 py-2 font-semibold text-white bg-red-400 rounded hover:bg-gray-600"
							>
								Zurück
							</button>
							<Tooltip 
								content={"Bald verfügbar"}
								color="secondary"
							>
								<Button flat auto color="secondary">
									Personalisieren
								</Button>
							</Tooltip>
						</div>
					</div>
				</div>
			)}

			{/* Show the loading indicator or message while waiting for step 3 */}
			{step < 3 && isGeneratingCV ? (
				<div className="flex flex-col items-center justify-center pt-48 space-y-2">
					<p className="text-lg">Generiere Text...</p>
					<BeatLoader color="#36a1d6" size={15} loading={true} />
				</div>
			) : null}
		</form>
	);
}

export default Form;
