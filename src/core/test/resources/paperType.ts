import { randWord } from "@ngneat/falso"
import { createPaperType } from "../../../services/paperType/createPaperType"

export async function generatePaperType() {
	const name = randWord()
	return await createPaperType({ name })
}
