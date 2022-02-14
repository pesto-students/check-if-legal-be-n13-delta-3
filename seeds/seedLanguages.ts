import { createLanguage } from "../src/services/language/createLanguage"

export async function seedLanguages() {
	const languageNames = ["English", "Hindi", "Marathi"]

	for (const name of languageNames) {
		await createLanguage({ name })
	}
}
