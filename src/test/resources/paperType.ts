import { randJobArea } from "@ngneat/falso"
import { checkPaperTypeNameAvailability } from "../../services/paperType/checkPaperTypeNameAvailability"
import { createPaperType } from "../../services/paperType/createPaperType"

export async function generatePaperType() {
	const name = await getAvailablePaperTypeName()
	return await createPaperType({ name })
}

export async function getAvailablePaperTypeName() {
	let name = randJobArea()
	do {
		try {
			await checkPaperTypeNameAvailability(name)
			return name
		} catch (err) {
			if (err instanceof Error && err.name == "ConflictError") {
				name = randJobArea()
				continue
			}
			throw err
		}
	} while (true)
}
