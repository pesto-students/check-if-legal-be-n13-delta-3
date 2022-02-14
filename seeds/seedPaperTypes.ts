import { createPaperType } from "../src/services/paperType/createPaperType"

export async function seedPaperTypes() {
	const paperTypes = ["Property Paper", "Contract Agreement", "Deed"]

	for (const name of paperTypes) {
		await createPaperType({ name })
	}
}
