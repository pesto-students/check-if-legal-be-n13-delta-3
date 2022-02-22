import { createState } from "../src/services/state/createState"

export async function seedStates() {
	const stateNames = [
		"Andaman and Nicobar Islands",
		"Andhra Pradesh",
		"Arunachal Pradesh",
		"Assam",
		"Bihar",
		"Chandigarh",
		"Chhattisgarh",
		"Dadra and Nagar Haveli and Daman and Diu",
		"Delhi",
		"Goa",
		"Gujarat",
		"Haryana",
		"Himachal Pradesh",
		"Jammu and Kashmir",
		"Jharkhand",
		"Karnataka",
		"Kerala",
		"Ladakh",
		"Lakshadweep",
		"Madhya Pradesh",
		"Maharashtra",
		"Manipur",
		"Meghalaya",
		"Mizoram",
		"Nagaland",
		"Odisha",
		"Puducherry",
		"Punjab",
		"Rajasthan",
		"Sikkim",
		"Tamil Nadu",
		"Telangana",
		"Tripura",
		"Uttar Pradesh",
		"Uttarakhand",
		"West Bengal",
	]

	for (const name of stateNames) {
		await createState({ name })
	}
}
