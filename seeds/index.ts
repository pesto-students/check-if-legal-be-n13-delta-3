import { truncateDatabase } from "../src/test/truncateDatabase"
import { seedAdmin } from "./seedAdmin"
import { seedCities } from "./seedCities"
import { seedLanguages } from "./seedLanguages"
import { seedPaperTypes } from "./seedPaperTypes"
import { seedStates } from "./seedStates"
import { seedVerifiedLawyersAndOfferings } from "./seedVerifiedLawyersAndOfferings"

async function main() {
	await truncateDatabase()
	console.log("Database truncated")

	await seedAdmin()
	console.log("Admin seeded")

	await seedStates()
	console.log("States seeded")

	await seedCities()
	console.log("Cities seeded")

	await seedLanguages()
	console.log("Languages seeded")

	await seedPaperTypes()
	console.log("Paper types seeded")

	await seedVerifiedLawyersAndOfferings()
	console.log("Verified lawyers seeded")
}

main()
