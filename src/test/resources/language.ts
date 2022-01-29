import { randLanguage } from "@ngneat/falso"
import { createLanguage } from "../../services/language/createLanguage"

export async function generateLanguage() {
	const name = randLanguage()
	return await createLanguage({ name })
}
