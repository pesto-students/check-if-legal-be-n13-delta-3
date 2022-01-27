import { randJobArea } from "@ngneat/falso"
import { createPaperType } from "../../../services/paperType/createPaperType"

export async function generatePaperType() {
	const name = randJobArea()
	return await createPaperType({ name })
}
